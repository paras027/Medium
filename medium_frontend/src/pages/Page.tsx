/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Page(){
    const location = useLocation();
  const { title, content, authorId, image} = location.state;
  const [values3,setValues3] = useState<string>("");
    useEffect(() => {
        fetchdata3();

      },[]);
      const token = localStorage.getItem("token");
      const idd = authorId;
      console.log("authorid : ", idd)
      
      async function fetchdata3(){
        const val = await axios.get(`http://localhost:3001/api/v1/blog/values/${idd}`,{
          headers: {
            Authorization: token
          }
        })
        console.log("value : ",val.data.post[0].author);
        const names:string = val.data.post[0].author.name;
        console.log("Names: ",names);
        if(names === null){
            console.log("anonymous");
            setValues3("anonymous");
        }
        else{
           
            setValues3(names);
        }
    }
  const valuees = title.toUpperCase();
    return(
        <>
            <div className="border flex flex-col justify-center w-1/2 mx-auto p-5 mt-10  ">
            <div className="flex flex-row space-x-3 p-5 items-center">
            <div className=" w-7 h-7 bg-gray-300 rounded-full flex justify-center items-center">{values3.charAt(0).toUpperCase()}</div>
            <div className="text-xl"> {values3.charAt(0).toUpperCase()+values3.slice(1)}</div>
            </div>
            <div className="flex flex-col space-x-10 w-full p-5 mx-auto text-left">
                <div className=" overflow-hidden max-h-50 p-5">
            <div className="font-bold text-4xl break-words">{valuees}</div>
            <div className="overflow-hidden text-2xl pt-10 break-words mt-3">{content}</div>
            </div>
            <div className="flex justify-center p-5">
            <img src={image} className=" w-1/2 object-cover" />
            </div>
            </div>
        </div>
        </>
    );

}


export default Page;