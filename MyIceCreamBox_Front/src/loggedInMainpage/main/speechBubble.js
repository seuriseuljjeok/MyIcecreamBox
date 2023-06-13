import { ImageBackground } from 'react-native';
import speechBubble from '../../../assets/imgs/SpeechBubble.png';
import { StyleSheet, Text } from 'react-native';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { width, height } from '../../global/dimension';

const SpeechBubble = () => {
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

  return (
    <ImageBackground
      source={speechBubble}
      style={styles.container}
      resizeMode="contain"
    >
      <Text style={styles.write}>2023 여름 {'\n'}</Text>

      <Text style={styles.write}> 내 찬란한 여름을 응원해 줘!</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.625,
    height: height * 0.193,
    aspectRatio: 243.86 / 163.39,
    // resizeMode: 'contain',
    position: 'absolute',
    alignItems: 'center',
  },
  write: {
    fontSize: width * 0.03,
    fontFamily: 'locus_sangsang',
    marginTop: height * 0.015,
  },
});

export default SpeechBubble;
