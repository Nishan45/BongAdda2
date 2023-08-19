import react, { useState } from "react";
import { createContext} from "react";
const noteContext=createContext();

const NoteState=(props)=>{
    const[state,setState]=useState({
        "name":" ",
        "email":"jsjsj",
        "password":"19929",
        "profImg":"./assets/grey.png",
        "backgroundImg":"./assets/grey.png",
        "discription":"",
        "newnotification":false,
        "about":{
            "nickname":"",
            "gender":"",
            "dob":"",
            "profile":"",
            "work":"",
            "curlocation":"",
            "hometown":"",
            "secondary":"",
            "hs":"",
            "graduation":"",
            "masters":""
        }
    })
    const[change,setChange]=useState(false)
    const update=(val)=>{
        setState(val);
    }
    const Change=(val)=>{
        setChange(val)
    }
    return(
        <noteContext.Provider value={{state,update,change,Change}}>
            {props.children}
        </noteContext.Provider>
    )

}

export default NoteState;
export {noteContext}