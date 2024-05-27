import { useState, useEffect } from "react";
import Header from "../components/Header";
import Dice from "../components/Dice";
import Confetti from "react-confetti";

function App() {
  const [numRolls, setNumRolls] = useState(0);
  const [gameWon, setGameWon] = useState(() => false);
  const [bestScore, setBestScore] = useState(
    () => JSON.parse(localStorage.getItem("tenziesRolls")) || 0
  );
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

  useEffect(() => {
    const allFixed = diceBoard.every((die) => die.fixed);
    const firstDiceVal = diceBoard[0].value;
    const allSame = diceBoard.every((die) => die.value === firstDiceVal);
    setGameWon(allFixed && allSame);
  }, [diceBoard]);

  useEffect(() => {
    if (gameWon) {
      if (bestScore === 0 || numRolls < bestScore) {
        localStorage.setItem("tenziesRolls", numRolls);
        setBestScore(numRolls);
      }
    }
  }, [gameWon]);

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
    setNumRolls(0);
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
    setNumRolls((prev) => prev + 1);
  }

  return (
    <>
      <div className="container">
        {gameWon && <Confetti />}
        <Header></Header>
        <main>
          <article className="tenzies-info">
            <h3>Rolls: {numRolls}</h3>
            <h3>Time: 0.00s</h3>
          </article>
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
          <footer>
            <h5 className="tenzies-corner">Best Score: {bestScore}</h5>
          </footer>
        </main>
      </div>
    </>
  );
}

export default App;
