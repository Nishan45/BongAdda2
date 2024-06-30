import { View, Text, Image, StyleSheet, Alert, Share, useWindowDimensions, Platform } from 'react-native'
import React, { memo, useContext, useState } from 'react'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { noteContext } from '../contexts/context';
import getCurrentTime from './getCurrentTime';
import axios from 'axios';
import OtherComment from './OtherComment';
import SERVER_LINK from '../MyFile';
import ViewProfile from './ViewProfs/ViewProfile';
import ViewPost from './ViewProfs/ViewPost';




const uri = SERVER_LINK + "/other_like";
const urif = SERVER_LINK + "/other_follow";


let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

const Story = ({ name, img, title, body, author, type, postid, posttime, user_only, user_id, viewProf, likes, likedby }) => {
  const contexts = useContext(noteContext);
  const email = contexts.state.email;
  const user_name = contexts.state.name;
  const user_img = contexts.state.profImg
  const [islike, setIslike] = useState(likedby)
  const [likec, setLikec] = useState(likes)
  const [follow, setFollow] = useState(null)
  windowWidth = useWindowDimensions().width
  windowHeight = useWindowDimensions().height
  let commentref = React.createRef()

  let time = '';
  if (posttime) {
    time = getCurrentTime(posttime)
  }

  const showComment = () => {
    commentref.setpostid(postid, email, user_name);
    commentref.get_comments(postid)
    commentref.show();
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
  const initialFollow = async () => {
    await axios.post(urif, { email: email, postid: postid, checking: true }).then(res => {
      if (res.data.yes) {
        setFollow(true)
      }
      else {
        setFollow(false)
      }
    })
  }

  const Follow = async () => {
    await axios.post(urif, { email: email, postid: postid, checking: false }).then(res => {
      if (res.data.yes) {
        setFollow(true)
      }
      else {
        setFollow(false)
      }
    })
  }
  const sure = () => Alert.alert('Confirmation', `Do you want to unfollow ${name}?`, [
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
  const share = async () => {
    const content = {
      message: (title && 'শিরোনাম : ' + title + '\n\n\n') + body + (author && '\n\n\n' + 'লেখক : ' + author),
    }
    try {
      const result = await Share.share(content)
      if (result.action == Share.sharedAction) {
        if (result.activityType) {
          console.log(result.activityType)
        }
      }
      else if (result.action == Share.dismissedAction) {
        console.log('dismissed')
      }
    }
    catch (e) {
      console.log(e)
    }
  }
  const[hover,setHover]=useState(false);
  const[likehover,setLikeHover]=useState(false);


  return (
    <View style={{
      paddingLeft: 5,
      paddingRight: 5,
      marginTop: 10,
      elevation: 3,
      alignSelf: 'center',
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: hover && { width: 1, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 1,

      transform: [
        { scale: ((hover&&Platform.OS=='web'&& windowWidth>700)? 1.02 : 1) }
      ]
    }}
    onPointerEnter={()=>setHover(true)}
    onPointerLeave={()=>setHover(false)}
    
    >
      <View style={styles.container}>
        <View style={{ flexDirection: "row", marginLeft: 20 }}>

          {!user_only ?<View onPointerDown={()=>setHover(false)}><ViewProfile uri={img} diameter={50} email={user_id} margin={10} /></View> : null}

          <View style={{ justifyContent: "center" }} >
            {(!user_only && email != user_id) ? <Text style={{ fontWeight: "bold", fontSize: 15 }}>{name}</Text> : <Text style={{ fontWeight: "bold", fontSize: 15 }}>You</Text>}
            {!user_only ? <Text style={{ fontSize: 10 }}>{time}</Text> : <Text style={{ fontSize: 10, margin: 10 }}>{time}</Text>}
          </View>
        </View>

      </View >
      <ViewPost story={true} title={title} body={body} author={author}
        width={windowWidth >= 1100 ? windowWidth * 0.25 - 10 : (windowWidth >= 700 ? windowWidth * 0.4 - 10 : windowWidth - 10)} height={windowWidth >= 1100 ? windowWidth * 0.25 - 10 : (windowWidth >= 700 ? windowWidth * 0.4 - 10 : windowWidth - 10)} borderradius={0} />

      <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: "center" }}>
      <View
          onPointerEnter={()=>setLikeHover(false)}
          onPointerDown={()=>setLikeHover(true)}
          onPointerUp={()=>setLikeHover(false)}
          onTouchStart={()=>setLikeHover(true)}
          onTouchEnd={()=>setLikeHover(false)}
          onTouchMove={()=>setLikeHover(false)}
          style={{
            transform:[
            {scale:(likehover?1.3:1)}
            ]
          }}
          >
        {islike ? <AntDesign name="heart" size={40} color="red" style={{ marginLeft: 20, padding: 10 }} onPress={like} /> : <AntDesign name="hearto" size={40} color="black" style={{ marginLeft: 20, padding: 10 }} onPress={like} />}
        </View>
        <Text style={{ fontSize: 20 }}>{likec}</Text>
        {!viewProf ?
          <FontAwesome5 name="comment" size={40} color="black" style={{ marginLeft: 20, padding: 10 }}
            onPress={showComment} onPointerDown={()=>setHover(false)}/> : null}
        {/*!viewProf &&
        <ShareTo postid={postid} category={type}/>*/}
        <MaterialIcons name="share" size={40} color="black" style={{ position: "absolute", right: 20 }} onPress={share} />


      </View>
      {!viewProf ?
        <OtherComment
          ref={(target) => commentref = target}
        /> : null}


    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: "center",
    //width:windowWidth*0.25,

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
    //height:windowHeight/2,
    height: windowHeight - 300,

  }

});

export default memo(Story)