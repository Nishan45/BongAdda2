import { View,Text,Button,Image,useWindowDimensions } from 'react-native'
import React, {useState } from 'react'
import { TextInput } from 'react-native'
import { StyleSheet } from 'react-native';
import axios from 'axios';
import { noteContext } from '../contexts/context';
import { useContext } from 'react';
import { Dimensions } from 'react-native';
import {
  ToastAndroid,
  Platform,
  AlertIOS,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import i18next from "../Services/i18next.js"

const image = require('../assets/BongAdda.jpg')

import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SERVER_LINK from '../MyFile';
import alert from '../alert';

let width = Dimensions.get('window').width;


const uri = SERVER_LINK + "/login";

function notifyMessage(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  } else {
    alert('Message', msg, [
      {
        text: 'ok',
        style: 'cancel',
      },
    ]);
  }
};


let loading = false

export default function Login({ navigation }) {

  const [email, setemail] = React.useState('');
  const [password, setpassword] = React.useState('');
  const [load, setLoad] = useState(false)
  const { t } = useTranslation()

  const contexts = useContext(noteContext);

  function isValidEmail(email) {
    return /\S+@gmail.com+/.test(email);
  }
  width = useWindowDimensions().width


  async function check(e) {
    setLoad(true)
    loading = true
    e.preventDefault()
    if (email) {

      if (!isValidEmail(email)) {
        setLoad(false)
        loading = false
        notifyMessage('invalid email')

      }
      else {

        try {
          await axios.post(uri, { email, password }
          ).then(async res => {
            if (res.data == 'notexist') {
              setLoad(false)
              loading = false
              notifyMessage('Not Registered')
            }
            else if (res.data == 'mismatched') {
              setLoad(false)
              loading = false
              notifyMessage('invalid password')
            }
            else {
              contexts.update(res.data)
              try {
                await AsyncStorage.setItem('User', JSON.stringify(res.data))
                await AsyncStorage.setItem('Language','en')
              } catch (e) {
                console.log(e)
              }
              navigation.replace('MyTabs')
            };
          }
          )
        }
        catch (error) {

          console.log(error)
        }
      }
    }
    else {
      loading = false
      setLoad(false)
      notifyMessage('email is required')
    }
  }
  const getuser = async () => {
    const data = JSON.parse(await AsyncStorage.getItem('User'))
    const lang=await AsyncStorage.getItem('Language')
    if (data != null) {
      contexts.update(data);
      i18next.changeLanguage(lang);
      navigation.replace('MyTabs')
    }

  }


  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'white' }}>
      <View style={styles(width).container}>
        <Spinner
          visible={load}
          textContent={'Loading...'}
          textStyle={styles(width).Spinner}
        />
        <View style={{ justifyContent: "center", alignItems: "center", margin: 40 }}>
          <Image source={image} style={{ width: Math.min(100, width - 100), height: Math.min(100, width - 100), borderRadius: (width - 100) / 2 }} />
        </View>
        <TextInput
          style={styles(width).input}
          onChangeText={setemail}
          value={email}
          placeholder='email'
        />
        <TextInput
          style={styles(width).input}
          onChangeText={setpassword}
          secureTextEntry={true}
          value={password}
          placeholder='password'
        />
        <View style={styles(width).button}>
          <Button title="Login" onPress={check} />

        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>OR</Text>
        </View>

        <View style={styles(width).button}>
          <Button title="Sign Up" onPress={() => { navigation.replace('SignUp') }} />
        </View>

      </View>
    </KeyboardAwareScrollView>
  )
}
const styles = (width) => StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Math.min(width - 40, 450),
    alignSelf: 'center',
    backgroundColor: 'white',
    elevation: 3,
    padding: 20,
    shadowColor: '#000',
    shadowOffset:{ width: 1, height: 2 },
    borderWidth:Platform.OS === 'android'?0:1,
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  input: {
    height: 40,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    backgroundColor: "white",
    width: Math.min(400, width - 80),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset:{ width: 1, height: 1.5 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    outlineStyle: 'none'
  },
  button: {
    marginBottom: 10,
    marginTop: 10,
    width: Math.min(400, width - 80),
    shadowColor: '#000',
    shadowOffset:{ width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  Spinner: {
    color: '#FFF'
  }

});