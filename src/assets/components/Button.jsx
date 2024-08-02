import React from "react";

const Button = ({children, onClick, className = '', type = 'button'}) => {
    return (
        <button
            type = {type}
            onClick = {onClick}
            className = {'px-4 py-2 rounded bg-grey-dark text-white hover:bg-grey focus:outline-none ${className}'}
        >
            {children}
        </button>
    );
};

export default Button;