import React, { useState } from 'react';
import './Add.css';
import { ImCross } from 'react-icons/im';

const AddUser = ({ setOpen }) => {
  const [data, setData] = useState({
    course: "",
    tutor: "",
    time: "",
  });

  const handleUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://localhost:7208/api/Product/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        setOpen(false);
        console.log(responseData);
      } else {
        const errorMessage = await response.text();
        console.error(errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className='add'>
      <div className='modal'>
        <ImCross
          className="icon"
          onClick={() => setOpen(false)}
        />
        <div className='flex flex-col gap-3'>
          <label htmlFor="course" className='text-black'>Course</label>
          <input type="text" value={data.course} onChange={handleChange} id="course" placeholder='Enter your Course' className='p-1 border-2 rounded-md text-black' required />
          <label htmlFor="time" className='text-black'>Time</label>
          <input type="text" value={data.time} onChange={handleChange} id="time" placeholder='Enter your Time' className='p-1 border-2 rounded-md text-black' required />
          <label htmlFor="tutor" className='text-black'>Tutor</label>
          <input type="text" value={data.tutor} onChange={handleChange} id="tutor" placeholder='Enter your Tutor' className='p-1 border-2 rounded-md text-black' required />
          <button className='bg-blue-500 py-2' onClick={handleUser}>Add New</button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
