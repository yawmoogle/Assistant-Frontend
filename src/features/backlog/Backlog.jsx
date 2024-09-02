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
        <div id="project-details" className="w-full h-full mx-auto bg-red-50">
            <h1 className="text-black text-3xl font-bold mt-10 mb-5 ml-5 text-left">
                {project.project.projectDetails.title}
            </h1>
            <h2 className="text-black text-xl ml-5 mb-5 text-left">
                {project.project.projectDetails.description}
            </h2>
            <h1 className="text-black text-xl font-bold ml-5 mb-5 text-left">User Stories</h1>
            {project?.project?.userStories?.length > 0 &&(
            <div className="w-full mx-auto bg-red-50 flex flex-wrap items-start">

            {project.project.userStories
            .filter(story => story.userStory.trim() !== "" || story.description.trim() !== "")
            .map((story,index) => (
                <div key={index} className="bg-red-50 text-black border-4 mx-3 my-3 p-4 rounded-md flex-wrap w-1/5">
                    <h2 className="text-black text-xl font-semibold">
                        {story.userStory}
                    </h2>
                    <h4 className="text-black text-sm">
                        {story.description}
                    </h4>
                </div>
            ))}
            </div>
            )}
            <div className="container flex bg-red-50">
            <Form action="edit" className="mt-4 ml-5 mb-5">
                <button type="submit">
                    Edit
                </button>
                <DownloadButton />
            </Form>
            </div>
        </div>
    )
}