import { useState } from 'react';
import { Form, useLoaderData, useNavigate } from 'react-router-dom';
import './Backlog.css'
import { getProject, updateProject } from '../../projects'
import DownloadButton from '../../components/DownloadButton';
import JiraImportButton from './JiraImportButton';
import { Button } from '@mui/material';

export async function loader({ params }) {
    const project = await getProject(params.projectId);
    return { project };
}

export default function Backlog() {
    const { project } = useLoaderData();

    const navigate = useNavigate();

    const [selectedUserStories, setSelectedUserStories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const handleRegenerate = async (e) => {
        e.preventDefault();
        setLoading(true);
        const updatedProject = {
            ...project,
            userStories: selectedUserStories,
        }
        await updateProject(project.uri, updatedProject);
        try {
            //to switch endpoint once created
            const response = await fetch('http://localhost:8080/api/v1/user-stories',{
                method: 'PATCH',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(project),
                });
            if (response.ok) {
                const data = await response.json();
                //concat new questions with selected old
                const userStories = {
                    id: data.project_context_id,
                    userStories: selectedUserStories.concat(data.user_stories)
                }
                await updateProject(project.uri, userStories);
                navigate(`/backlog/${project.uri}`)
            }
        } catch (error) {
            setResponseMessage('Error: Network issue connecting to API.');
        }
        setLoading(false);
    }

    return (
        <div id="project-details" className="flex-grow h-full p-6 bg-orange-400 overflow-x-hidden">
            <div className="bg-white p-6">
            {responseMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{responseMessage}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3"/>
            </div>}
            
            <h1 className="text-black text-3xl font-bold mb-5text-left">
                {project.projectDetails.title}
            </h1>
            <h2 className="text-black text-xl mb-5 text-left">
                {project.projectDetails.description}
            </h2>
            <h1 className="text-black text-xl font-bold mb-5 text-left">User Stories</h1>
            {project?.userStories?.length > 0 &&(
            <div className="bg-slate-100 flex flex-wrap justify-items-start w-11/12">

            {project.userStories
            .filter(story => story.user_story.trim() !== "" || story.description.trim() !== "")
            .map((story,index) => (
                <div key={index} className="bg-story text-black border-4 border-black mx-6 my-4 p-4 rounded-md flex-row flex justify-start items-center space-x-2">
                    <div className="flex items-center justify-center">
                        <input
                            type="checkbox"
                            checked={selectedUserStories.some(s => s.userStory === story.userStory)}
                            onChange={() => {
                                setSelectedUserStories(
                                    selectedUserStories.some(s => s.userStory === story.userStory)
                                   ? selectedUserStories.filter(s => s.userStory !== story.userStory)
                                    : [...selectedUserStories, story]
                                );
                            }}
                            className="mr-4"
                        />
                    </div>
                    <div className="flex-1 text-black text-xl font-semibold">
                        {story.user_story.replace(/^\d+\.\s*/, "")}
                    </div>
                    <div className="flex-1 text-black text-sm font-sans whitespace-pre-wrap break-words">
                        {story.description.replace(/([:.]) (\d+\.)/g, "$1\n$2")}
                    </div>
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
            <DownloadButton dltarget={project}/>
            <Button onClick={handleRegenerate} variant="outlined" color="primary" disabled={loading}>
                { loading ? "Regenerating": "Keep & Regenerate"}
            </Button>
            <JiraImportButton project={project} />
            </div>
            </div>
            </div>
        </div>
    )
}