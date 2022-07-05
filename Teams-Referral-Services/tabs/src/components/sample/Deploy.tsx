import "./Deploy.css";
import React,{CSSProperties, useEffect,useState, FormEvent} from 'react'
import useInputState from "../../hooks/useInputState";
import { Design } from "./Design";
import "./Modal.css";
import {Button} from "@fluentui/react-northstar";

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

const [modal, setModal] = useState(false);
const [itemData, setItemData] = useState<Profile>();

  const toggleModal1 = (e : React.FormEvent, item : Profile) => {
    setModal(!modal);
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
  };

  const toggleModal2 = () => {
    setModal(!modal);
  }

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

// users.map((item : Profile, i) => console.log(item))

const sendForm = async (e : FormEvent<HTMLFormElement>) => {

  const { FirstName, LastName, InputEmail, MobileNo, Location, Relation, About, Code} = e.target as typeof e.target & {
    FirstName: {value: string}
    LastName: {value: string}
    InputEmail: {value: string}
    MobileNo: {value: string}
    Location: {value: string}
    Relation: {value: string}
    About: {value: string}
    Code: {value: string}
  }
    console.log(FirstName.value);
    console.log(LastName.value);

    const profileId = (itemData?.profileId)?.toString();

    var url = 'https://localhost:7119/profiles/update/'

    url = url + profileId;

    await fetch(url, {
      headers: {
        'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify({
        firstName: FirstName.value,
        lastName: LastName.value,
        emailId: InputEmail.value,
        mobileNo: MobileNo.value,
        location: Location.value,
        relation: Relation.value, 
        about: About.value,
        code: Code.value
      })
    })
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
              <td><button  onClick={(e) => {toggleModal1(e, item);}}>Refer</button></td>
          </tr>
          )
        }
       </tbody>
      </table>
      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <h3 style={{textAlign: "center"}}>Edit details and Refer</h3>
            <br />
            <form onSubmit={(e) => {sendForm(e)}}>

                  <label htmlFor="FirstName">Candidate's First Name</label><br />
                  <input {...FirstName.values} type="text" name="FirstName" id="FirstName" aria-describedby="First Name" placeholder="Enter First Name" style={{margin:"5px 0 5px 0"}}/><br />
                  
                  <label htmlFor="LastName">Candidate's Last Name</label><br />
                  <input {...LastName.values} type="text" name="LastName" id="LastName" aria-describedby="Last Name" placeholder="Enter Last Name" style={{margin:"5px 0 5px 0"}}/><br />

                  <label htmlFor="InputEmail">Email address</label><br />
                  <input {...InputEmail.values} name="InputEmail" id="InputEmail" type="email" aria-describedby="emailHelp" placeholder="Enter email" style={{margin:"5px 0 5px 0"}}/><br />

                  <label htmlFor="MobileNo">Mobile Phone</label><br />
                  <input {...MobileNo.values} name="MobileNo" id="MobileNo" type="text" aria-describedby="Mobile Number" placeholder="Enter Phone Number" style={{margin:"5px 0 5px 0"}}/><br />

                  <label htmlFor="Location">Location</label><br />
                  <input {...Location.values} name="Location" id="Location" type="text" aria-describedby="Location" placeholder="Enter Location" style={{margin:"5px 0 5px 0"}}/><br />

                  <label htmlFor="search">Search for Job IDs</label><br />
                  <input type="text" id="search" aria-describedby="Search for Job IDs" placeholder="Enter ID"  style={{margin:"5px 0 5px 0"}}/><br />

                  <label htmlFor="Position">Which job profile are you referring the candidate for?</label><br />
                  <input type="text" id="Position" aria-describedby="Job Profile" placeholder="Enter Job Profile"  style={{margin:"5px 0 5px 0"}}/><br />

                  <label htmlFor="Relation">How do you know this person?</label><br />
                  <input type="text" name="Relation" id="Relation" aria-describedby="Your Relation to the person" placeholder="Enter here" style={{margin:"5px 0 5px 0"}}/><br />
                  
                  <label htmlFor="About">Please provide any additional information regarding the candidate</label><br />
                  <textarea {...About.values} name="About" id="About"></textarea><br/>

                  <label htmlFor="Code">Referral campaign code</label><br />
                  <input type="text" name="Code" id="Code" aria-describedby="Referral campaign code" placeholder="Enter Code here" style={{margin:"5px 0 5px 0"}}></input><br /><br />

                  <Button type="submit">Save Profile</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button>Submit Referral</Button>
                  
            </form>
            <button className="close-modal" onClick={toggleModal2}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
