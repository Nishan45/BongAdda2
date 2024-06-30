import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native'
import React, { useState, memo, useEffect } from 'react'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { noteContext } from '../contexts/context';
import { useContext } from 'react';
import axios from 'axios';
import getCurrentTime from './getCurrentTime';
import { KeyboardAvoidingView } from 'react-native';
import SERVER_LINK from '../MyFile';
import ViewPost from './ViewProfs/ViewPost';
import { Share } from 'react-native';

const uri = SERVER_LINK + "/like";


let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;



const ViewHomePost = ({ name, img, profimg, discription, postid, posttime, user_only, user_id, post, viewProf,likes, likedby }) => {
  const contexts = useContext(noteContext);
  const email = contexts.state.email;
  const [islike, setIslike] = useState(likedby)
  const [likec, setLikec] = useState(likes)
  windowWidth = useWindowDimensions().width
  windowHeight = useWindowDimensions().height


  let time = '';
  if (posttime) {
    time = getCurrentTime(posttime)
  }

  const initiallike = async () => {
    await axios.post(uri, { email: email, postid: postid, checking: true }).then(res => {
      if (res.data.yes) {
        setIslike(true)
        setLikec(res.data.number)

      }
      else {
        setIslike(false)
        setLikec(res.data.number)
      }
    })
  }


  const like = async () => {
    await axios.post(uri, { email: email, postid: postid, checking: false }).then(res => {
      if (res.data.yes) {
        setIslike(true)
        setLikec(res.data.number)
      }
      else {
        setIslike(false)
        setLikec(res.data.number)
      }
    })
  }


  /*if (islike == null && postid) {
    initiallike();
  }*/
  const share=async()=>{
    const options={
      message:img,
    }
    try{
      const result=await Share.share(options)
      if(result.action==Share.sharedAction){
        if(result.activityType){
          console.log(result.activityType)
        }
      }
      else if(result.action==Share.dismissedAction){
        console.log('dismissed')
      }
    }
    catch(e){
      console.log(e)
    }
  }


  return (
    <KeyboardAvoidingView>
      <View style={{
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        backgroundColor: 'white',
        elevation: 3,
        width: '100%',
        alignSelf: 'center',

      }}>
        <View style={styles.container}>
          <View style={{ flexDirection: "row", marginLeft: 20 }}>
            <View style={{ justifyContent: "center" }} >
              <Text style={{ fontSize: 10, margin: 10 }}>{time}</Text>
            </View>

          </View>

        </View>

        <ViewPost url={img} width={windowWidth >= 1100 ? windowWidth * 0.25 - 10 : (windowWidth >= 700 ? windowWidth * 0.4 - 10 : windowWidth - 10)} height={windowWidth >= 1100 ? windowWidth * 0.25 - 10 : (windowWidth >= 700 ? windowWidth * 0.4 - 10 : windowWidth - 10)} borderradius={0} />


        {discription ?<Text style={{ fontSize: 20, padding: 10 }}>{discription}</Text>:null}
        <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: "center" }}>
          {islike ? <AntDesign name="heart" size={40} color="red" style={{ marginLeft: 20, padding: 10 }} onPress={like} /> : <AntDesign name="hearto" size={40} color="black" style={{ marginLeft: 20, padding: 10 }} onPress={like} />}
          <Text style={{ fontSize: 20 }}>{likec}</Text>
          <MaterialIcons name="share" size={40} color="black" style={{position:"absolute",right:20}} onPress={share}/>

        </View>



      </View>
    </KeyboardAvoidingView>

  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: "center"
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 50,
    backgroundColor: "#DCDCDC"
  },
  post: {
    width: windowWidth - 10,
    height: windowHeight - 300,
    backgroundColor: "#DCDCDC"
  }

});

export default memo(ViewHomePost);