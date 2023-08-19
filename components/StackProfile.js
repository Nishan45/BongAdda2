import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer,CommonActions} from '@react-navigation/native';
import Profile from './Profile';
import Setting from './Setting';
import { header } from 'express-validator';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import UserPosts from './User_Post_Followers_Following/UserPosts';
import UserFollowers from './User_Post_Followers_Following/UserFollowers';
import Following from './User_Post_Followers_Following/Following';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';


const Stack=createStackNavigator();


export default function StackProfile({navigation}) {
    

  return (
    <Stack.Navigator initialRouteName="Profile" >
       
      <Stack.Screen name="Profile" component={Profile} 
      options={
        {
          headerTitle:"প্রোফাইল",
          headerTintColor:"white",
          headerStyle:{
            backgroundColor:"#0096FF"
          },
          headerRight:()=>(
            <Ionicons name="md-settings-outline" size={24} color="white" onPress={()=>{navigation.navigate('Setting')}} style={{marginRight:20}}/> )
        }
      } />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="Posts" component={UserPosts} options={{
        headerTitle:"পোস্ট",
      }} />
      <Stack.Screen name="Followers" component={UserFollowers}  options={{
        headerTitle:"অনুসারী",
      }}/>
      <Stack.Screen name="Following" component={Following} options={{
        headerTitle:"অনুসরণ করছি",
      }}/>
      <Stack.Screen name="Edit Profile" component={EditProfile} />
      <Stack.Screen name="Change Password" component={ChangePassword} />

    </Stack.Navigator>
    
  )
}