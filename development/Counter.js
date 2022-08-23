import { useState } from "react";
import { createRoot } from "react-dom/client";

export default function Counter() {
  const [times, setTimes] = useState(0);
  return (
    <>
      <h2>{times} times clicked</h2>
      <button onClick={() => setTimes((prevTimes) => prevTimes + 1)}>
        Add 1
      </button>
    </>
  );
}
