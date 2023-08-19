import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { noteContext } from '../../contexts/context';
import axios from 'axios';
import { FlatList } from 'react-native';
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import SearchUser from '../SearchUser';
import SERVER_LINK from '../../MyFile';


const uri=SERVER_LINK+"/get_followers";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function UserFollowers() {
  const context=useContext(noteContext)
  const user=context.state.email
  const[search,setSearch]=useState('')
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

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

  const loadData=()=>{
    
    axios.post(uri,{email:user}).then(res=>{
      setFilteredDataSource(res.data)
      setMasterDataSource(res.data)
    })
  
  }
  if(filteredDataSource.length==0){
    loadData()
  }

  return (
    <View style={{backgroundColor:"white",flex:1}}>
      <SearchBar
          placeholder="Type Here..."
          searchIcon={{size:24}}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          value={search}
          containerStyle={{width:windowWidth,backgroundColor:"white",marginTop:20}}
          inputContainerStyle={{backgroundColor:"white",borderWidth:1}}
        />
         <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item})=>(
            <SearchUser  email={user} name={item.name}
            profImg={item.profImg} user={item.email}/>
          )}
        />
        
    </View>
  )
}