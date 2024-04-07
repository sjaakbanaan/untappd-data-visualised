import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useUploadedJsonUpdater } from '../../utils/';
import VenueForm from './VenueForm.jsx';
import { DataContext } from '../../DataContext';

const Uploader = () => {
  const { setBeerData } = useContext(DataContext);
  const { manipulateData } = useUploadedJsonUpdater(); // Import and use the hook
  const [venueDetails, setVenueDetails] = useState({
    venue_lat: '',
    venue_lng: '',
    venue_city: '',
    venue_country: '',
    venue_state: '',
  });

  useEffect(() => {
    // Check for venueDetails in local storage
    const storedVenueDetails = localStorage.getItem('venueDetails');
    if (storedVenueDetails) {
      setVenueDetails(JSON.parse(storedVenueDetails));
    }
  }, []); // Run only on component mount

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const navigate = useNavigate(); // Get the navigate object

  const onDrop = (acceptedFiles) => {
    const reader = new FileReader();

    // eslint-disable-next-line no-console
    reader.onabort = () => console.log('file reading was aborted');
    // eslint-disable-next-line no-console
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = () => {
      // Do something with the JSON data
      const data = reader.result;
      const updatedData = manipulateData(JSON.parse(data), venueDetails);
      setBeerData(updatedData); // Convert back to string if needed
    };

    reader.readAsText(acceptedFiles[0]);
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVenueDetails({ ...venueDetails, [name]: value });
    saveToLocalStorage('venueDetails', { ...venueDetails, [name]: value });
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
    },
    maxFiles: 1,
    maxSize: 15 * 1024 * 1024,
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
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 text-white shadow-md rounded-lg">
      <VenueForm venueDetails={venueDetails} handleInputChange={handleInputChange} />
      <div
        {...getRootProps()}
        className="dropzone border-dashed border-2 text-md border-gray-400 leading-5 rounded-md p-8 text-center"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-gray-400">Yes, drop it here!</p>
        ) : (
          <div>
            <p className="text-gray-400 mb-4">Drag 'n' drop some JSON files here or</p>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-4 rounded">
              Select file
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
