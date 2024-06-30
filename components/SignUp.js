import { View, Text, Alert, Button, Image, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { StyleSheet } from 'react-native';
import axios from 'axios';
import { noteContext } from '../contexts/context';
import { useContext } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { Dimensions } from 'react-native';
import {
  ToastAndroid,
  Platform,
} from 'react-native';
import { ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SERVER_LINK from '../MyFile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import alert from '../alert';

const image = require('../assets/BongAdda.jpg')

const uri = SERVER_LINK + "/";

let width = Dimensions.get('window').width;


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


export default function Login({ navigation }) {
  const [name, setname] = React.useState("");
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const contexts = useContext(noteContext);
  const [load, setLoad] = useState(false)
  const [show, setShow] = useState(false)
  width = useWindowDimensions().width;

  function isValidEmail(email) {
    return /\S+@gmail.com+/.test(email);
  }

  async function saved(e) {

    e.preventDefault()
    if (name && email && password) {
      if (name.length < 2) {
        notifyMessage('Minimum length for name is 2')
        return
      }
      else if (name.length > 25) {
        notifyMessage('Maximum length for name is 25')
        return
      }
      else if (!isValidEmail(email)) {
        notifyMessage('Invalid email')
        return
      }
      var lowerCase = /[a-z]/g;
      var upperCase = /[A-Z]/g;
      var numbers = /[0-9]/g;
      var specialCharacters = /[!@#$%^&*]/g;

      if (password.length < 8) {
        notifyMessage("Password length should be more than 8.");
        return
      }
      else if (password.length > 16) {
        notifyMessage("Password length should not be more than 16.");
        return
      }
      else if (!password.match(lowerCase)) {
        notifyMessage("Password should contains lowercase letters!");
        return
      }
      else if (!password.match(upperCase)) {
        notifyMessage("Password should contains uppercase letters!");
        return
      }
      else if (!password.match(numbers)) {
        notifyMessage("Password should contains numbers!");
        return
      }
      else if (!password.match(specialCharacters)) {
        notifyMessage("Password should contains special characters!");
        return
      }

      else {
        setLoad(true)
        try {
          axios.post(uri, { name, email, password }
          ).then(async res => {
            setLoad(false)
            if (res.data == 'exist') {

              notifyMessage('email already exist')
            }
            else {
              notifyMessage("Information saved successfully")
              try {
                await AsyncStorage.setItem('User', JSON.stringify(res.data))
              } catch (e) {
                console.log(e)
              }
              contexts.update(res.data);
              navigation.replace('MyTabs')
            }
          }
          )
        }
        catch (error) {
          setLoad(false)
          console.log(error)
        }

      }

    }
    else {
      notifyMessage('all data must be filled')
    }
  }

  return (
    <KeyboardAwareScrollView
    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'white' }}
    >
      <View style={styles(width).box}>
        <Spinner
          visible={load}
          textContent={'Loading...'}
          textStyle={styles(width).Spinner}
        />
        <View style={{ justifyContent: "center", alignItems: "center", margin: 20 }}>
          <Image source={image} style={{ width: Math.min(100, width - 100), height: Math.min(100, width - 100), borderRadius: (width - 100) / 2 }} />
        </View>
        <View style={styles(width).container}>
          <TextInput
            style={styles(width).input}
            onChangeText={setname}
            value={name}
            placeholder='name'
            borderWidth={0}
          />
          <AntDesign name="infocirlceo" size={20} color="grey" style={{ position: "absolute", left: 10 }} onPress={() => alert('Name', '* Length between 2-25.', [{ text: 'ok' }])} />

        </View>
        <View style={styles(width).container}>
          <TextInput
            style={styles(width).input}
            onChangeText={setemail}
            value={email}
            placeholder='email'
            numbers={10}
          />
          <AntDesign name="infocirlceo" size={20} color="grey" style={{ position: "absolute", left: 10 }} onPress={() => alert('Email', '* Must be a valid email.\n* Example - something@gmail.com', [{ text: 'ok' }])} />
        </View>
        <View style={styles(width).container}>
          <TextInput
            style={styles(width).input}
            onChangeText={setpassword}
            secureTextEntry={!show}
            value={password}
            placeholder='password'
          />
          <AntDesign name="infocirlceo" size={20} color="grey" style={{ position: "absolute", left: 10 }} onPress={() => alert('Password', "* Length between 8-16.\n* Minimum one uppercase letter.\n* Minimum one lowercase letter.\n* Minimum one number.\n* Minimum one special character.\n* Example - Ahsj145@$#", [{ text: 'ok' }])} />
          {show ?
            <Ionicons name="eye-outline" size={25} color="grey" style={{ position: "absolute", right: 10 }} onPress={() => setShow(false)} /> :
            <Ionicons name="eye-off-outline" size={25} color="grey" style={{ position: "absolute", right: 10 }} onPress={() => setShow(true)} />
          }
        </View>
        <View style={styles(width).button}>
          <Button title="Sign Up" onPress={saved} />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>OR</Text>
        </View>
        <View style={styles(width).button}>
          <Button title="Login" onPress={() => { navigation.replace('Login') }} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}
const styles =(width)=>StyleSheet.create({
  box:{
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
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    paddingLeft:40,
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
    width: Math.min(400, width - 80),
    marginBottom: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset:{ width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  Spinner: {
    color: '#FFF'
  }
});