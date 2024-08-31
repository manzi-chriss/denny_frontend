import { motion } from 'framer-motion';

type Video = {
  videoId: string;
  title: string;
  description: string;
};

type UvideosProps = {
  videos: Video[];
};

function Uvideos({ videos }: UvideosProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.length ? (
        videos.map((video, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe
                className="absolute inset-0 w-full h-full rounded-t-lg"
                src={`https://www.youtube.com/embed/${video.videoId}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4">
              <h4 className="text-lg font-semibold text-white mb-2">{video.title}</h4>
              <p className="text-gray-400 text-sm">{video.description}</p>
            </div>
          </motion.div>
        ))
      ) : (
        <p className="text-center text-lg">No videos available at the moment.</p>
      )}
    </div>
  );
}

export default Uvideos;
