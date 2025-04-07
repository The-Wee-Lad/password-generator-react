function Notification({retention}) {
    return (
        <div
            className="fixed left-1/2 top-0 -translate-x-1/2 mt-4 bg-green-300 text-black px-3 py-1 rounded shadow-md transition-all duration-500 ease-in-out"
            style={{ animation: `fadeSlide ${retention/1000}s ease-in-out forwards` }}
        >
            Copied to Clipboard!
        </div>
    )
}

export default Notification