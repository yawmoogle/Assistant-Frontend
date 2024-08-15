import { Form, useLoaderData } from 'react-router-dom';
import { getProject } from '../../projects'

export async function loader({ params }) {
    const project = await getProject(params.projectId);
    return { project };
}

export default function Backlog() {
    const project = useLoaderData();

    return (
        <div id="project" className="w-full h-full mx-auto bg-red-50">
            
            <div>
            <Form action="edit">
                <button type="submit">
                    Edit
                </button>
            </Form>
            </div>
        </div>
    )
}