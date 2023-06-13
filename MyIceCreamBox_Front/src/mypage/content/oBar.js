import {
  View,
  Image,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import oBar from '../../../assets/imgs/OBar.png';
import closeButton from '../../../assets/imgs/CloseButton.png';
import { width, height } from '../../global/dimension';
import * as Font from 'expo-font';
import FriendMessage from './friendMessage';
import Toast from 'react-native-root-toast';

const OBar = (item) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [possible, setPossible] = useState(false);

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
            // console.log(res.data.data.isAfter);
            setPossible(res.data.data.isAfter);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  }, []);

  const toggleModal = () => {
    if (possible) {
      setModalVisible(!modalVisible);
    } else {
      showToast();
    }
  };

  const [fontsLoaded, setFontsLoaded] = useState(false);

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
    return null; // Return null or a loading indicator while the fonts are being loaded
  }

  const showToast = () => {
    const toastOutStyle = {
      width: width * 0.728, // Set the desired width
      height: height * 0.134, // Set the desired height
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    };
    const toastInStyle = {
      width: width * 0.665, // Set the desired width
      height: height * 0.118, // Set the desired height
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    };

    Toast.show('', {
      duration: 3000,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: '#FFDDDD',
      textColor: '#000000',
      containerStyle: toastOutStyle,
      opacity: 1,
    });

    Toast.show(
      '아직 선물을 확인할 수 없어요! \n 7월 1일까지 꼬옥 기다려주기~💗',
      {
        duration: 3000,
        position: Toast.positions.CENTER,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        textColor: '#000000',
        containerStyle: toastInStyle,
        textStyle: {
          color: '#000000',
          fontSize: width * 0.041,
          fontFamily: 'locus_sangsang',
        },
      }
    );
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
        <Image source={oBar} style={styles.container} />
      </TouchableOpacity>
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Image source={closeButton} />
          </TouchableOpacity>
          <Text style={styles.nickname}> {`${item.item.senderNickname}`}</Text>
          <Image source={oBar} style={styles.modalImage} />
          <View style={styles.textarea}>
            <FriendMessage item={item} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.19,
    height: height * 0.12,
    resizeMode: 'contain',
  },

  modalContainer: {
    width: width * 0.846,
    height: height * 0.6,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: height * 0.155,
    backgroundColor: '#FFDDDD',
    borderRadius: 15,
  },
  nickname: {
    marginTop: height * 0.05,
    fontSize: 20,
  },
  modalImage: {
    width: width * 0.2,
    height: height * 0.16,
    resizeMode: 'center',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#FF6969',
    marginTop: height * 0.025,
  },
  textarea: {
    width: width * 0.816 * 0.9,
    height: (height * 0.47) / 2,
    marginTop: height * 0.018,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
  },
  message: {
    marginLeft: 10,
    marginTop: 10,
    fontFamily: 'locus_sangsang',
  },
  closeButton: {
    fontWeight: 'bold',
    position: 'absolute',
    alignSelf: 'flex-start',
    top: 16,
    left: 16,
  },
});

export default OBar;
