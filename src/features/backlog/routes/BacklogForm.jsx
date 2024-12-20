// Form.jsx
import { useState } from 'react';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';

import Functionalities from '../../../components/MultiLineTextField/MultiLineTextField';
import Roles from '../../../components/PillTextField';
import SubmitButton from '../../../components/SubmitButton';
import Title from '../../../components/TextField';
import Description from '../../../components/TooltipTextField';
import NavigationStepper from '../../../components/NavigationStepper';

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
  console.log(project);

  const [loading, setLoading] = useState(false);

  const [functionalities, setFunctionalities] = useState(project.project_details.functionalities.map(func => func));
  const [roleValue, setRoleValue] = useState('');
  const [rolePills, setRolePills] = useState(project.project_details.roles.map(role => role));
  const [titleValue, setTitleValue] = useState(project.project_details.title || '');
  const [descriptionValue, setDescriptionValue] = useState(project.project_details.description ||'');
  const [AIValue, setAIValue] = useState(project.config.ai_model_name || '');
  const [questionsValue, setQuestionsValue] = useState(project.config.num_of_questions || 5);
  const [storiesValue, setStoriesValue] = useState(project.config.num_of_user_stories || 10);
  const [activeStep, setActiveStep] = useState(0);

  const [responseMessage, setResponseMessage] = useState('');
  const [responseType, setResponseType] = useState('');

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

  const handleStepChange = (newStep) => {
    setActiveStep(newStep);
    switch (newStep) {
      case(1):
        navigate(`/backlog/${project.uri}/questions`);
        break;
      case(2):
        navigate(`/backlog/${project.uri}/`);
        break;
      default:
        break;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedProject ={
      ...project,
      config:{
        ai_model_name: AIValue,
        num_of_questions: questionsValue,
        num_of_user_stories: storiesValue
      },
      project_details:{
        title:titleValue,
        description:descriptionValue,
        functionalities:functionalities,
        roles:rolePills
      }
    }
    try {
      await updateProject(project.uri, updatedProject);
      const response = await fetch(`http://localhost:8080/api/v1/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
      });
      if (response.ok) {
        const data = await response.json();
        const updatedProject = data;
        updatedProject.config = {ai_model_name: AIValue, num_of_questions: questionsValue, num_of_user_stories: storiesValue};
        await updateProject(project.uri, updatedProject);
        setResponseMessage(`Please wait, retrieving questions`);
        setResponseType('error');
        try {
          const payload = updatedProject.config;
          const response = await fetch(`http://localhost:8080/api/v1/projects/${updatedProject.project_context_id}/questions`,{
            method: "post",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
          if (response.ok) {
            const data = await response.json();
            updatedProject.clarification_qas = data;
            await updateProject(project.uri, updatedProject);
            navigate(`/backlog/${project.uri}/questions`);
          }
        } catch (error) {
          setResponseMessage('Error: Network issue retrieving questions: '+error.message);
          setResponseType('error');
        }
      } else {
        setResponseMessage('Error: Failed to submit');
        setResponseType('error');
      }
    } catch (error) {
      setResponseMessage('Error: Network issue creating or updating project: ' + error.message);
      setResponseType('error');
    }
    setLoading(false);
  };

  return (
    <div id="project-details" className="flex-grow h-full p-6 bg-orange-400 overflow-x-hidden">
      <div className="w-full h-auto p-6 bg-white">
      <NavigationStepper
        activeStep={activeStep}
        onChangeStep={handleStepChange}
      />
      <form onSubmit={handleSubmit} className="w-auto h-auto p-6 bg-slate-100">
        {responseMessage && <div className={`border px-4 py-3 mb-5 rounded relative ${responseType === 'error'
          ? 'bg-red-100 border-red-400 text-red-700'
          : 'bg-green-100 border-green-400 text-green-700'
        }`} role="alert">
        <span className="block sm:inline">{responseMessage}</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        </span>
        </div>}
        <Title 
          label="Title"
          name="title"
          inputValue={titleValue}
          inputChange={handleInputChange}
          required={1}/>
        <Description 
          label="Description"
          name="description"
          inputValue={descriptionValue}
          inputChange={handleInputChange}
          tooltip="A short description of your project"
          required={1}/>
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
    </div>
  );
};

export default Form;