import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Background from './main/background';
import SpeechBubble from './main/speechBubble';
import Rabbit from './main/rabbit';
import TitleText from './main/title';
import Hill from './main/hill';
import Icecream from './main/iceCream';
import Ellipse from './main/ellipse';
import BigCloud1 from './clouds/bigCloud1';
import BigCloud2 from './clouds/bigCloud2';
import BigCloud3 from './clouds/bigCloud3';
import BigCloud4 from './clouds/bigCloud4';
import SmallCloud1 from './clouds/smallCloud1';
import SmallCloud2 from './clouds/smallCloud2';
import ButtonSend from './buttons/sendButton';
import ButtonShare from './buttons/shareButton';
import ButtonIceCheck from './buttons/iceCheckButton';
import { height } from '../global/dimension';
import { Share } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

const LoggedInMainpage = () => {
  const navigation = useNavigation();
  const [myLink, setMyLink] = useState(''); // 사용자 링크 변수에 담기

  const getUserLink = () => {
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token) {
          axios({
            method: 'get',
            url: 'http://ec2-13-209-138-31.ap-northeast-2.compute.amazonaws.com:8080/users/share-link',
            headers: {
              Authorization: `${token}`, // 헤더에 토큰을 추가
            },
          })
            .then(function (res) {
              console.log('링크 공유 성공' + res.data.data);
              const myLink = res.data.data;
              setMyLink(myLink); // 상태 변수에 값을 저장
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
        throw error;
      });
  };
  useEffect(() => {
    getUserLink(); //링크 가져오기
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Background />

      <View style={styles.overlay}>
        <View style={styles.title}>
          <TitleText />
        </View>
        <View style={styles.main}>
          <Hill style={styles.hill} />
          <View style={styles.top}>
            <SpeechBubble style={styles.speechBubble} />
            <Rabbit style={styles.rabbit} />
            <BigCloud1 />
            <BigCloud2 />
            <BigCloud3 />
            <BigCloud4 />
            <SmallCloud1 />
            <SmallCloud2 />
            <Icecream />
            <Ellipse />
            <ButtonIceCheck
              title="내 아이스크림 확인"
              onPress={() => navigation.navigate('MyPage')}
            />
          </View>
          <View style={styles.bottom}>
            <ButtonSend title="보내기" onPress={() => {}} />
            <ButtonShare
              title="링크 공유"
              onPress={async () =>
                await Share.share({
                  message: `My Icecream Box에 놀러와! 함께 할래? \n http://${myLink}`,
                })
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 0.8,
  },
  top: {
    flex: 0.742,
    alignItems: 'center',
    zIndex: 1,
  },
  bottom: {
    flex: 0.258,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: height * 0.25,
  },
  speechBubble: {
    zIndex: 1,
  },
  rabbit: {
    zIndex: 2,
  },
  hill: {
    zIndex: 1,
  },
});

export default LoggedInMainpage;
