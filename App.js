import { StyleSheet, Text, View, Image, Button, useWindowDimensions, Pressable } from 'react-native';
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
import { MaterialIcons } from '@expo/vector-icons';
import SERVER_LINK from './MyFile';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import i18next from './Services/i18next.js';
import { none } from '@cloudinary/url-gen/qualifiers/fontHinting';
import ViewUserPost from './components/Webelements/ViewUserPost.js';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const uri_notify = SERVER_LINK + "/newnotification"
const urin = SERVER_LINK + "/notify";
const uriv = SERVER_LINK + "/valid"

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height


function MyTabs({ navigation }) {

  const context = useContext(noteContext)
  const email = context.state.email

  const [notify, setNotify] = useState(false)
  const [innot, setInnot] = useState(false)
  let getnot = false;

  width = useWindowDimensions().width;
  height = useWindowDimensions().height;
  

  const { t } = useTranslation()

  const setNotification = async () => {
    if (getnot) return;
    getnot = true;
    await axios.post(uri_notify, { email: email }).then(res => {
      if (res.data) {
        if (!innot) {
          setNotify(true)
        } else {
          
          axios.post(urin, { email: email, val: false })
          
        }
      }
      else {
        setNotify(false)
      }

    })
    getnot = false;
  }
  useEffect(() => {
    setNotification();

  }, [])

  const [index, setIndex] = useState('Home')

  const headBackground = (navigation) => {
    
    return (
      <View style={{
        width: '100%', height:'100%',alignSelf: 'center', flexDirection: 'row', alignItems: 'center',
        justifyContent: 'center', backgroundColor: '#0096FF'
      }}>{width >= 700 &&
        <View style={{ width: '50%', height: '100%', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
          <MaterialCommunityIcons name="home" color={(index == 'Home'||navigation.getState().index==0) ? 'black' : 'white'} size={30} 
          onPress={() => 
          { setIndex('Home');
            setInnot(false)
            if (!notify) setNotification();
            navigation.navigate('Home');
          }} 
          />
          <MaterialIcons name="local-fire-department" color={(index == 'Trending' &&navigation.getState().index!=0)? 'black' : 'white'} size={30} onPress={() => {
             setIndex('Trending');
             setInnot(false);
            if (!notify) setNotification();
            navigation.navigate('Trending');
            }} />
          <MaterialCommunityIcons name="plus-box" color={(index == 'Post'&&navigation.getState().index!=0 )? 'black' : 'white'} size={30} onPress={() => { 
            setIndex('Post') ;
            setInnot(false);
            if (!notify) setNotification();
            navigation.navigate('Post');
            }} />
          <MaterialIcons name="notifications" color={(index == 'Notification'&& navigation.getState().index!=0 )? 'black' : 'white'} size={30} onPress={() => {
            setIndex('Notification') ;
            if (notify) {
              setNotify(false)
              axios.post(urin, { email: email, val: false });
            }
            setInnot(true);
            navigation.navigate('Notifications');
            }}>
            {notify && !innot &&
              <FontAwesome name="circle" size={15} color="red" />
            }
          </MaterialIcons>
        </View>
        }
      </View>
    )
  }
  

  return (

    <Tab.Navigator
      initialRouteName="Home"
      
      screenOptions={({navigation})=>({
        tabBarInactiveTintColor: width >= 700 ? 'white' : 'grey',
        tabBarActiveTintColor: width >= 700 ? 'black' : 'red',
        tabBarStyle: width >= 700 ? { height: 0, visible: false } : {},
        headerBackground: () => (
          headBackground(navigation)
        ),
        headerStyle:{backgroundColor: '#0096FF'},
        headerTitle:t('BongAdda'),
        headerRight:  width>=700?() => (
         <Search />
        ):null,

      })}
    >
      
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{screen:'home'}}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            setInnot(false)
            if (!notify) setNotification();
          }
        })}
        options={{
          unmountOnBlur: true,
          tabBarLabel: t("Home"),
          headerStyle: {
            backgroundColor: "#0096FF",

          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={width < 700 ? size : 0} />
          ),
          headerTitle: t("BongAdda"),
          tabBarShowLabel: width < 700 ? true : false,
          headerTintColor: "white",

          headerRight: () => (
            <Search />
          )
        }
        }
      />
      <Tab.Screen
        name="Trending"
        component={HomeScreen}
        initialParams={{screen:'trend'}}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            setInnot(false)
            if (!notify) setNotification();
          }
        })}
        options={{
          unmountOnBlur: true,
          tabBarLabel: t("Trending"),
          headerStyle: {
            backgroundColor: "#0096FF"
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-fire-department" size={width < 700 ? size : 0} color={color} />
          ),
          tabBarShowLabel: width < 700 ? true : false,
          headerTitle: width<700?t('Trending'):t('BongAdda'),
          headerTintColor: "white",
          
        }}
      />

      <Tab.Screen
        name="Post"
        component={Post}
        listeners={({ navigation, route }) => ({
          tabPress: e => {

            setInnot(false)
            if (!notify) setNotification();
          }
        })}
        options={{
          unmountOnBlur: true,
          tabBarLabel: t("Post"),
          tabBarShowLabel: width < 700 ? true : false,
          headerStyle: {
            backgroundColor: "#0096FF"
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-box" color={color} size={width < 700 ? size : 0} />
          ),
          headerTitle:width>=700?t('BongAdda'):t("Image")+", "+t("Story")+", "+t("Poem")+", "+t("Jokes"),
          headerTintColor: "white",
          headerTitleAlign: width<700?"center":none,

        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notification}
        listeners={({ navigation, route }) => ({
          tabPress: e => {

            if (notify) {
              setNotify(false)
              axios.post(urin, { email: email, val: false })
            }

            setInnot(true)

          }
        })}

        options={{
          unmountOnBlur: true,
          tabBarLabel: t('Notification'),
          tabBarShowLabel: width < 700 ? true : false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="notifications" size={width < 700 ? size : 0} color={color} >
              {notify && !innot &&
                <FontAwesome name="circle" size={width < 700 ?size / 2:0} color="red" />
              }

            </MaterialIcons>
          ),
          headerStyle: {
            backgroundColor: "#0096FF"
          },
          headerTitleAlign: width < 700 ? "center" : none,
          headerTintColor: "white",
          headerTitle: width < 700 ? t('Notification') : t('BongAdda'),

        }}
      />

      <Tab.Screen

        name="StackProfile"
        component={StackProfile}
        listeners={({ navigation, route }) => ({
          tabPress: e => {
            
            setInnot(false)
            if (!notify) setNotification();
          }
        })}
        options={{
          unmountOnBlur: true,
          tabBarLabel: t("Profile"),
          tabBarShowLabel: width < 700 ? true : false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={width < 700 ? size : 0} />
          ),
          headerShown:width>=700?true:false,
          headerTintColor:'white',
          headerBackground:()=><View style={{backgroundColor:'#0096FF',flex:1}}></View>,
          headerRight:()=><></>,
        }}
      />
      <Tab.Screen
      name='ViewUserPost'
      component={ViewUserPost}
      options={({route})=>({
        
        tabBarButton:()=>null,
        unmountOnBlur:true,
        headerTitle:'',
        headerLeft:()=><Pressable title='Goback' onPress={()=>navigation.goBack()} style={{flex:1,width:width<700&&60,height:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center'}} >
          <Ionicons name="arrow-back-sharp" size={24} color="white" style={{ marginLeft: 10 }} />
          {width>=700?<Text style={{color:'white',fontSize:18}}>{" "+t("Back")}</Text>:null}
          </Pressable>,
        headerBackground:()=>(
          
            <View style={{justifyContent:'center',alignItems:'center',width:'100%',height:'100%',backgroundColor:"#0096FF"}}>
              <Text style={{color:'white',fontSize:20}}>{route.params.name+t("'s")+" "+t("Post")} </Text>
            </View>
           
      )
      })}
      />
    </Tab.Navigator>
  );
}



function MyStack() {

  const { t } = useTranslation()

  return (
    <Stack.Navigator

    >
      <Stack.Screen name="Login" component={Login} options={{
        headerTitle: t("BongAdda"),
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#0096FF",

        }
      }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{
        headerTitle:t("BongAdda"),
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#0096FF"
        }
      }} />

      <Stack.Screen
        name={'MyTabs'}
        component={MyTabs}
        options={{
          gestureEnabled: false,
          headerShown: false,
          headerLeft: () => <></>,

        }} />




    </Stack.Navigator>
  );
}
function MyStack2() {
  const { t } = useTranslation()

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
        }} />


      <Stack.Screen name="Login" component={Login} options={{
        headerTitle: t("BongAdda"),
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#0096FF"
        }
      }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{
        headerTitle: t("BongAdda"),
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#0096FF"
        }
      }} />


    </Stack.Navigator>
  );
}

function Validation() {
  const context = useContext(noteContext);
  const [log, setLog] = useState(false)

  const getuser = async () => {

    const data = JSON.parse(await AsyncStorage.getItem('User'))
    const lang=await AsyncStorage.getItem('Language')
    if(lang){
      i18next.changeLanguage(lang);
    }
    if (data != null && data.email && data.password) {
      await axios.post(uriv, { email: data.email, password: data.password }).then(async res => {
        if (res.data) {
          context.update(res.data);
          setLog(true)
        }
        else {
          try {
            await AsyncStorage.removeItem('User')
          } catch (e) {
            console.log(e)
          }
        }
      })
    }
    setCome(false)
  }
  const [come, setCome] = useState(true)
  if (come) {
    getuser()
  }

  return (

    <NavigationContainer >

      {come ? <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><ActivityIndicator size={'large'}/></View>:
        (log ? <MyStack2 /> : <MyStack />)}

    </NavigationContainer>

  )
}

export default function App() {

  return (

    <NoteState>
      <Validation />
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
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 50,
  },
  header: {
    height: 100,

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

