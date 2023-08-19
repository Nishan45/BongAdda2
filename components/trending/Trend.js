import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TrendPosts from './TrendPosts';
import TrendStories from './TrendStories';
import TrendPoems from './TrendPoems';
import TrendJokes from './TrendJokes';


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
        component={TrendPosts}
      />
      <Tab.Screen
        name="ছোট গল্প"
        component={TrendStories}
      />
      <Tab.Screen
        name="কবিতা"
        component={TrendPoems}
      />
      <Tab.Screen
        name="কৌতুক"
        component={TrendJokes}
      />
      
    </Tab.Navigator>
  );
}


export default function Trend() {
  return (
    MyTabs()
  )
}