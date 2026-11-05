import React, { useEffect, useRef } from 'react';

export default function StudioEnvironment({ currentShade }) {
  const canvasRef = useRef(null);

  // Subtle floating luxury bokeh particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 25 subtle luxury floating bokeh motes
    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1,
      speedY: Math.random() * -0.3 - 0.1,
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.4 + 0.1
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.shadowColor = currentShade.swatchColor;
        ctx.shadowBlur = 10;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentShade]);

  return (
    <div
      className="absolute inset-0 pointer-events-none transition-colors duration-1000 ease-in-out overflow-hidden"
      style={{ backgroundColor: currentShade.bg }}
    >
      {/* 1. Volumetric Overhead Spot Light Beam */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[700px] rounded-full blur-[120px] pointer-events-none opacity-40 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${currentShade.swatchColor} 0%, rgba(255,255,255,0.15) 40%, transparent 70%)`
        }}
      />

      {/* 2. Studio Cyclorama Floor Curve Horizon */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/45" />
      
      {/* 3. Subtle Studio Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)]" />

      {/* 4. Luxury 3D Circular Pedestal / Plinth on Floor */}
      <div className="absolute top-[62%] sm:top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[540px] h-[160px] sm:h-[190px] rounded-[100%] pointer-events-none opacity-40 transition-all duration-1000">
        {/* Pedestal rim highlight */}
        <div
          className="w-full h-full rounded-[100%] border-[2px] transition-all duration-700 shadow-2xl"
          style={{
            borderColor: 'rgba(255, 255, 255, 0.25)',
            background: `radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.95) 75%)`,
            boxShadow: `0 0 60px ${currentShade.swatchColor}33, inset 0 2px 4px rgba(255,255,255,0.4)`
          }}
        />
      </div>

      {/* 5. Canvas for Subtle Atmospheric Floating Bokeh */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 opacity-70" />
    </div>
  );
}
