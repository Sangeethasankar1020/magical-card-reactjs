import React, { useState } from 'react';
import './index.css'; // Import Tailwind CSS

const App = () => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const [cardNumbers, setCardNumbers] = useState(Array(9).fill(null));
  const [isIncreasing, setIsIncreasing] = useState(true);
  const [clickCount, setClickCount] = useState(0);

  const handleCardClick = (index) => {
    let newNumbers = [...cardNumbers];
    newNumbers[index] = currentNumber;

    setClickCount(clickCount + 1);

    if (clickCount === 8) {
      let i = 8;
      let count = currentNumber;
      const intervalId = setInterval(() => {
        if (count > 0) {
          const cardIndex = newNumbers.indexOf(count);
          newNumbers[cardIndex] = null;
          setCardNumbers([...newNumbers]);
          count--;
        } else {
          clearInterval(intervalId);
          setCurrentNumber(1);
          setIsIncreasing(true);
          setClickCount(0);
        }
      }, 2000); // 2-second interval
    } else {
      if (isIncreasing) {
        if (currentNumber < 9) {
          setCurrentNumber(currentNumber + 1);
        } else {
          setIsIncreasing(false);
          setCurrentNumber(currentNumber - 1);
        }
      } else {
        if (currentNumber > 1) {
          setCurrentNumber(currentNumber - 1);
        } else {
          setIsIncreasing(true);
          setCurrentNumber(currentNumber + 1);
        }
      }
    }

    setCardNumbers(newNumbers);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {cardNumbers.map((number, index) => (
        <div
          key={index}
          className="border p-4 text-center cursor-pointer"
          onClick={() => handleCardClick(index)}
        >
          {number !== null ? number : ""}
        </div>
      ))}
    </div>
  );
};

export default App;
