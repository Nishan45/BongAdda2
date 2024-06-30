import { View, Text, KeyboardAvoidingViewBase } from 'react-native'
import React from 'react'
import PostImage from './Upload/PostImage';
import PostStories from './Upload/PostStories';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useWindowDimensions } from 'react-native';
import DropBar from './Webelements/DropBar';
import { useTranslation } from 'react-i18next';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  const{t}=useTranslation()
  return (
    
    <Tab.Navigator 
      initialRouteName="ছবি"
      screenOptions={{
      
        tabBarActiveTintColor: '#e91e63',
        tabBarScrollEnabled:false,

      }}
    >
      <Tab.Screen
      
        name="ছবি"
        component={PostImage}
        options={{
          title:t("Image")
        }}
      />
      <Tab.Screen
        name="পাঠ্য"
        component={PostStories}
        options={{
          title:t("Texts")
        }}
      />
      
    </Tab.Navigator>
    
  );
}


export default function Post() {
  const{width,height}=useWindowDimensions();

  return (
    <View style={{flex:1,flexDirection:'row',width:'100%'
    }}>
      {width>=700&& <View style={{width:'15%'}}>
        <DropBar screen={'home'}/>
      </View>}
    {width>=700?<View style={{flex:1,width:'80%'}}>
    {MyTabs()}
    </View>:MyTabs()}
    </View>
    
    
  )
}