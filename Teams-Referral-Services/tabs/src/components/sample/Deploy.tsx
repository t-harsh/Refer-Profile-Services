import "./Deploy.css";
import React,{CSSProperties, useEffect,useState} from 'react'
import useInputState from "../../hooks/useInputState";
import { Design } from "./Design";


type Profile = {
  profileId: string;
  firstName: string;
  lastName: string;
  emailId: string;
  mobileNo: string;
  location: string;
  relation: string;
  exampleRadios1: boolean;
  exampleRadios2: boolean;
  about: string;
  code: string;
}

// interface dataFormProps{
//   autoFill: (prof : Profile)=>void;
// }


export function Deploy() {

  const FirstName = useInputState();
  const LastName = useInputState();
  const InputEmail = useInputState();
  const MobileNo = useInputState();
  const Location = useInputState();
  const About = useInputState();

  const [users,setUser]=useState([]);

  const fetchData=()=>{
    fetch("https://localhost:7119/profiles")
    .then((response) => {
      return response.json();
    }).then((data)=>{
      console.log(data);
      setUser(data);
    })
  }

  useEffect(()=>{
    fetchData();
  },[])


const column = [
  {heading: 'S No.'},
  {heading: 'First Name'},
  {heading: 'Email Id'},
  {heading: 'Mobile No'},
  {heading: 'Refer Again'}
]

// users.map((item : Profile, i) => console.log(item))
const [itemData, setItemData] = useState<Profile>();

function clickHandler(item : Profile) {
  setItemData(item);
  console.log(itemData);
  if(item){
    FirstName.handleSet(item.firstName as string);
    LastName.handleSet(item.lastName as string);
    InputEmail.handleSet(item.emailId as string);
    MobileNo.handleSet(item.mobileNo as string);
    Location.handleSet(item.location as string);
    About.handleSet(item.about as string);
    console.log("updated refer again");
  }
}

  return (
    <div className="App">
      <h1>Previously Referred Candidate Profiles:</h1>
      {/* <table style={getListStyle()}> */}
      <br></br>
      <table>
       <thead>
       <tr>
          <td>S No.</td>
          <td>First Name</td>
          <td>Email Id</td>
          <td>Mobile No.</td>
          <td>Refer Again</td>
        </tr>
        </thead>
        <tbody>
        {
          users.map((item : Profile ,i)=>
            <tr key={i}>
              <td>{i+1}</td>
              <td>{item.firstName}</td>
              <td>{item.emailId}</td>
              <td>{item.mobileNo}</td>
              <td><button onClick={(event) => {clickHandler(item)}}>Refer</button></td>
          </tr>
          )
        }
       </tbody>
      </table>
    </div>
  );
}
