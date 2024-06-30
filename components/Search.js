import { View, Text, Modal, TouchableOpacity, FlatList, Image, Button, KeyboardAvoidingView, ActivityIndicator, TextInput, SafeAreaView, useWindowDimensions } from 'react-native'
import React, { createRef, useCallback, useEffect, useState } from 'react'
import { AntDesign, Ionicons, Octicons } from '@expo/vector-icons';
import { SearchBar } from 'react-native-elements';
import axios from 'axios';
import { noteContext } from '../contexts/context';
import { useContext } from 'react';
import SearchUser from './SearchUser';
import { Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SERVER_LINK from '../MyFile';
import { StyleSheet } from 'react-native';
import DelayInput from "react-native-debounce-input";
import { ColorSpace } from 'react-native-reanimated';


const uri = SERVER_LINK + "/get_users";


let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

export default function Search() {
  const context = useContext(noteContext)
  const user = context.state.email
  const [show, setShow] = useState(false)
  const [query, setQuery] = useState('search')
  const [data, setData] = useState([])
  const [skip, setSkip] = useState(0)
  const [stop, setStop] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('')
  
  windowWidth=useWindowDimensions().width;
  windowHeight=useWindowDimensions().height;

  const close = () => {
    setShow(false);
    setSkip(0);
    setData([]);
    setQuery('ok');
    setSearch('');
    setLoading(false);
  }

  const loadData = async (controller) => {
    
    setLoading(true);
    try{
    await axios.post(uri, { email: user, query: query, skip: skip },{signal:controller.signal}).then(
      res => {
        if (res.data.length < 20) {
          setStop(true)
          
        }
        setData([...data, ...res.data])
        setLoading(false)
      }
    )
  }catch(e){
    console.log(e);
  }
    
  }

  useEffect(() => {
    
      setSkip(0);
      setData([])
      setSearch(query)
      setStop(false)
      setLoading(false)
    
  }, [query])

  useEffect(() => {
    const controller=new AbortController();
    if(show) loadData(controller);
    return ()=>controller.abort();
    
  }, [skip, search])
  
  

  const loadmore = () => {
    return (
      <View>
        {!stop && loading &&
          <ActivityIndicator size={'large'} style={{ margin: 10 }} />
        }
      </View>
    )
  }
  const onEndReached = () => {
    if (!stop && !loading) {
      setSkip(skip + 20)
    }
  }
  const keyExtractor = useCallback((item) => String(item._id), [])
  const renderItem = useCallback(({ item }) => {
    return (
      <SearchUser email={user} name={item.name}
        profImg={item.profImg} user={item.email} nopost={true} />
    )
  }, [])

  return (
    <>
      <TouchableOpacity 
      onPress={() => { setQuery(''); setSkip(0); setLoading(false); setData([]); setShow(true); setStop(false);setSearch(''); }}>
      
        <AntDesign name="search1" size={24} color="white" style={{ marginRight: 20 }}  />
      </TouchableOpacity>
      <Modal
        animationType={windowWidth<700?'fade':'slide'}
        transparent={true}
        visible={show}
        onRequestClose={close}
      >
        <View style={{flex:1,flexDirection:'row'}}>
        <TouchableOpacity style={{width:windowWidth>=700?'75%':0}} onPress={close}>
        </TouchableOpacity>
        <View style={{ backgroundColor: 'white', flex: 1,width:windowWidth<700?'auto':'25%',flexDirection:'column'}}>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20,marginBottom:20, justifyContent: "center" }}>
            {windowWidth<700?<Ionicons name="arrow-back-sharp" size={20} color="black" style={{ marginLeft: 10 }} onPress={close} />:
            <Ionicons name="close-circle" size={30} color="#CCD1D1" style={{ marginLeft: 10 }} onPress={close}/>}
            <DelayInput
              style={styles.input}
              onChangeText={setQuery}
              value={query}
              minLength={0}
              delayTimeout={500}
              placeholder='Search'
              autoFocus={true}
              />
          </View>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={loadmore}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            onEndReached={onEndReached}
          />
          {(data.length===0 && query.length>0 && !loading)?
          <Text style={{marginBottom:windowHeight/2,alignSelf:'center'}}>No results found</Text>:null}
        </View>
        
        </View>

      </Modal>
    </>

  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderRadius: 10,
    width:'50%',
    borderWidth: 1,
    flexGrow:5,
    backgroundColor: "white",
    padding:10,
    marginRight:10,
  },
})