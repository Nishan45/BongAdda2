import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SafeAreaView, View, StyleSheet, StatusBar, ActivityIndicator, Dimensions, Button, useWindowDimensions } from 'react-native'
import { Text } from 'react-native'
import Story from './Story'
import { FlatList } from 'react-native';
import axios from 'axios';
import SERVER_LINK from '../MyFile';
import { Position } from '@cloudinary/url-gen/qualifiers';
import { noteContext } from '../contexts/context';

const urih = SERVER_LINK + "/get_stories";
const urit = SERVER_LINK + "/get_trending_stories";

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

const limit=6;

function Stories({navigation,user,route}) {
    const contexts = useContext(noteContext)
    let email = contexts.state.email
    const [data, setData] = useState([]);
    const [come, setCome] = useState(true)
    const [stop, setStop] = useState(false);
    const [loading, setLoading] = useState(false);
    const [time, setTime] = useState(new Date());
    const [currenttime,setCurrenTime]=useState(new Date());
    const [skip, setSkip] = useState(0)

    width=useWindowDimensions().width
    height=useWindowDimensions().height

    let uri=urih

    if(route.params.screen=='trend'){
        uri=urit;
    }

    const loaddata = async () => {
        try {
            await axios.post(uri, { category: "Short Story",skip:skip,time:time,email:email,limit:limit},{cancelToken:cancelToken.token}).then(res => {
                if (res.data.length < limit) {
                    setStop(true);
                }
                setLoading(false)
                setData([...data, ...res.data]);
                setCurrenTime(new Date());
                
            })
        } catch (e) {
            console.log(e);
        }
        setCome(false)
    }
    let cancelToken;

    useEffect(() => {
        cancelToken=axios.CancelToken.source();
        loaddata();
        return ()=>{
            cancelToken.cancel();
        }
    }, [skip])

    const loadmore = () => {
        return (
            <View>
                {!stop &&
                    <ActivityIndicator size={'large'} style={{ margin: 10 }} />
                }
            </View>
        )
    }

    const onEndReached = () => {
        if (!stop && !loading) {
            setLoading(true)
            setSkip(skip + limit)
        }
    }

    const renderItem = useCallback(({ item }) => {
        return (
            <Story
                name={item.name}
                img={item.profImg}
                title={item.title}
                type={item.category}
                body={item.body}
                author={item.author}
                postid={item._id}
                posttime={item.createdAt}
                user_id={item.user_id}
                likes={item.likeCount}
                likedby={item.likedby}
            />
        )

    }, [])

    const keyExtractor = useCallback((item) => String(item._id), [])

    return (
        <View style={{flex:1,alignSelf:'center',alignItems:'center',width:'100%'}}>
            { (skip>0 && (currenttime.getTime()-time.getTime())/1000>60)?
                <View style={{width:'100%'}}>
                <Button title='Refresh' onPress={()=>{
                    setData([]);
                    setSkip(0);
                    setStop(false);
                    setTime(new Date());
                    setCurrenTime(new Date());
                    setCome(true);
                }}  />
                </View>:null
            }
            {come ?
                <ActivityIndicator size={'large'} style={{ marginTop: height / 2 - 100 }} /> :
                ( width>=700?
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
                    initialNumToRender={4}
                    onEndReached={onEndReached}
                    onEndReachedThreshold={1}
                    ListFooterComponent={loadmore}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}

                />
                )
            }

        </View>
    )
}


export default Stories
