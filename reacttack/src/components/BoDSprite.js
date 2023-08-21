import React, { useState, useEffect } from 'react';

const BoDSprite = () => {
  const [currentFrame, setCurrentFrame] = useState(1);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame >= 8 ? 1 : prevFrame + 1));
    }, 200);

    return () => clearInterval(animationInterval);
  }, []);

  return (
      <img
        src={`./sprites/Bringer_Of_Death/Idle/Bringer-Of-Death_Idle_${currentFrame}.png`}
        alt="Character"
        style={{
          position: 'absolute',
          top: '48%',
          left: '60%',
          width: '350px',
          height: '350px',
        }}
      />
  );
};

export default BoDSprite;