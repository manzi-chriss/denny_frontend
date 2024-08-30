import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import axios from 'axios';
import ImageGallery from './ImageGallery';
import Uvideos from './Uvideos';
import PopupImage from './PopupImage';

function Portfolio() {
  const [videos, setVideos] = useState([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const cubeControl = useAnimation();

  const images = [
    '../assets/img/Denny1.jpg',
    '../assets/img/Denny2.jpg',
    '../assets/img/Denny3.jpg',
    'https://example.com/image4.jpg'
  ];

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/upload');
        setVideos(response.data.videos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideos();
    cubeControl.start({
      rotateY: 360,
      transition: { duration: 2, repeat: Infinity, ease: "linear" },
    });
  }, [cubeControl]);

  const openPopUp = (image: string) => {
    setSelectedImage(image);
    setIsPopUpVisible(true);
  };

  const closePopUp = () => {
    setIsPopUpVisible(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <motion.h1 
          className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          My Portfolio
        </motion.h1>

        <ImageGallery images={images} openPopUp={openPopUp} />

        <section>
          <h2 className="text-3xl font-semibold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
            YouTube Videos
          </h2>
          <Uvideos videos={videos} />
        </section>

        {isPopUpVisible && selectedImage && (
          <PopupImage selectedImage={selectedImage} closePopUp={closePopUp} />
        )}
      </motion.div>
    </div>
  );
}

export default Portfolio;
