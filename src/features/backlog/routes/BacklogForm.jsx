// Form.jsx
import React, { useState } from 'react';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import Details from'../../../components/Details';
import Functionalities from '../../../components/MultiLineTextField/Functionalities';
import Roles from '../../../components/PillTextField';
import SubmitButton from '../../../components/SubmitButton';
import Dropdown from '../../../components/DropdownOptions';
import { updateProject } from '../../../projects';

export async function action({ request, params }) {
    const formData = await request.formData();
    console.log(formData);
    const updates = Object.fromEntries(formData);
    await updateProject(params.projectId, updates);
    return redirect(`/backlog/${params.projectId}`);
}

const Form = () => {
  const { project:initialProject } = useLoaderData();
  const [project, setProject] = useState(initialProject);

  const [loading, setLoading] = useState(false);

  const [functionalities, setFunctionalities] = useState(project.projectDetails.functionalities.map(func => func));
  const [roleValue, setRoleValue] = useState('');
  const [rolePills, setRolePills] = useState(project.projectDetails.roles.map(role => role));
  const [titleValue, setTitleValue] = useState(project.projectDetails.title || '');
  const [descriptionValue, setDescriptionValue] = useState(project.projectDetails.description ||'');

  const [responseMessage, setResponseMessage] = useState('');
  const AIModels = ["GEMINI","CHATGPT"]
  const options = ["1","2","3"];

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

  const handleTitleChange = (e) => {
      setTitleValue(e.target.value);
  };

  const handleDescriptionChange = (e) => {
      setDescriptionValue(e.target.value);
  }  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedProject ={
      projectDetails:{
        title:titleValue,
        description:descriptionValue,
        functionalities:functionalities,
        roles:rolePills
      }
    }
    try {
      await updateProject(project.id, updatedProject);
      setProject(project => ({
        ...project,
        ...updatedProject
      }));
      console.log(project)
      const response = await fetch('https://assistant-backend-uhn9.onrender.com/api/v1/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });
      if (response.ok) {
        const data = await response.json();
        const questions = {
          clarificationQAs: data.projectContextObj.clarificationQAs
        };
        await updateProject(project.id, questions);
        navigate(`/backlog/${project.id}/questions`);
        setResponseMessage('Success: ${data}');
      } else {
        setResponseMessage('Error: Failed to submit');
      }
    } catch (error) {
      console.log(error);
      setResponseMessage('Error: Network issue connecting to API');
    }
    setLoading(false);
  };

  return (
    <>
      <div className="w-full h-auto p-6 bg-white">
      <form onSubmit={handleSubmit} className="w-full h-auto p-6 bg-slate-100">
        {responseMessage && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{responseMessage}</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        </span>
        </div>}
        <Details
          titleValue={titleValue}
          descriptionValue={descriptionValue}
          handleTitleChange={handleTitleChange}
          handleDescriptionChange={handleDescriptionChange}/>
        <Dropdown 
          label="AI Model"
          options={AIModels} />
        <Dropdown 
          label="Number of Questions"
          options={options}/>
        <Dropdown
          label="Number of User Stories"
          options={options}/>
        <Functionalities
          functionalities={functionalities}
          handleChange={handleChange}
          handleAddFunctionality={handleAddFunctionality}
          handleRemoveFunctionality={handleRemoveFunctionality}
        />
        <Roles 
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