function TypingIndicator({ isTyping }) {
  if (!isTyping) return null;

  return (
    <div className="flex items-center gap-2 px-4 py-2 text-[#d0e8d2] text-xl relative z-10">
      <span style={{textShadow: '1px 1px 0 rgba(0,0,0,0.8)'}}>
        Someone is typing
      </span>
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-2 h-2 bg-[#d0e8d2]"
            style={{
              animation: `bounce 0.6s infinite`,
              animationDelay: `${i * 0.1}s`,
              boxShadow: '1px 1px 0 rgba(0,0,0,0.5)'
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}

export default TypingIndicator;