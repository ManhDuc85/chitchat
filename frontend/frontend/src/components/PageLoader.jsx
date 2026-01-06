import { Loader } from "lucide-react";

function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-[#2F5F2F] via-[#4A7C4E] to-[#8B7355]">
      <div className="relative">
        {/* Minecraft-style loading box */}
        <div className="w-32 h-32 bg-[#5E8E62] border-4 border-black shadow-mc-xl flex items-center justify-center mb-4">
          <Loader className="w-16 h-16 text-white animate-spin" style={{filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,1))'}} />
        </div>
        
        {/* Loading text */}
        <div className="text-center">
          <p className="text-white text-3xl font-bold animate-pulse" style={{textShadow: '3px 3px 0 rgba(0,0,0,1)'}}>
            LOADING...
          </p>
        </div>
        
        {/* Decorative blocks */}
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-4 h-4 bg-[#C6A664] border-2 border-black"
              style={{
                animation: `bounce 1s infinite`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

export default PageLoader;