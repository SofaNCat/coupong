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

export default function PlusCouponPage({navigation, route}) {

    const [inputcoupon, setInputcoupon] = useState(['쿠폰 코드를 입력하세요']);
    const [check1, setCheck1] = useState([]);

    const goAdd = async () =>{
      try {
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
      await AdMobInterstitial.showAdAsync();
      } catch (e) {console.log(e)}
      await navigation.navigate("CouponPage")
  }

    useEffect(() => {
        const uniqueId = Constants.installationId;
        firebase_db.ref('/users/'+uniqueId+'/getcoupon').once('value').then((snapshot) => {
            let check01 = Object.keys(snapshot.val()).length;
            console.log('현재 개수:' + check01)
            setCheck1(Object.keys(snapshot.val()).length)
        })


        Platform.OS === 'ios' ? AdMobInterstitial.setAdUnitID("ca-app-pub-5639017285310996/5212848014") : AdMobInterstitial.setAdUnitID("ca-app-pub-5639017285310996/8775148450")

        AdMobInterstitial.addEventListener("interstitialDidLoad", () =>
            console.log("interstitialDidLoad")
        );
        AdMobInterstitial.addEventListener("interstitialDidFailToLoad", () =>
            console.log("interstitialDidFailToLoad")
        );
        AdMobInterstitial.addEventListener("interstitialDidOpen", () =>
            console.log("interstitialDidOpen")
        );
        AdMobInterstitial.addEventListener("interstitialDidClose", () => {
            console.log("interstitialDidClose")
        });
    },[])

  const goAlert1 = () => {
    Alert.alert(
      `${inputcoupon}`,
      '쿠폰을 발급받으시겠어요?',
      [
          {
            text: "아니",
          },
          {
            text: "좋아",
            onPress: () => {
              const uniqueId = Constants.installationId;
              firebase_db.ref('customcoupon/').once('value').then((snapshot) => {
                var code = snapshot.child(inputcoupon).val();
                console.log('code: ' + code)
                console.log('inputcoupon: ' + inputcoupon)
                if(code == null){
                  Alert.alert('삐빅','존재하지 않는 쿠폰 번호 입니다!')
                }else{
                  console.log('여기까지 오냐')
                  firebase_db.ref('/customcoupon/'+inputcoupon).once('value').then((snapshot) => {
                    let inputcoupon = snapshot.val();
                    console.log('inputcoupon: ' + inputcoupon)
                  let today = new Date();   
                  let year = today.getFullYear(); // 년도
                  let month = today.getMonth() + 1;  // 월
                  let date = today.getDate();  // 날짜
  
                  const backgroundcolor = inputcoupon.backgroundcolor;
                  const selectcode = inputcoupon.code;
                  const date1 = inputcoupon.date1;
                  const date2 = inputcoupon.date2;
                  const date3 = `${year}.${month}.${date}`;
                  const design = inputcoupon.design;
                  const acc = inputcoupon.acc;
                  const fontcolor = inputcoupon.fontcolor;
                  const message = inputcoupon.message;
                  const name = inputcoupon.name;
                  const title = inputcoupon.title;
                  const code = inputcoupon.code;
                  const emoji = inputcoupon.emoji;
    
                  firebase_db.ref('users/'+uniqueId+'/getcoupon/' + check1).set({
                    'backgroundcolor': `${backgroundcolor}`,
                    'code': `${selectcode}`,
                    'category': 0,
                    'date1': `${date1}`,
                    'date2': `${date2}`,
                    'date3': `${date3}`,
                    'design': `${design}`,
                    'acc': `${acc}`,
                    'fontcolor': `${fontcolor}`,
                    'message': `${message}`,
                    'name': `${name}`,
                    'title': `${title}`,
                    'idx': check1,
                    'emoji': emoji
                  });


                  firebase_db.ref('customcoupon/'+ code + '/downusers/').once('value').then((snapshot) => {
                    let check05 = Object.keys(snapshot.val()).length;
                    console.log('현재 개수:' + check05)
                    firebase_db.ref('customcoupon/'+ code + '/downusers/' + check05).set({
                      'BLANK': 0,
                    });
                  })

                  firebase_db.ref('users/'+uniqueId+'/getcouponcount/').once('value').then((snapshot) => {
                    let check06 = Object.keys(snapshot.val()).length;
                    console.log('현재 개수:' + check06)
                    firebase_db.ref('users/'+uniqueId+'/getcouponcount/' + check06).set({
                      'BLANK': 0,
                    });
                  })

                  Alert.alert('알림', '쿠폰을 발급했습니다!')
                  })
                }

              })
              goAdd()
              //navigation.navigate("CouponPage")
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
                <TextInput style={styles.listtxt2}  onChangeText={text => setInputcoupon(text)}>{inputcoupon}</TextInput>
                <View style={styles.listicon}><Icon name="edit" size={22} color="#ffffff" /></View>
            </View>
        </ScrollView>
        <View style={styles.box5}>
          <TouchableOpacity style={styles.box5btn}  onPress={()=>goAlert1()}>
            <Text style={styles.box5txt}>발급받기</Text>
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
