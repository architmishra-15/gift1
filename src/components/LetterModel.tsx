import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const LetterModel = (
    { isUnfolded, letterText }: { isUnfolded: boolean; letterText: string },
) => {
    const letterRef = useRef<THREE.Group>(null);
    const [letterHeight, setLetterHeight] = useState(600); // Large enough

    useEffect(() => {
        // Adjust height dynamically (large enough + scrollable if too long)
        const lines = letterText.split("\n").length;
        setLetterHeight(Math.max(900, lines * 20)); // Ensure a minimum height
    }, [letterText]);

    useFrame(() => {
        if (letterRef.current) {
            // UNFOLD ONLY THE LETTER
            letterRef.current.rotation.x = THREE.MathUtils.lerp(
                letterRef.current.rotation.x,
                isUnfolded ? 0 : Math.PI / 2, // Folded at 90 degrees
                0.05,
            );
        }
    });

    return (
        <group ref={letterRef} position={[0, 0, 0]}>
            {/* Letter Paper */}
            <mesh>
                <planeGeometry args={[5, letterHeight / 100]} />{" "}
                {/* Large enough */}
                <meshStandardMaterial color="white" />
            </mesh>

            {/* HTML Content Inside Letter */}
            <Html position={[0, 0, 0.02]} center>
                <div
                    className="letter-content p-6 rounded-lg w-[400px] bg-white shadow-lg overflow-y-auto"
                    style={{
                        height: `${letterHeight}px`,
                        maxHeight: "500px", // Scroll inside if too long
                    }}
                >
                    {/* Fuchsia Heart */}
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                        {
                            /* <div className="w-12 h-12 bg-fuchsia-500 rounded-full">
                        </div> */
                        }
                    </div>

                    {/* Handwritten Text */}
                    <p className="handwritten text-lg text-black whitespace-pre-line">
                        {letterText}
                    </p>

                    {/* Signature */}
                    <p className="signature text-right text-xl text-black">
                        Yours ❤️
                    </p>
                </div>
            </Html>
        </group>
    );
};

export default LetterModel;
