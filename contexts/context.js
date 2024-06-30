import react, { useState } from "react";
import { createContext} from "react";
const noteContext=createContext();

const NoteState=(props)=>{
    const[state,setState]=useState({
        "name":" ",
        "email":"jsjsj",
        "password":"19929",
        "profImg":"",
        "backgroundImg":"",
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
    const[lang,setLang]=useState('English')
    const update=(val)=>{
        setState(val);
    }
    const Change=(val)=>{
        setChange(val);
    }
    const ChangeLang=(val)=>{
        setLang(val);
    }
    return(
        <noteContext.Provider value={{state,update,change,Change,lang,ChangeLang}}>
            {props.children}
        </noteContext.Provider>
    )

}

export default NoteState;
export {noteContext}