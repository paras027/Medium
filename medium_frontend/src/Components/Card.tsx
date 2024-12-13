/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function Card(props: any){
    // const [values3,setValues3] = useState<string>("");
    // useEffect(() => {
    //     fetchdata3();

    //   },[]);
      const vall = props.name?props.name:"Anonymous";
      // const idd = props.authorid;
      // console.log("authorid : ", idd)
      
      // async function fetchdata3(){
      //   const val = await axios.get(`http://localhost:3001/api/v1/blog/values/${idd}`,{
      //     headers: {
      //       Authorization: token
      //     }
      //   })
      //   console.log("value : ",val.data.post[0].author);
      //   const names:string = val.data.post[0].author.name;
      //   console.log("Names: ",names);
      //   if(names === null){
      //       console.log("anonymous");
      //       setValues3("anonymous");
      //   }
      //   else{
           
      //       setValues3(names);
      //   }
      // }
    const truncatednames = props.names.substring(0, 86); // Limiting content to 100 characters
    const displaynames = props.names.length > 86 ? `${truncatednames}...` : props.names;
    const truncatedContent = props.content.substring(0, 130); // Limiting content to 100 characters
    const displayContent = props.content.length > 130 ? `${truncatedContent}...` : props.content;
    
    return (
        <div className="border flex flex-col justify-center w-full mx-auto p-5 mt-10  ">
            <div className="flex flex-row space-x-3 items-center">
            <div className=" w-7 h-7 bg-gray-300 rounded-full flex justify-center items-center">{vall.charAt(0).toUpperCase()}</div>
            <div> {vall.charAt(0).toUpperCase()+vall.slice(1)}</div>
            </div>
            <div className="flex space-x-10 w-full p-5">
                <div className="flex-col w-2/3 overflow-hidden max-h-50">
            <div className="font-bold text-2xl break-words"> {displaynames.toUpperCase()}</div>
            <div className="overflow-hidden break-words mt-3"> {displayContent}</div>
            </div>
            {
                props.image&&
                (
                    <img src={props.image} width="100" className=" max-w-44 max-h-60 object-cover "/>
                )
            }
            </div>
        </div>
    );

}