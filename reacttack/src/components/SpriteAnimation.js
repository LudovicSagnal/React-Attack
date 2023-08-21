import React, { useEffect, useState, useRef } from 'react';

const useSpriteAnimation = (maxFrames, frameDuration) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const animationIntervalRef = useRef(null);

  const startAnimation = () => {
    animationIntervalRef.current = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame >= maxFrames ? 0 : prevFrame + 1));
    }, frameDuration);
  };

  const stopAnimation = () => {
    clearInterval(animationIntervalRef.current);
    setCurrentFrame(0);
  };

  useEffect(() => {
    startAnimation();
    return stopAnimation;
  }, []);

  return currentFrame;
};

export default useSpriteAnimation;