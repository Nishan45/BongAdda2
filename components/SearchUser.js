import { View, Text,Image ,Button} from 'react-native'
import React, { memo, useState } from 'react'
import  axios  from 'axios';
import ViewProfile from './ViewProfs/ViewProfile';
import SERVER_LINK from '../MyFile';


const urif=SERVER_LINK+"/get_follow";

export default memo(function SearchUser({email,name,profImg,user,nopost}) {

    const[follow,setFollow]=useState(null)
    const initialFollow=async ()=>{
        await axios.post(urif,{email:email,userf:user,checking:true}).then(res=>{
          if(res.data.yes){
            setFollow(true)
          }
          else{
            setFollow(false)
          }
        })
      }
      const Follow=async ()=>{
        await axios.post(urif,{email:email,userf:user,checking:false}).then(res=>{
          if(res.data.yes){
            setFollow(true)
          }
          else{
            setFollow(false)
          }
        })
      }
      

  return (
    <View style={{flexDirection:"row",marginLeft:'5%',marginTop:20,alignItems:"center",backgroundColor:"#F0FFFF"}}>
          <ViewProfile uri={profImg} email={user} diameter={40} margin={2} nopost={nopost}/>
            <Text adjustsFontSizeToFit={true}>{name}</Text>
            <View style={{position:"absolute",right:'5%',width:'30%'}}>
            {/*follow?<Button title="অনুসরণ করছি" color={"green"} onPress={Follow}/>:<Button title="অনুসরণ" onPress={Follow}/>*/}
        </View>

    </View>
  )
})