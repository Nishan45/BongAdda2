import { View, Text, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ViewImages from '../ViewProfs/ViewImages';
import ViewStories from '../ViewProfs/ViewStories';
import ViewJokes from '../ViewProfs/ViewJokes';
import ViewPoems from '../ViewProfs/ViewPoems';
import DropBar from './DropBar';
import { useTranslation } from 'react-i18next';


const Tab2 = createMaterialTopTabNavigator();

const Tabs = ({email}) => {
    const Images = () => (
        <ViewImages email={email} />
    )
    const Stories = () => (
        <ViewStories email={email} />
    )
    const Jokes = () => (
        <ViewJokes email={email} />
    )
    const Poems = () => (
        <ViewPoems email={email} />
    )
    const {t}=useTranslation()

    return (
        
        <Tab2.Navigator
            initialRouteName="ছবি."
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',
               
            }}
        >
            <Tab2.Screen
                name="ছবি."
                component={Images}
                options={{
                    title:t("Image")
                }}
            />
            <Tab2.Screen
                name="ছোট গল্প."
                component={Stories}
                options={{
                    title:t("Story")
                }}
            />
            <Tab2.Screen
                name="কবিতা."
                component={Poems}
                options={{
                    title:t("Poem")
                }}
            />
            <Tab2.Screen
                name="কৌতুক."
                component={Jokes}
                options={{
                    title:t("Jokes")
                }}
            />
        </Tab2.Navigator>
        
    )
}

export default function ViewUserPost({navigation,route}) {
    const{width,height}=useWindowDimensions();

    return (
        
        <View style={{flex:1,flexDirection:'row',width:'100%'
        }}>
          {width>=700?<View style={{width:'15%'}}>
            <DropBar screen={'home'}/>
          </View>:null}
          <View style={{flex:1,backgroundColor: "white" }}>
            {route.params?
            <Tabs email={route.params.email}/>:null}
        </View>
                
        </View>
        
        
    )
}