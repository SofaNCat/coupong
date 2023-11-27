import React from "react";
import { ColorPicker } from 'react-native-color-picker'
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
 
export default function SelectColorPage({navigation, route}) {

  console.disableYellowBox = true;

  const {design} = route.params;

  const Picker = () => (
    <ColorPicker
      onColorSelected={color => Alert.alert(
        `${color}`,
        '선택하신 색으로 결정하겠습니까?',
        [
          {
            text: "아니"
          },
          {
            text:"좋아",
            onPress: () => {
              navigation.navigate("SelectFontPage",{backcolor: color, design})
            }
          }
        ],
        { cancelable: true }
      )}
      style={{flex: 1}}
    />
  )

  return (
    Picker()
  );
}