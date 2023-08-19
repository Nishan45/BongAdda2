import { View, Text, TextInput, Button, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import { noteContext } from '../contexts/context'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import SERVER_LINK from '../MyFile'
import axios from 'axios'
import { Dimensions } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import { Alert } from 'react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const uri=SERVER_LINK+"/edit_profile";

function notifyMessage(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  } else {
    AlertIOS.alert(msg);
  }
};

export default function EditProfile({navigation}) {
    const context=useContext(noteContext)
    const email=context.state.email
    const[name,setName]=useState(context.state.name)
    const[nickname,setNickname]=useState(context.state.about.nickname)
    const[gender,setGender]=useState(context.state.about.gender)
    const[dob,setDob]=useState(context.state.about.dob)
    const[profile,setProfile]=useState(context.state.about.profile)
    const[work,setWork]=useState(context.state.about.work)
    const[curLocation,setCurLocation]=useState(context.state.about.curlocation)
    const[homeTown,setHomeTown]=useState(context.state.about.hometown)
    const[secondary,setSecondary]=useState(context.state.about.secondary)
    const[hs,setHs]=useState(context.state.about.hs)
    const[graduation,setGraduation]=useState(context.state.about.graduation)
    const[masters,setMasters]=useState(context.state.about.masters)
    const[discription,setDiscription]=useState(context.state.discription)

    const[load,setLoad]=useState(false)

    const profilecategory=[
        {key:1,value:"Actor"},
        {key:2,value:"Artist"},
        {key:3,value:"Blogger"},
        {key:4,value:"Chef"},
        {key:5,value:"Comedian"},
        {key:6,value:"Designer"},
        {key:7,value:"Digital Creater"},
        {key:8,value:"Entrepreneur"},
        {key:9,value:"Fashion Model"},
        {key:10,value:"Gamer"},
        {key:11,value:"Journalist"},
        {key:12,value:"Musician"},
        {key:13,value:"Photographer"},
        {key:14,value:"Sportsperson"},
        {key:15,value:"Writer"},
        {key:16,value:"Doctor"},
        {key:17,value:"Engineer"},
    ]

    const savechanges=async()=>{
        setLoad(true)
        let state = Object.assign({}, context.state);
        state.about.nickname=nickname;
        state.about.gender=gender;
        state.about.dob=dob;
        state.about.profile=profile;
        state.about.work=work;
        state.about.curlocation=curLocation;
        state.about.hometown=homeTown;
        state.about.secondary=secondary;
        state.about.hs=hs;
        state.about.graduation=graduation;
        state.about.masters=masters;
        state.discription=discription;
        state.name=name;
        
        await axios.post(uri,{about:state.about,name:name,email:email,discription:discription}).then(res=>{
            context.update(state);
            setLoad(false)
            navigation.goBack()
        })
        
    }

    const sure=()=>Alert.alert('Confirmation', 'Are you sure', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: savechanges},
      ]);

  return (
    
    <View >
        <Spinner
          
          visible={load}
          
          textContent={'Loading...'}
          
          textStyle={style.Spinner}
      />
    <ScrollView >
      <View style={{margin:10,justifyContent:"center"}}>
        <Text style={{fontSize:20,borderBottomWidth:1}}>Basic Info</Text>
        <View style={{flexDirection:"row",margin:10,justifyContent:"center"}}>
        <TextInput
        style={style.text}
        value={name}
        onChangeText={setName}
        placeholder='Name'
        />
        <Button title='cancel' onPress={()=>{setName(context.state.name)}}/>
        </View>
        <View style={{flexDirection:"row",margin:10,marginTop:0,justifyContent:"center"}}>
        <TextInput
        style={style.text}
        value={nickname}
        onChangeText={setNickname}
        placeholder='Nickname'
        />
        <Button title='cancel' onPress={()=>{setNickname(context.state.about.nickname)}}/>
        </View>
        <View style={{flexDirection:"row",margin:10,marginTop:0,justifyContent:"center"}}>
        <TextInput
        style={style.text}
        value={gender}
        onChangeText={setGender}
        placeholder='Gender'
        />
        <Button title='cancel' onPress={()=>{setGender(context.state.about.gender)}}/>
        </View>
        <View style={{flexDirection:"row",margin:10,marginTop:0,justifyContent:"center"}}>
        <TextInput
        style={style.text}
        value={dob}
        onChangeText={setDob}
        placeholder='Date Of Birth'
        />
        <Button title='cancel' onPress={()=>{setDob(context.state.about.dob)}}/>
        </View>
        <View style={{justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
        <SelectList 
        placeholder='Profile'
        setSelected={(val) => setProfile(val)} 
        data={profilecategory} 
        save="value"
        search={false}
        boxStyles={style.type}
        dropdownStyles={{height:130,borderWidth:0}}
        dropdownItemStyles={{backgroundColor:"white"}}
        />
        </View>
      </View>
      <View style={{margin:10}}>
        <Text style={{fontSize:20,borderBottomWidth:1}}>Discription</Text>
        
        <TextInput
        style={{padding:10,
            margin:10,
            elevation:5,
            backgroundColor:"white"}}
        multiline
        numberOfLines={4}
        value={discription}
        onChangeText={setDiscription}
        placeholder='Describe Yourself'
        />
        <Button title='cancel' onPress={()=>{setDiscription(context.state.discription)}}/>
        
      </View>
      <View style={{margin:10}}>
        <Text style={{fontSize:20,borderBottomWidth:1}}>Work</Text>
        <View style={{flexDirection:"row",margin:10,justifyContent:"center"}}>
        <TextInput
        style={style.text}
        value={work}
        onChangeText={setWork}
        placeholder='Work'
        />
        <Button title='cancel' onPress={()=>{setWork(context.state.about.work)}}/>
        </View>
      </View>
      <View style={{margin:10}}>
        <Text style={{fontSize:20,borderBottomWidth:1}}>Loacation</Text>
        <View style={{flexDirection:"row",margin:10,justifyContent:"center"}}>
        <TextInput
        style={style.text}
        value={curLocation}
        onChangeText={setCurLocation}
        placeholder='Current Location'
        />
        <Button title='cancel' onPress={()=>{setCurLocation(context.state.about.curlocation)}}/>
        </View>
        <View style={{flexDirection:"row",margin:10,marginTop:0,justifyContent:"center"}}>
        <TextInput
        style={style.text}
        value={homeTown}
        onChangeText={setHomeTown}
        placeholder='Home Town'
        />
        <Button title='cancel' onPress={()=>{setHomeTown(context.state.about.hometown)}}/>
        </View>
      </View>
      
      <View style={{margin:10}}>
        <Text style={{fontSize:20,borderBottomWidth:1}}>School Name</Text>
        <View style={{flexDirection:"row",margin:10,justifyContent:"center"}}>
        <TextInput
        style={style.text}
        value={secondary}
        onChangeText={setSecondary}
        placeholder='Secondary Education'
        />
        <Button title='cancel' onPress={()=>{setSecondary(context.state.about.secondary)}}/>
        </View>
        <View style={{flexDirection:"row",margin:10,marginTop:0,justifyContent:"center"}}>
        <TextInput
        style={style.text}
        value={hs}
        onChangeText={setHs}
        placeholder='Higher Secondary Education'
        />
        <Button title='cancel' onPress={()=>{setHs(context.state.about.hs)}}/>
        </View>
      </View>
      <View style={{margin:10}}>
        <Text style={{fontSize:20,borderBottomWidth:1}}>Collage/University Name</Text>
        <View style={{flexDirection:"row",margin:10,justifyContent:"center"}}>
        <TextInput
        style={style.text}
        value={graduation}
        onChangeText={setGraduation}
        placeholder='Graduation'
        />
        <Button title='cancel' onPress={()=>{setGraduation(context.state.about.graduation)}}/>
        </View>
        <View style={{flexDirection:"row",margin:10,marginTop:0,justifyContent:"center"}}>
        <TextInput
        style={style.text}
        value={masters}
        onChangeText={setMasters}
        placeholder='Masters'
        />
        <Button title='cancel' onPress={()=>{setMasters(context.state.about.masters)}}/>
        </View>
      </View>
      <Button title='save changes' onPress={()=>{
        if(name.length<2){
          notifyMessage('name must consist of atleast 2 characters')
        }
        else if(name.length>25){
          notifyMessage('maximum length for name is 25')
        }
        else{
          sure()
        }
      }}/>
      </ScrollView>
    </View>
  )
}

const style=StyleSheet.create({
    text:{
        padding:10,
        width:windowWidth-100,
        height:40,
        fontSize:15,
        elevation:5,
        backgroundColor:"white"
    
      },
    type:{
        width:380,
        backgroundColor:"white",
        elevation:5,
        borderWidth:0,
        borderRadius:0,
        fontSize:10,
        
      },
      Spinner:{
        color: '#FFF'
      },
})