import { useState, useEffect, useContext } from 'react';
import ReactGA from 'react-ga4';
import { useNavigate } from 'react-router-dom';

import { useDropzone } from 'react-dropzone';
import { useUploadedJsonUpdater } from '../../utils/';
import UploadForm from './UploadForm.jsx';
import { DataContext } from '../../DataContext';

const Uploader = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: '/uploader',
      title: 'Uploader',
    });
  });

  const { setBeerData } = useContext(DataContext);
  const { manipulateData } = useUploadedJsonUpdater(); // Import and use the hook
  const [userDetails, setUserDetails] = useState({
    untappd_username: '',
    mapbox_key: '',
    venue_lat: '',
    venue_lng: '',
    venue_city: '',
    venue_country: '',
    venue_state: '',
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
        const data = reader.result;
        const updatedData = manipulateData(JSON.parse(data), userDetails);
        setBeerData(updatedData); // Convert back to string if needed
      };

      reader.readAsText(acceptedFiles[0]);
      navigate('/');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
    saveToLocalStorage('userDetails', { ...userDetails, [name]: value });
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
    },
    maxFiles: 1,
    maxSize: 15 * 1024 * 1024, // 15 mb max.
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
            <p className="mb-4 text-gray-400">Drag 'n' drop your JSON file here or</p>
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
