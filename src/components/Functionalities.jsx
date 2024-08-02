// import { useState } from "react";

// const Functionalities = () => {

//   // Store as an array where by the first functionality has the index 1
//   const [functionalities, setFunctionalities] = useState([{ id: 1, value: '' }]);


//   // Ensure when there are any changes to the text area it is recorded and tracked based on the id
//   const handleChange = (id, e) => {
//     const newFunctionalities = functionalities.map((func) => {
//       if (func.id === id) {
//         return { ...func, value: e.target.value };
//       }
//       return func;
//     });
//     setFunctionalities(newFunctionalities);
//   };

//   // Create a new Entry in the array
//   const handleAddFunctionality = () => {
//     const newId = functionalities.length > 0 ? functionalities[functionalities.length - 1].id + 1 : 1;
//     setFunctionalities([...functionalities, { id: newId, value: '' }]);
//   };

//   // Returns a filter map without the specified id
//   const handleRemoveFunctionality = (id) => {
//     setFunctionalities(functionalities.filter((func) => func.id !== id));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form Data Submitted: ', functionalities);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-red-50 shadow-md rounded-lg">
//       <div className="flex items-center justify-between mb-6 gap-10">
//         <h2 className="text-black text-xl font-bold mb-5 text-left">Desired Functionalities</h2>
//         <button
//           type="button"
//           onClick={handleAddFunctionality}
//           className="bg-red-50 hover:bg-red-100 text-black text-l border-black font-bold py-0.5 px-2 rounded-full focus:outline-none focus:shadow-outline mb-4"
//         >
//           +
//           {/* <img src={`../public/add-icon.svg`} alt="Add Functionality" className="rounded-full" /> */}
//         </button>
//       </div>

//       {functionalities.map((func) => (
//         <div key={func.id} className="mb-4 flex flex-col">
//           <label className="block text-gray-700 text-sm font-bold mb-2 text-left" htmlFor={`functionality${func.id}`}>
//             Functionality {func.id}
//           </label>
//           <div className="flex items-center gap-1">
//           <textarea
//             name={`functionality${func.id}`} // Trailing Id
//             value={func.value}
//             onChange={(e) => handleChange(func.id, e)}
//             className="bg-slate-50 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline resize-none"
//             rows="1"
//             placeholder={`Enter functionality ${func.id}`}
//             required
//           />
//           <button
//             type="button"
//             onClick={() => handleRemoveFunctionality(func.id)}
//             className=" bg-red-50 hover:bg-red-100 text-black font-bold text-m py-0.5 px-2 border-black rounded-full focus:outline-none focus:shadow-outline"
//           >
//             X
//           </button>
//           </div>
          
//         </div>
//       ))}

//       <button
//         type="submit"
//         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default Functionalities;