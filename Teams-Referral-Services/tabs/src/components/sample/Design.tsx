import { Button, CardFooter, CardHeader, CardBody, Card, Flex, Text } from "@fluentui/react-northstar";
import { ResumeParse } from "./resume";
import React, {useEffect, useState , useRef, FormEvent, ChangeEvent} from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import useInputState from "../../hooks/useInputState";
import { Deploy } from "./Deploy"; 

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


export function Design() {

  const FirstName = useInputState();
  const LastName = useInputState();
  const InputEmail = useInputState();
  const MobileNo = useInputState();
  const Location = useInputState();
  const About = useInputState();


  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const changeHandler = async(event : React.FormEvent) => {
    const target = event.target as HTMLFormElement;

		setSelectedFile(target.files[0]);
    const result = await ResumeParse(selectedFile as File)
    console.log(result);

    const url = URL.createObjectURL(target.files[0]);
    console.log("The url to file is:");
    console.log(url);

    // FirstName.handleSet(result.fname);

    if(result){
    FirstName.handleSet(result.data?.name?.first as string);
    LastName.handleSet(result.data?.name?.last as string);
    InputEmail.handleSet(result.data?.emails?.[0] as string);
    MobileNo.handleSet(result.data?.phoneNumbers?.[0] as string);
    Location.handleSet(result.data?.location?.state as string);
    About.handleSet(result.data?.profession as string);
  }
};


  const sendForm = async (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    
    await fetch('https://localhost:7119/profiles/create', {
      headers: {
        'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      method: 'POST',
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

  const fillReferral = (prof : Profile) => {
    if(prof){
      FirstName.handleSet(prof.firstName as string);
      LastName.handleSet(prof.lastName as string);
      InputEmail.handleSet(prof.emailId as string);
      MobileNo.handleSet(prof.mobileNo as string);
      Location.handleSet(prof.location as string);
      About.handleSet(prof.about as string);
    }
  }

  return (
    <div>
      <form onSubmit={(e) => {sendForm(e)}}>
        <div>
          
            <Card aria-roledescription="card avatar"
              elevated
              inverted
              styles={{ height: "260px", width: "770px", background: "white", borderRadius: "12px 12px" }}>
              <Flex gap="gap.small" column fill vAlign="stretch" space="between" >
                <CardHeader>
                  <Text content="Upload Resume/LinkedIn" weight="bold" size="large" align="center"/>
                </CardHeader>
                <CardBody>
                  <small id="RandInfo">Either upload the candidate's resume or provide a link to their LinkedIn profile.</small>
                  <br></br>
                  <label htmlFor="customFile">Upload Resume</label>
                  <input type="file" name = "file" onChange={changeHandler}/>
                  <p><i>OR</i></p>
                  <label htmlFor="uploadLinkedIn">Upload LinkedIn</label>
                  <input type="text" id="uploadLinkedIn" placeholder="Paste link here" />

                </CardBody>
              </Flex>
            </Card>
        <html>
            <body>
              <br></br>
            </body>
        </html>

        <Flex gap="gap.small" space="around">
          <Flex gap="gap.small" column space="around">
            <Card aria-roledescription="card avatar"
              elevated
              inverted
              styles={{ height: "320px", width: "370px", background: "white", borderRadius: "12px 12px" }}>
              <Flex gap="gap.small" column fill vAlign="stretch" space="around" >
                <CardHeader>
                  <Text content="Primary Information" weight="bold" size="large" align="center"/>
                </CardHeader>
                <CardBody>
                  <label htmlFor="FirstName">Candidate's First Name</label>
                  <input {...FirstName.values} type="text" name="FirstName" id="FirstName" aria-describedby="First Name" placeholder="Enter First Name" style={{margin:"5px 0 5px 0"}}/>
                  
                  <label htmlFor="LastName">Candidate's Last Name</label>
                  <input {...LastName.values} type="text" name="LastName" id="LastName" aria-describedby="Last Name" placeholder="Enter Last Name" style={{margin:"5px 0 5px 0"}}/>

                  <label htmlFor="InputEmail">Email address</label>
                  <input {...InputEmail.values} name="InputEmail" id="InputEmail" type="email" aria-describedby="emailHelp" placeholder="Enter email" style={{margin:"5px 0 5px 0"}}/>

                  <label htmlFor="MobileNo">Mobile Phone</label>
                  <input {...MobileNo.values} name="MobileNo" id="MobileNo" type="text" aria-describedby="Mobile Number" placeholder="Enter Phone Number" style={{margin:"5px 0 5px 0"}}/>

                  <label htmlFor="Location">Location</label>
                  <input {...Location.values} name="Location" id="Location" type="text" aria-describedby="Location" placeholder="Enter Location" style={{margin:"5px 0 5px 0"}}/>
                </CardBody>
              </Flex>
            </Card>
          

        
         
            <Card aria-roledescription="card avatar"
              elevated
              inverted
              styles={{ height: "200px", width: "370px", background: "white", borderRadius: "12px 12px" }}>
              <Flex gap="gap.small" column fill vAlign="stretch" space="around" >
                <CardHeader>
                  <Text content="Professional Information" weight="bold" size="large" align="center" />
                </CardHeader>
                <CardBody>
                  <label htmlFor="search">Search for Job IDs</label>
                  <input type="text" id="search" aria-describedby="Search for Job IDs" placeholder="Enter ID"  style={{margin:"5px 0 5px 0"}}/>

                  <label htmlFor="Position">Which job profile are you referring the candidate for?</label>
                  <input type="text" id="Position" aria-describedby="Job Profile" placeholder="Enter Job Profile"  style={{margin:"5px 0 5px 0"}}
                  />
                </CardBody>
              </Flex>
            </Card>
          </Flex>
            <Card aria-roledescription="card avatar"
              elevated
              inverted
              styles={{ height: "530px", width: "370px", background: "white", borderRadius: "12px 12px" }}>
              <Flex gap="gap.small" column fill vAlign="stretch" space="between" >
                <CardHeader>
                  <Text content="Additional Information" weight="bold" size="large" align="center"/>
                </CardHeader>
                <CardBody>
                  <label htmlFor="Relation">How do you know this person?</label>
                  <input type="text" name="Relation" id="Relation" aria-describedby="Your Relation to the person" placeholder="Enter here" />

                  <p>Do you endorse this person professionally and recommend them as a hire?</p>
                  <div className="form-check">
                    <input type="radio" name="ExampleRadios1" id="ExampleRadios1" value="option1" checked={true} />
                    <label htmlFor="ExampleRadios1">
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                    <input type="radio" name="ExampleRadios1" id="ExampleRadios2" value="option2" />
                    <label htmlFor="ExampleRadios2">
                      I don't know enough.
                    </label>
                  </div>

                  <p>Is your referral a current university student or recent graduate (within last 12 months)?</p>
                  <div className="form-check">
                    <input type="radio" name="ExampleRadios2" id="ExampleRadios3" value="option1" checked={true} />
                    <label htmlFor="ExampleRadios3">
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                    <input type="radio" name="ExampleRadios2" id="ExampleRadios4" value="option2" />
                    <label htmlFor="ExampleRadios4">
                      No
                    </label>
                  </div>
                  <label htmlFor="About">Please provide any additional information regarding the candidate’s experience, skills, knowledge, etc. (maximum 2000 characters)</label>
                  <textarea {...About.values} name="About" id="About"></textarea>

                  <label htmlFor="Code">Referral campaign code</label>
                  <input type="text" name="Code" id="Code" aria-describedby="Referral campaign code" placeholder="Enter Code here"></input>
                </CardBody>
              </Flex>
            </Card>
          </Flex>
          <Flex space="around" style={{margin:"20px"}} >
          <Button type="submit">Save Profile</Button>
          <Button>Submit Referral</Button>
          </Flex>
        </div>
      </form>
      {/* <Deploy autoFill = {fillReferral}/> */}
    </div>
  )
}