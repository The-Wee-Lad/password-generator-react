
function Checkbox({type,element,children,checked,onChange,disabled}) {
    let checkbox = 
    (<div className='flex items-center space-x-2'>
        <input className='h-4 w-4 accent-black border-2 border-black rounded-sm cursor-pointer '
            checked={checked}
            type="checkbox"
            name={type} id={element}
            onChange={onChange}
            disabled={disabled}
        />
        <label className="font-medium cursor-pointer select-none font-[cinzel] font-semibold" htmlFor={type}>{children}</label>
    </div>);
    return checkbox;
}

export default Checkbox; 