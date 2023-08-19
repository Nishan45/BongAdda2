import { View, Text, Modal, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import ViewProfile from '../ViewProfs/ViewProfile'
import SERVER_LINK from '../../MyFile'
import axios from 'axios';
import { noteContext } from '../../contexts/context';

const uri=SERVER_LINK+"/share";

export default function Share({email,name,profImg,user,postid,category}) {
  const[sent,setSent]=useState(false)
  const context=useContext(noteContext);

  const send=async()=>{
    await axios.post(uri,{self:email,to:user,postid:postid,category:category,text:"একটি পোস্ট Share করেছেন"}).then(
      res=>{
        setSent(true)
      }
    )
  }

  return (
    <View style={{flexDirection:"row",marginLeft:20,marginTop:20,alignItems:"center"}}>
        <ViewProfile uri={profImg} email={user} diameter={40} margin={2}/>
            <Text>{name}</Text>
            <View style={{position:"absolute",right:20,width:120}}>
            {!sent?<Button title="পাঠান" onPress={send}/>:<Button title='পাঠানো হয়েছে' color={'green'}/>}
            </View>

    </View>
  )
}