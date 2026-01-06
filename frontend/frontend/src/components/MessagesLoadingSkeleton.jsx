function MessagesLoadingSkeleton() {
  return (
    <div className="w-full space-y-6 relative z-10 px-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className={`flex w-full ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          <div className={`
            border-4 border-black shadow-mc-lg animate-pulse w-auto max-w-[80%] min-w-[200px]
            ${index % 2 === 0 ? "bg-[#8B7355]" : "bg-[#5E8E62]"}
          `}>
            {/* Title Bar */}
            <div className={`
              px-3 py-1 border-b-4 border-black
              ${index % 2 === 0 ? "bg-[#5C4033]" : "bg-[#2F5F2F]"}
            `}>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-[#4A4A4A] border-2 border-black" />
                <div className="h-4 bg-[#4A4A4A] rounded w-20" />
              </div>
            </div>
            
            {/* Message Body */}
            <div className="p-4 space-y-2">
              <div className="h-6 bg-[#4A4A4A] rounded w-32" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MessagesLoadingSkeleton;