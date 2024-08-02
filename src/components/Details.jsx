import { useState } from "react";

const Details = () => {
    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [showTooltip, setShowTooltip] = useState(false);

    const handleTitleChange = (e) => {
        setTitleValue(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescriptionValue(e.target.value);
    }

    return (
        <div className="container mx-auto mt-10 p-4">
            <label className="text-black font-bold mb-2 flex items-center">Project Title</label>
            <div className="border border-grey rounded-lg p-2 flex flex-wrap items-center focus-within:border-blue mt-5">
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={titleValue}
                    onChange={handleTitleChange}
                    placeholder="Enter your project title"
                    className="flex-grow p-2 border-none outline-none"
                />
            </div>
            <div>
                <label className="text-black font-bold mb-2 flex items-center mt-5">
                    Description
                    <span
                        className="ml-2 text-blue cursor-pointer-relative"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8H12.01M12 11V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                            />
                        </svg>
                        {showTooltip && (
                            <div className="absolute bg-grey-dark text-white text-xs rounded px-2 py-1 z-50">
                                This is a lengthy test string tooltip for the description in order to test the textbox wrapping and size. I am extending this test string until the end of the page to see if it fits or if it wraps.
                            </div>
                        )}
                    </span>
                </label>
                <div className="border border-grey rounded-lg p-2 flex flex-wrap items-center focus-within:border-blue mt-5">
                    <input
                        type="text"
                        value={descriptionValue}
                        onChange={handleDescriptionChange}
                        placeholder="Enter a short description of your project"
                        className="flex-grow p-2 border-none outline-none"
                    />
                </div>
            </div>
        </div>
    );
};

export default Details;