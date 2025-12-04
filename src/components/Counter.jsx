import { useState } from 'react';
import './Counter.css';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div className="counter-component">
      <h2>Счетчик: {count}</h2>
      <div className="counter-buttons">
        <button onClick={decrement} className="decrement-btn">-1</button>
        <button onClick={reset} className="reset-btn">Сбросить</button>
        <button onClick={increment} className="increment-btn">+1</button>
      </div>
      <p>Текущее значение: <strong>{count}</strong></p>
    </div>
  );
}

export default Counter;