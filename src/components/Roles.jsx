import PropTypes from 'prop-types';

const Roles = ({roleValue, rolePills, handleRoleChange, handleRoleEntry, handleRoleRemove}) => {

    return (
        <div className="container w-full mt-10 p-4">
            <div className="border border-grey rounded-lg p-2 flex flex-wrap items-center focus-within:border-blue">
                <div className="flex flex-wrap items-center">
                {rolePills.map((pill,index) => (
                    <div
                    key={index}
                    className="bg-slate-50 text-black border border-black flex items-center rounded-full px-3 py-1 mr-1 mb-1">
                        {pill}
                        <span
                        onClick={() => handleRoleRemove(index)}
                        className="m1-2 cursor-pointer">
                            &times;
                        </span>
                    </div>
                ))}
                <input
                    type="text"
                    value={roleValue}
                    onChange={handleRoleChange}
                    onKeyDown={handleRoleEntry}
                    placeholder="Enter your desired user roles and press Enter"
                    className="flex-grow p-2 border-none outline-none min-w-[150px] w-5/6"
                >
                </input>
            </div>
            </div>
        </div>
    );
};
Roles.propTypes = {
    roleValue: PropTypes.string,
    rolePills: PropTypes.array,
    handleRoleChange: PropTypes.func,
    handleRoleEntry: PropTypes.func,
    handleRoleRemove: PropTypes.func
}

export default Roles;