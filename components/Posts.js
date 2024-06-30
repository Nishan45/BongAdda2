import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { View, Text, Image, FlatList, ActivityIndicator, Dimensions, Pressable, useWindowDimensions } from 'react-native'
import HomePost from './HomePost';
import axios from 'axios';
import { noteContext } from '../contexts/context';
import { useContext } from 'react';
import { Button } from 'react-native';
import SERVER_LINK from '../MyFile';

let height = Dimensions.get("window").height
let width=Dimensions.get("window").width

const urih = SERVER_LINK + "/get_posts";
const urit = SERVER_LINK + "/get_trending_posts";

const limit=6;

export default function Posts({ navigation,user, route}) {
    const contexts = useContext(noteContext)
    let email = contexts.state.email
    const [skip, setSkip] = useState(0)
    

    if (user) email = route.params.user

    width=useWindowDimensions().width;
    height=useWindowDimensions().height;

    const [data, setData] = useState([]);
    const [come, setCome] = useState(true);
    const [stop, setStop] = useState(false);
    const [loading, setLoading] = useState(false);
    const [time, setTime] = useState(new Date());
    const [currenttime,setCurrenTime]=useState(new Date());
    let uri=urih;

    if(route.params.screen=='trend'){
        uri=urit;
    }
    const loaddata = async (controller) => {
        try {
            await axios.post(uri, { time: time, skip: skip,email:email,limit:limit },{signal:controller.signal}).then(res => {
                if (res.data.length < limit) {
                    setStop(true);
                }
                setLoading(false)
                setData([...data, ...res.data]);
                setCurrenTime(new Date())
            })
        } catch (e) {
            console.log(e);
        }
        setCome(false)
    }

    const onEndReached = () => {
        if (!stop && !loading) {
            setLoading(true)
            setSkip(skip + limit)
        }
    }

    useEffect(() => {
        const controller=new AbortController();
        loaddata(controller);
        return ()=>{
            controller.abort(); 
        }
    }, [skip])


    const loadmore = () => {
        return (
            <View>
                {!stop &&
                    <ActivityIndicator size={'large'} style={{margin:10}} />
                }
            </View>
        )
    }

    const renderItem = useCallback(({ item }) => {
   
        return (
            <HomePost
                discription={item.discription}
                name={item.name}
                img={item.image}
                profimg={item.profImg}
                postid={item._id}
                posttime={item.createdAt}
                user_id={item.user_id}
                likes={item.likeCount}
                likedby={item.likedby}
            />
        )
    }, [])
    


    const keyExtractor=useCallback((item) =>String(item._id),[])
    return (
        <View style={{flex:1,alignSelf:'center',alignItems:'center',width:'100%'}}>
            {(skip>0 && (currenttime.getTime()-time.getTime())/1000>60)?
                <View style={{width:'100%'}}>
                <Button title='Refresh' onPress={()=>{
                    setData([]);
                    setSkip(0);
                    setStop(false);
                    setTime(new Date());
                    setCurrenTime(new Date());
                    setCome(true);
                    
                }}  />
                </View>:null}
            {come ?
                <ActivityIndicator size={'large'} style={{ marginTop: height / 2 - 100 }} /> :
                (width>=700?
                    <FlatList showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    data={data}
                    onEndReached={onEndReached}
                    onEndReachedThreshold={1}
                    ListFooterComponent={loadmore}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    key={width>=1100?1:0}
                    numColumns={width>=1100?3:2}
                    horizontal={false}
                    columnWrapperStyle={{gap:10}}
                   
                />:
                    <FlatList showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    data={data}
                    onEndReached={onEndReached}
                    onEndReachedThreshold={1}
                    ListFooterComponent={loadmore}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    numColumns={1}
                    />)
        
            }
        </View>

    )
}

