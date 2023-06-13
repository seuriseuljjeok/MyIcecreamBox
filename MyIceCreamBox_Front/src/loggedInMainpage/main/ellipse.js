import { ImageBackground } from 'react-native';
import ellipse from '../../../assets/imgs/Ellipse.png';
import { StyleSheet, Text } from 'react-native';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { width, height } from '../../global/dimension';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Ellipse = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [myIceNum, setMyIceNum] = useState(0); // num을 상태 변수로 선언

  const getIcecreamNum = () => {
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token) {
          axios({
            method: 'get',
            url: 'http://ec2-13-209-138-31.ap-northeast-2.compute.amazonaws.com:8080/gifts/count',
            headers: {
              Authorization: `${token}`, // 헤더에 토큰을 추가
            },
          })
            .then(function (res) {
              console.log('받은 선물 개수 가져오기 성공 ' + res.data.data);
              const iceNum = res.data.data;
              setMyIceNum(iceNum); // 상태 변수에 값을 저장
            })
            .catch(function (err) {
              console.log(`Error Message: ${err}`);
            });
        } else {
          console.log('토큰이 없습니다.');
        }
      })
      .catch((error) => {
        console.log('토큰 가져오기 실패', error);
      });
  };

  useEffect(() => {
    loadFonts();
    getIcecreamNum(); //받은 아이스크림 개수 가져오기
  }, []);

  async function loadFonts() {
    await Font.loadAsync({
      locus_sangsang: require('../../../assets/fonts/locus_sangsang.ttf'),
    });
    setFontsLoaded(true);
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={ellipse}
      style={styles.container}
      resizeMode="contain"
    >
      <Text style={styles.write}>{myIceNum}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.103,
    height: height * 0.047,
    aspectRatio: 1 / 1,
    // resizeMode: 'contain',
    position: 'absolute',
    marginTop: height * 0.78 * 0.5,
    right: width * 0.13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  write: {
    fontSize: width * 0.038,
    fontFamily: 'locus_sangsang',
  },
});

export default Ellipse;
