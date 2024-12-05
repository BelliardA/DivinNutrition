import { useState } from 'react';
import { GlassWater } from 'lucide-react'; // Keep the filled glass from lucide-react
import "../style/Water.css";

interface WaterProps {
    totalWater: number;
    setTotalWater: (totalWater: number) => void;
  }

const EmptyGlass = () => (
  <svg width="32" height="32" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.8429 28H11.1571C10.484 28.0036 9.83355 27.7646 9.33198 27.3293C8.8304 26.8941 8.51352 26.2937 8.44286 25.6447L6 3H25L22.5436 25.6447C22.4731 26.2914 22.1582 26.89 21.6595 27.3249C21.1608 27.7598 20.5136 28.0003 19.8429 28Z" stroke="black" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
);

function Water({ totalWater, setTotalWater }: WaterProps) {
  const [glasses, setGlasses] = useState(Array(10).fill(false)); // false means empty, true means full
   // Track total water consumption in cl

  // Handle the click event to toggle the glass's state and fill/empty previous glasses
  const handleClick = (index: number) => {
    const updatedGlasses = [...glasses];
    let newTotalWater = totalWater;

    if (updatedGlasses[index]) {
      // If the clicked glass is full, empty it and all subsequent glasses
      for (let i = index; i < updatedGlasses.length; i++) {
        if (updatedGlasses[i]) newTotalWater -= 25; // Subtract 25cl from total water if a glass is emptied
        updatedGlasses[i] = false;
      }
    } else {
      // If the clicked glass is empty, fill it and all previous glasses
      for (let i = 0; i <= index; i++) {
        if (!updatedGlasses[i]) newTotalWater += 25; // Add 25cl to total water if a glass is filled
        updatedGlasses[i] = true;
      }
    }

    setGlasses(updatedGlasses); // Update the state of glasses
    setTotalWater(newTotalWater); // Update the total water consumption
  };

  return (
    <div className="conso-water">
      {glasses.map((isFull, index) => (
        <div key={index} onClick={() => handleClick(index)} className={isFull ? "glass-animation" : "glass-empty-animation"}>
          {isFull ? (
            <GlassWater size={32} />
          ) : (
            <EmptyGlass /> // Use the custom EmptyGlass SVG here
          )}
        </div>
      ))}
    </div>
  );
}

export default Water;