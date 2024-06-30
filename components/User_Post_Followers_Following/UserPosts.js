import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserImages from './UserImages';
import UserStories from './UserStories';
import UserPoems from './UserPoems';
import UserJokes from './UserJokes';
import { useTranslation } from 'react-i18next';


const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  const{t}=useTranslation()

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
        options={{
          title:t("Image")
      }}
      />
      <Tab.Screen
        name="ছোট গল্প"
        component={UserStories}
        options={{
          title:t("Story")
      }}
      />
      <Tab.Screen
        name="কবিতা"
        component={UserPoems}
        options={{
          title:t("Poem")
      }}
      />
      <Tab.Screen
        name="কৌতুক"
        component={UserJokes}
        options={{
          title:t("Jokes")
      }}
      />
      
    </Tab.Navigator>
  );
}

export default function UserPosts() {
  return (
    MyTabs()
  )
}