import { useCallback, useEffect, useRef, useState } from 'react'
import Checkbox from './Checkbox.jsx';
import TextArea from './TextArea.jsx'
import Notification from './Notification.jsx';

document.body.style.backgroundColor = "#222222";
const minLength = 8, maxLength = 50, leastCheck = 1;
const collection = {
  LCharacters: "qwertyuiopasdfghjklzmxncbv",
  UCharacters: "QWERTYUIOPASDFGHJKLZXCVBNM",
  Numbers: "1234567890",
  Symbols: " ~!@#$%^&*()_+`{}|:\"<>?,./;'[]`"
}
const map = {
  "LCharacters": "Lower Case",
  "UCharacters": "Upper Case",
  "Numbers": "Numbers",
  "Symbols": "Symbols",
  "random": "256-Bit-Random"
}
const defaultSetting = { LCharacters: true, Numbers: true, UCharacters:true };


function App() {
  const [disableSlider, setDisableSlider] = useState(false);
  const [length, setLength] = useState(minLength);
  const [parameters, setParameters] = useState(defaultSetting);
  const [password, setPassword] = useState(null);
  const textArea = useRef(null);
  const [copied, showCopied] = useState(false);
  const passwordGenerator = useCallback(() => {
    let options = parameters;
    let poolString = "";
    let password = "";
    if (options["random"])
      password = crypto.getRandomValues(new Uint8Array(32)).reduce((s, b) => s + b.toString(16).padStart(2, '0'), '');
    else {
      for (const key in options)
        if (options[key])
          poolString += collection[key];
      for (let i = 0; i < (length < 8 ? 8 : length); i++)
        password += poolString[((min, max) => Math.floor(Math.random() * (max - min)) + min)(0, poolString.length)];
    }
    setPassword(password);
  }, [parameters, length, setPassword]);
  useEffect(passwordGenerator, [parameters, length, passwordGenerator]);
  return (
    <div className='m-auto text-center mt-20 min-[688px]:w-[75%] min-[860px]:w-[60%] xl:w-[42%]  min-[1029px]:w-[50%] bg-[white] p-2 border-2 border-gray-500 flex flex-col items-center gap-2'>
      {copied && <Notification/>}
      <h1 className='text-4xl font-bold text-center' style={{ fontFamily: "'Staatliches', sans-serif" }}>Password Generator</h1>
      <TextArea
        password={password}
        textArea={textArea}
        copy={() => {
          window.navigator.clipboard.writeText(password);
          textArea.current.select()
          console.log(textArea);
          showCopied(true);
          setTimeout(() => {
            showCopied(false);
          }, 3000);
        }} />
      <div className='flex border-collapse flex-row max-[514px]:flex-col max-[514px]:w-65 max-[514px]:items-center max-[514px]:justify-center border 
      xl:gap-4 items-start w-full'>
        <div className='flex flex-col w-[45%] max-[514px]:self-auto max-[514px]:w-full self-stretch max-[514px]:order-3 '>
          <div className='flex flex-row gap-2 justify-center items-center bg-amber-300 w-full '>
            <input type="range" max={maxLength} min={minLength} placeholder='8' value={length} name="slider" id="slider"
              className="
                  h-2 appearance-none bg-blue-500 ml-1
                  disabled:bg-gray-500
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-2
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:bg-black
                  [&::-webkit-slider-thumb]:border
                  [&::-webkit-slider-thumb]:border-black
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:rounded-none
                "
              disabled={disableSlider}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <input type="text" name="" id=""
              className='p-1 font-medium border text-center w-20 outline-0 m-1 disabled:text-gray-500'
              value={length}
              disabled={disableSlider}
              onChange={(e) => {
                let n = e.target.value;
                n = n > maxLength ? maxLength : n
                if (isNaN(n))
                  return;
                setLength(n);
                passwordGenerator();
              }}
            />
          </div>
          <div className='flex flex-row justify-center items-center
          bg-red-400 hover:bg-gray-800 hover:text-white 
          text-lg h-full font-medium hover max-[514px]:h-[2.5rem]
          font-[cinzel] font-semibold'
            onClick={() => {
              passwordGenerator();
            }}>
            Generate New One
          </div>
        </div>

        <div className='bg-blue-300 p-1 w-full min-[514px]:border-x-1'>
          {["LCharacters", "UCharacters", "Numbers", "Symbols"].map((element) => {
            return <Checkbox key={element} type={element}
              element={element} checked={parameters[element] ?? false}
              disabled={disableSlider}
              onChange={(e) => {
                if (!(e.target.checked) && (Object.entries(parameters).filter((ele) => (ele[1])).length <= leastCheck))
                  return;
                setParameters({ ...parameters, [element]: (e.target.checked) });
              }}>{map[element]}</Checkbox>
          })}
        </div>

        <div className='bg-pink-300 p-1 max-[514px]:w-full w-full border-b-1   min-[514px]:border-x-1' >
          <Checkbox key={"random"} type={"random"}
            element={"random"} checked={disableSlider}
            onChange={(e) => {
              setDisableSlider(prev => (!prev));
              setParameters({ ...parameters, ["random"]: (e.target.checked) });
            }}>
            {map["random"]}
          </Checkbox>
        </div>
      </div>
    </div >
  )
}

export default App