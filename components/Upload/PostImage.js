import { View, Text,Pressable } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'react-native';
import { Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import upload_cloud from '../../upload_cloud';
import { noteContext } from '../../contexts/context';
import { useContext } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import SERVER_LINK from '../../MyFile';
import { Dimensions } from 'react-native';
import {
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';
import { jpg } from '@cloudinary/url-gen/qualifiers/format';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const uri=SERVER_LINK+'/upload_postImg';

function notifyMessage(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  } else {
    AlertIOS.alert(msg);
  }
};

export default function PostImage() {
  const[text,setText]=useState("")
  const[image,setImg]=useState(null)
  const contexts=useContext(noteContext);
  const [Result,setResult]=useState(null);
  const [loading,setLoading]=useState(false)

  const email=contexts.state.email

  const load=async(link)=>{
    try{
    await axios.post(uri,{email:email,image:link,discription:text})
      
    }catch(e){
      console.log(e);
    }
  }

  const setBackimg= async ()=>{
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.JPG,
      base64:true,
      quality: 1,

    });

    if (!result.canceled) {
      setResult(result);
      setImg(result.assets[0].uri); 
      setImageSize(result.assets[0].uri)
    }
  }

  const upload=async ()=>{
    if(Result==null){
      notifyMessage('choose an image')
      return;
    }
    setLoading(true)
    await upload_cloud(Result).then(uri=>{
      load(uri);
      setImg("../assets/grey.png");
      setText('')
      setLoading(false)
      setResult(null)
      
    })
  }

  const[image_width,setWidth]=useState(0)
  const[image_height,setHeight]=useState(0)

  const setImageSize=(uri)=>{
      Image.getSize(uri,(width,height)=>{
          setHeight(height)
          setWidth(width)
      })
  }
    
  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
    <View  style={style.container}>
    <Spinner
          
          visible={loading}
          
          textContent={'Uploading...'}
          
          textStyle={style.Spinner}
      />
      <View style={{flexDirection:"row",marginTop:10}}>
      <TextInput
      style={style.text}
      
      onChangeText={setText}
      value={text}
      placeholder='এখানে কিছু লিখুন'
      />
      
      <Pressable style={{marginTop:5}} onPress={setBackimg}>
      <MaterialCommunityIcons name="image-edit" size={40} color="blue" />
      </Pressable>
      </View>
      
      <View style={style.button}>
      <Button
      title='আপলোড'
      onPress={upload}
      />
      </View>
      <View  style={{justifyContent:"center",alignItems:"center"}}>
      {image_width!=0 && image_height!=0 &&<Image
      source={{uri:image}}
      style={{
        width:windowWidth-10,
        height:Math.floor((image_height/image_width)*(windowWidth-10))
      }}/>
    }
      </View>
      
    </View>
    </KeyboardAwareScrollView>
  )
}

const style=StyleSheet.create({
  container:{
    justifyContent:"center",
    alignItems:"center"
  },
  text:{
    padding:10,
    width:300,
    height:50,
    fontSize:18,
    elevation:5,
    borderRadius:20,
    backgroundColor:"white"

  },
  
  button:{
    marginTop:10,
    width:windowWidth,
    margin:10
  },
  Spinner:{
    color: '#FFF'
  }
})