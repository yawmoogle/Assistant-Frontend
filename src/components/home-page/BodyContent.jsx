import React, { useState } from "react";
import Footer from "./Footer";

const BodyContent = () => {

    return(
        <>
            <div className='App w-full items-center flex justify-center bg-red-50 '>
                <div className="container mx-auto w-auto h-96">
                    <h1 className="text-center text-black font-bold">GenAI Project Name</h1>
                    <p className="text-center text-black">Your Everyday AI Assistant</p>
                </div>
            </div>
        </>
    );
};

export default BodyContent;