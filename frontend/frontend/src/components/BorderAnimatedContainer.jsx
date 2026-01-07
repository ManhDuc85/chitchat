function BorderAnimatedContainer({ children }) {
  return (
    <div className="w-full h-full relative">
      {/* Minecraft-style border with animated glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2F5F2F] via-[#4A7C4E] to-[#8B7355] opacity-20 blur-xl animate-pulse" />
      
      <div className="relative w-full h-full border-8 border-black bg-[#2F5F2F] flex overflow-hidden"
        style={{
          boxShadow: '0 0 0 2px #1a1a1a, 0 0 0 6px #5E8E62, 8px 8px 0 8px rgba(0,0,0,0.5)'
        }}
      >
        {/* Inner border decoration */}
        <div className="absolute top-2 left-2 w-2 h-2 bg-white opacity-20" />
        <div className="absolute bottom-2 right-2 w-2 h-2 bg-black opacity-20" />
        
        {children}
      </div>
    </div>
  );
}

export default BorderAnimatedContainer;