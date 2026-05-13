import React, { useState, useEffect, useRef } from 'react';

const images = [
  "https://iili.io/Kn7y6ut.png",
  "https://iili.io/KnY9lRI.png",
  "https://iili.io/KnY9s5B.png",
  "https://iili.io/KnYHlrx.png",
  "https://iili.io/KnYJjuS.png",
  "https://iili.io/Kn7b0Cv.png",
  "https://iili.io/Kn7mcH7.png",
  "https://iili.io/Kn7plgp.png",
  "https://iili.io/Kn7pPBj.png",
  "https://iili.io/Kn7yaje.png"
];

type GameCarouselProps = {
  onSelect: (game: {name: string, img: string}) => void;
};

export default function GameCarousel({ onSelect }: GameCarouselProps) {
  const [current, setCurrent] = useState(Math.floor(images.length / 2));
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef(0);
  const total = images.length;

  const moveNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev + 1) % total);
    setTimeout(() => setIsAnimating(false), 450);
  };

  const movePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev - 1 + total) % total);
    setTimeout(() => setIsAnimating(false), 450);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) moveNext();
      else movePrev();
    }
  };

  const getCardStyleAndClass = (index: number) => {
    const baseClass = "absolute h-[14rem] w-[8rem] rounded-2xl bg-contain bg-center bg-no-repeat transition-all duration-500 ease-in-out cursor-pointer shadow-lg";
    
    if (index === current) {
      return { 
        className: `${baseClass} z-50 opacity-100 pointer-events-auto`,
        style: { transform: 'translate3d(0,0,0) scale(1)' } 
      };
    }
    if (index === (current - 1 + total) % total) {
      return { 
        className: `${baseClass} z-40 opacity-70 pointer-events-auto`,
        style: { transform: 'translate3d(-4.5rem,0,0) scale(0.75)' }
      };
    }
    if (index === (current - 2 + total) % total) {
      return { 
        className: `${baseClass} z-30 opacity-40 pointer-events-auto`,
        style: { transform: 'translate3d(-9rem,0,0) scale(0.55)' }
      };
    }
    if (index === (current + 1) % total) {
      return { 
        className: `${baseClass} z-40 opacity-70 pointer-events-auto`,
        style: { transform: 'translate3d(4.5rem,0,0) scale(0.75)' }
      };
    }
    if (index === (current + 2) % total) {
      return { 
        className: `${baseClass} z-30 opacity-40 pointer-events-auto`,
        style: { transform: 'translate3d(9rem,0,0) scale(0.55)' }
      };
    }
    
    return { 
      className: `${baseClass} z-0 opacity-0 pointer-events-none invisible`,
      style: { transform: 'translate3d(0,0,0) scale(0.6)' }
    };
  };

  return (
    <div 
      className="relative w-full h-[260px] flex justify-center items-center select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {images.map((src, index) => {
        const { className, style } = getCardStyleAndClass(index);
        return (
          <div
            key={index}
            className={className}
            style={{
              ...style,
              backgroundImage: `url(${src})`,
              WebkitTapHighlightColor: 'transparent',
              backfaceVisibility: 'hidden',
              willChange: 'transform, opacity'
            }}
            onClick={() => {
              if (index === (current + 1) % total || index === (current + 2) % total) moveNext();
              else if (index === (current - 1 + total) % total || index === (current - 2 + total) % total) movePrev();
              else if (index === current) onSelect({ name: `Game Model ${index + 1}`, img: src });
            }}
          />
        );
      })}
    </div>
  );
}
