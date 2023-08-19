import { View, Text, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { noteContext } from '../../contexts/context';
import axios from 'axios';
import HomePost from '../HomePost';
import SERVER_LINK from '../../MyFile';


const uri=SERVER_LINK+"/get_user_images";


export default function UserImages() {
    const contexts=useContext(noteContext)
    const email=contexts.state.email

    const[data,setData]=useState([]);

    

    const loaddata=async ()=>{
        try{
        await axios.post(uri,{email:email}).then(res=>{
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
            <HomePost
            discription={item.discription}
            name={item.name}
            img={item.image}
            profimg={item.profImg}
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