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

    const{t}=useTranslation()
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

export default function ViewPosts({ email }) {
    const [show, setShow] = useState(false)
    const close = () => {
        setShow(false)
    }


    return (
        <View>

            <Button title='পোস্ট' onPress={() => { setShow(true) }} />
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={show}
                onRequestClose={close}
                

            >
                <View style={{flex:1,backgroundColor: "white" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }} >
                        <AntDesign name="arrowleft" size={24} color="black" style={{ margin: 10, marginLeft: 20 }} onPress={() => { setShow(false) }} />
                        <Text style={{ fontSize: 18 }}>Back</Text>
                    </View>

                    <Tabs email={email}/>

                </View>
            </Modal>
        </View>
    )
}