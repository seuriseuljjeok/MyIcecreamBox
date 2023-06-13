import { Image } from 'react-native';
import bigCloud from '../../../assets/imgs/BigCloud.png';
import { StyleSheet } from 'react-native';
import { width, height } from '../../global/dimension';

const BigCloud2 = () => {
  return <Image source={bigCloud} style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.097,
    height: height * 0.04,
    resizeMode: 'contain',
    position: 'absolute',

    marginTop: height * 0.78 * 0.67,
    right: width * 0.23,
  },
});

export default BigCloud2;
