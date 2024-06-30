import { View, Text, StyleSheet, Pressable, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useContext } from 'react';
import { noteContext } from '../../contexts/context';
import { StackActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import i18next from "../../Services/i18next.js"

export default function DropBar({ screen }) {
    const context = useContext(noteContext)
    const email = context.state.email
    const navigation = useNavigation()
    const { width, height } = useWindowDimensions();
    const{t}=useTranslation()

    const elements = [
        {
            name:"home",
            value:"Home"
        },
        {
            name:"profile",
            value:"Profile"
        },
        {
            name:"logout",
            value:"Logout"
        }
    ]
    const [Index, setIndex] = useState(elements.findIndex((item) => item.name == screen))
    const [pointer, setPointer] = useState(-1)
    const remove = async () => {
        try {
            await AsyncStorage.removeItem('User');
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <View style={{ flex: 1, flexDirection: 'column', height: '100%', backgroundColor: 'white', marginRight: 5 }}>
            {elements.map((item, index) => {
                return (
                    <Pressable style={{
                        borderBottomWidth: 1,
                        width: '100%',
                        alignItems: 'center',
                        height: height * 0.08,
                        backgroundColor: index == Index ? '#D6EAF8' : (pointer == index ? '#EBF5FB' : 'white'),
                        flexDirection: 'row'

                    }} key={index}
                        onPress={() => {
                            setIndex(index);
                            if (item.name == 'profile') navigation.navigate('StackProfile');
                            if (item.name == 'home') navigation.navigate('Home');
                            if (item.name == 'logout') {
                                remove();
                                navigation.dispatch(StackActions.replace('Login', { params: {} }))
                            }

                        }}
                        onPointerMove={() => setPointer(index)}
                        onPointerLeave={() => setPointer(-1)}
                    >
                        <AntDesign name={item.name} size={24} color="black" style={{ marginLeft: '5%' }} />
                        <Text style={{ marginLeft: '5%', fontSize: 16, color: index == Index ? 'black' : (pointer == index ? 'black' : 'black') }}>{t(item.value)}</Text>
                    </Pressable>
                )
            })}
        </View>
    )
}
const style = StyleSheet.create({
    item: {
        borderBottomWidth: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '8%'
    }
})