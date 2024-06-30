import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';


export default function SelectLanguage({navigation}) {
  const languages = [
    {
      name:'English',
      lang:'en'
    },
    {
      name:'Bengali',
      lang:'beng'
    },
    {
      name:'Hindi',
      lang:'hin'
    }
  ]
  const[lang,setLang]=useState('')

  const getLang=async ()=>{
    const lan=await AsyncStorage.getItem('Language')
    setLang(lan)
  }

  const changeLang=async (langc)=>{
    await AsyncStorage.setItem('Language',langc)
    i18next.changeLanguage(langc);
  }

  useEffect(()=>{
    getLang()
  },[])
  
  return (
    <View style={{ flex: 1, flexDirection: 'column',alignItems:'center' ,justifyContent:'center'}}>

      {languages.map((item, index) =>
      (
            <Pressable
              key={index}
              style={{ width: '100%', height: '8%', justifyContent: 'center', alignItems: 'center', backgroundColor:lang===item.lang?'#1e90ff':'white', margin: 10,width:'80%',borderRadius:10,elevation:3 }}
              onPress={()=>{changeLang(item.lang);navigation.goBack()}}
            >
              <Text style={{color:lang===item.lang?'white':'black'}}>{item.name}</Text>
            </Pressable> 

      ))}
        
    </View>
  )
}