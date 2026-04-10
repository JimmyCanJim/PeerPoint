import React, { useEffect, useState } from 'react';
import './SmokeBackground.css'; // Import the specific CSS

const Background = () => {
    // Generate an array of particle configurations
    const generateParticles = (count) => {
        const particles = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                id: i,
                size: Math.random() * 200 + 150, // 150px to 350px
                top: Math.random() * 50 + 50,    // Starts in bottom half of screen (50% to 100%)
                left: Math.random() * 80 + 10,   // Random horizontal start (10% to 90%)
                
                // Add natural variation to the drift
                duration: Math.random() * 20 + 30, // 30s to 50s for a full cycle
                delay: Math.random() * -40,        // Start with a negative delay so clouds already exist
            });
        }
        return particles;
    };

    const [smokeParticles] = useState(() => generateParticles(20));

    return (
        <div className="smoke-container">
            {smokeParticles.map((particle) => (
                <div 
                    key={particle.id}
                    className="smoke-particle"
                    style={{
                        // Apply the unique, dynamic properties
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        top: `${particle.top}%`,
                        left: `${particle.left}%`,
                        animationDuration: `${particle.duration}s`,
                        animationDelay: `${particle.delay}s`,
                        animationTimingFunction: particle.id % 2 === 0 ? 'ease-in-out' : 'linear'
                    }}
                />
            ))}
        </div>
    );
};

export default Background;