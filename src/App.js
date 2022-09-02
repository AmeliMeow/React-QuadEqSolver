import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  
  const a = useRef()
  const b = useRef()
  const c = useRef()

  const [results, setResults] = useState({
    x: [],
    d: 0
  });

  useEffect(() => {
    onchange() // calculate with default values on mount
  }, [])

  const onchange = () => {
    const consts = {
      a: Number(a.current.value),
      b: Number(b.current.value),
      c: Number(c.current.value)
    }
    const d = Math.pow(consts.b,2) - 4 * consts.a * consts.c;
    let x = [];
    if (d > 0){
      x.push((-consts.b+Math.sqrt(d))/(consts.a*2))
      x.push((-consts.b-Math.sqrt(d))/(consts.a*2))
    }
    else if (d === 0){
      x = [-consts.b/consts.a*2]
    }
    setResults({x: x, d: d})
  }

  return (
    <div className='container-sm mx-auto px-10 pt-3'>
      <h1 className='text-2xl font-bold text-center'>Quadratic equation solver</h1>
      <p className='text-center italic mx-auto pb-5'>but in React...</p>
      <div className='flex flex-row mx-auto w-fit'>
        <p>
          <input type={'number'} defaultValue={0.5} className='w-10 border border-black rounded text-center' onChange={onchange} ref={a}/>x<sup>2</sup> + 
          <input type={'number'} defaultValue={-2.5} className='w-10 border border-black rounded text-center' onChange={onchange} ref={b}/> x + 
          <input type={'number'} defaultValue={2} className='w-10 border border-black rounded text-center' onChange={onchange} ref={c}/> = 0
        </p>
      </div>
      <div className='mx-auto w-fit'>
        <span>D = {results.d}; x<sub>1</sub> = {results.x[0] != null ? results.x[0] : '∅' }; x<sub>2</sub> = {results.x[1] != null ? results.x[1] : '∅' };</span>
      </div>
    </div>
  );
}

export default App;
