import { View, Text, Image, StyleSheet, Alert } from 'react-native'
import React,{memo, useContext, useState} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {Dimensions} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { noteContext } from '../contexts/context';
import getCurrentTime from './getCurrentTime';
import axios from 'axios';
import OtherComment from './OtherComment';
import SERVER_LINK from '../MyFile';
import ShareTo from './share/ShareTo';
import ViewProfile from './ViewProfs/ViewProfile';
import ViewPost from './ViewProfs/ViewPost';




const uri=SERVER_LINK+"/other_like";
const urif=SERVER_LINK+"/other_follow";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Story=({name,img,title,body,author,type,postid,posttime,user_only,user_id,viewProf})=>{
  const contexts=useContext(noteContext);
  const email=contexts.state.email;
  const user_name=contexts.state.name;
  const user_img=contexts.state.profImg
  const[islike,setIslike]=useState(null)
  const[likec,setLikec]=useState(0)
  const[follow,setFollow]=useState(null)

  let commentref=React.createRef()

  let time='';
  if(posttime){
    time=getCurrentTime(posttime)
  }

  const showComment=()=>{
    commentref.setpostid(postid,email,user_name);
    commentref.get_comments(postid)
    commentref.show();
  }
  const initiallike=async ()=>{
    await axios.post(uri,{email:email,postid:postid,checking:true}).then(res=>{
      if(res.data.yes){
        setIslike(true)
        setLikec(res.data.number)
        
      }
      else{
        setIslike(false)
        setLikec(res.data.number)
      }
    })
  }
  const initialFollow=async ()=>{
    await axios.post(urif,{email:email,postid:postid,checking:true}).then(res=>{
      if(res.data.yes){
        setFollow(true)
      }
      else{
        setFollow(false)
      }
    })
  }

  const Follow=async ()=>{
    await axios.post(urif,{email:email,postid:postid,checking:false}).then(res=>{
      if(res.data.yes){
        setFollow(true)
      }
      else{
        setFollow(false)
      }
    })
  }
  const sure=()=>Alert.alert('Confirmation', `Do you want to unfollow ${name}?`, [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {text: 'OK', onPress: Follow},
  ]);
  const check=()=>{
    if(follow){
      sure();
    }
    else{
      Follow()
    }
  }
  const like=async ()=>{
    await axios.post(uri,{email:email,postid:postid,checking:false}).then(res=>{
      if(res.data.yes){
        setIslike(true)
        setLikec(res.data.number)
      }
      else{
        setIslike(false)
        setLikec(res.data.number)
      }
    })
  }
  if(islike==null && postid){
    initiallike();
  }
 
  return (
    <View style={{
        marginLeft:5,
        marginRight:5,
        marginTop:10,
        
        backgroundColor:'white'
        
    }}>
    <View style={styles.container}>
    <View style={{flexDirection:"row",marginLeft:20}}>

     {!user_only&& email!=user_id &&<ViewProfile uri={img} diameter={50} email={user_id} margin={10} />}
      
    <View style={{justifyContent:"center"}} >
    {!user_only&& email!=user_id && <Text style={{fontWeight:"bold",fontSize:15}}>{name}</Text>}
    {(!user_only&& email!=user_id ) ?<Text style={{fontSize:10}}>{time}</Text>:<Text style={{fontSize:10,margin:10}}>{time}</Text>}
    </View>
    </View>
    
    </View >
    <ViewPost story={true} title={title} body={body} author={author}/>
    
    <View style={{flexDirection:'row',marginBottom:10,alignItems:"center"}}>
        {islike?<AntDesign name="heart" size={40} color="red" style={{marginLeft:20,padding:10}} onPress={like} />:<AntDesign name="hearto" size={40} color="black" style={{marginLeft:20,padding:10}} onPress={like} />}
        <Text style={{fontSize:20}}>{likec}</Text>
        {!viewProf &&
        <FontAwesome5 name="comment" size={40} color="black" style={{marginLeft:20,padding:10}}
        onPress={showComment}/>}
        {!viewProf &&
        <ShareTo postid={postid} category={type}/>}
    </View>
    {!viewProf &&
    <OtherComment
    ref={(target)=>commentref=target}
    />}

    </View>

  )
}

const styles = StyleSheet.create({
    container:{
      flexDirection: 'row', 
      alignItems:"center" 
        
    },
    tinyLogo: {
      width: 50,
      height: 50,
      marginRight:10,
      marginTop:10,
      marginBottom:10,
      borderRadius:50,
      backgroundColor:"#DCDCDC"
    },
    post:{

        width: windowWidth-10,
        height:windowHeight/2,
        
    }
    
  });

export default memo(Story)