function TextArea({password,textArea,copy}) {
    return (
        <div className='flex flex-row w-full'>
            <input type='text'
                value={password}
                className='border-1 p-1 w-[80%] font-mono overflow-auto'
                readOnly
                ref={textArea} />
            <div className='bg-blue-400 border border-blue-500 p-1 w-[20%] text-center
            text-bol hover:bg-black
            hover:text-white hover:border-black font-medium text-lg
            font-[staatliches]'
                onClick={copy}
            >Copy</div>
        </div>
    )
}

export default TextArea