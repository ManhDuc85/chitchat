function UsersLoadingSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((item) => (
        <div 
          key={item} 
          className="bg-[#4A7C4E] border-4 border-black p-4 shadow-mc animate-pulse"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#2F5F2F] border-4 border-black shadow-mc" />
            <div className="flex-1">
              <div className="h-6 bg-[#2F5F2F] border-2 border-black w-3/4 mb-2" />
              <div className="h-4 bg-[#3A6A3F] border-2 border-black w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UsersLoadingSkeleton;