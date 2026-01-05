import React, { useEffect, useState, useRef } from 'react';

function FloatingParticles() {
  const [particles, setParticles] = useState([]);
  const requestRef = useRef();
  const lastTimeRef = useRef();

  // Khởi tạo các hạt với thuộc tính đa dạng hơn
  const createParticles = () => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // Vị trí ngang (%)
      y: Math.random() * 100, // Vị trí dọc (%)
      // Kích thước đa dạng: 4px, 8px, 12px (giữ bội số của 4 để pixel nhìn chuẩn)
      size: [4, 8, 12][Math.floor(Math.random() * 3)],
      speed: 0.05 + Math.random() * 0.15, // Tốc độ trôi chậm hơn để tạo cảm giác bụi bay
      opacity: 0.05 + Math.random() * 0.2, // Độ mờ khác nhau tạo chiều sâu
      // Tạo hiệu ứng lắc lư ngang (Wobble)
      wobble: Math.random() * 2, 
      wobbleSpeed: 0.001 + Math.random() * 0.002,
      // Blur nhẹ cho các hạt nhỏ/mờ để tạo hiệu ứng Bokeh (chiều sâu trường ảnh)
      blur: Math.random() > 0.7 ? '1px' : '0px'
    }));
  };

  const animate = (time) => {
    if (lastTimeRef.current !== undefined) {
      setParticles((prevParticles) =>
        prevParticles.map((p) => {
          // Tính toán vị trí dọc mới
          let newY = p.y - p.speed;
          if (newY < -10) newY = 110; // Reset về đáy khi trôi lên đỉnh

          // Tính toán lắc lư ngang bằng hàm Sin
          let wobbleX = Math.sin(time * p.wobbleSpeed) * p.wobble;
          
          return { ...p, y: newY, wobbleX };
        })
      );
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    setParticles(createParticles());
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bg-white"
          style={{
            // Sử dụng transform để animation mượt hơn (GPU acceleration)
            transform: `translate(${p.wobbleX}px, 0)`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            filter: `blur(${p.blur})`,
            borderRadius: '0px', // Hình vuông tuyệt đối kiểu Minecraft
            imageRendering: 'pixelated',
            boxShadow: '1px 1px 0 rgba(0,0,0,0.1)' // Đổ bóng cực nhẹ cho hạt
          }}
        />
      ))}
    </div>
  );
}

export default FloatingParticles;