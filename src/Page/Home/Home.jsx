import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom'; // Import Navigate from react-router-dom
import Nav from '../../Components/Nav';
import './home.css';
import { DarkContext } from '../../Context/Button';
import Left from '../../Components/LeftSideBar/Left';
import Right from '../../Components/RightSideBar/Right';
import { AuthContext } from '../../Context/Auth';

const Home = () => {
  const { state, dispatch } = useContext(DarkContext);
  const { token } = useContext(AuthContext);
  console.log(state);

  return (
    <>
      {token ? (
        <div className="px-4 min-h-[100vh] bg-dark-bg py-2" id={state.theme}>
          <Nav />
          <div className="flex mt-2 gap-2 justify-between min-h-[100vh] rounded-full">
            <Left />
            <Right />
          </div>
        </div>
      ) : (
        <Navigate to="/login" /> 
      )}
    </>
  );
};

export default Home;
