// Form.jsx
import React, { useState } from 'react';
import Functionalities from './FunctionalitiesV2';
import SubmitButton from './FuncSubmitButton';

const Form = () => {
  const [functionalities, setFunctionalities] = useState([{ id: 1, value: '' }]);
  const [otherInput, setOtherInput] = useState(''); // Example of another form input

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

  const handleOtherInputChange = (e) => {
    setOtherInput(e.target.value);
  };

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

  //
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted: ', functionalities);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-red-50 shadow-md rounded-lg">
      <Functionalities
        functionalities={functionalities}
        handleChange={handleChange}
        handleAddFunctionality={handleAddFunctionality}
        handleRemoveFunctionality={handleRemoveFunctionality}
      />

      <SubmitButton />
    </form>
  );
};

export default Form;