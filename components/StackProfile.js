import { View, Text, Dimensions, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './Profile';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import UserPosts from './User_Post_Followers_Following/UserPosts';
import UserFollowers from './User_Post_Followers_Following/UserFollowers';
import Following from './User_Post_Followers_Following/Following';
import EditProfile from './EditProfile';
import ChangePassword from './ChangePassword';
import SelectLanguage from './SelectLanguage';
import { useTranslation } from 'react-i18next';
import i18next from '../Services/i18next.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import DropBar from './Webelements/DropBar.js';


const Stack = createStackNavigator();
const drawer = createDrawerNavigator();

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height

export default function StackProfile({ navigation }) {

  width = useWindowDimensions().width;
  height = useWindowDimensions().height;

  const [index, setIndex] = useState('StackProfile');
  const { t } = useTranslation();
  const remove = async () => {
    try {
      await AsyncStorage.removeItem('User');
    } catch (e) {
      console.log(e);
    }
  }

  const headBackground = () => {
    return (
      <View style={{
        width: '100%', height: '100%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center',
        justifyContent: 'center', backgroundColor: '#0096FF'
      }}>{width >= 700 &&
        <View style={{ width: '50%', height: '100%', alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
          <MaterialCommunityIcons name="home" color={index == 'Home' ? 'black' : 'white'} size={30} onPress={() => { navigation.navigate('Home'); setIndex('Home') }} />
          <MaterialIcons name="local-fire-department" color={index == 'Trending' ? 'black' : 'white'} size={30} onPress={() => { navigation.navigate('Trending'); setIndex('Trending') }} />
          <MaterialCommunityIcons name="plus-box" color={index == 'Post' ? 'black' : 'white'} size={30} onPress={() => { navigation.navigate('Post'); setIndex('Post') }} />
          <MaterialIcons name="notifications" color={index == 'Notification' ? 'black' : 'white'} size={30} onPress={() => { navigation.navigate('Notifications'); setIndex('Notification') }}>
            {/*{notify && !innot &&
              <FontAwesome name="circle" size={15} color="red" />
            }*/}
          </MaterialIcons>
          <MaterialCommunityIcons name="account" color={index == 'StackProfile' ? 'black' : 'white'} size={30} onPress={() => { navigation.navigate('StackProfile'); setIndex('StackProfile') }} />
        </View>
        }
      </View>
    )
  }

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      {width >= 700 ? <View style={{ width: '15%' }}>
        <DropBar screen={'profile'} />
      </View> : null}
      <View style={{ flex: 1 }}>
        <drawer.Navigator initialRouteName="Profile"
          screenOptions={({ navigation }) => ({
            drawerItemStyle: { width: '100%', margin: 0, padding: 0, borderBottomWidth: 1, borderRadius: 0, height: width >= 700 && height * 0.08, },
            drawerLabelStyle: width >= 700 && { fontSize: 16, fontWeight: '400', color: 'black' },
            drawerType: width >= 1100 ? 'permanent' : 'front',
            drawerPosition: width >= 1100 ? 'left' : 'right',
            headerLeft: () => <></>,
            headerRight: () => <Ionicons name="settings-outline" size={24} color="black" onPress={navigation.toggleDrawer} style={{ marginRight: 20 }} />,
            headerShown: width >= 1100 ? false : true,
            drawerStyle: width >= 1100 && { width: width * 0.15 },
            drawerContentContainerStyle: { margin: 0, padding: 0 }
          })}
        >
          <drawer.Screen name="Profile" component={Profile}
            options={
              {
                headerTitle: width >= 1100 ? t('BongAdda') : (width >= 700 ? "" : t('Profile')),
                title:t("Profile")
              }
            }
          />
          <drawer.Screen name="Posts" component={UserPosts} options={{
            headerTitle:t("Post"),
            drawerItemStyle: { display: 'none' }
          }} />
          <drawer.Screen name="Followers" component={UserFollowers} options={{
            headerTitle:t("Followers"),
            drawerItemStyle: { display: 'none' }
          }} />
          <drawer.Screen name="Following" component={Following} options={{
            headerTitle: t("Following"),
            drawerItemStyle: { display: 'none' }
          }} />
          <drawer.Screen name="Edit Profile" component={EditProfile} options={{unmountOnBlur:true,title:t("Edit")+" "+t("Profile")}}/>
          <drawer.Screen name="Change Password" component={ChangePassword} options={{unmountOnBlur:true,title:t("Change Password")}}/>
          <drawer.Screen name="Select Language" component={SelectLanguage} options={{unmountOnBlur:true,title:t("Select Language")}}/>
          {width < 700 ? <drawer.Screen name="Logout" component={SelectLanguage}
            listeners={() => ({
              drawerItemPress: () => {
                remove();
                navigation.dispatch(StackActions.replace('Login', { params: {} }))
              }
            })} 
            options={{title:t("Logout")}}
            /> : null}
        </drawer.Navigator>
      </View>
    </View>

  )
}

