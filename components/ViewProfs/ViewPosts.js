import { View, Text } from 'react-native'
import React, { useState } from 'react'

import { Button } from 'react-native';
import { Modal } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ViewImages from './ViewImages';
import ViewStories from './ViewStories';
import ViewPoems from './ViewPoems';
import ViewJokes from './ViewJokes';
import { AntDesign } from '@expo/vector-icons';

const Tab2 = createMaterialTopTabNavigator();

export default function ViewPosts({ email }) {
    const [show, setShow] = useState(false)
    const close = () => {
        setShow(false)
    }
    const Images = () => (
        <ViewImages email={email}/>
    )
    const Stories = () => (
        <ViewStories email={email}/>
    )
    const Jokes = () => (
        <ViewJokes email={email}/>
    )
    const Poems = () => (
        <ViewPoems email={email}/>
    )
    
    
    return (
        <>

            <Button title='পোস্ট' onPress={() => { setShow(true) }} />

            <Modal
                animationType={'fade'}
                transparent={true}
                visible={show}
                onRequestClose={close}
            >
                <View style={{ flex: 1, backgroundColor: "white" }}>
                    <View style={{flexDirection:"row",alignItems:"center"}} >
                    <AntDesign name="arrowleft" size={24} color="black" style={{margin:10,marginLeft:20}} onPress={()=>{setShow(false)}} />
                    <Text style={{fontSize:18}}>Back</Text>
                    </View>
                    <Tab2.Navigator
                        initialRouteName="ছবি."
                        screenOptions={{
                            tabBarActiveTintColor: '#e91e63',
                        }}
                    >
                        <Tab2.Screen
                            name="ছবি."
                            component={Images}
                        />
                        <Tab2.Screen
                            name="ছোট গল্প."
                            component={Stories}
                        />
                        <Tab2.Screen
                            name="কবিতা."
                            component={Poems}
                        />
                        <Tab2.Screen
                            name="কৌতুক."
                            component={Jokes}
                        />
                    </Tab2.Navigator>
                </View>
            </Modal>
        </>
    )
}