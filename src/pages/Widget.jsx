import { useEffect, useState } from 'react';

const Widget = () => {
  const words = ['work', 'walk', 'drink', 'eat', 'run'];
  const [word, setWord] = useState('');

  const pickRandom = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
  };

  useEffect(() => {
    pickRandom();
    const interval = setInterval(pickRandom, 1 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Hello World!</h2>
      <p>Random word:</p>
      <strong>{word}</strong>
    </div>
  );
};

export default Widget;
