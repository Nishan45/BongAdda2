import { View, Text, Button, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { ImageBackground } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { noteContext } from '../contexts/context';
import { useContext } from 'react';
import axios from 'axios';
import upload_cloud from '../upload_cloud';
import HomeScreen from './HomeScreen';
import { ScrollView } from 'react-native';
import SERVER_LINK from '../MyFile';
import ViewPost from './ViewProfs/ViewPost';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const uri = SERVER_LINK + "/upload_img";
const uri_postsc = SERVER_LINK + "/get_posts_count";
const uri_followersc = SERVER_LINK + "/get_followers_count";
const uri_followingc = SERVER_LINK + "/get_following_count";



export default function Profile({ navigation }) {
  const contexts = useContext(noteContext);

  const [profimg, setProfimg] = useState(contexts.state.profImg);
  const [backimg, setBackimg] = useState(contexts.state.backgroundImg);
  const [scroll, setScroll] = useState(true);
  const [ind, setInd] = useState(0);
  const [postc, setPostc] = useState(null)
  const [followersc, setFollowersc] = useState(null)
  const [followingc, setFollowingc] = useState(null)
  const email = contexts.state.email;

  const getPostsCount = () => {
    axios.post(uri_postsc, { email: email }).then(
      res => {
        setPostc(res.data)
      }
    )
  }
  const getFollowersCount = () => {
    axios.post(uri_followersc, { email: email }).then(
      res => {
        setFollowersc(res.data)
      }
    )
  }
  const getFollowingCount = () => {
    axios.post(uri_followingc, { email: email }).then(
      res => {
        setFollowingc(res.data)
      }
    )
  }
  if (postc == null) {
    getPostsCount();
  }
  if (followersc == null) {
    getFollowersCount();
  }
  if (followingc == null) {
    getFollowingCount();
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

  return (
    <View style={{ flex: 1,backgroundColor:"white" }}>


      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={{ flexDirection: 'row', flex: 1 }}>
          <ImageBackground source={{ uri: backimg }} style={style.backprof} >

            <View style={style.profimg}>

              <ViewPost url={profimg} width={180} height={180} borderradius={90} />
            </View>


          </ImageBackground>

          <Pressable onPress={setBackgroundImg} style={{ marginTop: 200 }}  >
            <MaterialCommunityIcons name="image-edit" size={35} color="blue" />
          </Pressable>
        </View>
        <Pressable onPress={setProfileImg} style={{ marginLeft: 220, marginTop: 50 }}  >
          <MaterialCommunityIcons name="image-edit" size={35} color="blue" />
        </Pressable>
        <View style={{ margin: 10, marginTop: 40,marginBottom:20 }}>
          <Button title='Edit Profile' onPress={() => { navigation.navigate('Edit Profile') }} />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
          <Text style={{ fontSize: 30, fontStyle: "italic",borderBottomWidth:1 }}>{contexts.state.name}</Text>
          
          {contexts.state.discription && <Text  style={{margin:10,fontSize:20,marginTop:20}}>{contexts.state.discription}</Text>}
          <View style={{margin:20,width:windowWidth,alignItems:"center",borderTopWidth:1,borderBottomWidth:1,marginTop:50,justifyContent:"center"}}>
            <Text style={{fontSize:25,fontStyle:"italic",margin:10}}>About Info</Text>
            <View style={{borderTopWidth:1}}>

            {contexts.state.about.profile &&
            <View style={{flexDirection:"row",alignItems:"center",margin:10}}>
              <AntDesign name="infocirlce" size={24} color="black" style={{marginLeft:20}}/>
             <Text style={{fontSize:20,fontWeight:"500"}}>Profile .</Text>
             <Text style={{fontSize:18,width:windowWidth-130}}>{contexts.state.about.profile}</Text>
            </View>}

            {contexts.state.about.nickname &&
            <View style={{flexDirection:"row",alignItems:"center",margin:10}}>
              <Entypo name="user" size={24} color="black" style={{marginLeft:20}} />
             <Text style={{fontSize:20,fontWeight:"500"}}>Nickname .</Text>
             <Text style={{fontSize:18,width:windowWidth-130}}>{contexts.state.about.nickname}</Text>
            </View>}

            {contexts.state.about.gender &&
            <View style={{flexDirection:"row",alignItems:"center",margin:10}}>
              <FontAwesome name="transgender" size={24} color="black" style={{marginLeft:20}}/>
             <Text style={{fontSize:20,fontWeight:"500"}}>Gender .</Text>
             <Text style={{fontSize:18,width:windowWidth-130}}>{contexts.state.about.gender}</Text>
            </View>} 

            {contexts.state.about.dob &&
            <View style={{flexDirection:"row",alignItems:"center",margin:10}}>
              <FontAwesome name="birthday-cake" size={24} color="black" style={{marginLeft:20}}/>
             <Text style={{fontSize:20,fontWeight:"500"}}>Date Of Birth .</Text>
             <Text style={{fontSize:18,width:windowWidth-130}}>{contexts.state.about.dob}</Text>
            </View>}     

            {contexts.state.about.work &&
            <View style={{flexDirection:"row",alignItems:"center",margin:10}}>
              <Entypo name="suitcase" size={24} color="black" style={{marginLeft:20}}/>
             <Text style={{fontSize:20,fontWeight:"500"}}>Work .</Text>
             <Text style={{fontSize:18,width:windowWidth-130}}>{contexts.state.about.work}</Text>
            </View>}

            {contexts.state.about.curlocation &&
            <View style={{flexDirection:"row",alignItems:"center",margin:10}}>
              <Entypo name="location-pin" size={24} color="black" style={{marginLeft:20}}/>
             <Text style={{fontSize:20,fontWeight:"500"}}>Lives At .</Text>
             <Text style={{fontSize:18,width:windowWidth-130}}>{contexts.state.about.curlocation}</Text>
            </View>}

            {contexts.state.about.hometown &&
            <View style={{flexDirection:"row",alignItems:"center",margin:10}}>
              <Entypo name="location-pin" size={24} color="black" style={{marginLeft:20}}/>
             <Text style={{fontSize:20,fontWeight:"500"}}>From .</Text>
             
             <Text style={{fontSize:18,width:windowWidth-130}}>{contexts.state.about.hometown}</Text>
             
            </View>}

            {contexts.state.about.secondary &&
            <View style={{flexDirection:"row",alignItems:"center",margin:10}}>
              <Ionicons name="school" size={24} color="black" style={{marginLeft:20}}/>
             <Text style={{fontSize:20,fontWeight:"500"}}>Went To .</Text>
             <Text style={{fontSize:18,width:windowWidth-130}}>{contexts.state.about.secondary}</Text>
            </View>}

            {contexts.state.about.hs &&
            <View style={{flexDirection:"row",alignItems:"center",margin:10}}>
              <Ionicons name="school" size={24} color="black" style={{marginLeft:20}}/>
             <Text style={{fontSize:20,fontWeight:"500"}}>Went To .</Text>
             <Text style={{fontSize:18, width:windowWidth-130}}>{contexts.state.about.hs}</Text>
            </View>}

            {contexts.state.about.graduation &&
            <View style={{flexDirection:"row",alignItems:"center",margin:10}}>
              <Ionicons name="school" size={24} color="black" style={{marginLeft:20}}/>
             <Text style={{fontSize:20,fontWeight:"500"}}>Went To .</Text>
             <Text style={{fontSize:18,width:windowWidth-130}}>{contexts.state.about.graduation}</Text>
            </View>}

            {contexts.state.about.masters &&
            <View style={{flexDirection:"row",alignItems:"center",margin:10}}>
              <Ionicons name="school" size={24} color="black" style={{marginLeft:20}} />
             <Text style={{fontSize:20,fontWeight:"500"}}>Went To .</Text>
             <Text style={{fontSize:18,width:windowWidth-130}}>{contexts.state.about.masters}</Text>
            </View>}
                 
            </View>
          </View>
          
          <View style={{ flexDirection: "row", padding: 10 }}>
            <View style={{ alignItems: "center" ,margin:15}}>
              <Text style={{ fontSize: 20, fontStyle: "italic",borderBottomWidth:1 }}>পোস্ট </Text>
              <Text style={{ fontSize: 20 }}>{postc}</Text>
            </View>
            <View style={{ alignItems: "center" ,margin:15}}>
              <Text style={{ fontSize: 20, fontStyle: "italic", borderBottomWidth:1 }}>অনুসারী </Text>
              <Text style={{ fontSize: 20 }}>{followersc}</Text>
            </View>
            <View style={{ alignItems: "center" ,margin:15}}>
              <Text style={{ fontSize: 20, fontStyle: "italic", borderBottomWidth:1 }}>অনুসরণ করছি </Text>
              <Text style={{ fontSize: 20 }}>{followingc}</Text>
            </View>
          </View>

        </View>

        <View style={{ margin: 10 }}>
          <Button title={"পোস্ট"} onPress={() => { navigation.navigate('Posts') }} />
        </View>
        <View style={{ margin: 10 }}>
          <Button title={"অনুসারী"} onPress={() => { navigation.navigate('Followers') }} />
        </View>
        <View style={{ margin:10}}>
          <Button title={"অনুসরণ করছি"} onPress={() => { navigation.navigate('Following') }} />
        </View>
      </ScrollView>
    </View>


  )
}

const style = StyleSheet.create({
  backprof: {
    width: windowWidth - 80,
    height: 250,
    marginLeft: 40,
    
    backgroundColor: '#DCDCDC',
    flexDirection: 'row'
  },

  profimg: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'white',
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center'


  }

})