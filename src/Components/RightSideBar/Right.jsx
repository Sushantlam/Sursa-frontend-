// Right.js
import React, { useEffect, useState } from 'react';
import './Right.css';
import AddUser from '../AddCourse/Add';
import EditCourse from '../EditCourse/EditCourse';

const Right = () => {
  const [item, setItem] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // State to store selected item for editing

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://localhost:7208/api/Product/product/${id}`, {
        method: 'DELETE',
      });
      console.log(response);
      if (response.ok) {
        setItem((prevItems) => prevItems.filter((item) => item.id !== id));
        console.log('Item deleted successfully');
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7208/api/Product/product');
        const data = await response.json(); // Extract JSON data from response
        setItem(data);
        console.log(data);
      } catch (error) {
        console.error('Fetching data failed:', error);
      }
    };
    fetchData();
  }, [open, openEdit]);

  const addUser = () => {
    setOpen(!open);
  };

  const handleEdit = (item) => {
    setSelectedItem(item); // Set selected item for editing
    setOpenEdit(true); // Open the EditCourse component
  };

  return (
    <div className="w-4/5  p-2  ">
      <div className="btnSearch">
        <div className="flex justify-end">
          <button onClick={addUser} className="px-2 py-1 rounded-lg bg-blue-600">
            Add New Course
          </button>
        </div>
      </div>
      <table className="custom-table" style={{ minWidth: 1000 }}>
        <thead>
          <tr>
            <th>Course</th>
            <th>Time</th>
            <th>Tutor</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {item?.map((e) => (
            <tr key={e.id} className="border-b pb-4">
              <td>{e.course}</td>
              <td>{e.time}</td>
              <td>{e.tutor}</td>
              <td className="action">
                <button className="p-2 py-1 rounded-lg bg-red-600" onClick={() => handleEdit(e)}>
                  Edit
                </button>
                <button className="p-2 py-1 rounded-lg bg-red-600" onClick={() => handleDelete(e.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {open && <AddUser setOpen={setOpen} />}
      {openEdit && <EditCourse setOpenEdit={setOpenEdit} data={selectedItem} />}
    </div>
  );
};

export default Right;

