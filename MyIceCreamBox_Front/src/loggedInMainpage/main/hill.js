import { Image } from 'react-native';
import hill from '../../../assets/imgs/Hill.png';
import { StyleSheet } from 'react-native';
import { width, height } from '../../global/dimension';

const Hill = () => {
  return <Image source={hill} style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    width: width * 1.23,
    height: height * 0.388,
    resizeMode: 'stretch',
    position: 'absolute',
    right: -20,
    // bottom: 0,
    marginTop: height * 0.78 * 0.58,
  },
});

export default Hill;
