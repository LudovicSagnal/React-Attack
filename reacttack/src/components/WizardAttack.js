import React, { useState, useEffect } from 'react';

const WizardAttack = () => {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame >= 7 ? 0 : prevFrame + 1));
    }, 200);

    return () => clearInterval(animationInterval);
  }, []);

  return (
      <img
        src={`./sprites/Wizard/attack1/tile00${currentFrame}.png`}
        alt="Character"
        style={{
          position: 'absolute',
          top: '50%',
          left: '5%',
          width: '450px',
          height: '450px',
        }}
      />
  );
};

export default WizardAttack;