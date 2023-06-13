import { StyleSheet, Text } from 'react-native';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FriendMessage = (item) => {
  // const [data, setData] = useState([]);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        axios({
          method: 'get',
          url: 'http://ec2-13-209-138-31.ap-northeast-2.compute.amazonaws.com:8080/gifts/statistics/gift-rate',
          headers: {
            Authorization: `${token}`,
          },
        })
          .then(function (res) {
            // setData(res.data.data.giftsStatisticsResList);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  }, []);

  useEffect(() => {
    loadFonts();
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
  return <Text style={styles.message}>{`${item.item.item.message}`}</Text>;
};

const styles = StyleSheet.create({
  message: {
    marginLeft: 10,
    marginTop: 10,
    fontFamily: 'locus_sangsang',
  },
});

export default FriendMessage;
