import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import reactDom from 'react-dom';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image, ScrollView, Share, FlatList } from 'react-native';
import * as Clipboard from 'expo-clipboard'
import Icon from 'react-native-vector-icons/AntDesign';

import Constants from 'expo-constants';
import {firebase_db} from "../firebaseConfig"

import MakeDetailCoupon from '../components/MakeDetailCoupon'
import MakeDetailCate from '../components/MakeDetailCate';

export default function MakeDetailPage({navigation, route}) {

  const goAlert1 = () => {
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
  const goAlert2 = () => {
    Clipboard.setString(backgroundcolor)
  };
  const goAlert3 = () => {
    Clipboard.setString(fontcolor)
  };

  const goAlert7 = () => {
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
              firebase_db.ref('users/'+uniqueId+'/makecoupon/'+idx).update({
              'design': 99
              });
              firebase_db.ref('customcoupon/'+code).remove();
              firebase_db.ref('users/'+uniqueId+'/makecouponcount/'+code).remove();
              Alert.alert('알림', '쿠폰을 삭제했습니다!')
              navigation.push("MakePage")
            }
  
          }
      ],
      { cancelable: true }
    )
  };

  const goAlert8 = () => {
    Alert.alert('쿠폰 현황',`사용자 ${check1}명 중 ${check2}명 사용 완료했습니다.`)
  }

  const {backgroundcolor} = route.params;
  const {fontcolor} = route.params;
  const {txt} = route.params;
  const {date1} = route.params;
  const {date2} = route.params;
  const {name} = route.params;
  const {code} = route.params;
  const {message} = route.params;
  const {idx} = route.params;
  const {acc} = route.params;
  const {cate} = route.params;

  const [check1, setCheck1] = useState([]);
  const [check2, setCheck2] = useState([]);
  const [getcoupon0, setGetcoupon0] = useState([]);
  const [getcoupon1, setGetcoupon1] = useState([]);

  useEffect(() => {
    setTimeout(()=> {
      firebase_db.ref('/customcoupon/'+code+'/downusers').once('value').then((snapshot) => {
        let check01 = Object.keys(snapshot.val()).length;
        setCheck1(Object.keys(snapshot.val()).length - 1)
      })
      firebase_db.ref('/customcoupon/'+code+'/useusers').once('value').then((snapshot) => {
        let check02 = Object.keys(snapshot.val()).length;
        setCheck2(Object.keys(snapshot.val()).length - 1)
      })

      const uniqueId = Constants.installationId;
      var starCountRef = firebase_db.ref('/users/'+uniqueId+'/makecoupon/'+idx);
      starCountRef.on('value', (snapshot) => {
        let getcoupon0 = snapshot.val();
      setGetcoupon0(getcoupon0)

      var starCountRef = firebase_db.ref('/users/'+uniqueId+'/category');
      starCountRef.on('value', (snapshot) => {
        let getcoupon1 = snapshot.val();
        setGetcoupon1(getcoupon1)
      })
      })
    },60)
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <MakeDetailCoupon content={getcoupon0}/>
      </View>
      <View style={styles.box4}>
      <TouchableOpacity style={styles.box4btn1} onPress={()=>goAlert7()}>
            <Text style={styles.box4txt1}>삭제</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box4btn2} onPress={()=>goAlert8()}>
            <Text style={styles.box4txt2}>{check2}/{check1}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.box2}>
        <ScrollView style={styles.box3}>
            <View style={styles.list}>
                <Text style={styles.listtxt1}>쿠폰 이름:  </Text>
                <Text style={styles.listtxt2}>{txt}</Text>
                <View style={styles.listicon}><Icon name="edit" size={22} color="#ffffff" /></View>
            </View>
            <View style={styles.list}>
                <Text style={styles.listtxt1}>카테고리:  </Text>
                <Text style={styles.listtxt2}>{cate}</Text>
                <View style={styles.listicon}><Icon name="edit" size={22} color="#ffffff" /></View>
            </View>
            <View style={styles.list}>
              <FlatList
                data={getcoupon1.sort(function(a,b) {
                  return b.idx - a.idx;
                })}
                horizontal={true}
                //keyExtractor={(item) => item.idx}
                renderItem={(getcoupon1,getcoupon0) => {
                  return (<MakeDetailCate content={getcoupon1} content2={getcoupon0}/>)
                }}
                />
            </View>
            <View style={styles.list}>
                <Text style={styles.listtxt1}>발행인:  </Text>
                <Text style={styles.listtxt2}>{name}</Text>
                <View style={styles.listicon}><Icon name="edit" size={22} color="#ffffff" /></View>
            </View>
            <View style={styles.list}>
                <Text style={styles.listtxt1}>발행일:  </Text>
                <Text style={styles.listtxt2}>{date1}</Text>
                <View style={styles.listicon}><Icon name="edit" size={22} color="#ffffff" /></View>
            </View>
            <View style={styles.list}>
                <Text style={styles.listtxt1}>유효기간:  </Text>
                <Text style={styles.listtxt2}>{date2}</Text>
                <View style={styles.listicon}><Icon name="edit" size={22} color="#ffffff" /></View>
            </View>
            <View style={styles.list}>
                <Text style={styles.listtxt1}>쿠폰 코드:  </Text>
                <Text style={styles.listtxt2}>{code}</Text>
                <TouchableOpacity style={styles.listicon} onPress={()=>goAlert11()}><Icon name="export" size={22} color="#333333" /></TouchableOpacity>
            </View>
            <View style={styles.list}>
                <Text style={styles.listtxt1}>한마디:  </Text>
                <Text style={styles.listtxt2}>{message}</Text>
                <View style={styles.listicon}><Icon name="edit" size={22} color="#ffffff" /></View>
            </View>
            <View style={styles.list}>
                <Text style={styles.listtxt1}>쿠폰 색상:  </Text>
                <Text style={{flex:3, color:backgroundcolor, fontWeight: 'bold'}}>{backgroundcolor}</Text>
                <TouchableOpacity style={styles.listicon} onPress={()=>goAlert2()}><Icon name="export" size={22} color="#333333" /></TouchableOpacity>
            </View>
            <View style={styles.list}>
                <Text style={styles.listtxt1}>내용 색상:  </Text>
                <Text style={{flex:3, color:fontcolor, fontWeight: 'bold'}}>{fontcolor}</Text>
                <TouchableOpacity style={styles.listicon} onPress={()=>goAlert3()}><Icon name="export" size={22} color="#333333" /></TouchableOpacity>
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
    marginBottom:15,
    marginTop:5,

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
  textView1: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: -80,
    left: 0,
    right: 0,
    bottom: 0,
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
  box4txt2: {
    fontSize: 15,
  },

  catebox: {
    //borderWidth:2,
    height:50,
    marginBottom:5,
    flexDirection:'row',
    alignItems:'center',
    marginLeft:25,
    marginRight:25
  },
});
