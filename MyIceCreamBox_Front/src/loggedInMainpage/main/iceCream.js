import { Image } from 'react-native';
import iceCream from '../../../assets/imgs/Icecream.png';
import { StyleSheet } from 'react-native';
import { width, height } from '../../global/dimension';

const IceCream = () => {
  return <Image source={iceCream} style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.281,
    height: height * 0.115,
    resizeMode: 'contain',
    position: 'absolute',
    marginTop: height * 0.78 * 0.53,
    right: width * 0.15,
  },
});

export default IceCream;
