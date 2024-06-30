import { View, Text, Button, Pressable, useWindowDimensions, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { noteContext } from '../contexts/context';
import { useContext } from 'react';
import axios from 'axios';
import upload_cloud from '../upload_cloud';
import { ScrollView } from 'react-native-gesture-handler';
import SERVER_LINK from '../MyFile';
import ViewPost from './ViewProfs/ViewPost';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import i18next from "../Services/i18next.js"

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

const uri = SERVER_LINK + "/upload_img";
const uri_postsc = SERVER_LINK + "/get_posts_count";
const uri_followersc = SERVER_LINK + "/get_followers_count";
const uri_followingc = SERVER_LINK + "/get_following_count";


export default function Profile({ navigation }) {
  const contexts = useContext(noteContext);
  const {t}=useTranslation()
  const [profimg, setProfimg] = useState(contexts.state.profImg);
  const [backimg, setBackimg] = useState(contexts.state.backgroundImg);
  const [scroll, setScroll] = useState(true);
  const [ind, setInd] = useState(0);
  const [postc, setPostc] = useState(null)
  const [followersc, setFollowersc] = useState(null)
  const [followingc, setFollowingc] = useState(null)
  const email = contexts.state.email;
  windowWidth = useWindowDimensions().width;
  windowHeight = useWindowDimensions().height;

  const getPostsCount = () => {
    if (cancelToken) {
      cancelToken.cancel();
    }
    cancelToken = axios.CancelToken.source();
    axios.post(uri_postsc, { email: email }, { cancelToken: cancelToken.token }).then(
      res => {
        setPostc(res.data.post)
        setFollowersc(res.data.follower)
        setFollowingc(res.data.following)
      }
    )
  }
  let cancelToken;

  if (postc == null) {

    getPostsCount();

  }

  const loadprofImg = async (link) => {
    try {
      await axios.post(uri, { email: email, image: { "profImg": link } }).then(res => {
        console.log("ok")
      })
    } catch (e) {
      console.log(e);
    }
  }
  const loadbackImg = async (link) => {
    try {
      await axios.post(uri, { email: email, image: { "backgroundImg": link } }).then(res => {
        console.log("ok")
      })
    } catch (e) {
      console.log(e);
    }
  }

  const setBackgroundImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.JPG,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      await upload_cloud(result).then(link => {
        loadbackImg(link);
        setBackimg(link);
        let state = Object.assign({}, contexts.state);
        state.backgroundImg = link;
        contexts.update(state);
      })
    }
  }
  const setProfileImg = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.JPG,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      await upload_cloud(result).then(link => {
        loadprofImg(link)
        setProfimg(link);
        let state = Object.assign({}, contexts.state);
        state.profImg = link;
        contexts.update(state);
      })
    }
  }
  const [show, setShow] = useState(true)
  const close = () => {
    setShow(false)
  }

  return (
    <View style={{ flex: 1, alignSelf: 'center', width: '100%' }}>

      <ScrollView showsVerticalScrollIndicator={false}>

        <ViewPost url={backimg} width={windowWidth} height={windowWidth >= 700 ? 300 : 200} borderradius={0} />
        <View style={{ position: 'absolute', margin: 'auto', alignSelf: 'center', top: windowWidth >= 700 ? 180 : 130, margin: 0 }}>
          <ViewPost url={profimg} width={windowWidth >= 700 ? 240 : 140} height={windowWidth >= 700 ? 240 : 140} borderradius={windowWidth >= 700 ? 180 : 90} />
        </View>
        <Pressable onPress={setProfileImg} style={{ position: 'absolute', margin: 'auto', alignSelf: 'center', left: windowWidth >= 1100 ? windowWidth / 3 + 110 : windowWidth / 2 + 60, top: windowWidth >= 700 ? 385 : 235 }}  >
          <MaterialCommunityIcons name="image-edit" size={35} color="grey" />
        </Pressable>
        <Pressable onPress={setBackgroundImg} style={{ position: 'absolute', margin: 'auto', top: windowWidth >= 700 ? 300 : 200, left: windowWidth >= 700 ? windowWidth / 3 - 240 : windowWidth / 2 - 140 }}  >
          <MaterialCommunityIcons name="image-edit" size={35} color="grey" />
        </Pressable>
        <View style={{ margin: 10, marginTop: 100, marginBottom: 20, alignSelf: 'center' }}>
          <Button title={t("Edit")+" "+t("Profile")} onPress={() => { navigation.navigate('Edit Profile') }} />
        </View>

        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
          <View style={{ width: '100%', borderRadius: 10, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30 }}>{contexts.state.name}</Text>
            {contexts.state.discription ? <Text style={{ margin: 10, fontSize: 17, marginTop: 20 }}>{contexts.state.discription}</Text> : null}
            <View style={{ flexDirection: "row", padding: 10 }}>
              <View style={{ alignItems: "center", margin: 15 }}>
                <Text style={{ fontSize: 20, borderBottomWidth: 1 }}>{t("Post")}</Text>
                <Text style={{ fontSize: 20 }}>{postc}</Text></View>
              <View style={{ alignItems: "center", margin: 15 }}>
                <Text style={{ fontSize: 20, borderBottomWidth: 1 }}>{t("Followers")}</Text>
                <Text style={{ fontSize: 20 }}>{followersc}</Text>
              </View>
              <View style={{ alignItems: "center", margin: 15 }}>
                <Text style={{ fontSize: 20, borderBottomWidth: 1 }}>{t("Following")}</Text>
                <Text style={{ fontSize: 20 }}>{followingc}</Text>
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
              <View style={{ margin: '1%', width: '30%', flex: 1 }}>
                <Button title={t("Post")} onPress={() => { setShow(false); navigation.navigate('Posts') }} />
              </View>
              <View style={{ margin: '1%', width: '30%', flex: 1 }}>
                <Button title={t("Followers")} onPress={() => { navigation.navigate('Followers') }} />
              </View>
              <View style={{ margin: '1%', width: '30%', flex: 1 }}>
                <Button title={t("Following")} onPress={() => { navigation.navigate('Following') }} />
              </View>
            </View>
          </View>

          <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 10, width: '100%', marginTop: 50, justifyContent: "center", marginBottom: 10 }}>
            <Text style={{ fontSize: 20, margin: 10, alignSelf: 'center' }}>About</Text>
            <View style={{ borderTopWidth: 1, width: '100%' }}>
              {contexts.state.about.profile ?
                <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                  <AntDesign name="infocirlce" size={24} color="black" />
                  <Text style={{ fontSize: 20, fontWeight: "500" }}>Profile .</Text>
                  <Text style={{ fontSize: 18 }}>{contexts.state.about.profile}</Text>
                </View> : null}

              {contexts.state.about.nickname ?
                <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                  <Entypo name="user" size={24} color="black" />
                  <Text style={{ fontSize: 20, fontWeight: "500" }}>Nickname .</Text>
                  <Text style={{ fontSize: 18, }}>{contexts.state.about.nickname}</Text>
                </View> : null}

              {contexts.state.about.gender ?
                <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                  <FontAwesome name="transgender" size={24} color="black" />
                  <Text style={{ fontSize: 20, fontWeight: "500" }}>Gender .</Text>
                  <Text style={{ fontSize: 18, }}>{contexts.state.about.gender}</Text>
                </View> : null}

              {contexts.state.about.dob ?
                <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                  <FontAwesome name="birthday-cake" size={24} color="black" />
                  <Text style={{ fontSize: 20, fontWeight: "500" }}>Date Of Birth .</Text>
                  <Text style={{ fontSize: 18, }}>{contexts.state.about.dob}</Text>
                </View> : null}

              {contexts.state.about.work ?
                <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                  <Entypo name="suitcase" size={24} color="black" />
                  <Text style={{ fontSize: 20, fontWeight: "500" }}>Work .</Text>
                  <Text style={{ fontSize: 18, }}>{contexts.state.about.work}</Text>
                </View> : null}

              {contexts.state.about.curlocation ?
                <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                  <Entypo name="location-pin" size={24} color="black" />
                  <Text style={{ fontSize: 20, fontWeight: "500" }}>Lives At .</Text>
                  <Text style={{ fontSize: 18, }}>{contexts.state.about.curlocation}</Text>
                </View> : null}

              {contexts.state.about.hometown ?
                <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                  <Entypo name="location-pin" size={24} color="black" />
                  <Text style={{ fontSize: 20, fontWeight: "500" }}>From .</Text>
                  <Text style={{ fontSize: 18, }}>{contexts.state.about.hometown}</Text>
                </View> : null}

              {contexts.state.about.secondary ?
                <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                  <Ionicons name="school" size={24} color="black" />
                  <Text style={{ fontSize: 20, fontWeight: "500" }}>Went To .</Text>
                  <Text style={{ fontSize: 18, }}>{contexts.state.about.secondary}</Text>
                </View> : null}

              {contexts.state.about.hs ?
                <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                  <Ionicons name="school" size={24} color="black" />
                  <Text style={{ fontSize: 20, fontWeight: "500" }}>Went To .</Text>
                  <Text style={{ fontSize: 18, }}>{contexts.state.about.hs}</Text>
                </View> : null}

              {contexts.state.about.graduation ?
                <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                  <Ionicons name="school" size={24} color="black" />
                  <Text style={{ fontSize: 20, fontWeight: "500" }}>Went To .</Text>
                  <Text style={{ fontSize: 18, }}>{contexts.state.about.graduation}</Text>
                </View> : null}

              {contexts.state.about.masters ?
                <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                  <Ionicons name="school" size={24} color="black" />
                  <Text style={{ fontSize: 20, fontWeight: "500" }}>Went To .</Text>
                  <Text style={{ fontSize: 18, }}>{contexts.state.about.masters}</Text>
                </View> : null}

            </View>
          </View>
        </View>
      </ScrollView>
    </View>


  )
}

