import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import reactDom from 'react-dom';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';

import {firebase_db} from "../firebaseConfig"

export default function UpdateNote() {

  const [state,setState] = useState([])

  useEffect(()=>{
    setTimeout(()=>{
      firebase_db.ref('/patchnote').once('value').then((snapshot) => {
        let info = snapshot.val();
        setState(info)
      });
    },100)
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.box00}>
        <Image style={styles.box0} source={{uri:"https://firebasestorage.googleapis.com/v0/b/coupong-a1184.appspot.com/o/SESAM3.png?alt=media&token=aab6c39b-4724-4e38-a149-e98a100aa1dd"}}/>
      </View>
      <View style={styles.box1}>
        <Text style={styles.box1txt1}>{state.title}</Text>
      </View>
      <ScrollView style={styles.box2}>
        <Text style={styles.box2txt1}>{state.text}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  box1: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: '90%',

    backgroundColor:"#6667ab",
    borderRadius:10,
    marginBottom:5,

    justifyContent: 'center'

    //borderWidth:2
  },
  box1txt1: {
    color:'#ffffff',
    fontSize: 17.5
  },

  box00: {
    //borderWidth:2
    //marginTop:'30%',
  },
  box0: {
    marginLeft: '35%',
    marginBottom:-16,
    //marginRight: 25,

    height:150,
    width:150,
    resizeMode:'contain',

    //borderWidth:2,
    borderColor:'#000000',

    //flex:0.5
  },

  box2: {
      borderWidth:1.5,
      borderRadius:10,
      borderColor:"#6667ab",

      marginBottom:30,
      width: '90%',
  },
  box2txt1: {
    fontSize: 14,

    marginLeft:15,
    marginRight:15,
    marginTop:15
  },
});
