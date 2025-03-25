import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Stars } from "@react-three/drei";
import useSound from "use-sound";
import LetterModel from "./LetterModel"; // Import fixed letter model
import "../index.css";
import { Heart } from "lucide-react";

const Letter: React.FC = () => {
  const [isUnfolded, setIsUnfolded] = useState(false);
  const [playBgMusic] = useSound("/bgmusic.mp3", { volume: 0.5, loop: true });

  const letterText = `My Dearest Love,

Today is a special day, not just for you, but for me too.
It marks the day you came into the world, bringing endless joy into my life.

Every moment with you is precious, every laugh, every smile.
You're the light that brightens my darkest days.

On this special day, I want you to know just how much you mean to me.
You are loved, cherished, and the most wonderful person in my world.

Happy Birthday, my love.

Yours forever ❤️`;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsUnfolded(true);
        playBgMusic();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [playBgMusic]);

  return (
    <div className="min-h-[200vh] bg-pink-100 flex items-center justify-center relative overflow-hidden">
      {/* Starry Background */}
      <div className="fixed inset-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
          <ambientLight intensity={1} />
          <directionalLight position={[2, 2, 5]} intensity={0.8} />
          <LetterModel isUnfolded={isUnfolded} letterText={letterText} />
        </Canvas>
      </div>

      {/* Floating Hearts Background */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Heart
          key={i}
          className="absolute text-pink-500 opacity-20"
          style={{
            top: Math.random() * window.innerHeight,
            left: Math.random() * window.innerWidth,
          }}
          size={Math.random() * 30 + 20}
        />
      ))}
    </div>
  );
};

export default Letter;
