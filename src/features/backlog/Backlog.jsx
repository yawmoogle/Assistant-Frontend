import { useState } from 'react';
import { Form, useLoaderData, useNavigate } from 'react-router-dom';
import './Backlog.css'
import { getProject, updateProject } from '../../projects'
import DownloadButton from '../../components/DownloadButton';
import JiraImportButton from './JiraImportButton';
import { Button, TextField } from '@mui/material';
import NavigationStepper from '../../components/NavigationStepper';
import ConfirmationButton from '../../components/ConfirmationButton';
import DeleteButton from './DeleteButton';

export async function loader({ params }) {
    const project = await getProject(params.projectId);
    return { project };
}

export default function Backlog() {
    const { project } = useLoaderData();

    const navigate = useNavigate();

    const [userStories, setUserStories] = useState(project.user_stories || []);
    const [storiesValue, setStoriesValue] = useState(project.config.num_of_user_stories || 5);
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [activeStep, setActiveStep] = useState(2);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editStory, setEditStory] = useState({user_story_id: '',user_story:'', description:''})

    const handleInputChange = (e) => {
        setStoriesValue(e.target.value);
    };

    const handleStepChange = (newStep) => {
        setActiveStep(newStep);
        switch (newStep) {
            case (1):
                navigate(`/backlog/${project.uri}/questions`);
                break;
            case (0):
                navigate(`/backlog/${project.uri}/edit`);
                break;
            default:
                break;
        }
    }

    const handleEditClick = (index, story) => {
        console.log(story);
        setEditingIndex(index);
        setEditStory({user_story_id: story.user_story_id, user_story: story.user_story, description: story.description});
    }

    const handleSaveClick = async (index) => {
        const updatedUserStories = [...userStories]
        updatedUserStories[index] = editStory;
        setUserStories(updatedUserStories);
        try {
            const response = await fetch(`http://localhost:8080/api/v1/projects/${project.project_context_id}/user-stories`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editStory)
            })
            if (response.ok) {
                setResponseMessage('User Story saved successfully');
            }
        } catch (error) {
            setResponseMessage('Problem with saving user story to database');
        }
        setEditingIndex(null);

        const updatedProject = {...project, user_stories:updatedUserStories};
        await updateProject(project.uri, updatedProject);
    }

    const handleDeleteUserStory = async (indexToDelete) => {
        const updatedUserStories = userStories.filter((_,index) => index !== indexToDelete);
        const deletedUserStory = userStories.filter((_,index) => index == indexToDelete)[0]
        setUserStories(updatedUserStories);
        try {
            const response = await fetch(`http://localhost:8080/api/v1/projects/${project.project_context_id}/user-stories:batch-delete`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([deletedUserStory.user_story_id])
            });
            if (response.ok) {
                setResponseMessage('User story deleted successfully');
            } else {
                setResponseMessage('Failed to delete user story');
            }
        } catch (error) {
            setResponseMessage('Network error connecting to API');
        }
        const updatedProject  = {...project, user_stories: updatedUserStories};
        console.log(updatedProject);
        updateProject(project.uri, updatedProject);
    };

    //new implementation
    const handleRegenerate = async (e) => {
        e.preventDefault();
        setLoading(true);
        const updatedProject = {
            ...project,
            config:{
                num_of_user_stories:storiesValue
            }
        }
       const payload = updatedProject.config;
        await updateProject(project.uri, updatedProject);
        try {
            // const response = await fetch(`http://localhost:8080/api/v1/user-stories`,{
            //     method: 'post',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(updatedProject)
            // });
            const response = await fetch(`http://localhost:8080/api/v1/projects/${project.project_context_id}/user-stories`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                });
            if (response.ok) {
                const data = await response.json();
                //concat new questions with selected old
                const updatedUserStories = project.user_stories.concat(data);
                const userStories = {
                    id: data[0].project_context_id,
                    user_stories: updatedUserStories
                }
                setUserStories(updatedUserStories);
                await updateProject(project.uri, userStories);
                navigate(`/backlog/${project.uri}`)
                setResponseMessage(`${storiesValue} NEW user stories generated`);
            }
        } catch (error) {
            setResponseMessage('Error: Network issue connecting to API.');
        }
        setLoading(false);
    }

    return (
        <div id="project-details" className="flex-grow h-full p-6 bg-orange-400 overflow-x-hidden">
            <div className="bg-white p-6">
            <NavigationStepper
                activeStep={activeStep}
                onChangeStep={handleStepChange}
            />
            {responseMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-5 rounded relative" role="alert">
            <span className="block sm:inline">{responseMessage}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3"/>
            </div>}
            
            <h1 className="text-black text-3xl font-bold mb-5text-left">
                {project.project_details.title}
            </h1>
            <h2 className="text-black text-xl mb-5 text-left">
                {project.project_details.description}
            </h2>
            <h1 className="text-black text-xl font-bold mb-5 text-left">User Stories</h1>
            <div className="flex align-middle space-x-1">
            <TextField
                aria-label="Regenerate Stories"
                name="regenerate_stories"
                size="small"
                type="number"
                value={storiesValue}
                slotProps={{
                    htmlInput : {min:1, max:50}
                }}
                onChange={handleInputChange}/>
            <Button onClick={handleRegenerate} variant="outlined" color="primary" disabled={loading}>
                { loading ? "Generating": "Generate"}
            </Button>
            </div>
            {userStories.length > 0 &&(
            <div className="bg-slate-100 flex flex-col justify-items-start w-11/12">
            
            {userStories
            .filter(story => story.user_story.trim() !== "" || story.description.trim() !== "")
            .map((story,index) => (
                <div key={index} className="bg-white text-black border-4 border-black mx-6 my-4 p-4 rounded-md flex-row flex justify-start items-center space-x-2 relative">
                    <ConfirmationButton
                        editingIndex={editingIndex}
                        index={index}
                        handleEditClick={handleEditClick}
                        handleSaveClick={handleSaveClick}
                        story={story}
                    >
                    </ConfirmationButton>
                    <DeleteButton
                        index={index}
                        item="user story"
                        handleDeleteFunction={handleDeleteUserStory}
                        >
                        Delete
                    </DeleteButton>
                {editingIndex === index ? (
                    <div className="pt-8 flex flex-row w-full justify-start items-center space-x-2">
                    <TextField
                        fullWidth
                        variant='outlined'
                        value={editStory.user_story}
                        onChange={(e) => setEditStory({...editStory, user_story:e.target.value})}
                        className="flex-1 font-semibold"
                        multiline
                    />
                    <TextField
                        fullWidth
                        variant='outlined'
                        value={editStory.description}
                        onChange={(e) => setEditStory({...editStory, description:e.target.value})}
                        margin="normal"
                        className="flex-1 font-sans"
                        multiline
                    />
                    </div>)
                    :(
                    <>
                    <div className="flex-1 text-black text-xl font-semibold">
                        {story.user_story.replace(/^\d+\.\s*/, "")}
                    </div>
                    <div className="flex-1 text-black text-sm font-sans whitespace-pre-wrap break-words mt-8">
                        {story.description.replace(/([:.]) (\d+\.)/g, "$1\n$2")}
                    </div>
                    </>
                    )}
                </div>
            ))}
            </div>
            )}
            <div className="container flex-row flex p-1 space-x-5">
            <Form action="edit" className="flex p-2">
                <Button variant="outlined" color="primary" type="submit">
                Edit
                </Button> 
            </Form>
            <div className="flex flex-row items-center space-x-5">
            <DownloadButton dltarget={project.project_context_id}/>
            <JiraImportButton project={project.project_context_id} />
            <Button variant="outlined" color="primary">Authenticate Jira</Button>
            </div>
            </div>
            </div>
        </div>
    )
}