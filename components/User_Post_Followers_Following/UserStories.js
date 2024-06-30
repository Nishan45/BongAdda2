import { View, Text, FlatList, useWindowDimensions } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Story from '../Story';
import axios from 'axios';
import { noteContext } from '../../contexts/context';
import SERVER_LINK from '../../MyFile';

const uri = SERVER_LINK + "/get_user_stories";


export default function UserStories() {
  const [data, setData] = useState([]);
  const contexts = useContext(noteContext)
  const { width, height } = useWindowDimensions()
  const email = contexts.state.email

  const loaddata = async () => {
    try {
      await axios.post(uri, { category: "Short Story", email: email }).then(res => {
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
        title={item.title}
        body={item.body}
        author={item.author}
        postid={item._id}
        posttime={item.createdAt}
        user_id={item.user_id}
        user_only={true}
        likes={item.likeCount}
        likedby={item.likedby}
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