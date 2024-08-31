import { motion } from 'framer-motion';
import PIC1 from '../assets/img/Denny1.jpg';
import PIC2 from '../assets/img/Denny2.jpg';
import PIC3 from '../assets/img/Denny3.jpg';
import '../../index.css'

type ImageGalleryProps = {
  openPopUp: (image: string) => void;
};

function ImageGallery({ openPopUp }: ImageGalleryProps) {
  const images = [PIC1, PIC2, PIC3, 'https://example.com/image4.jpg'];

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-semibold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        General Images
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openPopUp(image)}
            className="cursor-pointer"
          >
            <img 
              src={image} 
              alt={`Portfolio image ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg shadow-md transform transition duration-300 hover:rotate-3"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default ImageGallery;
