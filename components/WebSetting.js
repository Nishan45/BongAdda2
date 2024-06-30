import { View, Text, Modal, TouchableOpacity, useWindowDimensions, Button } from 'react-native'
import React, { useState } from 'react'
import { noteContext } from '../contexts/context';
import { useContext } from 'react';
import { Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';


let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

export default function WebSetting({navigation}){
  const [show, setShow] = useState(false)
  
  windowWidth=useWindowDimensions().width;
  windowHeight=useWindowDimensions().height;


  const close = () => {
    setShow(false);
  }
  const remove=async()=>{
    try{
    await AsyncStorage.removeItem('User');
    }catch(e){
        console.log(e);
    }
}

  return (
    <>
      <TouchableOpacity >
      <Ionicons name="settings-outline" size={24} color="white" onPress={()=>{setShow(true)}} style={{marginRight:20}}/> 
      </TouchableOpacity>
      <Modal
        animationType={windowWidth<800?'fade':'slide'}
        
        transparent={true}
        visible={show}
        onRequestClose={close}
      >
        <View style={{flex:1,flexDirection:'row'}}>
        <TouchableOpacity style={{width:windowWidth>=800?'75%':0}} onPress={close}>
        </TouchableOpacity>
        <View style={{ justifyContent: "center" ,flex:1,width:windowWidth>=800?'50%':'100%',height:'100%',alignSelf:'center',backgroundColor:'white'}}>
            
            <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20 }}>
                <Button title="Edit Profile" onPress={() => { navigation.navigate('Edit Profile') }} />
            </View>
            <View style={{ paddingLeft: 20, paddingRight: 20, paddingUp: 20, paddingBottom: 20 }}>
                <Button title="Change Language"  onPress={() => { navigation.navigate('Select Language') }}/>
            </View>
            <View style={{ paddingLeft: 20, paddingRight: 20, paddingUp: 20, paddingBottom: 20 }}>
                <Button title="Change Password" onPress={()=>{navigation.navigate('Change Password')}}/>
            </View>
            <View style={{ paddingLeft: 20, paddingRight: 20, paddingUp: 20, paddingBottom: 20 }}>
                <Button title="Log out" onPress={() => {
                    remove();
                    
                    navigation.dispatch(StackActions.replace('Login',{params:{}}))
                }} />
            </View>
        </View>
          
        
        </View>
        
        

      </Modal>
    </>

  )
}

