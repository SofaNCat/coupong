import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import reactDom from 'react-dom';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image, ScrollView, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import Constants from 'expo-constants';
import {firebase_db} from "../firebaseConfig"

import {
  setTestDeviceIDAsync,
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo-ads-admob';

export default function MakePlusCatePage({navigation, route}) {

    const [inputcate, setInputcate] = useState(['카테고리 이름을 입력하세요']);
    const [check1, setCheck1] = useState([]);

    useEffect(() => {
        const uniqueId = Constants.installationId;
        firebase_db.ref('/users/'+uniqueId+'/category').once('value').then((snapshot) => {
            let check01 = Object.keys(snapshot.val()).length;
            console.log('현재 개수:' + check01)
            setCheck1(Object.keys(snapshot.val()).length)
        })
    },[])

  const goAlert1 = () => {
    Alert.alert(
      `${inputcate}`,
      '카테고리를 추가하시겠어요?',
      [
          {
            text: "아니",
          },
          {
            text: "좋아",
            onPress: () => {
              const uniqueId = Constants.installationId;
              firebase_db.ref('users/'+uniqueId+'/category/' + check1).set({
                'cate': `${inputcate}`,
                'check': 1,

              });

              Alert.alert('알림', '카테고리를 추가했습니다!')
              
              navigation.navigate("MakePage")
            }

          }
      ],
      { cancelable: true }
    )
  };

  return (
    <View style={styles.container}>
      <View style={styles.box2}>
        <ScrollView style={styles.box3}>
            <View style={styles.list}>
                <TextInput style={styles.listtxt2}  onChangeText={text => setInputcate(text)}>{inputcate}</TextInput>
                <View style={styles.listicon}><Icon name="edit" size={22} color="#ffffff" /></View>
            </View>
        </ScrollView>
        <View style={styles.box5}>
          <TouchableOpacity style={styles.box5btn}  onPress={()=>goAlert1()}>
            <Text style={styles.box5txt}>추가하기</Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },

    box2: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: 25,
        marginRight: 25,
        marginTop:15,
        backgroundColor:"white",
        marginBottom:"10%"

        //borderWidth:2,

        //flex:1
    },

    list: {
        flexDirection: 'row',
        borderWidth:1,
        height:50,
        borderColor:"#f3f1ef",
        borderRadius:10,
        marginBottom:1,
        alignItems: 'center'
    },
    listtxt2: {
        flex:3,
        marginLeft:10,
        //borderWidth:2
    },
    listicon: {
        flex:0.5
    },

    box5: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:15,

        //borderWidth:1,   
        height:50,
        width:80
    
    },
    box5btn: {
        height:50,
        width:100,
        elevation:1,

        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor:"#f3f1ef",
        borderRadius:10,
    },
    box5txt: {
        fontSize: 13
    }
});
