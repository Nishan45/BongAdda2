import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserImages from './UserImages';
import UserStories from './UserStories';
import UserPoems from './UserPoems';
import UserJokes from './UserJokes';


const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator 
      initialRouteName="ছবি"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="ছবি"
        component={UserImages}
      />
      <Tab.Screen
        name="ছোট গল্প"
        component={UserStories}
      />
      <Tab.Screen
        name="কবিতা"
        component={UserPoems}
      />
      <Tab.Screen
        name="কৌতুক"
        component={UserJokes}
      />
      
    </Tab.Navigator>
  );
}

export default function UserPosts() {
  return (
    MyTabs()
  )
}