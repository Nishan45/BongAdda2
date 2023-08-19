import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import HomePost from '../HomePost'
import SERVER_LINK from '../../MyFile'
import axios from 'axios'
import Story from '../Story'

const uri=SERVER_LINK+"/get_post_info"

export default function SharedPost({text,item}) {
    const[show,setShow]=useState(false)
    const[post,setPost]=useState([])
    const close=()=>{
        setShow(false)
    }
    const loadPost=async()=>{
        await axios.post(uri,{postid:item.postid,category:item.category}).then(res=>{
            setPost(res.data)
        })
    }
  return (
    <>
    <TouchableOpacity onPress={()=>{setShow(true); loadPost();}}>
        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontSize:17}}>{text}</Text>
        <Text style={{fontSize:17,color:"#0096FF"}}>  দেখুন</Text>
        </View>
    </TouchableOpacity>
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={show}
      onRequestClose={close}
      >
        <View style={{backgroundColor:'black',flex:1,justifyContent:"center"}}>
        {post.name && item.category=='image'&&<HomePost name={post.name} img={post.image} profimg={post.profImg} discription={post.discription} postid={post._id} posttime={item.time} user_id={post.user_id}/>}
        {post.name && item.category!='image' && post.category!='Jokes' && <Story name={post.name} img={post.profImg} title={post.title} body={post.body} author={post.author} type={post.category} postid={post._id} posttime={item.time} user_id={post.user_id} />}
        {post.name && post.category=='Jokes' && <Story name={post.name} img={post.profImg}  body={post.body} author={post.author} type={post.category} postid={post._id} posttime={item.time} user_id={post.user_id} />}
        </View>

    </Modal>
    </>
  )
}