// EditCourse.js
import React, { useState } from 'react';
import './Edit.css';
import { ImCross } from 'react-icons/im';

const EditCourse = ({ setOpenEdit, data }) => {
  const [formData, setFormData] = useState(data); // Initialize state with data prop

  const handleUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://localhost:7208/api/Product/update/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Use formData to send updated data
      });
      if (response.ok) {
        setOpenEdit(false);
        console.log('Item updated successfully');
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
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className="add">
      <div className="modal">
        <ImCross className="icon" onClick={() => setOpenEdit(false)} />
        <div className="flex flex-col gap-3">
          <label htmlFor="course" className="text-black">
            Course
          </label>
          <input
            type="text"
            value={formData.course}
            onChange={handleChange}
            id="course"
            placeholder="Enter your Course"
            className="p-1 border-2 rounded-md text-black"
            required
          />
          <label htmlFor="time" className="text-black">
            Time
          </label>
          <input
            type="text"
            value={formData.time}
            onChange={handleChange}
            id="time"
            placeholder="Enter your Time"
            className="p-1 border-2 rounded-md text-black"
            required
          />
          <label htmlFor="tutor" className="text-black">
            Tutor
          </label>
          <input
            type="text"
            value={formData.tutor}
            onChange={handleChange}
            id="tutor"
            placeholder="Enter your Tutor"
            className="p-1 border-2 rounded-md text-black"
            required
          />
          <button className="bg-blue-500 py-2" onClick={handleUser}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;

