import { useState } from 'react';
import SubmitButton from './FuncSubmitButton';
import { redirect, useLoaderData } from 'react-router-dom';
import { updateProject } from '../projects';

export async function action({ request, params }) {
    const formData = await request.formData();
    console.log(formData);
    const updates = Object.fromEntries(formData);
    await updateProject(params.projectId, updates);
    return redirect(`backlog/${params.projectId}/`)
}

const QAForm = () => {
    const { project } = useLoaderData();
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const questionsPayload = {
            "questiondata":"answerdata"
        }
    updateProject(project.id, questionsPayload);    
    try {
        const response = await fetch("endpointurl",{
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionsPayload),
        });
        if (response.ok) {
            const data = await response.json();
            const stories = data.map(item => item.story);
            setResponseMessage('Success: ${data}');
        } else {
            setResponseMessage('Error: Failed to submit');
        }
    } catch (error) {
        setResponseMessage('Error: Network issue connecting to API');
    }

    return (
        <>
        <form onSubmit={handleSubmit} className="w-full h-full p-6 bg-red-50">
            {responseMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{responseMessage}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3"/>
            </div>}
        {/* iterator for questions and answers text boxes here */}
        </form>
        </>
    )
}
}


export default QAForm;