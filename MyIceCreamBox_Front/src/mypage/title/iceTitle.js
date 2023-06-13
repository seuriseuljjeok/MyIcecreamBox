import { Text, StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';
import { width } from '../../global/dimension';
import * as Font from 'expo-font';

const IceTitle = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts();
  }, []);

  async function loadFonts() {
    await Font.loadAsync({
      reco: require('../../../assets/fonts/reco.ttf'),
    });
    setFontsLoaded(true);
  }

  if (!fontsLoaded) {
    return null; // Return null or a loading indicator while the fonts are being loaded
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>나의 아이스크림 박스</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.072,
    color: '#393939',
    fontFamily: 'reco',
  },
});

export default IceTitle;
