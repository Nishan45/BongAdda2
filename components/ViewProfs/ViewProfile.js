import { View, Text, Image, Button, ImageBackground, StyleSheet, Dimensions, ScrollView, Alert, StatusBar } from 'react-native'
import React, { memo, useContext, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Modal } from 'react-native'
import axios from 'axios';
import SERVER_LINK from '../../MyFile';
import ViewPost from './ViewPost';
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { noteContext } from '../../contexts/context';
import ViewPosts from './ViewPosts';
import { Entypo } from '@expo/vector-icons';


const url = SERVER_LINK + "/get_user_info";
const urlp = SERVER_LINK + "/get_posts_count"
const urif=SERVER_LINK+"/profile_follow";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



function ViewProfile({ uri, diameter, email, margin ,nopost}) {
  const [show, setShow] = useState(false)
  const [data, setData] = useState([])
  const [postsc, setPostc] = useState(0)
  const [followersc, setFollowersc] = useState(0)
  const [followingc, setFollowingc] = useState(0)
  const context=useContext(noteContext)
  const myemail=context.state.email
  const[follow,setFollow]=useState(null)

  const initialFollow=async ()=>{
    await axios.post(urif,{email:myemail,follow:email,checking:true}).then(res=>{
      if(res.data.yes){
        setFollow(true)
      }
      else{
        setFollow(false)
      }
    })
  }

  const Follow=async ()=>{
    await axios.post(urif,{email:myemail,follow:email,checking:false}).then(res=>{
      if(res.data.yes){
        setFollow(true)
      }
      else{
        setFollow(false)
      }
    })
  }
  if(follow==null && email){
    initialFollow();
  }

  const close = () => {
    setShow(false)
  }
  const LoadData = () => {
    axios.post(url, { email: email }).then(
      res => {
        setData(res.data)
        setFollowersc(res.data.followers.length);
        setFollowingc(res.data.following.length)
      }
    )
  }
  const loadPostCount = () => {
    axios.post(urlp, { email: email }).then(res => {
      setPostc(res.data)
    })
  }
  if (data == null || data.length == 0) {
    LoadData();
    loadPostCount();
  }
  const sure=()=>Alert.alert('Confirmation', `Do you want to unfollow ${data.name}?`, [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {text: 'OK', onPress: Follow},
  ]);
  const check=()=>{
    if(follow){
      sure();
    }
    else{
      Follow()
    }
  }

  return (
    <>
      <TouchableOpacity onPress={() => {
        if(myemail!=email) {
        setShow(true) 
        initialFollow();
        loadPostCount();
        LoadData();
        }
        }}>
        <Image source={{ uri: uri }} style={{
          width: diameter, height: diameter, borderRadius: diameter / 2, marginRight: 10,
          marginTop: margin,
          marginBottom: margin,
          backgroundColor: "#DCDCDC",
        }}
        />
      </TouchableOpacity>
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={show}
        onRequestClose={close}
      >
        <View style={{ backgroundColor: 'white', flex: 1 }}>
          <View style={{ height: 60, alignItems: "center", flexDirection: "row" }}>
            <Ionicons name="arrow-back-sharp" size={30} color="black" style={{ marginLeft: 20 }} onPress={() => { setShow(false) }} />
            <Text style={{ fontSize: 22, marginLeft: 20 }}>Back</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>

            <View style={{ flexDirection: 'row', flex: 1 }}>

              <ImageBackground source={{ uri: data.backgroundImg, headers: { 'Accept': 'image/*' }, cache: 'only-if-cached' }} style={style.backprof} >

                <View style={style.profimg}>

                  <ViewPost url={data.profImg} width={180} height={180} borderradius={90} />

                </View>

              </ImageBackground>

            </View>
            <View style={{marginTop:150}}>
            {follow?<Button title="অনুসরণ করছি" onPress={check} color={'green'}/>:<Button title="অনুসরণ" onPress={Follow}/>}
            </View>
            {data.name &&
              <View style={{ justifyContent: "center", alignItems: "center",marginTop:30 }}>
                <Text style={{ fontSize: 30, fontStyle: "italic", borderBottomWidth: 1 }}>{data.name}</Text>

                {data.discription && <Text style={{ margin: 10, fontSize: 20, marginTop: 20 }}>{data.discription}</Text>}
                <View style={{ margin: 20, width: windowWidth, alignItems: "center", borderTopWidth: 1, borderBottomWidth: 1, marginTop: 50 }}>
                  <Text style={{ fontSize: 25, fontStyle: "italic", margin: 10 }}>About Info</Text>
                  <View style={{ borderTopWidth: 1 }}>

                    {data.about.profile &&
                      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                        <AntDesign name="infocirlce" size={24} color="black" style={{marginLeft:20}}/>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>Profile .</Text>
                        <Text style={{ fontSize: 18, width: windowWidth - 130 }}>{data.about.profile}</Text>
                      </View>}

                    {data.about.nickname &&
                      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                        <Entypo name="user" size={24} color="black" style={{marginLeft:20}}/>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>Nickname .</Text>
                        <Text style={{ fontSize: 18, width: windowWidth - 130 }}>{data.about.nickname}</Text>
                      </View>}

                    {data.about.gender &&
                      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                        <FontAwesome name="transgender" size={24} color="black" style={{marginLeft:20}}/>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>Gender .</Text>
                        <Text style={{ fontSize: 18, width: windowWidth - 130 }}>{data.about.gender}</Text>
                      </View>}

                    {data.about.dob &&
                      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                        <FontAwesome name="birthday-cake" size={24} color="black" style={{marginLeft:20}}/>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>Date Of Birth .</Text>
                        <Text style={{ fontSize: 18, width: windowWidth - 130 }}>{data.about.dob}</Text>
                      </View>}

                    {data.about.work &&
                      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                        <Entypo name="suitcase" size={24} color="black" style={{marginLeft:20}}/>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>Work .</Text>
                        <Text style={{ fontSize: 18, width: windowWidth - 130 }}>{data.about.work}</Text>
                      </View>}

                    {data.about.curlocation &&
                      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                        <Entypo name="location-pin" size={24} color="black" style={{marginLeft:20}}/>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>Lives At .</Text>
                        <Text style={{ fontSize: 18, width: windowWidth - 130 }}>{data.about.curlocation}</Text>
                      </View>}

                    {data.about.hometown &&
                      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                        <Entypo name="location-pin" size={24} color="black" style={{marginLeft:20}}/>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>From .</Text>

                        <Text style={{ fontSize: 18, width: windowWidth - 130 }}>{data.about.hometown}</Text>

                      </View>}

                    {data.about.secondary &&
                      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                        <Ionicons name="school" size={24} color="black" style={{marginLeft:20}}/>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>Went To .</Text>
                        <Text style={{ fontSize: 18, width: windowWidth - 130 }}>{data.about.secondary}</Text>
                      </View>}

                    {data.about.hs &&
                      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                        <Ionicons name="school" size={24} color="black" style={{marginLeft:20}}/>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>Went To .</Text>
                        <Text style={{ fontSize: 18, width: windowWidth - 130 }}>{data.about.hs}</Text>
                      </View>}

                    {data.about.graduation &&
                      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                        <Ionicons name="school" size={24} color="black" style={{marginLeft:20}}/>
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>Went To .</Text>
                        <Text style={{ fontSize: 18, width: windowWidth - 130 }}>{data.about.graduation}</Text>
                      </View>}

                    {data.about.masters &&
                      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 }}>
                        <Ionicons name="school" size={24} color="black" style={{marginLeft:20}} />
                        <Text style={{ fontSize: 20, fontWeight: "500" }}>Went To .</Text>
                        <Text style={{ fontSize: 18, width: windowWidth - 130 }}>{data.about.masters}</Text>
                      </View>}

                  </View>
                </View>


                <View style={{ flexDirection: "row", padding: 10 }}>
                  <View style={{ alignItems: "center", margin: 15 }}>
                    <Text style={{ fontSize: 20, fontStyle: "italic", borderBottomWidth: 1 }}>পোস্ট </Text>
                    <Text style={{ fontSize: 20 }}>{postsc}</Text>
                  </View>
                  <View style={{ alignItems: "center", margin: 15 }}>
                    <Text style={{ fontSize: 20, fontStyle: "italic", borderBottomWidth: 1 }}>অনুসারী </Text>
                    <Text style={{ fontSize: 20 }}>{followersc}</Text>
                  </View>
                  <View style={{ alignItems: "center", margin: 15 }}>
                    <Text style={{ fontSize: 20, fontStyle: "italic", borderBottomWidth: 1 }}>অনুসরণ করছেন </Text>
                    <Text style={{ fontSize: 20 }}>{followingc}</Text>
                  </View>
                </View>

              </View>}



            <View >
              {data.email && !nopost &&<ViewPosts email={data.email}/>}
            </View>
            
          </ScrollView>


        </View>
      </Modal>

    </>
  )

}

const style = StyleSheet.create({
  backprof: {
    width: windowWidth - 80,
    height: 250,
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
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center'


  }

})

export default memo(ViewProfile)