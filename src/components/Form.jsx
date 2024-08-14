// Form.jsx
import React, { useState } from 'react';
import Details from'./Details';
import Functionalities from './Functionalities';
import Roles from './Roles';
import SubmitButton from './FuncSubmitButton';

const Form = () => {
  const [functionalities, setFunctionalities] = useState([{ id: 1, value: '' }]);
  const [roleValue, setRoleValue] = useState('');
  const [rolePills, setRolePills] = useState([]);
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');

  const [responseMessage, setResponseMessage] = useState('');
  // const [otherInput, setOtherInput] = useState(''); // Example of another form input

  const handleChange = (id, e) => {
    const newFunctionalities = functionalities.map((func) => {
      if (func.id === id) {
        return { ...func, value: e.target.value };
      }
      return func;
    });
    setFunctionalities(newFunctionalities);
  };

  const handleAddFunctionality = () => {
    const newId = functionalities.length > 0 ? functionalities[functionalities.length - 1].id + 1 : 1;
    setFunctionalities([...functionalities, { id: newId, value: '' }]);
  };

  const handleRemoveFunctionality = (id) => {
    setFunctionalities(functionalities.filter((func) => func.id !== id));
  };

  // Example of input handler
  // const handleOtherInputChange = (e) => {
  //   setOtherInput(e.target.value);
  // };
  
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch('/api/submit-form', { // Replace with your API endpoint
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ functionalities, otherInput }), // Include other inputs here
  //     });
  //     if (!response.ok) throw new Error('Failed to submit form');
  //     const result = await response.json();
  //     console.log('API Response:', result);
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectSummaryPayload = {
          config: {
            AIModel: "Gemini",
            numOfQuestions: "3"},
          projectDetails: {
            title: titleValue,
            description: descriptionValue,
            functionalities: functionalities.map(func => func.value),
            roles: rolePills}
    }
    try {
      const response = await fetch('/v1/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectSummaryPayload),
      });
      console.log(JSON.stringify(projectSummaryPayload));
      if (response.ok) {
        const data = await response.json();
        const questions = data.map(item => item.question);
        //placeholder navigate for questions
        //navigate('/questions', {state: {questions}});
        setResponseMessage('Success: ${data}');
      } else {
        setResponseMessage('Error: Failed to submit');
      }
    } catch (error) {
      setResponseMessage('Error: Network issue conencting to API');
    }
  };
    // console.log('Form Data Submitted: ',
    //   {title: titleValue},
    //   {description: descriptionValue},
    //   {functionalities: functionalities.map(func => func.value)},
    //   {roles: rolePills});

  return (
    <>
      {/* <div className='sidenav'>
        <ul>
          <SelectProjectButton />
        </ul>
      </div> */}
      <form onSubmit={handleSubmit} className="w-full h-full p-6 bg-red-50">
        <Details
          titleValue={titleValue}
          descriptionValue={descriptionValue}
          handleTitleChange={handleTitleChange}
          handleDescriptionChange={handleDescriptionChange}/>
        <Functionalities
          functionalities={functionalities}
          handleChange={handleChange}
          handleAddFunctionality={handleAddFunctionality}
          handleRemoveFunctionality={handleRemoveFunctionality}
        />
        <Roles 
          roleValue={roleValue}
          rolePills={rolePills}
          handleRoleChange={handleRoleChange}
          handleRoleEntry={handleRoleEntry}
          handleRoleRemove={handleRoleRemove}
        />
        <SubmitButton />
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </>
  );
};

export default Form;