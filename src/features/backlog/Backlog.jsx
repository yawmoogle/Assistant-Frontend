import { Form } from 'react-router-dom';

export default function Backlog() {
    const project = {
        title: "GenAI Assistant",
        description: "A short description of the project",
        questionsAnswers: {"question1": "answer1",},
        userStories: {"story1": "acceptance1",},
    };

    return (
        <div id="project">
            <div>
                <h1>
                    {project.title}
                </h1>
                <h2>
                    {project.description}
                </h2>
            </div>
            <div id="stories">
                <h1>
                    Your User Stories
                </h1>
                {project.userStories.map(userStory =>
                    <div key={userStory.id} className="relative mb-4 flex flex-col">
                        <h2>{userStory.key}</h2>
                        <h4>{userStory.value}</h4>
                        <Form action="destroy" method="post">
                            <button type="submit">Delete</button>
                        </Form>
                    </div>
                )}
            </div>
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