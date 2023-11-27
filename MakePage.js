import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image, FlatList } from 'react-native';

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
import MakeCoupon from '../components/MakeCoupon';
import MakeCate from '../components/MakeCate';
import { BorderlessButton } from 'react-native-gesture-handler';

export default function MakePage({navigation}) {

  const [getcoupon0, setGetcoupon0] = useState([]);
  const [getcoupon1, setGetcoupon1] = useState([]);
  const [ready,setReady] = useState(true)
  const [check1, setCheck1] = useState([]);

  useEffect(() => {
    setTimeout(()=> {
      const uniqueId = Constants.installationId;
      var starCountRef = firebase_db.ref('/users/'+uniqueId+'/makecoupon');
      starCountRef.on('value', (snapshot) => {
        let getcoupon0 = snapshot.val();
        setGetcoupon0(getcoupon0)
      

      var starCountRef = firebase_db.ref('/users/'+uniqueId+'/makecouponcount');
      starCountRef.on('value', (snapshot) => {
        let check01 = Object.keys(snapshot.val()).length;
        console.log('현재 개수:' + check01)
        setCheck1(Object.keys(snapshot.val()).length - 1)
      })

      var starCountRef = firebase_db.ref('/users/'+uniqueId+'/category');
      starCountRef.on('value', (snapshot) => {
        let getcoupon1 = snapshot.val();
        setGetcoupon1(getcoupon1)
      })

      setReady(false)
      })
    },60)
  },[])

  const goAlert1 = () => {
    Alert.alert(
        '쿠폰 만들기',
        '새로운 쿠폰을 만드시겠어요?',
        [
            {
              text: "아니"
            },
            {
              text: "좋아",
              onPress: () => {
                navigation.navigate("SelectDesignPage")
              }
            }
        ],
        { cancelable: true }
    )
  };

  const goAlert2 = () => {
    Alert.alert(
        '카테고리',
        '새로운 카테고리를 추가하시겠어요?',
        [
            {
              text: "아니"
            },
            {
              text: "좋아",
              onPress: () => {
                navigation.navigate("MakePlusCatePage")
              }
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
          return (<MakeCoupon content={getcoupon0}/>)
        }}
        />
      </View>
      <View style={styles.catebox}>
        <FlatList
          data={getcoupon1.sort(function(a,b) {
            return b.idx - a.idx;
          })}
          horizontal={true}
          //keyExtractor={(item) => item.idx}
          renderItem={(getcoupon1) => {
            return (<MakeCate content={getcoupon1}/>)
          }}
          />
      </View>
      <View style={styles.box4}>
        <View style={styles.box1}>
          {/*<Text style={styles.box1txt1} numberOfLines={1} ellipsizeMode="tail">친구에게 받은</Text>*/}
          <Text style={styles.box1txt2}>발행한 쿠폰</Text>
          <Text style={styles.box1txt3} numberOfLines={1} ellipsizeMode="tail"> ({check1})</Text> 
        </View>
        <View style={styles.box3}>
          <TouchableOpacity style={styles.box1icon1} onPress={() => goAlert1()}><Icon name="plussquareo" size={27} color="#333333" /></TouchableOpacity>
          <TouchableOpacity style={styles.box1icon2} onPress={() => goAlert2()}><Icon name="bars" size={27} color="#333333" /></TouchableOpacity>
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

    flex:2.2
  },
  box1txt1: {
    fontSize: 20,
    //width:10,
    //flex:1.3,
    //borderWidth:2
  },
  box1txt2: {
    fontSize: 20,
    //width:190,
    //flex:0.4,
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
    //marginLeft: -50
    //borderWidth:2
  },

  box2: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 10,

    backgroundColor: '#ffffff',
    //borderWidth:2,

    //flex:2
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

  box4: {
    flexDirection: 'row',
    //borderWidth:2,
    marginBottom:'40%'
  },

  banner: {
    alignItems:'center',
    justifyContent:'flex-end',
    marginBottom:'-30%',
    //width:'100%'
    //borderWidth:2
  }
})
