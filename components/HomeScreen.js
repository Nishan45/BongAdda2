
import { View, useWindowDimensions } from 'react-native'
import React from 'react'
import Posts from './Posts';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Stories from './Stories';
import Poems from './Poems';
import Jokes from './Jokes';
import DropBar from './Webelements/DropBar';
import { useTranslation } from 'react-i18next';
import i18next from "../Services/i18next.js"

const Tab = createMaterialTopTabNavigator();

function MyTabs(screen) {
  const{t}=useTranslation()
  
  return (
    <Tab.Navigator
      initialRouteName="ছবি"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="ছবি"
        initialParams={{ screen: screen }}
        component={Posts}
        options={{
          title:t("Image"),
          tabBarLabelStyle:{textTransform:"none"}
        }}
      />
      <Tab.Screen
        name="ছোট গল্প"
        initialParams={{ screen: screen }}
        component={Stories}
        options={{
          title:t("Story"),
          tabBarLabelStyle:{textTransform:"none"}
        }}
      />
      <Tab.Screen
        name="কবিতা"
        initialParams={{ screen: screen }}
        component={Poems}
        options={{
          title:t("Poem"),
          tabBarLabelStyle:{textTransform:"none"}
        }}
      />
      <Tab.Screen
        name="কৌতুক"
        initialParams={{ screen: screen }}
        component={Jokes}
        options={{
          title:t("Jokes"),
          tabBarLabelStyle:{textTransform:"none"}
        }}
      />
    </Tab.Navigator>
  );
}

export default function HomeScreen({ navigation, route }) {
  const { width, height } = useWindowDimensions();

  return (
    <View style={{
      flex: 1, flexDirection: 'row', width: '100%'
    }}>
      {width >= 700?<View style={{ width: '15%' }}>
        <DropBar screen={'home'} />
      </View>:null}
      {width >= 700 ?<View style={{ flex: 1, width: '80%' }}>
        {MyTabs(route.params.screen)}
      </View>:MyTabs(route.params.screen)}
    </View>
  )
}

