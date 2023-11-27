import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image, ScrollView, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { TextInput } from "react-native-gesture-handler";

import Constants from 'expo-constants';
import {firebase_db} from "../firebaseConfig"

import {
  setTestDeviceIDAsync,
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo-ads-admob';

import GetMakeCoupon from '../components/GetMakeCoupon'

export default function MakeCouponPage({navigation, route}) {

  const [check1, setCheck1] = useState([]);

  const goAdd = async () =>{
    try {
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
    await AdMobInterstitial.showAdAsync();
    } catch (e) {console.log(e)}
    await navigation.navigate("MakePage")
  }

  useEffect(() => {
    const uniqueId = Constants.installationId;
    firebase_db.ref('/users/'+uniqueId+'/makecoupon').once('value').then((snapshot) => {
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
      `${title}`,
      '쿠폰을 발행하시겠습니까?\n발행을 완료하면 수정할 수 없습니다.',
      [
          {
            text: "아니",
          },
          {
            text: "좋아",
            onPress: () => {
              const uniqueId = Constants.installationId;
              let today = new Date();   
              let year = today.getFullYear(); // 년도
              let month = today.getMonth() + 1;  // 월
              let date = today.getDate();  // 날짜
              firebase_db.ref('users/'+uniqueId+'/makecoupon/' + check1).set({
                'backgroundcolor': `${backgroundcolor}`,
                'code': `${selectcode}`,
                'category': 0,
                'date1': `${year}.${month}.${date}`,
                'date2': `${date2}`,
                'date3': 'BLANK',
                'design': design,
                'acc': `${acc}`,
                'fontcolor': `${fontcolor}`,
                'message': `${message}`,
                'name': `${name}`,
                'title': `${title}`,
                'idx': check1,
                'emoji': emoji
              });
              firebase_db.ref('customcoupon/' + selectcode).set({
                'backgroundcolor': `${backgroundcolor}`,
                'code': `${selectcode}`,
                'category': 0,
                'date1': `${year}.${month}.${date}`,
                'date2': `${date2}`,
                'date3': 'BLANK',
                'design': design,
                'acc': `${acc}`,
                'fontcolor': `${fontcolor}`,
                'message': `${message}`,
                'name': `${name}`,
                'title': `${title}`,
                'idx': check1,
                'emoji': emoji
              });
              firebase_db.ref('customcoupon/' + selectcode + '/downusers/0').set({
                0: 'BLANK',
              });
              firebase_db.ref('customcoupon/' + selectcode + '/useusers/0').set({
                0: 'BLANK',
              });
              firebase_db.ref('users/'+uniqueId+'/makecouponcount/'+ selectcode).set({
                'BLANK': 0,
              });
              Alert.alert('알림', '쿠폰이 발행되었습니다!')
              goAdd()
            }
          }
      ],
      { cancelable: true }
    )
  };

  //쿠폰 코드 부여 함수
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
      charactersLength));
    }
    return result;
  }

  const {backcolor, concolor, design} = route.params;

  const [title,setTitle] = useState(['쿠폰 이름'])
  const [name,setName] = useState(['발행인'])
  const [date1,setDate1] = useState(['발행일'])
  const [date2,setDate2] = useState(['유효기간'])
  const [message,setMessage] = useState(['한마디를 입력해주세요'])
  const [backgroundcolor,setBackgroundcolor] = useState([backcolor])
  const [fontcolor,setFontcolor] = useState([concolor])
  const [selectcode,setSelectcode] = useState([makeid(12)])
  const [acc,setAcc] = useState(['0'])
  const [emoji,setEmoji] = useState([])
  const [state2,setState2] = useState([])

  let today = new Date();   
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1;  // 월
  let date = today.getDate();  // 날짜

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.box1}>
          <GetMakeCoupon backgroundcolor={backgroundcolor} fontcolor={fontcolor} title={title} name={name} date2={date2} acc={acc} design={design} emoji={emoji} state2={state2}/>
        </View>
        <View style={styles.box4}>
          <View style={styles.box4btn1}>
              <Text style={styles.box4txt1}>쿠폰 색상</Text>
              <TextInput style={{height:20, fontSize: 13, fontWeight: 'bold', color: `${backgroundcolor}`}} onChangeText={text => setBackgroundcolor(text)}>{backgroundcolor}</TextInput>
          </View>
          <View style={styles.box4btn2}>
              <Text style={styles.box4txt2}>내용 색상</Text>
              <TextInput style={{height:20, fontSize: 13, fontWeight: 'bold', color: `${fontcolor}`}} onChangeText={text => setFontcolor(text)}>{fontcolor}</TextInput>
          </View>
        </View>
        <View style={styles.box2}>
          <ScrollView style={styles.box3}>
              <View style={styles.list}>
                  <Text style={styles.listtxt1}>쿠폰 이름:  </Text>
                  <TextInput style={styles.listtxt2} onChangeText={text => setTitle(text)}>{title}</TextInput>
                  <TouchableOpacity style={styles.listicon}><Icon name="bars" size={22} color="#ffffff" /></TouchableOpacity>
              </View>
              <View style={styles.list}>
                  <Text style={styles.listtxt1}>이모지:  </Text>
                  <TextInput style={styles.listtxt2}  onChangeText={text => setEmoji(text)}>{emoji}</TextInput>
                  <TouchableOpacity style={styles.listicon}><Icon name="bars" size={22} color="#ffffff" /></TouchableOpacity>
              </View>
              <View style={styles.list}>
                <Text style={styles.listtxt1}>스티커:  </Text>
                <Picker
                  selectedValue={acc}
                  style={{ flex:4, marginLeft:-10 }}
                  onValueChange={(itemValue, itemIndex) => setAcc(itemValue)}
                >
                <Picker.Item label="없음" value='0' />
                <Picker.Item label="게임기" value='9' />
                <Picker.Item label="고양이 발바닥" value='1' />
                <Picker.Item label="꽃" value='6' />
                <Picker.Item label="달" value='5' />
                <Picker.Item label="별" value='3' />
                <Picker.Item label="스마일 1" value='4' />
                <Picker.Item label="스마일 2" value='7' />
                <Picker.Item label="케이크" value='8' />
                <Picker.Item label="하트" value='2' />
                </Picker>
                <TouchableOpacity style={styles.listicon}><Icon name="bars" size={22} color="#ffffff" /></TouchableOpacity>
              </View>
              <View style={styles.list}>
                  <Text style={styles.listtxt1}>발행인:  </Text>
                  <TextInput style={styles.listtxt2}  onChangeText={text => setName(text)}>{name}</TextInput>
                  <TouchableOpacity style={styles.listicon}><Icon name="bars" size={22} color="#ffffff" /></TouchableOpacity>
              </View>
              <View style={styles.list}>
                  <Text style={styles.listtxt1}>발행일:  </Text>
                  <Text style={styles.listtxt3}>{year}.{month}.{date}</Text>
                  <TouchableOpacity style={styles.listicon}><Icon name="bars" size={22} color="#ffffff" /></TouchableOpacity>
              </View>
              <View style={styles.list}>
                  <Text style={styles.listtxt1}>유효기간:  </Text>
                  <TextInput style={styles.listtxt2} onChangeText={text => setDate2(text)}>{date2}</TextInput>
                  <TouchableOpacity style={styles.listicon}><Icon name="bars" size={22} color="#ffffff" /></TouchableOpacity>
              </View>
              <View style={styles.list}>
                  <Text style={styles.listtxt1}>쿠폰 코드:  </Text>
                  <Text style={styles.listtxt3}>{selectcode}</Text>
                  <TouchableOpacity style={styles.listicon}><Icon name="bars" size={22} color="#ffffff" /></TouchableOpacity>
              </View>
              <View style={styles.list}>
                  <Text style={styles.listtxt1}>한마디:  </Text>
                  <TextInput style={styles.listtxt2} onChangeText={text => setMessage(text)}>{message}</TextInput>
                  <TouchableOpacity style={styles.listicon}><Icon name="bars" size={22} color="#ffffff" /></TouchableOpacity>
              </View>
          </ScrollView>
        </View>
        <View style={styles.box5}>
          <TouchableOpacity style={styles.box5btn}  onPress={()=>goAlert1()}>
            <Text style={styles.box5txt}>발행하기</Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#fff',
    //justifyContent: 'center',
  },
  container2: {
    alignItems:'center',
    justifyContent:'center'
  },

  box1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20,
    marginBottom:10,

    //borderWidth:2,

    flex:1
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
    marginBottom:10,

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
  textView2: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    flex:4,
    borderWidth:1,
    borderColor:"#f3f1ef",
    borderRadius:5,
    height:40,
    alignContent:'center',
    marginRight: 10,
  },
  listtxt3: {
    flex:4
  },
  listicon: {
    flex:0.3
  },

  box4: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
  },
  box4btn1: {
      height: 40,
      width: 140,
      borderWidth:1,
      borderRadius:10,
      borderColor:"#f3f1ef",

      alignItems:'center',
      justifyContent: 'center'
  },
  box4btn2: {
      height: 40,
      width: 140,
      borderWidth:1,
      borderRadius:10,
      borderColor:"#f3f1ef",

      marginLeft: 20,
      alignItems:'center',
      justifyContent: 'center'
  },
  box4txt1: {
    fontSize: 13,
  },
  box4txt2: {
    fontSize: 13
  },
  picker: {
    position: 'absolute',
    marginBottom: 30,
    marginLeft: 100
  },

  box5: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:10,

    //borderWidth:1,   
    height:60,
    width:100
    
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
