import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, Image, FlatList, VirtualizedList, ActivityIndicator, Dimensions, Pressable } from 'react-native'
import HomePost from './HomePost';
import axios from 'axios';
import { noteContext } from '../contexts/context';
import { useContext } from 'react';
import { Button } from 'react-native';
import { SectionList } from 'react-native';
import SERVER_LINK from '../MyFile';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const height = Dimensions.get("window").height


const uri = SERVER_LINK + "/get_posts";


export default function Posts({ navigation, user }) {
    const contexts = useContext(noteContext)
    let email = contexts.state.email

    if (user) email = user

    const [data, setData] = useState([]);
    const [come, setCome] = useState(true)
    

    const loaddata = async () => {
        
        
        try {
            await axios.post(uri, {email:email}).then(res => {
                setData(res.data);
            })
        } catch (e) {
            console.log(e);
        }
        setCome(false)
        
    }
    
    useEffect(()=>{
        loaddata();
    })
    

    const getdata = (newdata) => {
        return (
            <View>
                {come ?
                    <ActivityIndicator size={'large'} style={{ marginTop: height / 2 - 100 }} /> :

                    <FlatList showsVerticalScrollIndicator={false}

                        removeClippedSubviews={true}
                        data={newdata}
                        
                        initialNumToRender={4}
                        
                        renderItem={({ item }) => 

                            (
                                
                            <HomePost
                                discription={item.discription}
                                name={item.name}
                                img={item.image}
                                profimg={item.profImg}
                                postid={item._id}
                                posttime={item.createdAt}
                                user_id={item.user_id}

                            />
                          
                            )
                        
                            
                        }
                        keyExtractor={(item) => String(item._id)}
                    />}
            </View>
        )
    }


    return (
        <View>
            {getdata(data)}
        </View>

    )
}
