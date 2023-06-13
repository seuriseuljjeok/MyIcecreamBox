import { View, FlatList, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import { width, height } from '../../global/dimension';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

import PBar from './pBar';
import OBar from './oBar';
import CBar from './cBar';
import BBar from './bBar';
import CPDBar from './cpdBar';
import CTDBar from './ctdBar';
import MBACon from './mbaCon';
import SOCon from './soCon';
import Strawberry from './strawberry';

const IceList = () => {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    AsyncStorage.getItem('token').then((token) => {
      if (token) {
        axios({
          method: 'get',
          url: 'http://ec2-13-209-138-31.ap-northeast-2.compute.amazonaws.com:8080/users/my-page',
          headers: {
            Authorization: `${token}`,
          },
        })
          .then(function (res) {
            setData(res.data.data.myIceCreams);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.iceList}>
      {item.iceCreamName === '이거먹으면나랑사귀는바' ? (
        <OBar item={item} />
      ) : item.iceCreamName === '이거먹으면에이쁠받는바' ? (
        <PBar item={item} />
      ) : item.iceCreamName === '이거먹으면추워바' ? (
        <CBar item={item} />
      ) : item.iceCreamName === '흑마법사가만든저체온증바' ? (
        <BBar item={item} />
      ) : item.iceCreamName === '쿨복숭아쌍쌍바' ? (
        <CPDBar item={item} />
      ) : item.iceCreamName === '초콜릿태닝쌍쌍바' ? (
        <CTDBar item={item} />
      ) : item.iceCreamName === '물고기도반한에어콘' ? (
        <MBACon item={item} />
      ) : item.iceCreamName === '여름이온지얼마나오렌지콘' ? (
        <SOCon item={item} />
      ) : item.iceCreamName === '베리베리더워콘' ? (
        <Strawberry item={item} />
      ) : (
        <Text>없어요 없다구요</Text>
      )}
    </View>
  );

  return (
    <View style={styles.back}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  back: {
    width: width * 0.821,
    height: height * 0.533,
    borderRadius: 20,
    backgroundColor: '#FFFFEE',
    alignItems: 'center',
  },
  iceList: {
    // margin: width * 0.077,
    margin: width * 0.1,
    justifyContent: 'space-evenly',
  },
});

export default IceList;
