import { Image } from 'react-native';
import smallCloud from '../../../assets/imgs/SmallCloud.png';
import { StyleSheet } from 'react-native';
import { width, height } from '../../global/dimension';

const SmallCloud1 = () => {
  return <Image source={smallCloud} style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.056,
    height: height * 0.025,
    resizeMode: 'contain',
    position: 'absolute',
    marginTop: height * 0.78 * 0.71,
    left: width * 0.41,
  },
});

export default SmallCloud1;
