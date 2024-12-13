/* eslint-disable @typescript-eslint/no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare,faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Card from './Card';
import { useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


interface arrayval {
  id: string;
  title: string;
  authorId:string;
  content:string;
  published:boolean;
  image:string;
  author: {
    name: string;
  };
  // Define other properties if available
}
function Blog() {
  const navigate = useNavigate();
  const [values,setValues] = useState<arrayval[]>([]);
  const [values2,setValues2] = useState<arrayval[]>([]);
  const [values3,setValues3] = useState<string>("");
  const token = localStorage.getItem('token');
  const [selected, setSelected] = useState<string|null>('For You');
  useEffect(() => {
    fetchdata();
    fetchdata2();

  },[]);

  const [bf,setBf] = useState(true);
  const [bff,setBff] = useState(false);

  async function fetchdata() {
    const val = await axios.get("http://localhost:3001/api/v1/blog/bulk",{
      headers: {
        Authorization: token
      }
    })
    const posts:arrayval[] = val.data.post
    
    setValues(posts);
  }
  async function fetchdata2() {
    const val = await axios.get("http://localhost:3001/api/v1/blog",{
      headers: {
        Authorization: token
      }
    })
    
 
    const posts:arrayval[] = val.data.post
    console.log(posts);
    setValues2(posts);
  }

  async function fetchdata3(idd: string){
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

  console.log(values);
  return (
    <div>
      
      <div className="text-sm breadcrumbs">
      <ul className='flex justify-start mx-auto p-2 border-b-2 w-1/2 space-x-5 mt-6 text-md'>
        <li className='cursor-pointer' style={{backgroundColor: selected === 'For You' ? 'gray' : 'transparent', borderRadius: '12px'}}>
          <a style={{padding: '10px 20px', display: 'block', color: 'black', textDecoration: 'none'}} onClick={() => {
            setBf(true);
            setBff(false);
            setSelected('For You');
          }}>For You</a>
        </li>
        <li className='cursor-pointer' style={{backgroundColor: selected === 'Yours' ? 'gray' : 'transparent', borderRadius: '12px'}}>
          <a style={{padding: '10px 20px', display: 'block', color: 'black', textDecoration: 'none'}} onClick={() => {
            setBf(false);
            setBff(true);
            setSelected('Yours');
          }}>Yours</a>
        </li>
      </ul>
    </div>
      


      {bf&&(<div>
      {values.map((value)=>{
        const idd = value.authorId;
        console.log("authorid : ", idd)
        fetchdata3(idd);
        const namm = value.author.name;
        return(
          <div
          key={value.id}
          className="flex flex-col justify-center w-1/2 mx-auto p-5 mt-10 cursor-pointer"
          onClick={() => navigate('/page', { state: { ...value } }) }
                  >
          <Card names={value.title} content={value.content} authorid={value.authorId} name={namm} image={value.image} />
        </div>
        )
      })
      }
      </div>)}
      {bff&&(<div>
        {values2.map((value)=>{
        return(
          <div
          key={value.id}
          className="flex flex-col justify-center w-1/2 mx-auto p-5 mt-10"
          onClick={() => navigate(`/page`,{ state: { ...value } })}
        >
          <Card names={value.title} content={value.content}  authorid={value.authorId} image={value.image}/>
        </div>
        )
      })
      }
      </div>)}
    </div>
  );
}

export default Blog;
