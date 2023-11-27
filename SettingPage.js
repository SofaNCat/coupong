import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import reactDom from 'react-dom';
import { StyleSheet, Text, View, TouchableOpacity, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

import {firebase_db} from "../firebaseConfig"

export default function SettingPage() {

  const navigation = useNavigation();

  const [state,setState] = useState([])

  useEffect(()=>{
    setTimeout(()=>{
      firebase_db.ref('/patchnote').once('value').then((snapshot) => {
        let info = snapshot.val();
        setState(info)
      });
    },100)
  },[])

  const link = () => {
    Linking.openURL('https://blog.naver.com/PostView.naver?blogId=dkim09221&Redirect=View&logNo=222640924661&categoryNo=17&isAfterWrite=true&isMrblogPost=false&isHappyBeanLeverage=true&contentLength=1704')
  }

  return (
    <View style={styles.container}>
      <View style={styles.box00}>
        <Image style={styles.box0} source={{uri:"https://firebasestorage.googleapis.com/v0/b/coupong-a1184.appspot.com/o/SESAM2.png?alt=media&token=c3279cbc-ef8a-4313-a178-f3a7dcceca7a"}}/>
      </View>
      <View style={styles.box1}>
        {/*<TouchableOpacity style={styles.box1btn}>
          <Text style={styles.box1txt1}>쿠폰 데이터 백업</Text>
  </TouchableOpacity>*/}
        <TouchableOpacity style={styles.box1btn} onPress={() => navigation.navigate("UpdateNote")}>
          <View style={styles.box1icon1} onPress={() => goAlert1()}><Icon name="filetext1" size={22} color="#333333" /></View>
          <Text style={styles.box1txt1}>패치 노트</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box1btn} onPress={() => link()}>
          <View style={styles.box1icon1} onPress={() => goAlert1()}><Icon name="message1" size={22} color="#333333" /></View>
          <Text style={styles.box1txt1}>문의하기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box2}>
        <Text style={styles.box2txt1}>ver {state.ver}</Text>
      </View>
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
    //flex:1.5,
    width: '100%',
    backgroundColor: '#fff',

    //borderWidth:2
  },
  box1icon1: {
    flex:1,
    alignItems: 'center',
    //borderWidth:2
  },
  box1btn: {
    height: 45,
    width: '90%',
    flexDirection:'row',

    backgroundColor:"#f2f2f2",
    borderRadius:5,
    marginBottom:6,

    alignItems:'center',
    justifyContent: 'center'
  },
  box1txt1: {
    fontSize: 17,
    color:'#333333',
    //marginLeft: 25,
    flex:5
  },

  box00: {
    //borderWidth:2
    marginTop:'35%',
  },
  box0: {
    marginLeft: '35%',
    marginBottom:-17,
    //marginRight: 25,

    height:150,
    width:150,
    resizeMode:'contain',

    //borderWidth:2,
    borderColor:'#000000',

    //flex:0.5
  },

  box2: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 20,
    flex:1,

    //borderWidth:2
  },
  box2txt1: {
    fontSize: 15,
    color: '#666666'
  },
});
