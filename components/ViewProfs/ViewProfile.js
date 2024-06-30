import { View, Text, Image, Button, ImageBackground, StyleSheet, Dimensions, ScrollView, Alert, StatusBar, useWindowDimensions } from 'react-native'
import React, { memo, useContext, useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Modal } from 'react-native'
import axios from 'axios';
import SERVER_LINK from '../../MyFile';
import ViewPost from './ViewPost';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { noteContext } from '../../contexts/context';
import ViewPosts from './ViewPosts';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import alert from '../../alert';
import { useTranslation } from 'react-i18next';

const url = SERVER_LINK + "/get_user_info";
const urlp = SERVER_LINK + "/get_posts_count"
const urif = SERVER_LINK + "/profile_follow";


let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;



function ViewProfile({ uri, diameter, email, margin, nopost }) {
  const navigation = useNavigation()
  const [show, setShow] = useState(false)
  const [data, setData] = useState([])
  const [postsc, setPostc] = useState(0)
  const [followersc, setFollowersc] = useState(0)
  const [followingc, setFollowingc] = useState(0)
  const context = useContext(noteContext)
  const myemail = context.state.email
  const [follow, setFollow] = useState(null)
  let initialFollowfetch = false;
  let Followloading = false;
  let loaddataloading = false;
  let loadPostCountloading = false;
  windowWidth = useWindowDimensions().width;
  windowHeight = useWindowDimensions().height;

  const{t}=useTranslation()

  const initialFollow = async () => {
    if (initialFollowfetch) return;
    initialFollowfetch = true;

    await axios.post(urif, { email: myemail, follow: email, checking: true }).then(res => {
      if (res.data.yes) {
        setFollow(true)
      }
      else {
        setFollow(false)
      }

    })
    initialFollowfetch = false;
  }

  const Follow = async () => {
    if (Followloading) return;
    Followloading = true;

    await axios.post(urif, { email: myemail, follow: email, checking: false }).then(res => {
      if (res.data.yes) {
        setFollow(true)
      }
      else {
        setFollow(false)
      }
    })
    Followloading = false;
  }

  const close = () => {
    setShow(false)
  }
  const LoadData = async () => {
    if (loaddataloading) return;
    loaddataloading = true;

    await axios.post(url, { email: email }).then(
      res => {
        setData(res.data)
      }
    )
    loaddataloading = false;
  }
  const loadPostCount = async () => {
    if (loadPostCountloading) return;
    loadPostCountloading = true;
    await axios.post(urlp, { email: email }).then(res => {
      setPostc(res.data.post);
      setFollowersc(res.data.follower);
      setFollowingc(res.data.following);
    })
    loadPostCountloading = false;
  }
  const sure = () => alert('Confirmation', `Do you want to unfollow ${data.name}?`, [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    { text: 'OK', onPress: Follow },
  ]);
  const check = () => {
    if (follow) {
      sure();
    }
    else {
      Follow()
    }
  }

  const Vprofile = () => {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}
      >
        {windowWidth >= 700 ? <TouchableOpacity style={{ width: '25%', backgroundColor: '#000000AA' }} onPress={close}></TouchableOpacity> : null}
        <View style={{ backgroundColor: '#F2F3F4', flex: 1, width: '100%', marginTop: 0 }}>
          {windowWidth < 700 ? <View style={{ height: 60, alignItems: "center", flexDirection: "row" }}>
            <Ionicons name="arrow-back-sharp" size={30} color="black" style={{ marginLeft: 20 }} onPress={() => { setShow(false) }} />
            <Text style={{ fontSize: 22, marginLeft: 20 }}>{t("Back")}</Text>
          </View> : null}

          <ScrollView showsVerticalScrollIndicator={false}  >
            <ViewPost url={data.backgroundImg} width={windowWidth} height={windowWidth >= 700 ? 300 : 200} borderradius={0} />
            <View style={{ position: 'absolute', margin: 'auto', alignSelf: 'center', top: windowWidth >= 700 ? 180 : 130, margin: 0 }}>
              <ViewPost url={data.profImg} width={windowWidth >= 700 ? 240 : 140} height={windowWidth >= 700 ? 240 : 140} borderradius={windowWidth >= 700 ? 180 : 90} />
            </View>
            {windowWidth >= 700 ? <View style={{ position: 'absolute', margin: 'auto', right: '1%', top: '1%' }}>
              <Ionicons name="close-circle" size={40} color="#CCD1D1" onPress={close} />
            </View> : null}

            {data.name ?
              <View style={{ justifyContent: "center", alignItems: "center", marginTop: windowWidth >= 700 ? 150 : 100 }}>
                <View style={{ backgroundColor: 'white', elevation: 3, width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                  <Text style={{ fontSize: 30, marginTop: 10 }}>{data.name}</Text>

                  {data.discription ? <Text style={{ margin: 10, fontSize: 20, marginTop: 20 }}>{data.discription}</Text> : null}
                  <View style={{ flexDirection: "row", padding: 10 }}>
                    <View style={{ alignItems: "center", margin: 15 }}>
                      <Text style={{ fontSize: 20, borderBottomWidth: 1 }}>{t("Post")} </Text>
                      <Text style={{ fontSize: 20 }}>{postsc}</Text>
                    </View>
                    <View style={{ alignItems: "center", margin: 15 }}>
                      <Text style={{ fontSize: 20, borderBottomWidth: 1 }}>{t("Followers")} </Text>
                      <Text style={{ fontSize: 20 }}>{followersc}</Text>
                    </View>
                    <View style={{ alignItems: "center", margin: 15 }}>
                      <Text style={{ fontSize: 20, borderBottomWidth: 1 }}>{t("Following")} </Text>
                      <Text style={{ fontSize: 20 }}>{followingc}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
                    <View style={{ margin: '2%', width: '40%' }}>
                      {follow ?
                        <Button title={t("Following")} onPress={check} color={'green'} /> : <Button title={t("Follow")} onPress={Follow} />
                      }
                    </View>
                    <View style={{ margin: '2%', width: '40%' }}>
                      {windowWidth >= 700 ?
                        <Button title={t("Post")} onPress={() => { close(); navigation.navigate('ViewUserPost', { email: email, name: data.name }) }} />
                        : (!nopost ? <ViewPosts email={email} /> : <Button title={t("Post")} onPress={() => navigation.navigate('ViewUserPost', { email: email, name: data.name })} />
                        )}
                    </View>
                  </View>
                </View>

                <View style={{ flex: 1, elevation: 3, backgroundColor: 'white', borderRadius: 10, width: '100%', marginTop: 50, justifyContent: "center", marginBottom: 10 }}>
                  <Text style={{ fontSize: 20, margin: 10, alignSelf: 'center' }}>About</Text>
                  <View style={{ borderTopWidth: 1 }}>

                    {data.about.profile ?
                      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                        <AntDesign name="infocirlce" size={24} color="black" />
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>Profile .</Text>
                        <Text style={{ fontSize: 18 }}>{data.about.profile}</Text>
                      </View> : null}

                    {data.about.nickname ?
                      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                        <Entypo name="user" size={24} color="black" />
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>Nickname .</Text>
                        <Text style={{ fontSize: 18 }}>{data.about.nickname}</Text>
                      </View> : null}

                    {data.about.gender ?
                      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                        <FontAwesome name="transgender" size={24} color="black" />
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>Gender .</Text>
                        <Text style={{ fontSize: 18 }}>{data.about.gender}</Text>
                      </View> : null}

                    {data.about.dob ?
                      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                        <FontAwesome name="birthday-cake" size={24} color="black" />
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>Date Of Birth .</Text>
                        <Text style={{ fontSize: 18 }}>{data.about.dob}</Text>
                      </View> : null}

                    {data.about.work ?
                      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                        <Entypo name="suitcase" size={24} color="black" />
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>Work .</Text>
                        <Text style={{ fontSize: 18 }}>{data.about.work}</Text>
                      </View> : null}

                    {data.about.curlocation ?
                      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                        <Entypo name="location-pin" size={24} color="black" />
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>Lives At .</Text>
                        <Text style={{ fontSize: 18 }}>{data.about.curlocation}</Text>
                      </View> : null}

                    {data.about.hometown ?
                      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                        <Entypo name="location-pin" size={24} color="black" />
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>From .</Text>

                        <Text style={{ fontSize: 18 }}>{data.about.hometown}</Text>

                      </View> : null}

                    {data.about.secondary ?
                      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                        <Ionicons name="school" size={24} color="black" />
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>Went To .</Text>
                        <Text style={{ fontSize: 18 }}>{data.about.secondary}</Text>
                      </View> : null}

                    {data.about.hs ?
                      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                        <Ionicons name="school" size={24} color="black" />
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>Went To .</Text>
                        <Text style={{ fontSize: 18 }}>{data.about.hs}</Text>
                      </View> : null}

                    {data.about.graduation ?
                      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                        <Ionicons name="school" size={24} color="black" />
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>Went To .</Text>
                        <Text style={{ fontSize: 18 }}>{data.about.graduation}</Text>
                      </View> : null}

                    {data.about.masters ?
                      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                        <Ionicons name="school" size={24} color="black" />
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>Went To .</Text>
                        <Text style={{ fontSize: 18 }}>{data.about.masters}</Text>
                      </View> : null}
                  </View>
                </View>
              </View> : null}
          </ScrollView>
        </View>
        {windowWidth >= 700 ? <TouchableOpacity style={{ width: '25%', backgroundColor: '#000000AA' }} onPress={close}></TouchableOpacity> : null}
      </View>
    )
  }


  return (
    <View >
      <TouchableOpacity onPress={() => {
        if (myemail != email) {
          setShow(true)
          initialFollow();
          loadPostCount();
          LoadData();
        }
      }}>
        <View style={{
            width: diameter, height: diameter, borderRadius: diameter / 2, marginRight: 10,
            marginTop: margin,
            marginBottom: margin,
            backgroundColor: "#DCDCDC",
          }}>
          {uri ? <Image source={{ uri: uri, cache: 'force-cache' }} style={{
            width: diameter, height: diameter, borderRadius: diameter / 2
          }}
          /> : null}
        </View>

      </TouchableOpacity>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={show}
        onRequestClose={close}
      >
        <Vprofile />
      </Modal>
    </View>
  )

}

const style = StyleSheet.create({
  backprof: {
    width: windowWidth >= 700 ? windowWidth * 0.5 - 80 : windowWidth - 80,
    height: windowWidth >= 700 ? 400 : 250,
    marginLeft: 40,
    resizeMode: "cover",
    backgroundColor: '#DCDCDC',
    flexDirection: 'row'
  },

  profimg: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'white',
    marginTop: windowWidth >= 700 ? 300 : 150,
    justifyContent: 'center',
    alignItems: 'center'


  }

})

export default memo(ViewProfile)