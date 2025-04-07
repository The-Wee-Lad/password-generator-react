import { useState } from 'react'
import './App.css'

const minLength = 8, maxLength = 50;
const collection = {
  Characters: "qwertyuiopasdfghjklzmxncbv",
  Numbers: "1234567890",
  Symbols: " ~!@#$%^&*()_+`{}|:\"<>?,./;'[]`"
}


function App() {
  document.body.style.backgroundColor = "#222222";
  const [disableSlider, setDisableSlider] = useState(false);
  const checkboxGenerator = (element) => {
    return (<div className='flex items-center space-x-2'
      key={element}
      >
      <input className='h-4 w-4 accent-black border-2 
      border-black rounded-sm cursor-pointer'
        checked={parameters[element] ?? false}
        type="checkbox"
        name="parameters" id="characters"
        onChange={(e) => {
          console.log(parameters, "Status ", element, e.target.checked);
          console.log(Object.entries(parameters));
          console.log(Object.entries(parameters).filter(
            (ele) => (ele[0] != "256-Bit Random" && ele[1])));
          console.log(element && element == "256-Bit Random");

          if (element == "256-Bit Random") {
            setDisableSlider(e.target.checked);
            setParameters({
              ...(!e.target.checked ? defaultSetting : {}),
              [element]: (e.target.checked)
            });
            return;
          } else if (element != "256-Bit Random" && parameters["256-Bit Random"]) {
            return;
          }
          else if (!(e.target.checked) &&
            Object.entries(parameters).filter((ele) => (ele[0] != "256-Bit Random" && ele[1])).length <= 2
          )
            return;
          setParameters({ ...parameters, [element]: (e.target.checked) });
        }} />
      <label className="font-medium cursor-pointer select-none" htmlFor="characters">{element}</label>
    </div>);
  }
  const passwordGenerator = ()=>{
    let options = parameters;
    let poolString = "";
    let password = "";
    if (options["256-Bit Random"]) {
      password = crypto.getRandomValues(new Uint8Array(32)).reduce((s, b) => s + b.toString(16).padStart(2, '0'), '');
    } else {
      for (const key in options) {
        if (options[key]) {
          poolString += collection[key];
        }
      }
      for (let i = 0; i < length; i++) {
        password += poolString[((min, max) => Math.floor(Math.random() * (max - min)) + min)(0, poolString.length)];
      }
    }
    console.log(password, poolString);
    return password;
  }
  const [length, setLength] = useState(minLength);
  const defaultSetting = { Characters: true, Numbers: true };
  const [parameters, setParameters] = useState(defaultSetting);
  const [password, setPassword] = useState(passwordGenerator());
  
  return (
    <div className='m-auto text-center mt-20 min-[688px]:w-[75%] min-[860px]:w-[60%] xl:w-[42%]  min-[1029px]:w-[50%] bg-[white] p-2 border-2 border-gray-500 flex flex-col items-center gap-2'>
      <h1 className='text-2xl font-bold text-center'>Password Generator</h1>
      <div className='flex flex-row w-full'>
        <div className='border-1 p-1 w-[80%] font-mono overflow-auto'>
          {password}
        </div>
        <div className='bg-blue-500 border border-blue-500 p-1 w-[20%] text-center text-bol hover:bg-black hover:text-white hover:border-black font-medium text-lg'>Copy</div>
      </div>
      <div className='flex flex-row max-[514px]:flex-col max-[514px]:w-65 max-[514px]:items-center max-[514px]:justify-center border 
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
          bg-red-400 hover:bg-gray-500 hover:text-white 
          text-lg h-full font-medium hover max-[514px]:h-[2.5rem]'
          onClick={()=>{setPassword( passwordGenerator())}}
          >
            Generate New One
          </div>
        </div>

        <div className='bg-blue-200 p-1 max-[514px]:w-full w-fit'>
          {["Characters", "Numbers", "Symbols"].map(checkboxGenerator)}
        </div>

        <div className='bg-red-200 p-1 max-[514px]:w-full w-fit'>
          {checkboxGenerator("256-Bit Random")}
        </div>
      </div>
    </div>
  )
}

export default App