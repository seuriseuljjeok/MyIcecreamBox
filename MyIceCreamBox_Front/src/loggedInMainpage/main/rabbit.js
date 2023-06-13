import { Image } from 'react-native';
import rabbit from '../../../assets/imgs/Rabbit.png';
import { StyleSheet } from 'react-native';
import { width, height } from '../../global/dimension';

const Rabbit = () => {
  return <Image source={rabbit} style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.807,
    height: height * 0.322,
    aspectRatio: 315 / 272,
    resizeMode: 'contain',
    position: 'absolute',
    margin: height * 0.173,
  },
});

export default Rabbit;
