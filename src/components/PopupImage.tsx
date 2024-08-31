import { motion } from 'framer-motion';

type PopupImageProps = {
  selectedImage: string;
  closePopUp: () => void;
};

function PopupImage({ selectedImage, closePopUp }: PopupImageProps) {
  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closePopUp}
    >
      <motion.div
        className="relative bg-white p-6 rounded-lg shadow-lg"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-700 text-xl"
          onClick={closePopUp}
        >
          &times;
        </button>
        <img 
          src={selectedImage} 
          alt="Selected"
          className="max-w-xs max-h-xs object-cover rounded-lg"
        />
      </motion.div>
    </motion.div>
  );
}

export default PopupImage;
