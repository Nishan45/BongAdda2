import React, { PureComponent, useEffect } from 'react'
import { Text, View, Modal, TextInput, Image, useWindowDimensions } from 'react-native'
import { KeyboardAwareScrollView, KeyboardAwareSectionList } from 'react-native-keyboard-aware-scroll-view'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import axios from 'axios';

import { ScrollView } from 'react-native';

import getCurrentTime from './getCurrentTime';
import SERVER_LINK from '../MyFile';
import ViewProfile from './ViewProfs/ViewProfile';
import { TouchableOpacity } from 'react-native';


const uri = SERVER_LINK + "/comment";
const uri2 = SERVER_LINK + "/get_comments";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default class Comment extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      show: false,
      text: '',
      postid: '',
      userid: '',
      name: '',
      comments: [],
      sendc: true,
      t:null,
    }

  }
  setpostid = (post, userid, name) => {
    this.setState({ postid: post })
    this.setState({ userid: userid })
    this.setState({ name: name })

  }
  show = () => {
    this.setState({ show: true })
  }
  close = () => {
    this.setState({ show: false })
  }
  send = (postid, userid, name, text) => {
    this.setState({ sendc: false })
    axios.post(uri, { postid: postid, userid: userid, text: text }).then(res => this.get_comments(postid))
  }

  get_comments = (postid) => {
    axios.post(uri2, { postid: postid }).then(res => {
      this.setState({ comments: res.data })
      this.setState({ text: '' })
      this.setState({ sendc: true })
    })
  }
  

  render() {
    let { show } = this.state
    let { postid } = this.state
    let { text } = this.state
    let { userid } = this.state
    let { name } = this.state
    let { comments } = this.state
    

    return (
      <Modal
        animationType={windowWidth < 700 ? 'slide' : 'fade'}
        transparent={true}
        visible={this.state.show}
        onRequestClose={this.close}
      >
        <View style={{ width: '100%', backgroundColor: '#000000AA', flex: 1, flexDirection: 'row', }}>
          {windowWidth >= 700 ? <TouchableOpacity style={{ width: '20%' }} onPress={this.close} /> : null}

          <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
              <TouchableOpacity style={{ height: 100, width: '100%' }} onPress={this.close} />

              <View style={{ backgroundColor: "white", width: '100%', height: 700, justifyContent: "center", alignItems: "center", borderRadius: 10, flex: 1 }}>
                <Text style={{ fontSize: 20, padding: 10 }}>Comments</Text>
                <View style={{ marginLeft: 10, marginRight: 10, height: 420, flex: 1, width: '100%' }}>

                  <ScrollView contentContainerStyle={{ flexGrow: 1, width: '100%' }} showsVerticalScrollIndicator={false} >

                    {this.state.comments.map((item, index) => {

                      return (
                        <View key={String(index)} style={{ flexDirection: 'row', margin: 10 }}>
                          {item.email && <ViewProfile uri={item.profimg} diameter={30} margin={0} email={item.email} />}

                          <View >
                            <View style={{ flexDirection: "row", alignItems: "center" }}>

                              {item.name != name ? <Text style={{ fontWeight: "bold" }}>{item.name}</Text> : <Text style={{ fontWeight: "bold" }}>You</Text>}
                              <Text style={{ fontSize: 10 }}>   {getCurrentTime(item.time)}</Text>
                            </View>
                            <Text style={{ width: windowWidth >= 700 ? windowWidth * 0.6 - 80 : windowWidth - 80 }}>{item.text}</Text>
                          </View>

                        </View>
                      )
                    })
                    }
                  </ScrollView>
                </View>
                <View style={{ width: '100%', flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                  <TextInput
                    multiline
                    autoFocus={true}
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                    style={{ height: 60, width: windowWidth >= 700 ? windowWidth * 0.6 - 100 : windowWidth - 100, borderWidth: 1, fontSize: 22, borderRadius: 10, paddingLeft: 10, paddingRight: 10 }}
                    placeholder="comment_here"
                  />
                  <MaterialCommunityIcons name="send-circle" size={50} color="blue" onPress={() => {
                    if (this.state.text != '' && this.state.sendc) { this.send(postid, userid, name, this.state.text) }

                  }} />
                </View>
              </View>
            </View>

          </KeyboardAwareScrollView>
          {windowWidth >= 700 ? <TouchableOpacity style={{ width: '20%' }} onPress={this.close} /> : null}


        </View>
      </Modal>

    )
  }
}
