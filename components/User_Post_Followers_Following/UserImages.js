import { View, Text, FlatList, useWindowDimensions } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { noteContext } from '../../contexts/context';
import axios from 'axios';
import HomePost from '../HomePost';
import SERVER_LINK from '../../MyFile';


const uri = SERVER_LINK + "/get_user_images";


export default function UserImages() {
    const contexts = useContext(noteContext)
    const email = contexts.state.email
    const [data, setData] = useState([]);
    const { width, height } = useWindowDimensions();

    const loaddata = async () => {
        try {
            await axios.post(uri, { email: email }).then(res => {
                setData(res.data);
            })
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        loaddata();
    }, [])
    const renderItem = useCallback(({ item }) => {

        return (
            <HomePost
                discription={item.discription}
                name={item.name}
                img={item.image}
                profimg={item.profImg}
                postid={item._id}
                posttime={item.createdAt}
                user_only={true}
                user_id={item.user_id}
                likedby={item.likedby}
                likes={item.likeCount}
            />
        )
    }, [])
    const keyExtractor = useCallback((item) => String(item._id), [])


    return (
        <View style={{ flex: 1, alignSelf: 'center', width: '100%', alignItems: 'center' }}>
            {width >= 700 ?
                <FlatList showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    onEndReachedThreshold={1}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    key={width >= 700 ? 1 : 0}
                    numColumns={2}
                    horizontal={false}
                    columnWrapperStyle={{ gap: 10 }}

                /> :
                <FlatList showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    onEndReachedThreshold={1}
                    data={data}
                    initialNumToRender={4}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    numColumns={1}
                />}
        </View>
    )
}