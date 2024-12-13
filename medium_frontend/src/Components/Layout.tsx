/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Layout.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import axios from 'axios';

interface LayoutProps {
    children?: ReactNode;
  }

const Layout = ({ children,setToken }:LayoutProps|any) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const location = useLocation();
  const [name,setName] =useState<string>('Anonymous');
  // Replace with actual value or state
  useEffect(() => {
    fetchdata2();
  }, []);

  async function fetchdata2() {
    const val = await axios.get("http://localhost:3001/api/v1/getdata",{
      headers: {
        Authorization: token
      }
    })
    console.log("layout val : ",val);
    setName(val.data.name);
  }

  return (
    <div>
      {/* Header starts here */}
      <div className="border-b p-4 grid grid-cols-2 items-center">
        <div className="font-bold ml-5 text-xl ">Blogout</div>
        <div className="flex justify-end ">
          <div className="mr-10 mt-2 cursor-pointer" onClick={() => navigate('/write')}>
            <FontAwesomeIcon icon={faPenToSquare} /> Write a Blog
          </div>
          <button className='mr-5 ' onClick={() => {
            localStorage.removeItem('token');
            setToken(null);
            navigate('/signin');
          }}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center mr-5">
            {name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
      {/* Header ends here */}

      {/* Content starts here */}
      {children}
      {/* Content ends here */}
    </div>
  );
};

export default Layout;
