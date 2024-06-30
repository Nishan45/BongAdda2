import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import ViewProfile from './ViewProfs/ViewProfile'
import SharedPost from './share/SharedPost'
import getCurrentTime from './getCurrentTime'
import { TouchableOpacity } from 'react-native'
import { Alert } from 'react-native'
import SERVER_LINK from '../MyFile'
import axios from 'axios'
import { noteContext } from '../contexts/context'
import { useState } from 'react'
import Spinner from 'react-native-loading-spinner-overlay'
import { useTranslation } from 'react-i18next'

const uri = SERVER_LINK + "/delete"

export default function GetNotification({ item, index, delete_item }) {
  const context = useContext(noteContext)
  const email = context.state.email
  const [load, setLoad] = useState(false)
  const {t}=useTranslation()

  const delete_notification = async () => {
    setLoad(true)
    try {
      await axios.post(uri, { email: email, item: item }).then(res => {
        setLoad(false)
        delete_item(index)
      })
    } catch (e) {
      setLoad(false)
      console.log(e)
    }
  }

  return (
    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", margin: 10, backgroundColor: "#F0FFFF" }} onLongPress={
      () => {
        Alert.alert('Delete', 'Delete this message', [
          { text: "cancel" },
          { text: 'ok', onPress: delete_notification },
        ])
      }
    }>
      <Spinner
        visible={load}
        textContent={'Deleting...'}
        textStyle={{ color: '#FFF' }}
      />
      <ViewProfile uri={item.profimg} diameter={40} email={item.from} margin={10} />
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "700" }}>{item.name} .</Text>
          <Text> {getCurrentTime(item.time)}</Text>
        </View>
        {(item.category == 'image' || item.category == 'Short Story' || item.category == 'Poem' || item.category == 'Jokes') ? <SharedPost text={item.text} item={item} />:<Text style={{ fontSize: 17 }}>{t(item.text)}</Text>}
      </View>

    </TouchableOpacity>

  )
}