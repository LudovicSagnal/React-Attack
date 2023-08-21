import React, { useState, useEffect } from 'react';

const Monsters = ({ monstersData, spriteAttack, spriteAttack2, spriteHurt, spriteDead, spriteRun }) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    let maxFrames = spriteAttack || spriteAttack2 ? 7 : spriteDead ? 6 : spriteHurt ? 2 : 3;
    let intervalDuration = 200;

    const animationInterval = setInterval(() => {
      setCurrentFrame((prevFrame) => {
        if (spriteDead) {
          return prevFrame = 6;
        }
        return prevFrame >= maxFrames ? 0 : prevFrame + 1;
      });
    }, intervalDuration);

    return () => clearInterval(animationInterval);
  }, [spriteAttack, spriteAttack2, spriteHurt, spriteDead]);
  
  const getImageSource = () => {
    if (spriteAttack) {
      return `./sprites/${monstersData.id}/attack1/tile00${currentFrame}.png`;
    } else if (spriteAttack2) {
      return `./sprites/${monstersData.id}/attack2/tile00${currentFrame}.png`;
    } else if (spriteHurt) {
      return `./sprites/${monstersData.id}/hurt/tile00${currentFrame}.png`;
    } else if (spriteDead) {
      return `./sprites/${monstersData.id}/death/tile00${currentFrame}.png`;
    } else {
      return `./sprites/${monstersData.id}/idle/tile00${currentFrame}.png`;
    }
  };

  return (
    <img
      src={getImageSource()}
      alt="Character"
      style={{
        position: 'absolute',
        top: '30%',
        left: '70%',
        width: '750px',
        height: '750px',
      }}
    />
  );
};

export default Monsters;
