import { View, Text, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Story from '../Story';
import axios from 'axios';
import { noteContext } from '../../contexts/context';
import SERVER_LINK from '../../MyFile';

const uri=SERVER_LINK+"/get_user_stories";


export default function UserStories() {
  const [data,setData]=useState([]);
  const contexts=useContext(noteContext)
  const email=contexts.state.email

    const loaddata=async ()=>{
        try{
        await axios.post(uri,{category:"Short Story",email:email}).then(res=>{
            setData(res.data);
        })
    }catch(e){
            console.log(e);
        }
    }
    useEffect(()=>{
        loaddata();
    })
  return (
    <View>
        <FlatList  showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        data={data}
        initialNumToRender={4}
        renderItem={({item})=>(
            <Story
            name={item.name}
            img={item.profImg}
            title={item.title}
            body={item.body}
            author={item.author}
            postid={item._id}
            posttime={item.createdAt}
            user_id={item.user_id}
            user_only={true}
            />
        )}
        keyExtractor={(item)=>String(item._id)}
        /> 
    </View> 
  )
}