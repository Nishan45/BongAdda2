import { View, Text, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import SERVER_LINK from '../../MyFile';
import ViewHomeStory from '../ViewHomeStory';

const uri=SERVER_LINK+"/get_user_stories";


export default function ViewJokes({email}) {
    const [data,setData]=useState([]);
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
            <ViewHomeStory
            name={item.name}
            img={item.profImg}
            body={item.body}
            author={item.author}
            title={item.title}
            postid={item._id}
            posttime={item.createdAt}
            user_id={item.user_id}
            user_only={true}
            viewProf={true}
            />
        )}
        keyExtractor={(item)=>String(item._id)}
        /> 
    </View> 
  )
}