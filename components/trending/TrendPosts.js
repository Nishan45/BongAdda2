import { View, Text, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import SERVER_LINK from '../../MyFile';
import { noteContext } from '../../contexts/context';
import axios from 'axios';
import HomePost from '../HomePost';


const uri=SERVER_LINK+"/get_trending_posts";

const height=Dimensions.get('window').height

export default function TrendPosts({navigation}) {
    const contexts=useContext(noteContext)
    const email=contexts.state.email

    const[data,setData]=useState([]);
    
    const[come,setCome]=useState(true)
    
    const loaddata=async ()=>{
        try{
        await axios.post(uri,{email:"email"}).then(res=>{
            setData(res.data);
            
        })
    }catch(e){
            console.log(e);
        }
        setCome(false)
    }
    useEffect(()=>{
        
        loaddata();
    })


  return (
    <View>
        {come?<ActivityIndicator size={'large'} style={{marginTop:height/2-100}}/>:
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
            user_id={item.user_id}
            />
        )}

        keyExtractor={(item)=>String(item._id)}
        />
}
    </View>
    
  )
}