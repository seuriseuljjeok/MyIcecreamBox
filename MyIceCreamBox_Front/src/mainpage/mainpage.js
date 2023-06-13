import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Modal ,View,Text, StyleSheet, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import MainToLoginBtn from './mainTologin_btn';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';

const MainPage = () => {
  const navigation = useNavigation();

  const screenWidth = useWindowDimensions().width
  const screenHeight = useWindowDimensions().height

  const gradientColors = [
    'rgba(194, 255, 208, 1)',
    'rgba(255, 255, 255, 0.9851)',
    'rgba(255, 160, 177, 0.9684)',
    'rgba(168, 224, 255, 0.7656)',
    'rgba(255, 92, 151, 0)',
    'rgba(122, 17, 55, 0)',
  ];
  const gradientLocations = [0, 0.2552, 0.5417, 0.9999, 1.0, 1.0];

  //모달 창의 열림 여부를 판단해주는 상태변수
  const [modalVisible,  setModalVisible] = useState(false); 

  Font.loadAsync({"locus_sangsang": require('icecream_box/assets/fonts/locus_sangsang.otf'),});


  return (
        <LinearGradient
            colors={gradientColors}
            locations={gradientLocations}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{width: screenWidth,  height: screenHeight,}}>
          <StatusBar style='auto'/>

          <Image
            style={{width: screenWidth,  height: screenHeight, resizeMode: 'stretch'}}
            source={require('icecream_box/assets/mainpage/main_frame.png')}>
          </Image>

                  {/* 모달 */}
          <Modal
            animationType='none'
            transparent={true}
            visible={modalVisible}
            onRequestClose={
                ()=>{
                    setModalVisible(!modalVisible);
                }
          }>
            {/* 모달창에서 보여줄 화면 꾸미기 */}
            <View style={{alignItems:'center',justifyContent: 'center'}}>
              <View
                  style={
                    { top:'19.8%' ,width:screenWidth*0.948, height:screenHeight*0.646}}
              >
                  <Image
                      style={
                        {width:'100%', height:'100%',resizeMode:'stretch'}}
                      source={require('icecream_box/assets/mainpage/main_modal.png')}
                  >
                  </Image>
              </View>

              <Text style={styles.detail}>
                ‘마이아이스크림박스’는 아이스크림과 함께 {'\n'}{'\n'}
                친구에게 더운 여름을 이겨낼 응원을{'\n'}{'\n'}
                보내는 서비스입니다.{'\n'}{'\n'}
                친구들에게 보낸 아이스크림은{'\n'}{'\n'} 
                받은 친구만 확인할 수 있으며{'\n'} {'\n'}
                받은 아이스크림은 무더운 여름이 지나갈 때까지{'\n'} {'\n'}
                여러분 곁을 지킬 거예요.{'\n'}{'\n'}{'\n'}{'\n'}

                지금 바로 친구들에게{'\n'} {'\n'}
                무더운 여름에 힘이 될 응원을 보내볼까요? 
              </Text>   
                {/* </ImageBackground>   
              </View> */}
              
              <TouchableOpacity
                    onPress={
                        ()=>{setModalVisible(!modalVisible)}
                    }
                    style={styles.btnClose}>
                    <Image source={require('icecream_box/assets/mainpage/main_back.png')}></Image>
              </TouchableOpacity>

            </View>
          </Modal>


          <View style={[styles.btnView ,{position: 'absolute' ,width: screenWidth ,height: screenHeight}]}>
            <TouchableOpacity
                style={styles.btnOpen}
                onPress={()=>setModalVisible(!modalVisible)}>
                <Image 
                  source={require('icecream_box/assets/mainpage/main_detail.png')}
                  style={styles.btnImg}>
                </Image>
            </TouchableOpacity>
            <MainToLoginBtn
              color='rgba(255, 232, 143, 1)'
              buttonStyle={{width: screenWidth*0.6 ,height: screenHeight*0.06, top:'85%',marginLeft: '20%', marginRight: '20%'}}
              title='로그인'
              onPress={()=> navigation.navigate('Login')}
              ></MainToLoginBtn>
          </View>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  modal:{
    alignItems: 'center', justifyContent:'center'
  },
  btnOpen:{
    position: 'absolute',
    width: 53,
    height: 48,
    top: '8%',
    left: '84%',
  },
  btnView:{
    position:'absolute', 
    flexDirection: 'column',
    justifyContent:'space-between',
    alignItems: 'flex-end',
  },
  btnClose:{
    position:'absolute',
    width: 30,
    height: 30,
    top: '39%',
    left: '14%'
  },
  btnImg:{
    width: 53,
    height: 48,
    resizeMode: 'stretch'
  },
  detail:{
    position: 'absolute',
    left: '12.16%',
    right: '10%',
    top: '45.87%',
    fontStyle: 'normal',
    fontFamily: 'locus_sangsang',
    fontSize: 14,

    textAlign: 'center',
    color: '#393939'
  },
});

export default MainPage;