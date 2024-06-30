import { View, Text, FlatList, useWindowDimensions } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import SERVER_LINK from '../../MyFile';
import ViewHomeStory from '../ViewHomeStory';
import { noteContext } from '../../contexts/context';

const uri = SERVER_LINK + "/get_user_stories";


export default function ViewPoems({ email }) {
    const [data, setData] = useState([]);
    const contexts = useContext(noteContext)
    let user_email = contexts.state.email
    const { width, height } = useWindowDimensions()

    const loaddata = async () => {
        try {
            await axios.post(uri, { category: "Poem", email: email, user_email: user_email }).then(res => {
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
            <ViewHomeStory
                name={item.name}
                img={item.profImg}
                title={item.title}
                body={item.body}
                author={item.author}
                postid={item._id}
                posttime={item.createdAt}
                user_id={item.user_id}
                user_only={true}
                viewProf={true}
                likedby={item.likedby}
                likes={item.likeCount}
            />
        )
    }, [])

    const keyExtractor = useCallback((item) => String(item._id), [])

    return (
        <View style={{ flex: 1, alignSelf: 'center', alignItems: 'center', width: '100%' }}>
            {width >= 700 ?
                <FlatList showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    key={width >= 1100 ? 1 : 0}
                    numColumns={width >= 1100 ? 3 : 2}
                    horizontal={false}
                    columnWrapperStyle={{ gap: 10 }}

                /> :
                <FlatList showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    data={data}
                    initialNumToRender={4}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                />}
        </View>
    )
}