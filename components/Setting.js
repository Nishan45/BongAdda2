import { View, Text, Button } from 'react-native'
import React, { useEffect } from 'react'
import { ImageBackground } from 'react-native';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const image = require('../assets/BongAdda.jpg')
const width = Dimensions.get('window').width;
const height=Dimensions.get('window').height;

export default function Setting({ navigation }) {
    const remove=async()=>{
        try{
        await AsyncStorage.removeItem('User');
        }catch(e){
            console.log(e);
        }
    }

    return (
        <View style={{ justifyContent: "center" ,marginTop:height/2-100}}>
            
            <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20 }}>
                <Button title="Edit Profile" onPress={() => { navigation.navigate('Edit Profile') }} />
            </View>
            <View style={{ paddingLeft: 20, paddingRight: 20, paddingUp: 20, paddingBottom: 20 }}>
                <Button title="Change Password" onPress={()=>{navigation.navigate('Change Password')}}/>
            </View>
            <View style={{ paddingLeft: 20, paddingRight: 20, paddingUp: 20, paddingBottom: 20 }}>
                <Button title="Log out" onPress={() => {
                    remove();
                    navigation.replace('Login')
                }} />
            </View>
        </View>
    );
}