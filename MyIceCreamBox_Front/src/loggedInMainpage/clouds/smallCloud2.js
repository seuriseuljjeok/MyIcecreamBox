import { Image } from 'react-native';
import smallCloud from '../../../assets/imgs/SmallCloud.png';
import { StyleSheet } from 'react-native';
import { width, height } from '../../global/dimension';

const SmallCloud2 = () => {
  return <Image source={smallCloud} style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.056,
    height: height * 0.025,
    resizeMode: 'contain',
    position: 'absolute',
    marginTop: height * 0.78 * 0.57,
    right: width * 0.33,
  },
});

export default SmallCloud2;
