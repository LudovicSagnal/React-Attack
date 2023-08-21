import React, { useState, useEffect } from 'react';

const BoDHurt = () => {
  const [currentFrame, setCurrentFrame] = useState(1);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame >= 3 ? 1 : prevFrame + 1));
    }, 200);

    return () => clearInterval(animationInterval);
  }, []);

  return (
      <img
        src={`./sprites/Bringer_Of_Death/Hurt/Bringer-Of-Death_Hurt_${currentFrame}.png`}
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

export default BoDHurt;