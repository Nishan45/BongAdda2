import { View, Text } from 'react-native'
import React, { useContext, useState } from 'react'
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import { Dimensions } from 'react-native';
import { noteContext } from '../contexts/context';

import {
    ToastAndroid,
    Platform,
    AlertIOS,
  } from 'react-native';
import { Alert } from 'react-native';
import SERVER_LINK from '../MyFile';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

const uri=SERVER_LINK+"/change_password"

const width = Dimensions.get('window').width;

function notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT)
    } else {
      AlertIOS.alert(msg);
    }
  };

export default function ChangePassword({navigation}) {
    const[oldpas,setOldPas]=useState('')
    const[newpas,setNewPas]=useState('')
    const context=useContext(noteContext);
    const[load,setLoad]=useState(false)

    const savechanges=async()=>{
        setLoad(true)
        try{
        await axios.post(uri,{email:context.state.email,password:newpas}).then(res=>{
            setLoad(false)
            notifyMessage('password changed successfully')
            let state=Object.assign({},context.state)
            state.password=newpas;
            context.update(state)
            navigation.goBack();
        })
    }
    catch(e){
        console.log(e)
        setLoad(false)
    }
    }

    const sure=()=>Alert.alert('Confirmation', 'Are you sure', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: savechanges},
      ]);

    const check=()=>{
        if(oldpas!=context.state.password){
            notifyMessage('Wrong Password')
        }
        else if(newpas.length<5){
            notifyMessage('password must consist of atleast 5 characters')
        }
        else{
            sure()
        }
    }

  return (
    <View style={{justifyContent:"center"}} >
        <Spinner
          
          visible={load}
          
          textContent={'Processing'}
          
          textStyle={styles.Spinner}
      />
       <View style={{marginTop:200}}>
      <TextInput 
      style={styles.input}
      onChangeText={setOldPas}
      value={oldpas}
      placeholder='Old Password'
      />
      <TextInput 
      style={styles.input}
      onChangeText={setNewPas}
      value={newpas}
      placeholder='New Password'
      />
      </View> 
      <View style={{margin:20,marginTop:100}}>
      <Button title='Change Password' onPress={check}/>
      </View>
    </View>
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
   
    Spinner:{
      color: '#FFF'
    }
    
  });