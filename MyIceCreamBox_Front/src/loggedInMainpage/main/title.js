import { Image } from 'react-native';
import Title from '../../../assets/imgs/Title.png';
import { StyleSheet } from 'react-native';
import { width, height } from '../../global/dimension';

const TitleText = () => {
  return <Image source={Title} style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.736,
    height: height * 0.047,
    aspectRatio: 287 / 36,
    resizeMode: 'contain',
  },
});

export default TitleText;
