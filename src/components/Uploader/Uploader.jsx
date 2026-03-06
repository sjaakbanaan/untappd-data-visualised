import { useState, useEffect, useContext } from 'react';
import ReactGA from 'react-ga4';
import { useNavigate } from 'react-router-dom';

import { useDropzone } from 'react-dropzone';
import { useUploadedJsonUpdater } from '../../utils/';
import { extractBadges } from '../../utils/extractBadges';
import { detectFormat } from '../../utils/normaliseCheckins';
import UploadForm from './UploadForm';
import { DataContext } from '../../DataContext';

const Uploader = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: '/uploader',
      title: 'Uploader',
    });
  });

  const { setBeerData, setBadgeData } = useContext(DataContext);
  const { manipulateData } = useUploadedJsonUpdater(); // Import and use the hook
  const [userDetails, setUserDetails] = useState({
    untappd_username: '',
    untappd_avatar: '',
    mapbox_key: '',
    venue_lat: '',
    venue_lng: '',
    venue_city: '',
    venue_country: '',
    venue_state: '',
    json_source: 'untappd_insider',
  });

  useEffect(() => {
    // Check for userDetails in local storage
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    }
  }, []); // Run only on component mount

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
    saveToLocalStorage('userDetails', { ...userDetails, [name]: value });
  };

  const navigate = useNavigate(); // Get the navigate object

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const reader = new FileReader();

      // eslint-disable-next-line no-console
      reader.onabort = () => console.log('file reading was aborted');
      // eslint-disable-next-line no-console
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do something with the JSON data
        const rawJson = JSON.parse(reader.result);

        const autoDetectedFormat = detectFormat(rawJson);
        const correctSource = autoDetectedFormat === 'scraper_xl' ? 'custom_export' : 'untappd_insider';
        const correctedUserDetails = { ...userDetails, json_source: correctSource };
        
        if (userDetails.json_source !== correctSource) {
          setUserDetails(correctedUserDetails);
          saveToLocalStorage('userDetails', correctedUserDetails);
        }

        const updatedData = manipulateData(rawJson, correctedUserDetails);
        setBeerData(updatedData);

        // Extract badge data from scraperxl checkins (each checkin has a `badges` array)
        const checkins = Array.isArray(rawJson?.checkins) ? rawJson.checkins : rawJson;
        if (Array.isArray(checkins) && checkins.length > 0 && Array.isArray(checkins[0]?.badges)) {
          setBadgeData(extractBadges(checkins));
        } else {
          setBadgeData(null);
        }
      };

      reader.readAsText(acceptedFiles[0]);
      navigate('/');
    }
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50 mb max.
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <div className="mx-auto max-w-3xl bg-gray-800 p-6 text-white shadow-md md:rounded-lg">
      <UploadForm userDetails={userDetails} handleInputChange={handleInputChange} />
      <div
        {...getRootProps()}
        className="rounded-md border-2 border-dashed border-gray-400 p-8 text-center leading-5"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-gray-400">Yes, drop it here!</p>
        ) : (
          <div>
            <p className="mb-4 text-gray-400">
              Drag 'n' drop your exported JSON file here or
            </p>
            <button className="rounded bg-yellow-500 px-4 py-2 text-black transition-colors duration-300 hover:bg-yellow-400">
              Select JSON file
            </button>
            {fileRejectionItems.length > 0 && (
              <p className="mt-4">
                <ul>{fileRejectionItems}</ul>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Uploader;
