// src/components/Game.jsx
import React, { useState } from 'react';

const choices = [
  { name: 'Rock', emoji: '🪨' },
  { name: 'Paper', emoji: '📄' },
  { name: 'Scissors', emoji: '✂️' },
];

function getResult(player, computer) {
  if (player === computer) return 'Draw 😐';
  if (
    (player === 'Rock' && computer === 'Scissors') ||
    (player === 'Paper' && computer === 'Rock') ||
    (player === 'Scissors' && computer === 'Paper')
  ) return 'Win 🎉';
  return 'Lose 😢';
}

export default function Game() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const handleChoice = (choice) => {
    if (gameOver || round > 5) return;
    const computer = choices[Math.floor(Math.random() * choices.length)].name;
    const outcome = getResult(choice, computer);
    setPlayerChoice(choice);
    setComputerChoice(computer);
    setResult(outcome);

    if (outcome === 'Win 🎉') setPlayerScore(s => s + 1);
    if (outcome === 'Lose 😢') setComputerScore(s => s + 1);

    setTimeout(() => {
      setRound(r => {
        if (r === 5) {
          setGameOver(true);
        }
        return r + 1;
      });
    }, 500);
  };

  const resetRound = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
  };

  const restartGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
    setPlayerScore(0);
    setComputerScore(0);
    setRound(1);
    setGameOver(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-fuchsia-600 via-pink-500 to-orange-400">
      <div className="bg-gradient-to-br from-purple-900 via-pink-700 to-orange-500 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center border-4 border-white/40">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 text-center drop-shadow-lg tracking-wide">
          Scissors Paper Rock Game 🎮
        </h1>
        <div className="flex gap-6 mb-6">
          {choices.map(({ name, emoji }) => (
            <button
              key={name}
              className="bg-white rounded-full w-20 h-20 flex items-center justify-center text-4xl font-bold shadow-lg transition-all hover:scale-110 hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              onClick={() => handleChoice(name)}
              disabled={!!result || gameOver || round > 5}
              style={{ boxShadow: "0 0 0 4px rgba(255,255,255,0.5)" }}
            >
              <span className="flex items-center justify-center w-full h-full">{emoji}</span>
            </button>
          ))}
        </div>
        <div className="flex justify-between w-full mb-4 px-2">
          <div className="text-lg font-semibold text-pink-100">
            Player: <span className="font-bold text-white">{playerScore}</span>
          </div>
          <div className="text-lg font-semibold text-orange-100">
            Computer: <span className="font-bold text-white">{computerScore}</span>
          </div>
        </div>
        <div className="text-lg text-white mb-2">Round: {Math.min(round, 5)} / 5</div>
        {gameOver ? (
          <div className="mt-6 text-2xl font-bold text-white drop-shadow-lg">
            {playerScore > computerScore
              ? "You win the game! 🏆"
              : playerScore < computerScore
              ? "You lose the game! 😭"
              : "It's a draw! 🤝"}
          </div>
        ) : (
          <>
            {result && (
              <div
                className={`mt-4 text-3xl font-extrabold px-6 py-3 rounded-xl shadow-lg drop-shadow-lg animate-pulse ${
                  result === 'Win 🎉'
                    ? 'bg-green-600 text-white border-2 border-green-300'
                    : result === 'Lose 😢'
                    ? 'bg-red-600 text-white border-2 border-red-300'
                    : 'bg-yellow-400 text-gray-900 border-2 border-yellow-200'
                }`}
              >
                {result}
              </div>
            )}
            {playerChoice && computerChoice && (
              <div className="flex gap-8 mt-4">
                <div className="flex flex-col items-center">
                  <span className="text-3xl">{choices.find(c => c.name === playerChoice).emoji}</span>
                  <span className="text-lg text-pink-200">You</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl">{choices.find(c => c.name === computerChoice).emoji}</span>
                  <span className="text-lg text-orange-200">Computer</span>
                </div>
              </div>
            )}
            <button
              className="mt-8 bg-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-pink-600 shadow-lg transition-all"
              onClick={resetRound}
              disabled={!result || gameOver || round > 5}
            >
              Next Round
            </button>
          </>
        )}
        {gameOver && (
          <button
            className="mt-8 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 shadow-lg transition-all"
            onClick={restartGame}
          >
            Restart Game
          </button>
        )}
      </div>
    </div>
  );
}