import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image, ScrollView, FlatList, Platform } from 'react-native';
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

//Coupon Design
import Loading from '../components/Loading';
import GetCoupon from '../components/GetCoupon'

export default function CouponPage() {

  const navigation = useNavigation();

  const [getcoupon0, setGetcoupon0] = useState([]);
  const [ready,setReady] = useState(true)
  const [check2, setCheck2] = useState([]);

  useEffect(() => {
    setTimeout(()=> {
      const uniqueId = Constants.installationId;
      firebase_db.ref('users/'+uniqueId+'/getcouponcount/0').set({
        'BLANK': 0
      });
      firebase_db.ref('users/'+uniqueId+'/makecouponcount/0').set({
        'BLANK': 0
      });
      firebase_db.ref('users/'+uniqueId+'/getcoupon/1').set({
        'design': 0, 'idx': 1
      });
      firebase_db.ref('users/'+uniqueId+'/getcoupon/0').set({
        'design': 1, 'idx': 0
      });
      firebase_db.ref('users/'+uniqueId+'/makecoupon/1').set({
        'design': 0, 'idx':1
      });
      firebase_db.ref('users/'+uniqueId+'/makecoupon/0').set({
        'design': 1, 'idx':0
      });
      firebase_db.ref('users/'+uniqueId+'/category/0').set({
        'cate': '전체',
        'check': 1
      });
      firebase_db.ref('/customcoupon/0').set({
        'BLANK': 0
      });
      var starCountRef = firebase_db.ref('/users/'+uniqueId+'/getcoupon');
      starCountRef.on('value', (snapshot) => {
        let getcoupon0 = snapshot.val();
        setGetcoupon0(getcoupon0)

        var starCountRef = firebase_db.ref('/users/'+uniqueId+'/getcouponcount');
        starCountRef.on('value', (snapshot) => {
          let check02 = Object.keys(snapshot.val()).length;
          console.log('현재 개수:' + check02)
          setCheck2(Object.keys(snapshot.val()).length - 1)
      })
      setReady(false)
      })
    },60)
  },[])

  const goAlert1 = () => {
    Alert.alert(
        '쿠폰 발급받기',
        '쿠폰을 받으시겠어요?',
        [
            {
              text: "아니",
            },
            {
              text: "좋아",
              onPress: () => {
                navigation.navigate('PlusCouponPage')
              }
            }
        ],
        { cancelable: true }
    )
  };
  
  const goAlert2 = (navigation) => {
    Alert.alert(
        '카테고리',
        '업데이트 예정입니다!',
        [
            {
              text: "취소",
            },
            {
              text: "확인"
  
            }
        ],
        { cancelable: true }
    )
  };

  return ready ? <Loading/> : (
    <View style={styles.container}>
      <View style={styles.box00}>
        <Image style={styles.box0} source={{uri:"https://firebasestorage.googleapis.com/v0/b/coupong-a1184.appspot.com/o/SESAM1.png?alt=media&token=453c4a88-5cc5-4678-8363-dbc8f0e6b602"}}/>
      </View>
      <View style={styles.box2}>
        <FlatList
          data={getcoupon0.sort(function(a,b) {
            return b.idx - a.idx;
          })}
          horizontal={true}
          //keyExtractor={(item) => item.idx}
          renderItem={(getcoupon0) => {
            return (<GetCoupon content={getcoupon0}/>)
          }}
        />
      </View>
      <View style={styles.box4}>
        <View style={styles.box1}>
          {/*<Text style={styles.box1txt1} numberOfLines={1} ellipsizeMode="tail">친구에게 받은</Text>*/}
          <Text style={styles.box1txt2}>발급받은 쿠폰</Text>
          <Text style={styles.box1txt3} numberOfLines={1} ellipsizeMode="tail"> ({check2})</Text> 
        </View>
        <View style={styles.box3}>
          <TouchableOpacity style={styles.box1icon1} onPress={()=>goAlert1()}><Icon name="download" size={27} color="#333333" /></TouchableOpacity>
          <TouchableOpacity style={styles.box1icon2} onPress={()=>goAlert2()}><Icon name="bars" size={27} color="#333333" /></TouchableOpacity>
        </View>
      </View>

      {Platform.OS === 'ios' ? (
        <AdMobBanner
        bannerSize="fullBanner"
        servePersonalizedAds={true}
        adUnitID="ca-app-pub-5639017285310996/2073831122"
        style={styles.banner}
        />
      ) : (
        <AdMobBanner
        bannerSize="fullBanner"
        servePersonalizedAds={true}
        adUnitID="ca-app-pub-5639017285310996/2073831122"
        style={styles.banner}
        />
      )}

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

  box00: {
    //borderWidth:2,
    justifyContent:"flex-start",
    alignItems:'center',
    //marginRight:'18%',
  },
  box0: {
    //marginLeft: '40%',
    marginBottom:-17,
    //marginRight: 25,

    height:150,
    width:150,
    resizeMode:'contain',

    //borderWidth:2,
    borderColor:'#000000',

    //flex:0.5
  },
  
  box3:{
    flexDirection:"row",
    flex:1,
    marginRight:25,
    //borderWidth:2
  },

  box1: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 25,
    //marginRight: 25,
    marginBottom: 20,

    height:45,
    //borderWidth:2,
    //opacity:0.7,
    //backgroundColor:"#f3f1ef",

    flex:2.2
  },
  box1txt1: {
    fontSize: 20,
    //marginLeft: 10,
    //flex:1.3,
    //borderWidth:2
  },
  box1txt2: {
    fontSize: 20,
    //flex:2.6,
    //borderWidth:2
  },
  box1txt3: {
    fontSize: 20,
    //width:190,
    //flex:0.5,
    //borderWidth:2
  },
  box1icon1: {
    flex:1,
    alignItems: 'center',
    //borderWidth:2
  },
  box1icon2: {
    flex:1,
    alignItems: 'center',
    //marginLeft: -50,
    //borderWidth:2
  },

  box2: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 10,

    backgroundColor:'#ffffff',
    //borderWidth:2,

    //flex:1
  },

  box4: {
    flexDirection: 'row',
    //borderWidth:2,
    marginBottom:'40%'
  },

  banner: {
    alignItems:'center',
    //justifyContent:'flex-end',
    marginBottom:'-30%',
    width:'100%'
    //borderWidth:2
  }
});
