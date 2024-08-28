import { useState } from 'react';
import SubmitButton from './FuncSubmitButton';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { updateProject, getProject } from '../projects';

export async function action({ request, params }) {
    const formData = await request.formData();
    console.log(formData);
    const updates = Object.fromEntries(formData);
    await updateProject(params.projectId, updates);
    return redirect(`backlog/${params.projectId}/`)
}

export async function loader({ params }) {
    const project = await getProject(params.projectId);
    return { project };
}

const QAForm = () => {
    const { project } = useLoaderData();
    const navigate = useNavigate();
    const [answers, setAnswers] = useState(project.qaDetails.map(()=> ""));
    const [responseMessage, setResponseMessage] = useState('');

    const handleChange = (e, index) => {
        const newAnswers = [...answers];
        newAnswers[index] = e.target.value;
        setAnswers(newAnswers);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedProject = {
            ...project,
            clarificationQAs: project.clarificationQAs.map((question, index) => ({
                ...question,
                answer: answers[index]
            }))
        };
        await updateProject(project.id, updatedProject);
        console.log(project);
    try {
        const response = await fetch("http://localhost:8080/api/v1/user-stories",{
            method: "post",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            const userStories = {
                userStories: data
            }
            updateProject(project.id, userStories);
            setResponseMessage('Success: ${data}');
            return navigate(`/Assistant-Frontend/backlog/${project.id}`);
        } else {
            setResponseMessage('Error: Failed to submit');
        }
    } catch (error) {
        setResponseMessage('Error: Network issue connecting to API');
    }
    };

    return (
        <>
        <form onSubmit={handleSubmit} className="w-full h-full p-6 bg-red-50">
            {responseMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{responseMessage}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3"/>
            </div>}
        <div className="mt-10 text-black flex flex-col mb-2">
        {project.clarificationQAs.map((question,index) => (
            <div key={index} className="flex flex-col">
                <label className="text-black text-xl mt-5">
                    {question.question}
                </label>
                <input
                    type="text"
                    value={answers[index]}
                    onChange={(e) => handleChange(e, index)}
                    id={`answer-${index}`}
                    placeholder="Enter your answer to the above question"
                    className="bg-slate-50 flex-grow p-2 border-none outline-none mt-2"
                />
            </div>
        ))}
        <label className="text-black text-xl ml-5 mb-5">
            
        </label>
        </div>
        <SubmitButton />
        </form>
        </>
    )
}



export default QAForm;