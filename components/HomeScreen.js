
import { View, Text,Image,StyleSheet ,div, SafeAreaView} from 'react-native'
import React, { useState } from 'react'
import { ScrollView,FlatList } from 'react-native';

import Posts from './Posts';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Stories from './Stories';
import Poems from './Poems';
import Jokes from './Jokes';
import { createStackNavigator } from '@react-navigation/stack';
import { SelectList } from 'react-native-dropdown-select-list';


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
        component={Posts}
      />
      <Tab.Screen
        name="ছোট গল্প"
        component={Stories}
      />
      <Tab.Screen
        name="কবিতা"
        component={Poems}
      />
      <Tab.Screen
        name="কৌতুক"
        component={Jokes}
      />
      
    </Tab.Navigator>
  );
}

export default function HomeScreen({email}) {
  
  return (
    MyTabs()
    
  )
}

