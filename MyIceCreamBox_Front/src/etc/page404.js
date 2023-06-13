import { StatusBar } from 'expo-status-bar';
import { useWindowDimensions, StyleSheet, Text,View } from 'react-native';
import ErrorBackground from './page404_background';
import Button from '../component/Button';
import { useNavigation } from '@react-navigation/native';
import * as Font from "expo-font";
import { useState, useEffect} from 'react';

const Page404 = () => {
  const navigation = useNavigation();

  const screenWidth = useWindowDimensions().width
  const screenHeight = useWindowDimensions().height

  const onPress = () => navigation.navigate('MainPage');

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {loadFonts();}, []);

    async function loadFonts() {
        await Font.loadAsync({
        RecipekoreaOTF: require('../../assets/fonts/RecipekoreaOTF.ttf'),
        });
        setFontsLoaded(true);
    }

    if (!fontsLoaded) {
        return null;
    }

  return (
    <View style={[styles.container,{width: screenWidth, height: screenHeight}]}>
      <ErrorBackground style={{position: 'absolute'}}/>
      <View style={{position: 'absolute',width: screenWidth, height: screenHeight}}>
           <Text style={[styles.text,styles.code]}>404</Text>
           <Text style={[styles.text,styles.notFound]}>PAGE NOT FOUND</Text>
           <Text style={[styles.text,styles.message]}>죄송합니다.{'\n'}페이지가 존재하지 않습니다.</Text>
           <StatusBar style="auto" /> 

           <Button
            color='rgba(255, 232, 143, 1)'
            buttonStyle={[{width: screenWidth*0.6 ,height: screenHeight*0.06, top: '57.7%', left: '20%'},styles.text]}
            title='메인으로 이동'
            onPress={onPress}
            ></Button> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  text:{
    fontFamily: 'RecipekoreaOTF',
    textAlign: 'center',
    fontStyle: 'normal',
  },
  code:{
    /* 404 */
    
    top: '24.9%',
    fontSize: 60,
    color: '#FF6969',
  },
  notFound:{
    /* PAGE NOT FOUND */
    top: '28.5%',
    fontSize: 28,
    color: '#686868',
  },
  message:{
    /* 페이지가 존재하지 않습니다. */
    top: '38.2%',
    fontSize: 16,
    color: '#686868',
  },
});

export default Page404;