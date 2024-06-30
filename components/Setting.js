import { View, Text, Button, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react'
import { ImageBackground } from 'react-native';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
const image = require('../assets/BongAdda.jpg')
let width = Dimensions.get('window').width;
let height=Dimensions.get('window').height;

export default function Setting({ navigation }) {
    width=useWindowDimensions().width;
    height=useWindowDimensions().height;

    const remove=async()=>{
        try{
        await AsyncStorage.removeItem('User');
        }catch(e){
            console.log(e);
        }
    }

    return (
        <View style={{ justifyContent: "center" ,flex:1,width:width>=800?'50%':'100%',alignSelf:'center'}}>
            
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
    );
}