import { Form, useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
import { getProject } from '../../projects'

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
            <div>
            <Form action="edit" className="ml-5">
                <button type="submit">
                    Edit
                </button>
            </Form>
            </div>
        </div>
    )
}