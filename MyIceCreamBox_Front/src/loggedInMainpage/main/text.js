import React from 'react';
import { Text, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

const TitleText = () => {
  React.useEffect(() => {
    loadFonts();
  }, []);

  return <Text style={styles.title}>My Icecream Box</Text>;
};

async function loadFonts() {
  await Font.loadAsync({
    reco: require('../../../assets/fonts/reco.ttf'),
  });
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: '#FF6969',
    fontFamily: 'reco',
    textShadowColor: '#E2C8A1',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 0.5,
  },
});

export default TitleText;
