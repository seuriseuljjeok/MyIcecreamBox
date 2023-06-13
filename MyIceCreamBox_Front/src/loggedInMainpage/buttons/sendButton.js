import { Text, Pressable, StyleSheet, View } from 'react-native';
import { width, height } from '../../global/dimension';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// eslint-disable-next-line react/prop-types
const ButtonSend = ({ title, onPress }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const [myChanceNum, setMyChanceNum] = useState(0);

  const getMyGiftChance = () => {
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token) {
          axios({
            method: 'get',
            url: 'http://ec2-13-209-138-31.ap-northeast-2.compute.amazonaws.com:8080/gifts/chance',
            headers: {
              Authorization: `${token}`, // 헤더에 토큰 추가
            },
          })
            .then(function (res) {
              console.log('남은 기회 가져오기 성공');
              const myChance = res.data.data;
              setMyChanceNum(myChance); // 상태 변수에 값을 저장
            })
            .catch(function (err) {
              console.log(`Error Message: ${err}`);
            });
        } else {
          console.log('토큰이 없습니다.');
        }
      })
      .catch((error) => {
        console.log('실패', error);
      });
  };

  useEffect(() => {
    loadFonts();
    getMyGiftChance();
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
    <View style={{ alignItems: 'center' }}>
      <Text style={styles.count}>보낼 수 있는 기회 : {myChanceNum}</Text>
      <Pressable
        style={({ pressed }) => [
          styles.container,
          {
            backgroundColor: '#FFDDDD',
          },
          pressed && {
            backgroundColor: '#FFC2C2',
          },
        ]}
        onPressOut={onPress}
      >
        <Text style={styles.word}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.359,
    height: height * 0.062,

    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,

    shadowColor: '#393939',
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0.5,
    shadowOpacity: 0.3,
    borderRadius: 27,
  },
  word: {
    fontSize: width * 0.051,
    fontFamily: 'locus_sangsang',
  },
  count: {
    fontSize: width * 0.024,
    fontFamily: 'locus_sangsang',
    bottom: height * 0.005,
  },
});

export default ButtonSend;
