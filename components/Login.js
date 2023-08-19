import { View, Text, Button, Alert, Image, ImageBackground} from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native'
import { StyleSheet } from 'react-native';
import { Pressable } from 'react-native';
import axios from 'axios';
import { noteContext } from '../contexts/context';
import { useContext } from 'react';
import { Dimensions } from 'react-native';
import {
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


const image=require('../assets/BongAdda.jpg')

import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAvoidingView } from 'react-native-web';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SERVER_LINK from '../MyFile';

const width = Dimensions.get('window').width;


const uri=SERVER_LINK+"/login";

function notifyMessage(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  } else {
    AlertIOS.alert(msg);
  }
};


let loading=false

export default function Login({navigation}) {
  
  const [email,setemail] = React.useState('');
  const [password,setpassword] = React.useState('');
  const [load,setLoad]=useState(false)

  const contexts=useContext(noteContext);

  function isValidEmail(email) {
    return /\S+@gmail.com+/.test(email);
  }

  

  async function check(e){
    setLoad(true)
    loading=true
    e.preventDefault()
    if(email){
      
      if(!isValidEmail(email)){
        setLoad(false)
        loading=false
        notifyMessage('invalid email')
        
      }
      else{
    
    try{
      await axios.post(uri,{email,password} 
      ).then(async res=>{
      if(res.data=='notexist'){
        setLoad(false)
        loading=false
        notifyMessage('Not Registered')    
      }
      else if(res.data=='mismatched'){
        setLoad(false)
        loading=false
        notifyMessage('invalid password')
      }
      else{
        contexts.update(res.data)
        try{
        await AsyncStorage.setItem('User',JSON.stringify(res.data))
        }catch(e){
          console.log(e)
        }
        navigation.replace('MyTabs') 
      };
    }
      )
    }
    catch(error){
      
      console.log(error)
    }}
  }
    else{
      loading=false
      setLoad(false)
      notifyMessage('email is required')
    }
  }
  const getuser=async()=>{
    const data=JSON.parse(await AsyncStorage.getItem('User'))
    if(data!=null){
      contexts.update(data);
      navigation.replace('MyTabs')
    }
    
  }
  

  return (
    <KeyboardAwareScrollView>
    <View style={{
      justifyContent: 'center',
    
    }}>
      <Spinner
          
          visible={load}
          
          textContent={'Loading...'}
          
          textStyle={styles.Spinner}
      />
      <View style={{justifyContent:"center",alignItems:"center",margin:40}}>
      <ImageBackground style={{width:width-95,height:width-95,backgroundColor:"orange",borderRadius:(width-90)/2,justifyContent:"center",alignItems:"center"}}>
      <Image source={image} style={{width:width-100,height:width-100,borderRadius:(width-100)/2}}/>
      </ImageBackground>
      </View>
      <TextInput 
      style={styles.input}
      onChangeText={setemail}
      value={email}
      placeholder='email'
      />
      <TextInput 
      style={styles.input}
      onChangeText={setpassword}
      value={password}
      placeholder='password'
      />
      <View style={styles.button}>
      <Button  title="Login" onPress={check}  />
      
      </View>
      <Text style={{marginLeft:width/2-10}}>OR</Text>
      
      <View style={styles.button}>
        <Button title="Sign Up" onPress={()=>{navigation.replace('SignUp')}} />
      </View>
  
    </View>
    </KeyboardAwareScrollView>
  )
}
const styles = StyleSheet.create({
  input: {
    
    height:40,
    marginLeft:40,
    marginRight:40,
    marginBottom:10,
    marginTop:10,
    borderRadius:10,
    borderWidth: 1,
    padding: 10,
    textAlign:"center",
    backgroundColor:"white"
  },
  button:{
    marginLeft:40,
    marginRight:40,
    marginBottom:10,
    marginTop:10,
  },
  Spinner:{
    color: '#FFF'
  }
  
});