import { View, Text, KeyboardAvoidingViewBase } from 'react-native'
import React from 'react'
import PostImage from './Upload/PostImage';
import PostStories from './Upload/PostStories';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
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
      />
      <Tab.Screen
        name="পাঠ্য"
        component={PostStories}
      />
      
    </Tab.Navigator>
    
  );
}


export default function Post() {


  return (
    
    MyTabs()
    
  )
}