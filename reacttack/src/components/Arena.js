import React, { useEffect, useState } from 'react';
import soundHurt from '../audio/hitHurt.wav';
import soundThunder from '../audio/thunder.mp3';
import soundSpell from '../audio/magic-spell.mp3';
import { heroesData } from '../data/heroesData';
import { monstersData } from '../data/monstersData';
import Heroes from './Heroes';
import Monsters from './Monsters';

const Arena = () => {

    const [currentFrame, setCurrentFrame] = useState(0);
    const [spriteAttack, setSpriteAttack] = useState(false);
    const [spriteAttack2, setSpriteAttack2] = useState(false);
    const [spriteHurt, setSpriteHurt] = useState(false);
    const [spriteRun, setSpriteRun] = useState(false);
    const [spriteDead, setSpriteDead] = useState(false);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);

    // PLAYER

    const [currentHealth, setCurrentHealth] = useState(heroesData[0].hp);
    const [currentMana, setCurrentMana] = useState(heroesData[0].mana);
    const healthPercentage = (currentHealth / heroesData[0].hp) * 100;
    const manaPercentage = (currentMana / heroesData[0].mana) * 100;

    const [noMana, setNoMana] = useState("");
    const [outcome, setOutcome] = useState("");

    const [attack1, setAttack1] = useState(heroesData[0].atk)
    const minCrit = 0.05;
    const maxCrit = 0.25;
    const randomCrit = Math.random() * (maxCrit - minCrit) + minCrit;
    const attack2 = Math.round(heroesData[0].atk * (1 + randomCrit));
    const [currentXp, setCurrentXp] = useState(heroesData[0].xp);

    const hurt = new Audio(soundHurt);
    const thunder = new Audio(soundThunder);
    const spell = new Audio(soundSpell);

    // MONSTER

    const [currentEnemyHealth, setCurrentEnemyHealth] = useState(monstersData[1].hp);
    const enemyHealthPercentage = (currentEnemyHealth / monstersData[1].hp) * 100;
    const monsterXp = monstersData[1].xp;

    // PLAYER FUNCTIONS

    const handleAttack = () => {
        if (!spriteAttack && !spriteAttack2 && currentMana >= 10) {
          setNoMana("");
          setSpriteAttack(true);
          setCurrentMana((mana) => mana - 10);
          setCurrentEnemyHealth((hp) => hp - attack1);
        } else if (currentMana < 10) {
          setNoMana("Vous n'avez pas assez de mana !");
          setTimeout(() => {
            setNoMana("");
          }, 2000);
        }
      };
    
      const handleAttack2 = () => {
        if (!spriteAttack && !spriteAttack2 && currentMana >= 20) {
          setNoMana("");
          setSpriteAttack2(true);
          setCurrentMana((mana) => mana - 20);
          setCurrentEnemyHealth((hp) => hp - attack2);
        } else if (currentMana < 20) {
          setNoMana("Vous n'avez pas assez de mana !");
          setTimeout(() => {
            setNoMana("");
          }, 2000);
        }
      };

    useEffect(() => {
        if (currentEnemyHealth <= 0) {
            setCurrentEnemyHealth(0);
            setTimeout(() => {
                setSpriteDead(true);
                setTimeout(() => {
                    setOutcome('VICTOIRE')
                    setTimeout(() => {
                        setCurrentXp(currentXp + monsterXp);
                    }, 1000);
                }, 1000);
            }, 2000);
        }
    },[currentEnemyHealth]);

    const updateHealth = (damage) => {
        setCurrentHealth((prevHealth) => Math.max(prevHealth - damage, 0));
    };


    useEffect(() => {
        const maxFrames = spriteAttack || spriteAttack2 ? 7 : spriteHurt || spriteDead ? 2 : 3;
    
        const animationInterval = setInterval(() => {
          setCurrentFrame((prevFrame) => (prevFrame >= maxFrames ? 0 : prevFrame + 1));
        }, 200);
    
        return () => clearInterval(animationInterval);
      }, [spriteAttack, spriteAttack2, spriteHurt, spriteDead]);
    
      useEffect(() => {
        if (spriteAttack) {
          setTimeout(() => {
            thunder.play();
          }, 800);
          const timeoutId = setTimeout(() => {
            setSpriteAttack(false);
            setSpriteHurt(true);
            hurt.play();
            setTimeout(() => {
                setSpriteHurt(false);
            }, 400); 
          }, 1600);
          return () => clearTimeout(timeoutId);
        } else if (spriteAttack2) {
          setTimeout(() => {
            spell.play();
          }, 400);
          const timeoutId = setTimeout(() => {
            setSpriteAttack2(false);
            setSpriteHurt(true);
            hurt.play();
            setTimeout(() => {
              setSpriteHurt(false);
            }, 400);
          }, 1600);
          return () => clearTimeout(timeoutId);
        }
      }, [spriteAttack, spriteAttack2]);
    
      //MONSTER FUNCTIONS

    const monsterTurn = () => {
        //attaque du monstre et tout ça
        setIsPlayerTurn(true);
    };

    useEffect(() => {
        if (!isPlayerTurn) {
          monsterTurn();
        }
      }, [isPlayerTurn]);
      

    return (
        <div className='arena'>
            <Heroes heroesData={heroesData[0]} spriteAttack={spriteAttack} spriteAttack2={spriteAttack2}/>
            <Monsters monstersData={monstersData[1]} spriteHurt={spriteHurt} spriteDead={spriteDead}/>
            <p className={(outcome === '') ? '' : 'outcome'}>{outcome}</p>
            <div className='btn'>
                <button className='btn-attack' onClick={handleAttack}>Attaque normale</button>
                <button className='btn-attack2' onClick={handleAttack2}>Attaque puissante</button>
            </div>
            <div className="infos-player">
                <p>{heroesData[0].title}</p>
                <p>Niveau {heroesData[0].level}</p>
                <p>XP : {currentXp}/{100*heroesData[0].level}</p>
            </div>
            <div className='stats-player'>
                <div className="dps">
                    <img src="./assets/sword.png" alt="" />
                    <span>{heroesData[0].atk}</span>
                    <img src="./assets/shield.png" alt="" />
                    <span>{heroesData[0].def}</span>
                </div>
                <span>{currentHealth}</span>
                <div className="health-bar">
                    <div className="health-bar-progress" style={{ width: `${healthPercentage}%` }} />
                </div>
                <span>{currentMana}</span>
                <div className="mana-bar">
                    <div className="mana-bar-progress" style={{ width: `${manaPercentage}%` }} />
                </div>
            </div>
            <div className="stats-monster">
                <span>{currentEnemyHealth}</span>
                <div className="health-bar">
                    <div className="health-bar-progress" style={{ width: `${enemyHealthPercentage}%` }} />
                </div>
            </div>
            <p className='info-combat' >{noMana}</p>
        </div>
    );
};

export default Arena;