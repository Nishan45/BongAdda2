import { View, Text, Modal, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import HomePost from '../HomePost'
import SERVER_LINK from '../../MyFile'
import axios from 'axios'
import Story from '../Story'
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';


const uri = SERVER_LINK + "/get_post_info"

export default function SharedPost({ text, item }) {
  const [show, setShow] = useState(false)
  const [post, setPost] = useState([])
  const{t}=useTranslation();

  const close = () => {
    setShow(false)
  }
  const loadPost = async () => {
    await axios.post(uri, { postid: item.postid, category: item.category }).then(res => {
      setPost(res.data)
    })
  }
  const { width, height } = useWindowDimensions();

  return (
    <>
      <TouchableOpacity onPress={() => { setShow(true); loadPost(); }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 17 }}>{t(text)}</Text>
          <Text style={{ fontSize: 17, color: "#0096FF" }}>  {t("View")}</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={show}
        onRequestClose={close}
      >
        <View style={{ backgroundColor:'#000000AA', flexDirection: 'row', flex: 1, justifyContent: "center" }}>
          {width >= 700 ? <TouchableOpacity style={{ width:'25%' }} onPress={close} /> : null}
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="close-circle" size={40} color="#CCD1D1" onPress={close} style={{position:'absolute',margin:'auto',top:10,right:10,zIndex:4}}/>
            {(post.name && item.category == 'image') ? <HomePost name={post.name} img={post.image} profimg={post.profImg} discription={post.discription} postid={post._id} posttime={item.time} user_id={post.user_id} likes={post.likeCount} /> : null}
            {(post.name && item.category != 'image' && post.category != 'Jokes') ? <Story name={post.name} img={post.profImg} title={post.title} body={post.body} author={post.author} type={post.category} postid={post._id} posttime={item.time} user_id={post.user_id} likes={post.likeCount} /> : null}
            {(post.name && post.category == 'Jokes') ? <Story name={post.name} img={post.profImg} body={post.body} author={post.author} type={post.category} postid={post._id} posttime={item.time} user_id={post.user_id} likes={post.likeCount}/> : null}
          </View>
          {width >= 700 ? <TouchableOpacity style={{ width:'25%' }} onPress={close} /> : null}
        </View>

      </Modal>
    </>
  )
}