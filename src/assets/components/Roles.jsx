import { useState } from "react";
import Button from "../components/Button";

const Roles = () => {
    //Store input roles from text box and store information into array for pill display
    const [roleValue, setRoleValue] = useState('');
    const[rolePills, setRolePills] = useState([]);

    //Track textbox input changes
    const handleChange = (e) => {
        setRoleValue(e.target.value);
    };

    //Setup Enter key to trigger pill creation
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && roleValue.trim() !== '') {
            setRolePills([...rolePills, roleValue.trim()]);
            setRoleValue('');
        }
    };

    //Function to remove a pill
    const removePill = (index) => {
        setRolePills(rolePills.filter((_,i) => i !== index));
    };

    return (
        <div className="container w-full mt-10 p-4">
            <div className="border border-grey rounded-lg p-2 flex flex-wrap items-center focus-within:border-blue">
                <div className="flex flex-wrap items-center">
                {rolePills.map((pill,index) => (
                    <div
                    key={index}
                    className="bg-red-50 text-black border border-black flex items-center rounded-full px-3 py-1 mr-1 mb-1">
                        {pill}
                        <span
                        onClick={() => removePill(index)}
                        className="m1-2 cursor-pointer">
                            &times;
                        </span>
                    </div>
                ))}
                <input
                    type="text"
                    value={roleValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter your desired user roles and press Enter"
                    className="flex-grow p-2 border-none outline-none min-w-[150px] w-5/6"
                >
                </input>
            </div>
            </div>
        </div>
    );
};

export default Roles;