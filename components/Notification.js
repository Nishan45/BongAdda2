import { View, Text, Image, ActivityIndicator, useWindowDimensions } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import SERVER_LINK from '../MyFile'
import axios from 'axios';
import { noteContext } from '../contexts/context';
import { FlatList } from 'react-native';
import GetNotification from './GetNotification';
import { Dimensions } from 'react-native';
import DropBar from './Webelements/DropBar';

const urign = SERVER_LINK + "/get_notification"
const urin = SERVER_LINK + "/notify";


let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;


export default function Notification() {
  const context = useContext(noteContext);
  const email = context.state.email
  const [data, setData] = useState([]);
  const [come, setCome] = useState(true)
  const [stop, setStop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(new Date());
  const [currenttime, setCurrenTime] = useState(new Date());
  const [skip, setSkip] = useState(0)
  const limit = 10;
  const [del, setDel] = useState(false)

  windowWidth = useWindowDimensions().width;
  windowHeight = useWindowDimensions().height;


  const loaddata = async (controller) => {
    try {
      await axios.post(urign, { email: email, skip: skip, limit: limit, time: time }, { signal: controller.signal }).then(res => {
        if (res.data.length < limit) {
          setStop(true);
        }
        setLoading(false)
        setData([...data, ...res.data]);
        setCurrenTime(new Date());
      })
    } catch (e) {
      console.log(e)
    }
    setCome(false)
  }

  useEffect(() => {
    const controller = new AbortController();
    loaddata(controller);
    return () => {
      controller.abort();
    }
  }, [skip])

  const onEndReached = () => {
    if (!stop && !loading) {
      setLoading(true)
      setSkip(skip + limit)
    }
  }
  const loadmore = () => {
    return (
      <View>
        {!stop &&
          <ActivityIndicator size={'large'} style={{ margin: 10 }} />
        }
      </View>
    )
  }
  const delete_item = (index) => {

    const newdata = data.filter(function (item, ind) {
      return ind != index
    })

    setData(newdata)
    setSkip(skip - 1)
    setDel(!del)

  }


  return (
    <>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        {windowWidth >= 700 ?<View style={{ width: '15%' }}>
          <DropBar screen={'home'} />
        </View>:null}
        {come ?
          <ActivityIndicator size={'large'} style={{ marginTop: windowHeight / 2 - 100, flex: 1, alignSelf: 'center' }} /> :
          (data.length > 0 ?
            <View style={{ backgroundColor: "white", flex: 1 }}>
              <FlatList showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                data={data}
                initialNumToRender={limit}
                renderItem={({ item, index }) => (
                  <GetNotification item={item} index={index} delete_item={delete_item} />
                )}
                key={del}
                keyExtractor={(item, index) => index}
                onEndReached={onEndReached}
                onEndReachedThreshold={1}
                ListFooterComponent={loadmore}

              />
            </View> :
            <View style={{ alignItems: "center" }}>
              <Text style={{ marginTop: windowHeight / 2 }}>কোন বিজ্ঞপ্তি নেই</Text>
            </View>
          )}
        {windowWidth >= 700?<View style={{ width: '25%' }}></View>:null}
      </View>

    </>

  )
}