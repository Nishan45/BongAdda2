import { View, Text, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { noteContext } from '../../contexts/context';
import axios from 'axios';
import Story from '../Story';
import SERVER_LINK from '../../MyFile';


const uri=SERVER_LINK+"/get_user_stories";


export default function UserJokes() {
  const [data,setData]=useState([]);
  const contexts=useContext(noteContext)
  const email=contexts.state.email

  const loaddata=async ()=>{
        try{
        await axios.post(uri,{category:"Jokes",email:email}).then(res=>{
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
            body={item.body}
            author={item.author}
            postid={item._id}
            posttime={item.createdAt}
            user_only={true}
            user_id={item.user_id}
            />
        )}
        keyExtractor={(item)=>String(item._id)}
        />
        
    </View>
  )
}