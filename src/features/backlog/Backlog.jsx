import { Form, useLoaderData } from 'react-router-dom';
import './Backlog.css'
import { useEffect } from 'react';
import { getProject } from '../../projects'
import DownloadButton from '../../components/DownloadButton';

export async function loader({ params }) {
    const project = await getProject(params.projectId);
    return { project };
}

export default function Backlog() {
    const project = useLoaderData();

    return (
        <div id="project-details" className="w-full h-full mx-auto bg-white">
            <h1 className="text-black text-3xl font-bold mt-10 mb-5 ml-5 text-left">
                {project.project.projectDetails.title}
            </h1>
            <h2 className="text-black text-xl ml-5 mb-5 text-left">
                {project.project.projectDetails.description}
            </h2>
            <h1 className="text-black text-xl font-bold ml-5 mb-5 text-left">User Stories</h1>
            {project?.project?.userStories?.length > 0 &&(
            <div className="w-full mx-auto bg-slate-100 flex flex-wrap justify-center items-start">

            {project.project.userStories
            .filter(story => story.userStory.trim() !== "" || story.description.trim() !== "")
            .map((story,index) => (
                <div key={index} className="bg-story text-black border-4 border-black mx-6 my-4 p-4 rounded-md flex-wrap w-1/5">
                    <h2 className="text-black text-xl font-semibold">
                        {story.userStory.replace(/^\d+\.\s*/, "")}
                    </h2>
                    <h4 className="text-black text-sm font-sans whitespace-pre-wrap break-words">
                        {story.description.replace(/([:.]) (\d+\.)/g, "$1\n$2")}
                    </h4>
                </div>
            ))}
            </div>
            )}
            <div className="container flex bg-slate-100">
            <Form action="edit" className="mt-4 ml-5 mb-5">
                <button type="submit" className="border-2 bg-button hover:bg-sidebar">
                    Edit
                </button>
                <DownloadButton dltarget={project}/>
            </Form>
            </div>
        </div>
    )
}