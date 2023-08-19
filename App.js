import { StyleSheet, Text, View,Image, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from './components/HomeScreen';
import Notification from './components/Notification';
import Post from './components/Post';
import Search from './components/Search';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { createStackNavigator } from '@react-navigation/stack';
import NoteState, { noteContext } from './contexts/context';
import { Ionicons } from '@expo/vector-icons'; 
import { useContext, useEffect, useState } from 'react';
import StackProfile from './components/StackProfile';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Trend from './components/trending/Trend';
import SERVER_LINK from './MyFile';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { Dimensions } from 'react-native';
import { useCallback } from 'react';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack=createStackNavigator();

const uri_notify=SERVER_LINK+"/newnotification"
const urin=SERVER_LINK+"/notify";
const uriv=SERVER_LINK+"/valid"



function MyTabs({navigation}) {
  
  const context=useContext(noteContext)
  const email=context.state.email
  const [notify,setNotify]=useState(false)
  const[innot,setInnot]=useState(false)
  const setNotification=async ()=>{
    await axios.post(uri_notify,{email:email}).then(res=>{
      if(res.data ){
        if(!innot){
        setNotify(true)
        }else{
          axios.post(urin,{email:email,val:false})
        }
      }
      else{
        setNotify(false)
      }
    })
  }
  useEffect(()=>{
   setNotification()
  })
  
  return (
    
    <Tab.Navigator 
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
      
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        listeners={({navigation,route})=>({
          tabPress: e=>{
            
            setInnot(false)
          }
      })} 
        options={{
          unmountOnBlur:true,
          tabBarLabel:"হোম",
          headerStyle:{
            backgroundColor:"#0096FF"
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerTitle:"বং আড্ডা",
          headerTintColor:"white",
          headerRight:()=>(
              <Search/>
          )
           
        }
      }
      />
      <Tab.Screen
      name="Trending"
      component={Trend}
      listeners={({navigation,route})=>({
        tabPress: e=>{
          
          setInnot(false)
        }
    })} 
      options={{
        unmountOnBlur:true,
        tabBarLabel:"ট্রেন্ডিং",
        headerStyle:{
            backgroundColor:"#0096FF"
        },
        tabBarIcon:({color,size})=>(
          <MaterialIcons name="local-fire-department" size={size} color={color} />
        ),
        headerTitle:"ট্রেন্ডিং",
        headerTintColor:"white",
      }}
      />
      
      <Tab.Screen
        name="Post"
        component={Post}
        listeners={({navigation,route})=>({
          tabPress: e=>{
            
           setInnot(false)
          }
      })} 
        options={{
          unmountOnBlur:true,
          tabBarLabel:'পোস্ট',
          headerStyle:{
            backgroundColor:"#0096FF"
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-box" color={color} size={size} />
          ),
          headerTitle:"ছবি, ছোট গল্প, কবিতা, কৌতুক",
          headerTintColor:"white",
          headerTitleAlign:"center"
          
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notification}
        listeners={({navigation,route})=>({
            tabPress: e=>{
              
              if(notify){
              setNotify(false)
              axios.post(urin,{email:email,val:false})
              }
              
              setInnot(true)
            }
        })} 
        
        options={{
          
          tabBarLabel: 'Notification',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="notifications" size={size} color={color} >
              {notify && !innot &&
              <FontAwesome name="circle" size={size/2} color="red"  />
              }
              
            </MaterialIcons>
          ),
          headerStyle:{
            backgroundColor:"#0096FF"
          },
          headerTitleAlign:"center",
          headerTintColor:"white",
          headerTitle:"বিজ্ঞপ্তি",
          tabBarLabel:"বিজ্ঞপ্তি"
          
        }}
      />
      
      <Tab.Screen 
        
        name="StackProfile"
        component={StackProfile}
        listeners={({navigation,route})=>({
          tabPress: e=>{
            
            setInnot(false)
          }
      })} 
        options={{
          unmountOnBlur:true,
          tabBarLabel: 'প্রোফাইল',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerShown:false
        }}
      />
    </Tab.Navigator>
  );
}



function MyStack() {
  
  
  return (
    <Stack.Navigator
    
     >
      <Stack.Screen name="Login" component={Login} options={{
        headerTitle:"বং আড্ডা",
        headerTitleAlign:"center",
        headerTintColor:"white",
        headerStyle:{
          backgroundColor:"#0096FF"
        }
      }}/>
      <Stack.Screen name="SignUp" component={SignUp} options={{
        headerTitle:"বং আড্ডা",
        headerTitleAlign:"center",
        headerTintColor:"white",
        headerStyle:{
          backgroundColor:"#0096FF"
        }
      }}/>
      
      <Stack.Screen 
          name={'MyTabs'}
          component={MyTabs}
          options={{
            gestureEnabled: false,
            headerShown: false,
            headerLeft: () => <></>,
          }}/>

        

      
    </Stack.Navigator>
  );
}
function MyStack2() {
  
  
  return (
    <Stack.Navigator
     >
      <Stack.Screen 
          name={'MyTabs'}
          component={MyTabs}
          options={{
            gestureEnabled: false,
            headerShown: false,
            headerLeft: () => <></>,
          }}/>
        
      
      <Stack.Screen name="Login" component={Login} options={{
        headerTitle:"বং আড্ডা",
        headerTitleAlign:"center",
        headerTintColor:"white",
        headerStyle:{
          backgroundColor:"#0096FF"
        }
      }}/>
      <Stack.Screen name="SignUp" component={SignUp} options={{
        headerTitle:"বং আড্ডা",
        headerTitleAlign:"center",
        headerTintColor:"white",
        headerStyle:{
          backgroundColor:"#0096FF"
        }
      }}/>
      
      
    </Stack.Navigator>
  );
}

function Validation(){
  const context=useContext(noteContext);
  const[log,setLog]=useState(false)

  const getuser=async()=>{
    
    const data=JSON.parse(await AsyncStorage.getItem('User'))
    if(data!=null && data.email && data.password){
      await axios.post(uriv,{email:data.email,password:data.password}).then(async res=>{
        if(res.data){
        context.update(res.data);
        setLog(true)
        }
        else{
          try{
          await AsyncStorage.removeItem('User')
          }catch(e){
            console.log(e)
          }
        }
      })
    }
    setCome(false) 
  }
  const[come,setCome]=useState(true)
  if(come){
    getuser()
  }
    
  return(
    
    <NavigationContainer >
    {come ?<ActivityIndicator size={'large'} style={{marginTop:Dimensions.get('window').height/2}}/>:
    (log?<MyStack2/>:<MyStack/>)}
    </NavigationContainer>
    
  )
}

export default function App() {
  
  return(
    
    <NoteState>
      <Validation/>
    </NoteState>
    
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginRight:10,
    marginTop:10,
    marginBottom:10,
    borderRadius:50,
  },
  header:{
    height:100,
    
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

