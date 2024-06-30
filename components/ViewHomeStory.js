import { View, Text, Image, StyleSheet } from 'react-native'
import React, { memo, useContext, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { noteContext } from '../contexts/context';
import getCurrentTime from './getCurrentTime';
import axios from 'axios';
import SERVER_LINK from '../MyFile';
import ViewPost from './ViewProfs/ViewPost';
import { useWindowDimensions } from 'react-native';


const uri = SERVER_LINK + "/other_like";

let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

const ViewHomeStory = ({ name, img, title, body, author, type, postid, posttime, user_only, user_id, viewProf, likes, likedby }) => {
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
  /*if(islike==null && postid){
    initiallike();
  }*/

  return (
    <View style={{
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,
      elevation: 3,
      alignSelf: 'center',
      backgroundColor: 'white'

    }}>
      <View style={styles.container}>
        <View style={{ flexDirection: "row", marginLeft: 20 }}>
          <View style={{ justifyContent: "center" }} >
            <Text style={{ fontSize: 10, margin: 10 }}>{time}</Text>
          </View>
        </View>
      </View >
      <ViewPost story={true} title={title} body={body} author={author}
        width={windowWidth >= 1100 ? windowWidth * 0.25 - 10 : (windowWidth >= 700 ? windowWidth * 0.4 - 10 : windowWidth - 10)} height={windowWidth >= 1100 ? windowWidth * 0.25 - 10 : (windowWidth >= 700 ? windowWidth * 0.4 - 10 : windowWidth - 10)} borderradius={0} />
      <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: "center" }}>
        {islike ? <AntDesign name="heart" size={40} color="red" style={{ marginLeft: 20, padding: 10 }} onPress={like} /> : <AntDesign name="hearto" size={40} color="black" style={{ marginLeft: 20, padding: 10 }} onPress={like} />}
        <Text style={{ fontSize: 20 }}>{likec}</Text>
      </View>

    </View>

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
    height: windowHeight / 2,

  }

});

export default memo(ViewHomeStory)