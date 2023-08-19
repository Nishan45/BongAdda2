import { View, Text, Dimensions, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SERVER_LINK from '../../MyFile';
import { FlatList } from 'react-native';
import Story from '../Story';

const height=Dimensions.get('window').height

const uri=SERVER_LINK+"/get_trending_stories";

function TrendJokes() {
    const[come,setCome]=useState(true)
    const [data,setData]=useState([]);
    const loaddata=async ()=>{
        try{
        await axios.post(uri,{category:"Jokes"}).then(res=>{
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
        {come?<ActivityIndicator size={'large'} style={{ marginTop:height/2-100}}/>:
        <FlatList  showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        data={data}
        initialNumToRender={4}
        renderItem={({item})=>(
            <Story
            name={item.name}
            img={item.profImg}
            type={item.category}
            body={item.body}
            title={item.title}
            author={item.author}
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


export default TrendJokes
