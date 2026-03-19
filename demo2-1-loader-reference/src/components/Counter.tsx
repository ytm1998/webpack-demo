import React, { useState } from 'react';
import './Counter.scss';

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <span className="counter-value">计数: {count}</span>
      <div className="counter-buttons">
        <button onClick={() => setCount(c => c - 1)} className="btn btn-dec">-</button>
        <button onClick={() => setCount(0)} className="btn btn-reset">重置</button>
        <button onClick={() => setCount(c => c + 1)} className="btn btn-inc">+</button>
      </div>
    </div>
  );
};
