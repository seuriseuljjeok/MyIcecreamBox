import ErrorBackground from './page404_background';
import { useEffect, useState } from 'react';
import {
  useWindowDimensions,
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';
// import LoadingAni from '../component/LoadingAni';

const LoadingPage = () => {
  const [imageNumber, setImageNumber] = useState(0);

  const screenWidth = useWindowDimensions().width;
  const screenHeight = useWindowDimensions().height;

  useEffect(() => {
    let count = 0;
    let countInterval = setInterval(() => {
      setImageNumber(count++ % 10);
    }, 2000 / 3);

    return () => clearInterval(countInterval);
  }, []);
  return (
    <View
      style={{
        width: screenWidth,
        height: screenHeight,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ErrorBackground style={styles.bg}></ErrorBackground>
      <Image
        style={[styles.flower]}
        source={animationImages[imageNumber]}
        key={imageNumber}
      />
      {/* <LoadingAni style={styles.ribbon} /> */}
      <Text style={styles.text}>LOADING ...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
  },
  ribbon: {
    position: 'absolute',
    left: '11.54%',
    right: '51.18%',
    top: '29.8%',
  },
  flower: {
    position: 'absolute',
    bottom: '9%',
  },
  text: {
    position: 'absolute',
    marginTop: '35%',
    fontSize: 28,
    fontWeight: 700,
    /* gray */
    color: '#686868',
  },
});

const animationImages = [
  require('../../assets/imgs/loading1.png'),
  require('../../assets/imgs/loading2.png'),
  require('../../assets/imgs/loading3.png'),
  require('../../assets/imgs/loading4.png'),
  require('../../assets/imgs/loading5.png'),
];
export default LoadingPage;
