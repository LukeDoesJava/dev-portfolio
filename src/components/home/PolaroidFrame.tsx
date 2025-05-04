interface PolaroidFrameProps {
  imageUrl: string;
  rotation?: number;
}

const PolaroidFrame = ({ imageUrl, rotation = 0 }: PolaroidFrameProps) => {
  return (
    <div 
      className="relative w-[350px] bg-[#f8f8f8] p-4 pb-12 shadow-2xl transform transition-transform duration-300 hover:scale-105 cursor-pointer"
      style={{ 
        transform: `rotate(${rotation}deg)`,
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
      }}
    >
      {/* Image container */}
      <div className="w-full aspect-square overflow-hidden bg-black">
        <img 
          src={imageUrl} 
          alt="Project image" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default PolaroidFrame; 