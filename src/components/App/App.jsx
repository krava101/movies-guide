import { useState } from 'react'
//
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
//
import css from "./App.module.css";
import clsx from 'clsx';

const App = () =>{
  const [count, setCount] = useState(0);
  
  return (
    <>
      <div className={css.wrapper}>
        <a href="https://vitejs.dev">
          <img src={viteLogo} className={css.logo} alt="Vite logo" />
        </a>
        <a href="https://react.dev">
          <img src={reactLogo} className={clsx(css.logo, css.react)} alt="React logo" />
        </a>
      </div>
      <h1>Vite + React template</h1>
      <div className={css.card}>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App;