import { View, Text, FlatList, useWindowDimensions } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { noteContext } from '../../contexts/context';
import axios from 'axios';
import Story from '../Story';
import SERVER_LINK from '../../MyFile';


const uri = SERVER_LINK + "/get_user_stories";


export default function UserJokes() {
    const [data, setData] = useState([]);
    const contexts = useContext(noteContext)
    const email = contexts.state.email;
    const { width, height } = useWindowDimensions()

    const loaddata = async () => {
        try {
            await axios.post(uri, { category: "Jokes", email: email }).then(res => {
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
            <Story
                name={item.name}
                img={item.profImg}
                body={item.body}
                author={item.author}
                postid={item._id}
                posttime={item.createdAt}
                user_only={true}
                user_id={item.user_id}
            />
        )
    }, [])


    return (
        <View style={{ flex: 1, alignSelf: 'center', width: '100%', alignItems: 'center' }}>
            {width >= 700 ?
                <FlatList showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    onEndReachedThreshold={1}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => String(item._id)}
                    key={width >= 700 ? 1 : 0}
                    numColumns={2}
                    horizontal={false}
                    columnWrapperStyle={{ gap: 10 }}

                /> :
                <FlatList showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    data={data}
                    initialNumToRender={4}
                    renderItem={renderItem}
                    keyExtractor={(item) => String(item._id)}
                />}

        </View>
    )
}