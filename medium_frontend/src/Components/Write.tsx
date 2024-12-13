/* eslint-disable @typescript-eslint/no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
function Write() {
    const [val,setValue] = useState('');
    const [detail,setDetail] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [image, setImage] = useState('');
  const location = useLocation();
  const [name,setName] = useState<string>('Anonymous');

  const [preview, setPreview] = useState('');

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
      <div className="border-b p-4 grid grid-cols-2  items-center">
        <div className="font-bold ml-5 ">Medium</div>
        <div className="flex justify-end ">
          
        <button className=" mr-10 mt-2 cursor-pointer" onClick={async()=>{
           try{
            const resp = await axios.post("http://localhost:3001/api/v1/blog",{title:val,content:detail, image:image},{
              headers: {
                Authorization: token
              }
            });
            alert('done');
            navigate('/blog');
            console.log("logged in");
          }
          catch(err){
            console.log(err);
          }
        }}><FontAwesomeIcon icon={faPenToSquare} /> Submit</button>
        <div className=" w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center mr-5">{name.charAt(0).toUpperCase()}</div>
        </div>
      </div>
      
      <div className='flex flex-col'>
      <textarea 
        id="textarea"  
        rows={2} 
        cols={30} 
        onChange={e=>{setValue(e.target.value)}}
        className="w-1/2 mx-auto p-5 mt-10 font-bold text-2xl border-black border"
        placeholder="TITLE" 
      />
      <textarea 
        id="textarea"  
        rows={10} 
        cols={30} 
        onChange={e=>{setDetail(e.target.value)}}
        className="w-1/2 mx-auto p-5 mt-10 border border-black"
        placeholder="Type your Blog here..." 
      />
      <input 
          type="file" 
          accept="image/*" 
          onChange={e => {
            if (e.target.files) { // Check if 'files' is not null
              const file = e.target.files[0];
              if (file) {
                setImage(URL.createObjectURL(file));
                setPreview(URL.createObjectURL(file));
              }
            }
          }}
          className="w-1/2 mx-auto p-5 mt-10"
        />
        {preview && (
          <img 
            src={preview} 
            alt="Preview" 
            className="w-1/2 mx-auto p-5 mt-10"
          />
        )}
      </div>

    </div>
  );
}

export default Write;
