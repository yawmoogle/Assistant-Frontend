import { useState } from 'react';
import SubmitButton from '../../../components/SubmitButton';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { updateProject, getProject } from '../../../projects';
import { Button, TextField } from '@mui/material';
import NavigationStepper from '../../../components/NavigationStepper';

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


    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState(project.clarification_qas||[]);
    const [answers, setAnswers] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [questionsValue, setQuestionsValue] = useState(5);
    const [activeStep, setActiveStep] = useState(1);

    const handleChange = (e, index) => {
        const newAnswers = [...answers];
        newAnswers[index] = e.target.value;
        setAnswers(newAnswers);
    }

    const handleInputChange = (e) => {
        setQuestionsValue(e.target.value);
    };

    const handleStepChange = (newStep) => {
        setActiveStep(newStep);
        switch (newStep) {
            case (0):
                navigate(`/backlog/${project.uri}/edit`);
                break;
            case (2):
                navigate(`/backlog/${project.uri}/`)
                break;
            default:
                break;
        }
    }

    //old implementation without restful
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const updatedProject = {
            ...project,
            clarification_qas: project.clarification_qas.map((question, index) => ({
                ...question,
                answer: answers[index]
            }))
        };
        const payload = updatedProject.clarification_qas;
        console.log(payload);
        await updateProject(project.uri, updatedProject);
    try {
        // new restful implementation
        const response = await fetch(`http://localhost:8080/api/v1/projects/${project.project_context_id}/questions:batch-update`,{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        // const response = await fetch(`http://localhost:8080/api/v1/user-stories`,{
        //     method: "post",
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(updatedProject),
        // });
        if (response.ok) {
            // new restful implementation
            try {
                const response = await fetch(`http://localhost:8080/api/v1/projects/${project.project_context_id}/user-stories`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedProject.config)
                })
                if (response.ok) {
                    const data = await response.json();
                    updatedProject.user_stories = data;
                    await updateProject(project.uri, updatedProject);
                    navigate(`/backlog/${project.uri}`);
                }
            } catch (error) {
                console.error('Error: Failed to update user stories', error);
                setResponseMessage('Error: Failed to update user stories');
            }
            return navigate(`/backlog/${project.uri}`);
            // const data = await response.json();
            // const userStories = {
            //     userStories: data
            // }
            // await updateProject(project.uri, userStories);
            // setResponseMessage('Success: ${data}');
            // return navigate(`/backlog/${project.uri}`);
        } else {
            setResponseMessage('Error: Failed to submit');
        }
    } catch (error) {
        setResponseMessage('Error: Network issue connecting to API');
    }
    setLoading(false);
    };

    const handleDelete = async (e,idx) => {
        e.preventDefault();
        const updatedQuestions = questions.filter((_, index) => index !== idx);
        const deletedQuestion = questions.filter((_, index) => index == idx);
        setQuestions(updatedQuestions);
        try {
            const response = await fetch(`http://localhost:8080/api/v1/projects/${project.project_context_id}/questions:batch-delete`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([deletedQuestion[0].clarification_qa_id])
            });
            if (response.ok) {
                setResponseMessage('Question deleted successfully');
            } 
        } catch (error) {
            setResponseMessage('Error deleting question from database');
        }
        const updatedProject = {...project, clarification_qas: updatedQuestions}
        await updateProject(project.uri, updatedProject)
    };

    const handleRegenerate = async (e) => {
        e.preventDefault();
        setLoading(true);
        const updatedProject = {
            ...project,
            config:{
                numOfQuestions: questionsValue
            }
        }
        console.log(updatedProject);
        await updateProject(project.uri, updatedProject);
        try {
            // TODO: switch to restful endpoints
            const response = await fetch('http://localhost:8080/api/v1/questions',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProject),
                });
            if (response.ok) {
                const data = await response.json();
                //concat new questions with selected old
                const updatedClarificationQuestions = project.clarificationQAs.concat(data);
                const clarificationQuestions = {
                    id: data[0].project_context_id,
                    clarificationQAs: updatedClarificationQuestions
                }
                setQuestions(updatedClarificationQuestions);
                await updateProject(project.uri, clarificationQuestions);
                navigate(`/backlog/${project.uri}/questions`)
            }
        } catch (error) {
            setResponseMessage('Error: Network issue connecting to API.');
        }
        setLoading(false);
    };

    return (
        <div id="questions" className="flex-grow h-full p-6 bg-orange-400 overflow-x-hidden">
        <div className="bg-white p-6">
        <NavigationStepper
            activeStep={activeStep}
            onChangeStep={handleStepChange}
        />
        <form onSubmit={handleSubmit} className="w-full h-full p-6 bg-slate-100">
            {responseMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-5 rounded relative" role="alert">
            <span className="block sm:inline">{responseMessage}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3"/>
            </div>}
        <div className="flex align-middle space-x-1">
        <TextField
            aria-label="Regenerate Questions"
            name="regenerate_questions"
            size="small"
            type="number"
            value={questionsValue}
            slotProps={{
                htmlInput : {min:1, max:50}
            }}
            onChange={handleInputChange}/>
        <Button onClick={(e) => handleRegenerate(e)} variant="outlined" color="primary" disabled={loading}>
            { loading ? "Regenerating": "Regenerate"} 
        </Button>
        </div>
        <div className="mt-10 text-black flex flex-col mb-2">

        {questions.map((question,index) => (
            <div key={index} className="bg-slate-300 text-black border-4 border-black mx-6 my-4 p-4 rounded-md flex flex-col justify-start items-stretch space-x-2 relative">
                <label className="text-black text-xl mt-5">
                    {question.question}
                </label>
                <input
                    type="text"
                    value={answers[index]||""}
                    onChange={(e) => handleChange(e, index)}
                    id={`answer-${index}`}
                    placeholder="Enter your answer to the above question"
                    className="bg-white flex-grow p-2 border-none outline-none mt-2"
                    size="50"
                />
                <Button
                    onClick = {(e)=>handleDelete(e,index)}
                    sx={{ position: "absolute", top:8, right:8}}>
                    Delete
                </Button>
            </div>
        ))}
        </div>
        <SubmitButton loading={loading}/>
        </form>
        </div>
        </div>
    )
}



export default QAForm;