import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import reactDom from 'react-dom';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Clipboard from 'expo-clipboard'

import Constants from 'expo-constants';
import {firebase_db} from "../firebaseConfig"

import GetDetailCoupon from '../components/GetDetailCoupon'

export default function CouponDetailPage({navigation, route}) {

  const [getcoupon0, setGetcoupon0] = useState([]);

  useEffect(() => {
    setTimeout(()=> {
      const uniqueId = Constants.installationId;
      var starCountRef = firebase_db.ref('/users/'+uniqueId+'/getcoupon/'+idx);
      starCountRef.on('value', (snapshot) => {
        let getcoupon0 = snapshot.val();
      setGetcoupon0(getcoupon0)
      })
    },60)
  },[])

  const goAlert2 = () => {
    Clipboard.setString(code)
  };
  const goAlert11 = () => {
    Alert.alert(
      `${txt}`,
      '쿠폰을 공유해 보세요!',
      [
        {
          text: "알리기",
          onPress: () => {
            Share.share({
              message:`'${name}'님이 보낸 '${txt}' 쿠폰을 확인하세요!\n\nhttps://play.google.com/store/apps/details?id=com.sofancat.coupong`,
            })
          } 
        },
        {
          text: "코드 복사",
          onPress: () => {
            Clipboard.setString(code)
          }
        },
        {
          text: "코드 공유",
          onPress: () => {
            Share.share({
              message:`${code}`,
            })
          } 
        }
      ],
      { cancelable: true }
    )
  };
  const goAlert3 = () => {
    Alert.alert(
      `${txt}`,
      '쿠폰을 삭제하시겠어요?',
      [
          {
            text: "아니야",
          },
          {
            text: "그래",
            onPress: () => {
              const uniqueId = Constants.installationId;
              firebase_db.ref('users/'+uniqueId+'/getcoupon/'+idx).update({
              'design': 99
              });
              firebase_db.ref('customcoupon/'+ code + '/downusers/').once('value').then((snapshot) => {
                let check05 = Object.keys(snapshot.val()).length - 1;
                console.log('삭제할 항목:' + check05)
                firebase_db.ref('customcoupon/'+code+'/downusers/'+check05).remove();
              })
              firebase_db.ref('users/'+uniqueId+'/getcouponcount/').once('value').then((snapshot) => {
                let check06 = Object.keys(snapshot.val()).length - 1;
                console.log('삭제할 항목:' + check06)
                firebase_db.ref('users/'+uniqueId+'/getcouponcount/'+check06).remove();
              })
              Alert.alert('알림', '쿠폰을 삭제했습니다!')
              navigation.navigate("CouponPage")
            }
  
          }
      ],
      { cancelable: true }
    )
  };
  
  const goAlert4 = () => {
    Alert.alert(
      `${txt}`,
      '쿠폰을 사용하시겠어요?',
      [
          {
            text: "아니야",
          },
          {
            text: "그래",
            onPress: () => {
              const uniqueId = Constants.installationId;
              firebase_db.ref('users/'+uniqueId+'/getcoupon/'+idx).update({
              'design': 99
              });
              firebase_db.ref('users/'+uniqueId+'/getcouponcount/').once('value').then((snapshot) => {
                let check07 = Object.keys(snapshot.val()).length - 1;
                console.log('삭제할 항목:' + check07)
                firebase_db.ref('users/'+uniqueId+'/getcouponcount/'+check07).remove();
              })
              firebase_db.ref('customcoupon/' + code + '/useusers/').once('value').then((snapshot) => {
                let check06 = Object.keys(snapshot.val()).length;
                console.log('삭제할 항목:' + check06)
                firebase_db.ref('customcoupon/' + code + '/useusers/' + check06).set({
                  0: 'BLANK',
                });
              })
              Alert.alert('알림', '쿠폰을 사용 완료했습니다!')
              navigation.navigate("CouponPage")
            }
  
          }
      ],
      { cancelable: true }
    )
  };

  const {backgroundcolor} = route.params;
  const {fontcolor} = route.params;
  const {txt} = route.params;
  const {date1} = route.params;
  const {date2} = route.params;
  const {date3} = route.params;
  const {name} = route.params;
  const {code} = route.params;
  const {message} = route.params;
  const {idx} = route.params;
  const {acc} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <GetDetailCoupon content={getcoupon0}/>
      </View>
      <View style={styles.box4}>
        <TouchableOpacity style={styles.box4btn1} onPress={()=>goAlert3()}>
            <Text style={styles.box4txt1}>삭제</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box4btn2} onPress={()=>goAlert4()}>
            <Text style={styles.box4txt1}>사용</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box2}>
        <ScrollView style={styles.box3}>
            <View style={styles.list}>
                <Text style={styles.listtxt1}>쿠폰 이름:  </Text>
                <Text style={styles.listtxt2}>{txt}</Text>
                <TouchableOpacity style={styles.listicon}><Icon name="bars" size={22} color="#ffffff" /></TouchableOpacity>
            </View>
            <View style={styles.list}>
                <Text style={styles.listtxt1}>발행인:  </Text>
                <Text style={styles.listtxt2}>{name}</Text>
                <TouchableOpacity style={styles.listicon}><Icon name="bars" size={22} color="#ffffff" /></TouchableOpacity>
            </View>
            <View style={styles.list}>
                <Text style={styles.listtxt1}>발행일:  </Text>
                <Text style={styles.listtxt2}>{date1}</Text>
                <TouchableOpacity style={styles.listicon}><Icon name="bars" size={22} color="#ffffff" /></TouchableOpacity>
            </View>
            <View style={styles.list}>
                <Text style={styles.listtxt1}>획득일:  </Text>
                <Text style={styles.listtxt2}>{date3}</Text>
                <TouchableOpacity style={styles.listicon}><Icon name="bars" size={22} color="#ffffff" /></TouchableOpacity>
            </View>
            <View style={styles.list}>
                <Text style={styles.listtxt1}>유효기간:  </Text>
                <Text style={styles.listtxt2}>{date2}</Text>
                <TouchableOpacity style={styles.listicon}><Icon name="bars" size={22} color="#ffffff" /></TouchableOpacity>
            </View>
            <View style={styles.list}>
                <Text style={styles.listtxt1}>쿠폰 코드:  </Text>
                <Text style={styles.listtxt2}>{code}</Text>
                <TouchableOpacity style={styles.listicon} onPress={()=>goAlert11()}><Icon name="export" size={22} color="#333333" /></TouchableOpacity>
            </View>
            <View style={styles.list}>
                <Text style={styles.listtxt1}>한마디:  </Text>
                <Text style={styles.listtxt2}>{message}</Text>
                <TouchableOpacity style={styles.listicon}><Icon name="bars" size={22} color="#ffffff" /></TouchableOpacity>
            </View>
        </ScrollView>
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
  },

  box1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20,
    marginBottom:10,

    //borderWidth:2,

    //flex:1
  },
  box1txt1: {
    fontSize: 20,
    marginBottom: 10
  },

  box2: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 25,
    marginRight: 25,
    marginTop:15,
    marginBottom:15,

    //borderWidth:2,

    flex:2
  },
  coupon1: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:7,
    marginRight:7,

    height:180,
    width:300,
    borderRadius:10,
  },
  couima: {
    height:180,
    width:300,
    borderRadius:10
  },
  couima2: {
    height:180,
    width:300,
    borderRadius:10,
    position: 'absolute',
  },
  textView1: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: -80,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageText1: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  textView2: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageText2: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  textView3: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 115,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageText3: {
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold',
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
  listtxt1: {
    flex:1,
    marginLeft:10,
    //borderWidth:2
  },
  listtxt2: {
    flex:3,
    //borderWidth:2
},
listicon: {
    flex:0.5
},

box4: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
},
box4btn1: {
    height: 40,
    width: 140,
    borderRadius:10,

    backgroundColor:"#f3f1ef",
    elevation:3,

    alignItems: 'center',
    justifyContent: 'center'
},
box4btn2: {
    height: 40,
    width: 140,
    borderRadius:10,
    marginLeft: 20,

    backgroundColor:"#f3f1ef",
    elevation:3,

    alignItems: 'center',
    justifyContent: 'center'
},
box4txt1: {
    fontSize: 15,
  },
});
