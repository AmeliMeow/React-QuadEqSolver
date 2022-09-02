import './App.css';
import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

function App() {

  // seperate states for input 
  const [input, setInput] = useState({
    a: 0.5,
    b: -2.5,
    c: 2
  });

  // and output (because use effect will run in infinite loop)
  const [output, setOutput] = useState({
    x: [],
    d: 0,
    data: {
      x: [],
      y: []
    }
  });

  useEffect(() => {
    const x = []
    const y = []
    const d = Math.pow(input.b,2) - 4 * input.a * input.c;
    let xres = [];
    if (d > 0){
      xres.push((-input.b+Math.sqrt(d))/(input.a*2))
      xres.push((-input.b-Math.sqrt(d))/(input.a*2))
    }
    else if (d === 0){
      xres = [-input.b/input.a*2]
    }


    // add these values into the plot
    x.concat(xres)
    y.concat(xres.flatMap(() => 0))

    // plot it
    for (let i = -5; i <= 5; i = i + 0.1){
      x.push(i)
      let yt = (input.a * Math.pow(i,2)) + (input.b * i) + input.c;
      y.push(yt)
    }

    setOutput({x: xres, d: d, data: {x: x, y: y}})
  }, [input])

  const onchange = (ev) => {
    setInput({...input, [ev.target.id]: Number(ev.target.value)})
  }

  const fixSign = (i) => {
    return i >= 0 ? '+ ' + i : '- ' + Math.abs(i);
  }

  return (
    <div className='container-sm mx-auto px-10 pt-3'>
      <h1 className='text-2xl font-bold text-center'>Quadratic equation solver</h1>
      <p className='text-center italic mx-auto pb-5'>but in React...</p>
      <div className='flex flex-row mx-auto w-fit'>
        <p>
          <input id='a' type={'number'} value={input.a} step='0.1' className='w-10 border border-black rounded text-center' onChange={onchange}/>x<sup>2</sup> + 
          <input id='b' type={'number'} value={input.b} step='0.1' className='w-10 border border-black rounded text-center' onChange={onchange}/> x + 
          <input id='c' type={'number'} value={input.c} step='0.1' className='w-10 border border-black rounded text-center' onChange={onchange}/> = 0
        </p>
      </div>
      <div className='mx-auto w-fit pb-5'>
        <span>D = {output.d}; x<sub>1</sub> = {output.x[0] != null ? output.x[0] : '∅' }; x<sub>2</sub> = {output.x[1] != null ? output.x[1] : '∅' };</span>
      </div>
      <div className='mx-auto w-fit flex flex-col justify-center border border-black'>
        <Plot
        data={[
          {
            x: output.data.x,
            y: output.data.y,
            type: 'scatter',
            mode: 'lines',
            line: { 
              shape: 'spline',
              color: 'red'
            }
          }]}
          layout={ {width: 800, height: 640, title: `${input.a}x² ${fixSign(input.b)} x ${fixSign(input.c)} = y`} } />
      </div>
    </div>
  );
}

export default App;
