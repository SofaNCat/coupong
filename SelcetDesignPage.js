import React, { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import reactDom from 'react-dom';
import { StyleSheet, Text, View, TouchableOpacity, Image, Linking, Alert, ListViewBase } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from "react-native-gesture-handler";

import {firebase_db} from "../firebaseConfig"

export default function SelectDesignPage() {

  const navigation = useNavigation();

  const [state0,setState0] = useState([])
  const [state1,setState1] = useState([])
  const [state2,setState2] = useState([])
  const [state3v1,setState3v1] = useState([])
  const [state3v2,setState3v2] = useState([])
  const [state5v1,setState5v1] = useState([])
  const [state5v2,setState5v2] = useState([])

  useEffect(()=>{
    setTimeout(()=>{
      firebase_db.ref('/coupondesign/0/').once('value').then((snapshot) => {
        let info = snapshot.val().uri;
        setState0(info)
      });
      firebase_db.ref('/coupondesign/1/').once('value').then((snapshot) => {
          let info = snapshot.val().uri;
          setState1(info)
      });
      firebase_db.ref('/coupondesign/2/').once('value').then((snapshot) => {
          let info = snapshot.val().uri;
          setState2(info)
      });
      firebase_db.ref('/coupondesign/3/').once('value').then((snapshot) => {
          let info = snapshot.val().uri1;
          setState3v1(info)
      });
      firebase_db.ref('/coupondesign/3/').once('value').then((snapshot) => {
          let info = snapshot.val().uri2;
          setState3v2(info)
      });
      firebase_db.ref('/coupondesign/5/').once('value').then((snapshot) => {
          let info = snapshot.val().uri1;
          setState5v1(info)
      });
      firebase_db.ref('/coupondesign/5/').once('value').then((snapshot) => {
          let info = snapshot.val().uri2;
          setState5v2(info)
      });
    },100)
  },[])

  const goAlert1 = () => {
    Alert.alert(
      '모양 1-1',
      '이 모양으로 선택하시겠어요?',
      [
          {
              text: "아니",
          },
          {
            text: "좋아",
            onPress: () => {
              navigation.navigate("SelectColorPage", {design: 2})
            }
          }
      ],
      { cancelable: true }
    )
  }
  const goAlert2 = () => {
    Alert.alert(
      '모양 2-1',
      '이 모양으로 선택하시겠어요?',
      [
          {
              text: "아니",
          },
          {
            text: "좋아",
            onPress: () => {
              navigation.navigate("SelectColorPage", {design: 3})
            }
          }
      ],
      { cancelable: true }
    )
  }
  const goAlert3 = () => {
    Alert.alert(
      '모양 2-2',
      '이 모양으로 선택하시겠어요?',
      [
          {
              text: "아니",
          },
          {
            text: "좋아",
            onPress: () => {
              navigation.navigate("SelectColorPage", {design: 4})
            }
          }
      ],
      { cancelable: true }
    )
  }
  const goAlert4 = () => {
    Alert.alert(
      '모양 3-1',
      '이 모양으로 선택하시겠어요?',
      [
          {
              text: "아니",
          },
          {
            text: "좋아",
            onPress: () => {
              navigation.navigate("SelectColorPage", {design: 5})
            }
          }
      ],
      { cancelable: true }
    )
  }
  const goAlert5 = () => {
    Alert.alert(
      '모양 3-2',
      '이 모양으로 선택하시겠어요?',
      [
          {
              text: "아니",
          },
          {
            text: "좋아",
            onPress: () => {
              navigation.navigate("SelectColorPage", {design: 6})
            }
          }
      ],
      { cancelable: true }
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.box4}>
          <View style={styles.box4btn1}>
              <Text style={styles.box4txt1}>쿠폰 색상 예시</Text>
              <View style={styles.box4color1}></View>
          </View>
          <View style={styles.box4btn2}>
              <Text style={styles.box4txt2}>내용 색상 예시</Text>
              <View style={styles.box4color2}></View>
          </View>
        </View>
      <ScrollView style={styles.box}>
        <TouchableOpacity style={styles.list} onPress={() => goAlert1()}>
          <View style={styles.coupon}>
            <Image style={{height:135, width:225, borderRadius:10, tintColor:"#afbbd7"}} source={{uri:`${state2}`}}/>
            <Image style={{height:135, width:225, borderRadius:10, position: 'absolute', tintColor:"#6587d7"}} source={{uri:"https://firebasestorage.googleapis.com/v0/b/coupong-a1184.appspot.com/o/acc%2Flogo_0.png?alt=media&token=a349b8c0-094d-4a57-b94b-6e2b8fc2a616"}}/>
            <Image style={{height:135, width:225, borderRadius:10, position: 'absolute', tintColor:"#6587d7"}} source={{uri:"https://firebasestorage.googleapis.com/v0/b/coupong-a1184.appspot.com/o/acc%2Facc_1.png?alt=media&token=bafc2413-3f71-495b-9d2d-5bd15e7e0be3"}}/>
            <View style={styles.text1View1}>
              <Text style={{fontSize: 18, color:"#6587d7", fontWeight: 'bold',}}>쿠폰 이름</Text>
            </View>
            <View style={styles.text1View2}>
              <Text style={{fontSize: 10, color:"#6587d7", fontWeight: 'bold',}}>유효기간: ~0000.00.00</Text>
            </View>
            <View style={styles.text1View3}>
              <Text style={{fontSize: 10, color:"#6587d7", fontWeight: 'bold',}}>발행인</Text>
            </View>
          </View>
          <Text style={styles.listtxt}>모양 1-1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.list} onPress={() => goAlert2()}>
          <View style={styles.coupon}>
            <Image style={{height:135, width:225, borderRadius:10, tintColor:"#f4f4f4"}} source={{uri:`${state3v1}`}}/>
            <Image style={{height:135, width:225, borderRadius:10, position: 'absolute', tintColor:"#afbbd7"}} source={{uri:`${state3v2}`}}/>
            <Image style={{height:135, width:225, borderRadius:10, position: 'absolute', tintColor:"#6587d7"}} source={{uri:"https://firebasestorage.googleapis.com/v0/b/coupong-a1184.appspot.com/o/acc%2Flogo_1.png?alt=media&token=85e231be-6fa9-4cff-a72c-4d7175a8adf0"}}/>
            <Image style={{height:135, width:225, borderRadius:10, position: 'absolute', tintColor:"#6587d7"}} source={{uri:"https://firebasestorage.googleapis.com/v0/b/coupong-a1184.appspot.com/o/acc%2Facc_1.png?alt=media&token=bafc2413-3f71-495b-9d2d-5bd15e7e0be3"}}/>
            <View style={styles.text2View1}>
              <Text style={{fontSize: 18, color:"#6587d7", fontWeight: 'bold',}}>쿠폰 이름</Text>
            </View>
            <View style={styles.text2View2}>
              <Text style={{fontSize: 10, color:"#6587d7", fontWeight: 'bold',}}>유효기간: ~0000.00.00</Text>
            </View>
            <View style={styles.text2View3}>
              <Text style={{fontSize: 10, color:"#6587d7", fontWeight: 'bold',}}>발행인</Text>
            </View>
          </View>
          <Text style={styles.listtxt}>모양 2-1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.list} onPress={() => goAlert3()}>
          <View style={styles.coupon}>
            <Image style={{height:135, width:225, borderRadius:10, tintColor:"#afbbd7"}} source={{uri:`${state3v1}`}}/>
            <Image style={{height:135, width:225, borderRadius:10, position: 'absolute', tintColor:"#f4f4f4"}} source={{uri:`${state3v2}`}}/>
            <Image style={{height:135, width:225, borderRadius:10, position: 'absolute', tintColor:"#6587d7"}} source={{uri:"https://firebasestorage.googleapis.com/v0/b/coupong-a1184.appspot.com/o/acc%2Flogo_1.png?alt=media&token=85e231be-6fa9-4cff-a72c-4d7175a8adf0"}}/>
            <Image style={{height:135, width:225, borderRadius:10, position: 'absolute', tintColor:"#6587d7"}} source={{uri:"https://firebasestorage.googleapis.com/v0/b/coupong-a1184.appspot.com/o/acc%2Facc_1.png?alt=media&token=bafc2413-3f71-495b-9d2d-5bd15e7e0be3"}}/>
            <View style={styles.text2View1}>
              <Text style={{fontSize: 18, color:"#6587d7", fontWeight: 'bold',}}>쿠폰 이름</Text>
            </View>
            <View style={styles.text2View2}>
              <Text style={{fontSize: 10, color:"#6587d7", fontWeight: 'bold',}}>유효기간: ~0000.00.00</Text>
            </View>
            <View style={styles.text2View3}>
              <Text style={{fontSize: 10, color:"#6587d7", fontWeight: 'bold',}}>발행인</Text>
            </View>
          </View>
          <Text style={styles.listtxt}>모양 2-2</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.list} onPress={() => goAlert4()}>
          <View style={styles.coupon}>
            <Image style={{height:135, width:225, borderRadius:10, tintColor:"#f4f4f4"}} source={{uri:`${state5v1}`}}/>
            <Image style={{height:135, width:225, borderRadius:10, position: 'absolute', tintColor:"#afbbd7"}} source={{uri:`${state5v2}`}}/>
            <Image style={{height:135, width:225, borderRadius:10, position: 'absolute', tintColor:"#6587d7"}} source={{uri:"https://firebasestorage.googleapis.com/v0/b/coupong-a1184.appspot.com/o/acc%2Flogo_2.png?alt=media&token=b0e0fdbe-64ce-4772-bad0-ec6350bf94ff"}}/>
            <Image style={{height:135, width:225, borderRadius:10, position: 'absolute', tintColor:"#6587d7"}} source={{uri:"https://firebasestorage.googleapis.com/v0/b/coupong-a1184.appspot.com/o/acc%2Facc_7.png?alt=media&token=525ea35b-2241-49ca-b67a-2dc56afb7301"}}/>
            <View style={styles.text3View1}>
              <Text style={{fontSize: 18, color:"#6587d7", fontWeight: 'bold',}}>쿠폰 이름</Text>
            </View>
            <View style={styles.text3View2}>
              <Text style={{fontSize: 10, color:"#6587d7", fontWeight: 'bold',}}>유효기간: ~0000.00.00</Text>
            </View>
            <View style={styles.text3View3}>
              <Text style={{fontSize: 10, color:"#6587d7", fontWeight: 'bold',}}>발행인</Text>
            </View>
          </View>
          <Text style={styles.listtxt}>모양 3-1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.list} onPress={() => goAlert5()}>
          <View style={styles.coupon}>
            <Image style={{height:135, width:225, borderRadius:10, tintColor:"#afbbd7"}} source={{uri:`${state5v1}`}}/>
            <Image style={{height:135, width:225, borderRadius:10, position: 'absolute', tintColor:"#f4f4f4"}} source={{uri:`${state5v2}`}}/>
            <Image style={{height:135, width:225, borderRadius:10, position: 'absolute', tintColor:"#6587d7"}} source={{uri:"https://firebasestorage.googleapis.com/v0/b/coupong-a1184.appspot.com/o/acc%2Flogo_2.png?alt=media&token=b0e0fdbe-64ce-4772-bad0-ec6350bf94ff"}}/>
            <Image style={{height:135, width:225, borderRadius:10, position: 'absolute', tintColor:"#6587d7"}} source={{uri:"https://firebasestorage.googleapis.com/v0/b/coupong-a1184.appspot.com/o/acc%2Facc_7.png?alt=media&token=525ea35b-2241-49ca-b67a-2dc56afb7301"}}/>
            <View style={styles.text3View1}>
              <Text style={{fontSize: 18, color:"#6587d7", fontWeight: 'bold',}}>쿠폰 이름</Text>
            </View>
            <View style={styles.text3View2}>
              <Text style={{fontSize: 10, color:"#6587d7", fontWeight: 'bold',}}>유효기간: ~0000.00.00</Text>
            </View>
            <View style={styles.text3View3}>
              <Text style={{fontSize: 10, color:"#6587d7", fontWeight: 'bold',}}>발행인</Text>
            </View>
          </View>
          <Text style={styles.listtxt}>모양 3-2</Text>
        </TouchableOpacity>
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
  box: {
    marginTop:20,
    marginBottom:20,
    //width:360,
    //borderWidth:2,
  },
  list: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    width:350,

    marginBottom:10,
    //borderWidth:1.5,
    //borderColor:'#f3f1ef',
    borderRadius:10,
    backgroundColor:'#f9f9ff',
    padding:10,
    margin:5,
    elevation:2
  },
  listtxt: {
    fontSize:15,
    fontWeight:'bold',
    color:"#6587d7"
    //flex:0.5
  },

  box4: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  box4btn1: {
      height: 40,
      width: 140,
      borderWidth:1,
      borderRadius:10,
      borderColor:"#f3f1ef",

      flexDirection:'row',
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
      flexDirection:'row',
      alignItems:'center',
      justifyContent: 'center'
  },
  box4color1: {
    height:20,
    width:20,
    marginLeft:7,
    borderRadius:5,
    backgroundColor:"#afbbd7"
  },
  box4color2: {
    height:20,
    width:20,
    marginLeft:7,
    borderRadius:5,
    backgroundColor:"#6587d7"
  },

  coupon: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    //marginLeft:7,
    marginRight:22,

    height:135,
    width:225,
    borderRadius:10,
    //flex:2
  },

  text1View1: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: -50,
      left: 0,
      right: 0,
      bottom: 0,
  },
  text1View2: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
  },
  text1View3: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: 90,
      left: 0,
      right: 0,
      bottom: 0,
  },

  text2View1: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: -30,
      left: 0,
      right: 50,
      bottom: 0,
  },
  text2View2: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: 20,
      left: 0,
      right: 50,
      bottom: 0,
  },
  text2View3: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: 95,
      left: 0,
      right: 50,
      bottom: 0,
  },
  text3View1: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: -30,
    left: 0,
    right: 0,
    bottom: 0,
  },
  text3View2: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: 20,
      left: 0,
      right: 0,
      bottom: 0,
  },
  text3View3: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      top: 95,
      left: 0,
      right: 0,
      bottom: 0,
  },
});
