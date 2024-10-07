import { useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import './Backlog.css'
import { getProject, updateProject } from '../../projects'
import DownloadButton from '../../components/DownloadButton';

export async function loader({ params }) {
    const project = await getProject(params.projectId);
    return { project };
}

export default function Backlog() {
    const project = useLoaderData();
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
        try {
            //to switch endpoint once created
            const response = await fetch('http://localhost:8080/api/v1/user-stories',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProject),
                });
            if (response.ok) {
                const data = await response.json();
                //working assumption response has old user stories and new user stories combined
                const userStories = {
                    id:data.project_context_id,
                    userStories: data.user_stories
                }
                await updateProject(project.uri, userStories);
                setResponseMessage('Success: User Stories regenerated.');
            }
        } catch (error) {
            setResponseMessage('Error: Network issue connecting to API.');
        }
        setLoading(false);
    }

    return (
        <div id="project-details" className="flex-grow h-full mx-auto bg-white overflow-x-hidden">
            {responseMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{responseMessage}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3"/>
            </div>}
            <h1 className="text-black text-3xl font-bold mt-10 mb-5 ml-5 text-left">
                {project.project.projectDetails.title}
            </h1>
            <h2 className="text-black text-xl ml-5 mb-5 text-left">
                {project.project.projectDetails.description}
            </h2>
            <h1 className="text-black text-xl font-bold ml-5 mb-5 text-left">User Stories</h1>
            {project?.project?.userStories?.length > 0 &&(
            <div className="bg-slate-100 flex flex-wrap justify-items-start w-11/12">

            {project.project.userStories
            .filter(story => story.userStory.trim() !== "" || story.description.trim() !== "")
            .map((story,index) => (
                <div key={index} className="bg-story text-black border-4 border-black mx-6 my-4 p-4 rounded-md flex-row flex justify-start items-center">
                    <div className="flex items-center justify-center">
                        <input
                            type="checkbox"
                            checked={selectedUserStories.includes(story.userStory)}
                            onChange={() => {
                                setSelectedUserStories(selectedUserStories.includes(story.userStory)
                                   ? selectedUserStories.filter(s => s!== story.userStory)
                                    : [...selectedUserStories, story.userStory]
                                );
                            }}
                            className="mr-4"
                        />
                    </div>
                    <div className="flex-1 text-black text-xl font-semibold">
                        {story.userStory.replace(/^\d+\.\s*/, "")}
                    </div>
                    <div className="flex-1 text-black text-sm font-sans whitespace-pre-wrap break-words">
                        {story.description.replace(/([:.]) (\d+\.)/g, "$1\n$2")}
                    </div>
                </div>
            ))}
            </div>
            )}
            <div className="container flex bg-slate-100">
            <Form action="edit" className="mt-4 ml-5 mb-5">
                <button type="submit" className="border-2 bg-button hover:bg-sidebar">
                    Edit
                </button>
                <DownloadButton dltarget={project.project}/>
            </Form>
            <button className="ml-5 border-2 bg-button hover:bg-sidebar"
                    onClick={handleRegenerate}
                    disabled={loading}>
                    { loading ? "Regenerating": "Keep & Regenerate" }
            </button>
            <button className="ml-5 border-2 bg-button hover-bg-sidebar"
            >
                Import to JIRA
            </button>
            </div>
        </div>
    )
}