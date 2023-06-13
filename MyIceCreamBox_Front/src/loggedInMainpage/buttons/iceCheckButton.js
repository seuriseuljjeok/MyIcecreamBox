import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { width, height } from '../../global/dimension';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';

// eslint-disable-next-line react/prop-types
const ButtonIceCheck = ({ title, onPress }) => {
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
    return null;
  }

  return (
    <TouchableOpacity style={styles.container} onPressOut={onPress}>
      <Text style={styles.word}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.23,
    height: height * 0.028,

    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,

    backgroundColor: 'rgba(190, 255, 176, 0.7)',
    transform: [{ rotate: '2.4vdeg' }],
    marginTop: height * 0.8 * 0.742 * 0.838,
    marginLeft: (width * 0.8) / 2,
    borderWidth: 0,
    borderRadius: 27,
  },
  word: {
    fontSize: width * 0.026,
    fontFamily: 'locus_sangsang',
  },
});

export default ButtonIceCheck;
