import { Text, Pressable, StyleSheet, View } from 'react-native';
import { width, height } from '../../global/dimension';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
// import Toast from 'react-native-toast-message';
import Toast from 'react-native-root-toast';

// eslint-disable-next-line react/prop-types
const ButtonShare = ({ title, onPress }) => {
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
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: '#FFDDDD',
      textColor: '#000000',
      containerStyle: toastOutStyle,
      opacity: 1,
    });

    Toast.show('링크가 복사되었습니다.', {
      duration: 3000,
      position: Toast.positions.BOTTOM - height * 0.008,
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
    });
  };

  return (
    <View>
      <Text style={styles.count}> </Text>
      <Pressable
        style={({ pressed }) => [
          styles.container,
          {
            backgroundColor: '#FFE88F',
          },
          pressed && {
            backgroundColor: '#F3D048',
          },
        ]}
        onPress={showToast}
        // onPressIn={showToast}
        onPressOut={onPress}
      >
        <Text style={styles.word}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.359,
    height: height * 0.062,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#393939',
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 0.5,
    shadowOpacity: 0.3,
  },
  word: {
    fontSize: width * 0.051,
    fontFamily: 'locus_sangsang',
  },
  count: {
    fontSize: width * 0.024,
    fontFamily: 'locus_sangsang',
  },
});

export default ButtonShare;
