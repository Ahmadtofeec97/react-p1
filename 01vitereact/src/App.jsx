import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'
function App() {
const [length, setLength] = useState(8)
const [numAllowed, setNumAllowed] = useState(false)
const [charAllowed, setCharAllowed] = useState(false)
const [password, setPassword] = useState("")

//useRef hook 
const passwordRef = useRef(null)
const passwordGenerator = useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if (numAllowed) str+="0123456789"
  if (charAllowed) str+="!@#$%^&*_+"
  for(let i=1; i<= length; i++){
    let char = Math.floor(Math.random()*str.length+1)
    pass +=str.charAt(char) 
  }
  setPassword(pass)

}, [length, numAllowed, charAllowed, setPassword])

useEffect(()=>{
  passwordGenerator()
},[length, numAllowed, charAllowed, passwordGenerator])

const copyPassToClipboard= useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,3);
  window.navigator.clipboard.writeText(password)
}, [password])

  return (
    <>
    <div className='w-full text-center m-8 bg-white'>
      <h1>Password Generator</h1>
      <div className='className="flex shadow rounded-lg overflow-hidden mb-4"' >
        <input
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly 
        ref={passwordRef}
        />
        <button 
        onClick={copyPassToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min = {6} 
          max = {50}
          value={length}
          onChange={(e) => {setLength(e.target.value)}}
          
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center ">
          <input 
          type="checkbox"
          defaultChecked= {numAllowed}
          id="numberInput"
          onChange={() => {
            setNumAllowed((prev) => !prev)
          }}
          />
        </div>
        <label htmlFor="numberInput">Number</label> 
      </div>
       <div className="flex items-center ">
          <input 
          type="checkbox"
          defaultChecked= {charAllowed}
          id="characterInput"
          onChange={() => {
            setCharAllowed((prev) => !prev)
          }}
          />
        </div>
        <label htmlFor="characterInput">Characters</label> 
    </div>
    </>
  )
}

export default App
