import { View, Text, Alert, Button, Image} from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { StyleSheet } from 'react-native';
import { Pressable } from 'react-native';
import axios from 'axios';
import { noteContext } from '../contexts/context';
import { useContext } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { Dimensions } from 'react-native';
import {
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';
import { check } from 'express-validator';
import { ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SERVER_LINK from '../MyFile';
import AsyncStorage from '@react-native-async-storage/async-storage';

const image=require('../assets/BongAdda.jpg')

const url="http://bongbackend.onrender.com/";
const uri=SERVER_LINK+"/";

const width = Dimensions.get('window').width;


function notifyMessage(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  } else {
    AlertIOS.alert(msg);
  }
};


export default function Login({navigation}) {
  const [name,setname] = React.useState("");
  const [email,setemail] = React.useState("");
  const [password,setpassword] = React.useState("");
  const contexts=useContext(noteContext);
  const [load,setLoad]=useState(false)
  

  function isValidEmail(email) {
    return /\S+@gmail.com+/.test(email);
  }

  async function saved(e){
    
    e.preventDefault()
    if(name && email && password){
      if(name.length<2){
        notifyMessage('name must consist of atleast 2 characters')
      }
      else if(name.length>25){
        notifyMessage('maximum length for name is 25')
      }
      else if(!isValidEmail(email)){
        notifyMessage('invalid email')
      }
      else if(password.length<5){
        notifyMessage('password must consist of atleast 5 characters')
      }
      
      else{

    setLoad(true)
    try{
      axios.post(uri,{name,email,password} 
      ).then(async res=>{
        setLoad(false)
        if(res.data=='exist'){
          
          notifyMessage('email already exist')
        }
        else{
      notifyMessage("Information saved successfully")
          try{
      await AsyncStorage.setItem('User',JSON.stringify(res.data))
          }catch(e){
            console.log(e)
          }
      contexts.update(res.data);
      navigation.replace('MyTabs')
        }
      }
      )
    }
    catch(error){
      setLoad(false)
      console.log(error)
    }
    
  }
    
  }
    else{
      notifyMessage('all data must be filled')
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
      <View style={{justifyContent:"center",alignItems:"center",margin:20}}>
      <ImageBackground style={{width:width-95,height:width-95,backgroundColor:"orange",borderRadius:(width-90)/2,justifyContent:"center",alignItems:"center"}}>
      <Image source={image} style={{width:width-100,height:width-100,borderRadius:(width-100)/2}}/>
      </ImageBackground>
      </View>
      <TextInput 
      style={styles.input}
      onChangeText={setname}
      value={name}
      placeholder='name'
      />
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
        <Button title="Sign Up" onPress={saved}/>
      </View>
      <Text style={{marginLeft:width/2-10}}>OR</Text>
      
      <View style={styles.button}>
        <Button title="Login" onPress={()=>{navigation.replace('Login')}} />
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