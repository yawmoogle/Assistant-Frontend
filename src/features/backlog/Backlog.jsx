import { useState } from 'react';
import { Form, useLoaderData, useNavigate } from 'react-router-dom';
import './Backlog.css'
import { getProject, updateProject } from '../../projects'
import DownloadButton from '../../components/DownloadButton';
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
    const [editingIndex, setEditingIndex] = useState(null);
    const [editStory, setEditStory] = useState({user_story_id: '',user_story:'', description:''})

    const [loading, setLoading] = useState(false);
    const [activeStep, setActiveStep] = useState(2);    

    const [responseMessage, setResponseMessage] = useState('');
    const [responseType, setResponseType] = useState('');

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

    const handleJiraAuth = () => {
        window.location.href=`https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=R3kSLux1IdufBR8hSFdOTzp3mslo5i7N&scope=read%3Ajira-work%20manage%3Ajira-project%20manage%3Ajira-configuration%20read%3Ajira-user%20write%3Ajira-work&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fv1%2Fprojects%2Fauth&response_type=code&prompt=consent`
    };

    const handleJiraImport = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/v1/projects/${project.project_context_id}/jira/import`, {
                method: 'get',
            })
            if (response.ok) {
                const data = await response.json();
                setResponseMessage(`${data.message}`);
                setResponseType('success');
            }
        } catch (error) {
            console.error(error);
            setResponseMessage(`Problem with importing user stories to Jira: ${error}`);
            setResponseType('error');
        }
        setLoading(false);
    }

    const handleEditClick = (index, story) => {
        setEditingIndex(index);
        setEditStory({user_story_id: story.user_story_id, user_story: story.user_story, description: story.description});
    }

    const handleSaveClick = async (index) => {
        setLoading(true);
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
                setResponseType('success');
            }
        } catch (error) {
            setResponseMessage('Problem with saving user story to database: ' + error.message);
            setResponseType('error');
        }
        setEditingIndex(null);

        const updatedProject = {...project, user_stories:updatedUserStories};
        await updateProject(project.uri, updatedProject);
        setLoading(false);
    }

    const handleDeleteUserStory = async (indexToDelete) => {
        setLoading(true);
        const updatedUserStories = userStories.filter((_,index) => index !== indexToDelete);
        const deletedUserStory = userStories.filter((_,index) => index == indexToDelete)[0]
        try {
            const response = await fetch(`http://localhost:8080/api/v1/projects/${project.project_context_id}/user-stories:batch-delete`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([deletedUserStory.user_story_id])
            });
            if (response.ok) {
                setUserStories(updatedUserStories);
                setResponseMessage('User story deleted successfully');
                setResponseType('success');
            } else {
                setResponseMessage('Failed to delete user story');
                setResponseType('error');
            }
        } catch (error) {
            setResponseMessage('Network error deleting user stories: ' + error.message);
            setResponseType('error');
        }
        const updatedProject  = {...project, user_stories: updatedUserStories};
        updateProject(project.uri, updatedProject);
        setLoading(false);
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
            const response = await fetch(`http://localhost:8080/api/v1/projects/${project.project_context_id}/user-stories`,{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                });
            if (response.ok) {
                const data = await response.json();
                const updatedUserStories = project.user_stories.concat(data);
                const userStories = {
                    id: data[0].project_context_id,
                    user_stories: updatedUserStories
                }
                setUserStories(updatedUserStories);
                await updateProject(project.uri, userStories);
                navigate(`/backlog/${project.uri}`)
                setResponseMessage(`${storiesValue} NEW user stories generated`);
                setResponseType('success');
            }
        } catch (error) {
            console.error(error);
            setResponseMessage('Error: Network issue connecting to API.');
            setResponseType('error');
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
            {responseMessage && <div className={`border px-4 py-3 mb-5 rounded relative ${responseType === 'error'
                ? 'bg-red-100 border-red-400 text-red-700'
                : 'bg-green-100 border-green-400 text-green-700'
            }`} role="alert">
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
                        loading={loading}
                    >
                    </ConfirmationButton>
                    <DeleteButton
                        index={index}
                        item="user story"
                        handleDeleteFunction={handleDeleteUserStory}
                        loading={loading}
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
                <Button variant="outlined" color="primary" type="submit" disabled={loading}>
                Edit
                </Button> 
            </Form>
            <div className="flex flex-row items-center space-x-5">
            <DownloadButton loading={loading} dltarget={project.project_context_id}/>
            <Button variant="outlined" color="primary" disabled={loading} onClick={handleJiraImport}>Import to Jira</Button>
            <Button variant="outlined" color="primary" disabled={loading} onClick={handleJiraAuth}>Authenticate Jira</Button>
            </div>
            </div>
            </div>
        </div>
    )
}