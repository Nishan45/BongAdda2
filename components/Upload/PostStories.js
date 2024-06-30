import { View, Text, SafeAreaView, useWindowDimensions } from 'react-native'
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
import alert from '../../alert'

import {
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';
import { useTranslation } from 'react-i18next'

function notifyMessage(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  } else {
    alert('Alert',msg, [
      {
        text: 'ok',
        style: 'cancel',
      },
    ]);
    //AlertIOS.alert(msg);
  }
};


let windowWidth = Dimensions.get('window').width;
let windowHeight = Dimensions.get('window').height;

const uri = SERVER_LINK + "/upload_other";

export default function PostStories() {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [author, setAuthor] = useState("")
  const [selected, setSelected] = useState('');
  const contexts = useContext(noteContext);
  const email = contexts.state.email
  const [loading, setLoading] = useState(false)
  const [value, setSelectedValue] = useState('')

  windowWidth = useWindowDimensions().width;
  windowHeight = useWindowDimensions().height;

  const{t}=useTranslation()

  const data = [{ key: '1', value:t("Story") },
  { key: '2', value:t("Poem") },
  { key: '3', value:t("Jokes") },
  ]

  const upload = async () => {
    if (value ==t("Story")) setSelected('Short Story')
    if (value ==t("Poem")) setSelected('Poem')
    if (value ==t("Jokes")) setSelected('Jokes')

    if (!value) {
      notifyMessage('select category')
      return;
    }
    if ((value != t("Jokes") && (!title || !author)) || !body) {
      notifyMessage('all data must be filled')
      return;
    }
    if (selected != '') {
      try {
        setLoading(true)
        await axios.post(uri, { email, selected, title, body, author }).then(res => {
          setTitle('')
          setBody('')
          setAuthor('')
          setSelected('')
          setSelectedValue('')
          setLoading(false)
        })
      }
      catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}>
      <View style={style(windowWidth).container}>
        <Spinner
          visible={loading}
          textContent={'Uploading...'}
          textStyle={style.Spinner}
        />
        <SelectList
          placeholder={t("Select category")}
          setSelected={(val) => setSelectedValue(val)}
          data={data}
          save="value"
          search={false}
          boxStyles={style(windowWidth).type}
          dropdownStyles={{ height: 130, borderWidth: 0 }}
          dropdownItemStyles={{ backgroundColor: "white" }}
        />
        <TextInput
          placeholder={value !=t("Jokes") ? t("Title") : t("Title")+" ("+t("optional")+")"}
          onChangeText={setTitle}
          value={title}
          style={style(windowWidth).title}
        />
        <TextInput
          editable
          multiline
          numberOfLines={6}
          autoCorrect={true}
          placeholder={t("Write here")}
          autoCapitalize={'sentences'}
          onChangeText={setBody}
          value={body}
          style={style(windowWidth).body}
        />
        {(value !=t("Jokes"))?<TextInput
          placeholder={t("Author")}
          onChangeText={setAuthor}
          value={author}
          style={style(windowWidth).author}
        />:null}
        <View style={style(windowWidth).button}>
          <Button
            title={t("Upload")}
            onPress={upload}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

const style = (windowWidth) => StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: 'center',
    flex: 1,
  },
  type: {
    width: windowWidth >= 700 ? windowWidth * 0.85 * 0.7 : windowWidth - 10,
    backgroundColor: "white",
    elevation: 5,
    borderWidth: 0,
    fontSize: 18,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    height: windowHeight * 0.05,
    elevation: 3,
    width: windowWidth >= 700 ? '70%' : windowWidth - 10,
    borderRadius: 10,
    backgroundColor: "white"
  },
  body: {
    textAlignVertical: "top",
    height: windowHeight * 0.55,
    width: windowWidth >= 700 ? '70%' : windowWidth - 10,
    padding: 10,
    elevation: 3,
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: "white",
  },
  author: {
    textAlign: "center",
    fontSize: 18,
    elevation: 3,
    width: windowWidth >= 700 ? '70%' : windowWidth - 10,
    height: windowHeight * 0.05,
    borderRadius: 10,
    backgroundColor: "white"
  },
  button: {
    width: windowWidth >= 700 ? '70%' : windowWidth,
  },

  Spinner: {
    color: '#FFF'
  }

})