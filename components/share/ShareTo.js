import { View, Text, FlatList, Dimensions, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { SearchBar } from 'react-native-elements'
import { noteContext } from '../../contexts/context'
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { Modal } from 'react-native';
import SearchUser from '../SearchUser';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SERVER_LINK from '../../MyFile';
import Share from './Share';


const uri=SERVER_LINK+'/get_users_share';
const urif=SERVER_LINK+'/get_followers_share';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function ShareTo({postid,category}) {
  const context=useContext(noteContext)
  const user=context.state.email
  const[search,setSearch]=useState('')
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [show,setShow]=useState(false)
  const[follow,setFollow]=useState(false)
  const[all,setAll]=useState(false)
  const[alldata,setAllData]=useState([]);
  const[followdata,setFollowData]=useState([])

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
    
    await axios.post(uri,{email:user,postid:postid,category:category}).then(res=>{
      setAllData(res.data)
    })
  
  }
  const loadDataFollowers=async()=>{
    await axios.post(urif,{email:user,postid:postid,category:category}).then(res=>{
      setFollowData(res.data)
    })
  }
  const close=()=>{
    setShow(false)
  }
  return (
    <>
    
    <MaterialIcons name="share" size={40} color="black" style={{position:"absolute",right:20}} onPress={()=>{
      setShow(true);
      loadDataFollowers();
      loadData();
      setFollow(false);
      setAll(false);
      
      }}/>
    
    

    <Modal
      animationType={'fade'}
      transparent={true}
      visible={show}
      onRequestClose={close}
      >
    <View style={{backgroundColor:"white",flex:1}}>
      <SearchBar
          placeholder="To"
          searchIcon={{size:24}}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          value={search}
          containerStyle={{width:windowWidth,backgroundColor:"white",marginTop:20}}
          inputContainerStyle={{backgroundColor:"white",borderWidth:1}}
        />
        <View style={{flexDirection:"row",justifyContent:"center"}}>
          <View style={{width:windowWidth/2}}>
          {follow?<Button title='অনুসারী' onPress={()=>{setFilteredDataSource(followdata);setMasterDataSource(followdata);}}/>:<Button title='অনুসারী' color={'#7CB9E8'} onPress={()=>{setFollow(true);setFilteredDataSource(followdata);setMasterDataSource(followdata);setAll(false)}}/>}
        </View>
        <View style={{width:windowWidth/2}}>
          {all?<Button title='সমস্ত ইউজার'/>:<Button title='সমস্ত ইউজার' color={'#7CB9E8'} onPress={()=>{setAll(true);setFilteredDataSource(alldata);setMasterDataSource(alldata) ;setFollow(false)}}/>}
        </View>
        </View>
        {!follow && !all && <View style={{alignItems:"center",justifyContent:"center",marginTop:windowHeight/2-100}}><Text>শেয়ার করার জন্য একটি বিকল্প বেছে নিন</Text></View>}
        {(follow || all)&&
         <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item})=>(
            <Share  email={user} name={item.name}
            profImg={item.profImg} user={item.email}
            postid={postid} category={category}/>
          )}
        />
          }
    </View>
    </Modal>
    </>
  )
}