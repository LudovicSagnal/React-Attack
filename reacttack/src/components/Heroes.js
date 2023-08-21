import React, { useState, useEffect } from 'react';

const Heroes = ({ heroesData, spriteAttack, spriteAttack2, spriteHurt, spriteDead, spriteRun }) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const maxFrames = spriteAttack || spriteAttack2 ? 7 : 3;
  
    const animationInterval = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame >= maxFrames ? 0 : prevFrame + 1));
    }, 200);
  
    return () => clearInterval(animationInterval);
  }, [spriteAttack, spriteAttack2]);
  

  const getImageSource = () => {
    if (spriteAttack) {
      return `./sprites/${heroesData.id}/attack1/tile00${currentFrame}.png`;
    } else if (spriteAttack2) {
        return `./sprites/${heroesData.id}/attack2/tile00${currentFrame}.png`;
    } else {
      return `./sprites/${heroesData.id}/idle/tile00${currentFrame}.png`;
    }
  };

  return (
    <img
      src={getImageSource()}
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

export default Heroes;