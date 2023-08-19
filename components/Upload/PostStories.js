import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextInput } from 'react-native'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import axios from 'axios'
import { noteContext } from '../../contexts/context';
import { useContext } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { Dimensions } from 'react-native';
import SERVER_LINK from '../../MyFile'
import {
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';

function notifyMessage(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  } else {
    AlertIOS.alert(msg);
  }
};


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const uri=SERVER_LINK+"/upload_other";


export default function PostStories() {
  const[title,setTitle]=useState("")
  const[body,setBody]=useState("")
  const[author,setAuthor]=useState("")
  const [selected, setSelected] = useState('');
  const contexts=useContext(noteContext);
  const email=contexts.state.email
  const [loading,setLoading]=useState(false)
  const[value,setSelectedValue]=useState('')

  const data=[{key:'1', value:'ছোট গল্প'},
  {key:'2', value:'কবিতা'},
  {key:'3', value:'কৌতুক'},
  ]

  const upload=async()=>{
    if(value=='ছোট গল্প') setSelected('Short Story')
    if(value=='কবিতা') setSelected('Poem')
    if(value=='কৌতুক') setSelected('Jokes')

    if(!value){
      notifyMessage('select category')
      return;
    }
    if((value!='কৌতুক' && (!title||!author)) || !body ){
      notifyMessage('all data must be filled')
      return;
    }
    if(selected!=''){
    try{
    setLoading(true)
    

    await axios.post(uri,{email,selected,title,body,author}).then(res=>{
    setTitle('')
    setBody('')
    setAuthor('')
    setSelected('')
    setSelectedValue('')
    setLoading(false)
    })
  }
    catch(e){
      console.log(e)
    }
  }
  }
  
  return (
    <KeyboardAwareScrollView>
    <View style={style.container}>
    <Spinner
          
          visible={loading}
          
          textContent={'Uploading...'}
          
          textStyle={style.Spinner}
      />
    <SelectList 
        placeholder='প্রকার নির্বাচন করুন'
        setSelected={(val) => setSelectedValue(val)} 
        data={data} 
        save="value"
        search={false}
        boxStyles={style.type}
        dropdownStyles={{height:130,borderWidth:0}}
        dropdownItemStyles={{backgroundColor:"white"}}
    />
    
      <TextInput
      placeholder={value!='কৌতুক'?'শিরোনাম':'শিরোনাম (ঐচ্ছিক)'}
      onChangeText={setTitle}
      value={title}
      style={style.title}
      
      />
      <TextInput
      editable
      multiline
      numberOfLines={6}
      enter
      autoCorrect={true}
      placeholder={`এখানে ${value} লিখুন`}
      autoCapitalize={'sentences'}
      onChangeText={setBody}
      value={body}
      style={style.body}
      
      />
      {value!='কৌতুক'&&<TextInput
      placeholder='লেখক'
      onChangeText={setAuthor}
      value={author}
      style={style.author}
      />}
      <View style={style.button}>
      <Button

      title='আপলোড'
      onPress={upload}
      />
      </View>
      
      
    </View>
    </KeyboardAwareScrollView>
  )
}

const style=StyleSheet.create({
  container:{
    justifyContent:"center",
    alignItems:"center"

  },
  
  title:{
    textAlign:"center",
    fontSize:18,
    marginTop:10,
    
    elevation:3,
    width:windowWidth-10,
    height:50,
    borderRadius:10,
    backgroundColor:"white"
  },
  body:{
    textAlignVertical:"top",
    padding:10,
    marginTop:10,
    height:windowHeight/2-12,
    width:windowWidth-10,
    elevation:3,
    borderRadius:10,
    fontSize:18,
    backgroundColor:"white"
  },
  author:{
    textAlign:"center",
    fontSize:18,
    marginTop:10,
    marginBottom:10,
    elevation:3,
    width:windowWidth-10,
    height:50,
    borderRadius:10,
    backgroundColor:"white"
  },
  button:{
    
    width:windowWidth,
    
  },
  type:{
    width:windowWidth-10,
    marginTop:10,
    backgroundColor:"white",
    elevation:5,
    borderWidth:0,
    fontSize:18,
  },
  Spinner:{
    color: '#FFF'
  }
  
})