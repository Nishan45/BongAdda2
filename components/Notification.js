import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import SERVER_LINK from '../MyFile'
import axios from 'axios';
import { noteContext } from '../contexts/context';
import { FlatList } from 'react-native';
import GetNotification from './GetNotification';
import { Dimensions } from 'react-native';

const urign=SERVER_LINK+"/get_notification"
const urin=SERVER_LINK+"/notify";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function Notification() {
  const context=useContext(noteContext);
  const email=context.state.email
  const[data,setData]=useState([]);

  const[come,setCome]=useState(true)

  const loaddata=async()=>{
    await axios.post(urign,{email:email}).then(res=>{
      setData(res.data)
      
  })
  setCome(false)
}
  
  
  useEffect(()=>{
    loaddata();
  },[data])
 
  
  return (
    <>
    
      <View>

      {come?
      <ActivityIndicator size={'large'} style={{marginTop:windowHeight/2-100}}/>:
      (data.length>0?
      <View style={{backgroundColor:"white"}}>
      
        <FlatList  showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        data={data}
        initialNumToRender={8}
        renderItem={({item})=>(
            <GetNotification item={item}/>
        )}
        keyExtractor={(item,index)=>index}
        />
        
        </View>:
        <View style={{alignItems:"center"}}>
        <Text style={{marginTop:windowHeight/2}}>কোন বিজ্ঞপ্তি নেই</Text>
        </View>


      )}
        </View>

    </>
    
  )
}