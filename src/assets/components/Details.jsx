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
            <label className="text-black font-bold mb-2 flex items-center mt-5">
                Description
                <span
                    className="ml-2 text-blue cursor-pointer-relative"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                i
                {showTooltip && (
                    <div className="absolute top-6 left-0 bg-grey-dark text-white text-xs rounded px-2 py-1">
                        TOOLTIP HERE
                    </div>
                )}
                </span>
            </label>
            <div className="border border-grey rounded-lg p-2 flex flex-wrap items-center focus-within:border-blue">
            <input
                type="text"
                value={descriptionValue}
                onChange={handleDescriptionChange}
                placeholder="Enter a short description of your project"
                className="flex-grow p-2 border-none outline-none"
                />
        </div>
        </div>
    );
};

export default Details;