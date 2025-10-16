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

  const handleChoice = (choice) => {
    const computer = choices[Math.floor(Math.random() * choices.length)].name;
    const outcome = getResult(choice, computer);
    setPlayerChoice(choice);
    setComputerChoice(computer);
    setResult(outcome);

    if (outcome === 'Win 🎉') setPlayerScore(s => s + 1);
    if (outcome === 'Lose 😢') setComputerScore(s => s + 1);
  };

  const resetRound = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-fuchsia-600 via-pink-500 to-orange-400">
      <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md flex flex-col items-center border border-white/30">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-8 text-center drop-shadow-lg">
          Rock Paper Scissors Game 🎮
        </h1>
        <div className="flex gap-6 mb-6">
          {choices.map(({ name, emoji }) => (
            <button
              key={name}
              className="bg-white/80 rounded-full px-6 py-4 text-2xl font-bold shadow-lg transition-all hover:scale-110 hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              onClick={() => handleChoice(name)}
              disabled={!!result}
            >
              {emoji}
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
        {result && (
          <div className={`mt-4 text-2xl font-bold ${
            result === 'Win 🎉'
              ? 'text-green-400'
              : result === 'Lose 😢'
              ? 'text-red-400'
              : 'text-yellow-300'
          } drop-shadow-lg animate-pulse`}>
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
          disabled={!result}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}