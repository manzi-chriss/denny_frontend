import { useState, useEffect } from 'react';
import axios from 'axios';

const ImageUploader = () => {
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [imageId, setImageId] = useState<string>('');

  useEffect(() => {
    // Optionally, you can fetch some initial data here if needed
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleUpload = async () => {
    if (!image) {
      setMessage('No image selected');
      return;
    }

    const formData = new FormData();
    formData.append('img', image);
    formData.append('description', description);

    try {
      const response = await axios.post('/uploadImg', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      setImageUrl(response.data.image);
      setImageId(response.data.image._id);
    } catch (error) {
      setMessage('Error uploading image');
    }
  };

  const handleFetch = async () => {
    try {
      const response = await axios.get(`/uploadImg/${imageId}`);
      setImageUrl(response.data.image);
      setMessage('Image fetched successfully');
    } catch (error) {
      setMessage('Error fetching image');
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/uploadImg/${imageId}`, { description });
      setMessage(response.data.message);
      setImageUrl(response.data.image);
    } catch (error) {
      setMessage('Error updating image');
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/uploadImg/${imageId}`);
      setMessage(response.data.message);
      setImageUrl('');
      setImageId('');
    } catch (error) {
      setMessage('Error deleting image');
    }
  };

  return (
    <div>
      <h2>Image Uploader</h2>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Image description"
      />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleFetch}>Fetch Image</button>
      <button onClick={handleUpdate}>Update Description</button>
      <button onClick={handleDelete}>Delete Image</button>
      <p>{message}</p>
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '300px' }} />}
    </div>
  );
};

export default ImageUploader;
