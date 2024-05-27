import { useState, useEffect } from "react";
import Header from "../components/Header";
import Dice from "../components/Dice";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

function App() {
  const [numOfDice, setNumOfDice] = useState(10);
  const [diceBoard, setDiceBoard] = useState([
    { id: 0, fixed: false, value: Math.floor(Math.random() * 6) + 1 },
    { id: 1, fixed: false, value: Math.floor(Math.random() * 6) + 1 },
    { id: 2, fixed: false, value: Math.floor(Math.random() * 6) + 1 },
    { id: 3, fixed: false, value: Math.floor(Math.random() * 6) + 1 },
    { id: 4, fixed: false, value: Math.floor(Math.random() * 6) + 1 },
    { id: 5, fixed: false, value: Math.floor(Math.random() * 6) + 1 },
    { id: 6, fixed: false, value: Math.floor(Math.random() * 6) + 1 },
    { id: 7, fixed: false, value: Math.floor(Math.random() * 6) + 1 },
    { id: 8, fixed: false, value: Math.floor(Math.random() * 6) + 1 },
    { id: 9, fixed: false, value: Math.floor(Math.random() * 6) + 1 },
  ]);

  const [gameWon, setGameWon] = useState(() => false);
  const { width, height } = useWindowSize();
  const diceElements = diceBoard.map((dice) => {
    return (
      <Dice
        key={dice.id}
        id={dice.id}
        value={dice.value}
        fixed={dice.fixed}
        handleClick={toggleDice}
      />
    );
  });

  function toggleDice(id) {
    setDiceBoard((prevBoard) => {
      return prevBoard.map((dice) => {
        return dice.id === id ? { ...dice, fixed: !dice.fixed } : dice;
      });
    });
  }

  function rollDice() {
    // set a new dice board
    setDiceBoard((prevBoard) => {
      return prevBoard.map((dice) => {
        return !dice.fixed
          ? { ...dice, value: Math.floor(Math.random() * 6) + 1 }
          : dice;
      });
    });
  }

  useEffect(() => {
    // update gameWon status
    const allFixed = diceBoard.every((die) => die.fixed);
    const firstDiceVal = diceBoard[0].value;
    const allSame = diceBoard.every((die) => die.value === firstDiceVal);
    setGameWon(allFixed && allSame);
  }, [diceBoard]);

  function resetBoard() {
    setDiceBoard((prevBoard) => {
      return prevBoard.map((dice) => {
        return {
          ...dice,
          fixed: false,
          value: Math.floor(Math.random() * 6) + 1,
        };
      });
    });
    setGameWon(false);
  }

  return (
    <>
      <div className="container">
        {gameWon && <Confetti width={width} height={height} />}
        <Header></Header>
        <main>
          <article className="diceBoard">
            <div className="diceBoard__grid">{diceElements}</div>
            <div className="diceBoard__footer">
              {gameWon ? (
                <button className="diceBoard_btn" onClick={resetBoard}>
                  Reset
                </button>
              ) : (
                <button className="diceBoard_btn" onClick={rollDice}>
                  Roll
                </button>
              )}
            </div>
          </article>
        </main>
      </div>
    </>
  );
}

export default App;
