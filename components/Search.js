import { View, Text, Modal, TouchableOpacity, FlatList, Image, Button, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';
import { noteContext } from '../contexts/context';
import { useContext } from 'react';
import SearchUser from './SearchUser';
import { Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SERVER_LINK from '../MyFile';


const uri=SERVER_LINK+"/get_users";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Search() {
  const context=useContext(noteContext)
  const user=context.state.email
  const[show,setShow]=useState(false)
  const[search,setSearch]=useState('')
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const[come,setCome]=useState(false)
  const close=()=>{
    setShow(false)
  }

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name
          ? item.name.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const loadData=async()=>{
    
    await axios.post(uri,{user:user}).then(res=>{
      setFilteredDataSource(res.data)
      setMasterDataSource(res.data)
    })
    setCome(false)
  
  }

  return (
    <>
    <TouchableOpacity>
      <AntDesign name="search1" size={24} color="white" style={{marginRight:20}} onPress={()=>{loadData();setShow(true);setCome(true)}}/>
    </TouchableOpacity>
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={show}
      onRequestClose={close}
      >
        <View style={{backgroundColor:'white',flex:1}}>
        <SearchBar
          placeholder="Type Here..."
          searchIcon={{size:24}}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          value={search}
          containerStyle={{width:windowWidth,backgroundColor:"white",marginTop:20}}
          inputContainerStyle={{backgroundColor:"white",borderWidth:1}}
          
        />
        {come?<ActivityIndicator size={'large'} style={{marginTop:windowHeight/2-100}}/>:
         <FlatList
          data={filteredDataSource} showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          
          renderItem={({item})=>(
            <SearchUser  email={user} name={item.name}
            profImg={item.profImg} user={item.email} nopost={true}/>
          )}
        />
          }
        </View>
        
    </Modal>
    </>
      
  )
}