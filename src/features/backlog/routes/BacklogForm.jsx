// Form.jsx
import { useState } from 'react';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';

import Functionalities from '../../../components/MultiLineTextField/MultiLineTextField';
import Roles from '../../../components/PillTextField';
import SubmitButton from '../../../components/SubmitButton';
import Title from '../../../components/TextField';
import Description from '../../../components/TooltipTextField';

import { updateProject } from '../../../projects';

import { Select, MenuItem, TextField } from '@mui/material';

export async function action({ request, params }) {
    const formData = await request.formData();
    console.log(formData);
    const updates = Object.fromEntries(formData);
    await updateProject(params.projectId, updates);
    return redirect(`/backlog/${params.projectId}`);
}

const Form = () => {
  const { project } = useLoaderData();

  const [loading, setLoading] = useState(false);

  const [functionalities, setFunctionalities] = useState(project.projectDetails.functionalities.map(func => func));
  const [roleValue, setRoleValue] = useState('');
  const [rolePills, setRolePills] = useState(project.projectDetails.roles.map(role => role));
  const [titleValue, setTitleValue] = useState(project.projectDetails.title || '');
  const [descriptionValue, setDescriptionValue] = useState(project.projectDetails.description ||'');
  const [AIValue, setAIValue] = useState(project.config.model || '');
  const [questionsValue, setQuestionsValue] = useState(project.config.numOfQuestions || 5);
  const [storiesValue, setStoriesValue] = useState(project.config.numOfUserStories || 10);

  const [responseMessage, setResponseMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const newFunctionalities = [...functionalities];
    newFunctionalities[index] = e.target.value;
    setFunctionalities(newFunctionalities);
  };

  const handleAddFunctionality = () => {
    setFunctionalities([...functionalities, ""])
  };

  const handleRemoveFunctionality = (indexRemove) => {
    setFunctionalities(functionalities.filter((_,index) => index !== indexRemove));
  };
  
  const handleRoleChange = (e) => {
    setRoleValue(e.target.value);
  };

  //Setup Enter key to trigger pill creation, prevent Enter key from triggering submit if entering Roles
  const handleRoleEntry = (e) => {
      if (e.key === 'Enter' && roleValue.trim() !== '') {
          e.preventDefault();
          setRolePills([...rolePills, roleValue.trim()]);
          setRoleValue('');
      }
  };

  //Function to remove a pill
  const handleRoleRemove = (index) => {
      setRolePills(rolePills.filter((_,i) => i !== index));
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'title':
        setTitleValue(value);
      break;
      case 'description':
        setDescriptionValue(value);
      break;
      case 'model':
        setAIValue(value);
      break;
      case 'questions':
        setQuestionsValue(Number(value));
      break;
      case 'stories':
        setStoriesValue(Number(value));
      break;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedProject ={
      ...project,
      config:{
        model: AIValue,
        numOfQuestions: questionsValue,
        numOfUserStories: storiesValue
      },
      projectDetails:{
        title:titleValue,
        description:descriptionValue,
        functionalities:functionalities,
        roles:rolePills
      }
    }
    try {
      await updateProject(project.uri, updatedProject);
      console.log(updatedProject)
      const response = await fetch('http://localhost:8080/api/v1/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const questions = {
          id:data[0].project_context_id,
          clarificationQAs: data
        };
        console.log(questions);
        // const questions = {
        //   id:data.project_context_id,
        //   clarificationQAs: data.clarification_qa_list
        // };
        await updateProject(project.uri, questions);
        navigate(`/backlog/${project.uri}/questions`);
        setResponseMessage('Success: ${data}');
      } else {
        setResponseMessage('Error: Failed to submit');
      }
    } catch (error) {
      setResponseMessage('Error: Network issue connecting to API');
    }
    setLoading(false);
  };

  return (
    <>
      <div className="w-full h-auto p-6 bg-orange-400">
      <form onSubmit={handleSubmit} className="w-auto h-auto p-6 bg-slate-100">
        {responseMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-5 rounded relative" role="alert">
        <span className="block sm:inline">{responseMessage}</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        </span>
        </div>}
        <Title 
          label="Title"
          name="title"
          inputValue={titleValue}
          inputChange={handleInputChange}/>
        <Description 
          label="Description"
          name="description"
          inputValue={descriptionValue}
          inputChange={handleInputChange}/>
        <label className="text-black text-xl text-left font-bold mt-5 flex items-center" id="ai-label">AI Model</label>
        <Select
          labelId="ai-label"
          id="ai-select"
          name="model"
          value={AIValue}
          label="AI Model"
          onChange={handleInputChange}>
            <MenuItem value={"GEMINI"}>Gemini</MenuItem>
            {/* <MenuItem value={"CHATGPT"}>ChatGPT</MenuItem> */}
        </Select>
        <div className="flex-auto max-w-md">
        <label className="text-black text-xl text-left font-bold mt-5 flex items-center">Number of Questions</label>
        <TextField
          aria-label="Number of Questions"
          name="questions"
          type="number"
          size="small"
          value={questionsValue}
          slotProps={{
            htmlInput: {min:1, max:20}
          }}
          onChange={handleInputChange}/>
        <label className="text-black text-xl text-left font-bold mt-5 flex items-center">Number of User Stories</label>
        <TextField
          aria-label="Number of User Stories"
          name="stories"
          type="number"
          size="small"
          value={storiesValue}
          slotProps={{
            htmlInput: {min:1, max:50}
          }}
          onChange={handleInputChange}/>
        </div>
        <Functionalities
          label="Functionalities"
          items={functionalities}
          handleChange={handleChange}
          handleAddItem={handleAddFunctionality}
          handleRemoveItem={handleRemoveFunctionality}
        />
        <Roles 
          label="Role of User"
          inputValue={roleValue}
          inputPills={rolePills}
          handleInputChange={handleRoleChange}
          handleInputEntry={handleRoleEntry}
          handleInputRemove={handleRoleRemove}
        />
        <SubmitButton loading={loading}/>
      </form>
      </div>
    </>
  );
};

export default Form;