import { Image, TouchableOpacity } from 'react-native';
import back from '../../../assets/imgs/back.png';
import { StyleSheet } from 'react-native';
import { width, height } from '../../global/dimension';

const Back = ({ onPress }) => {
  return (
    <TouchableOpacity onPressOut={onPress}>
      <Image source={back} style={styles.container} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: width * 0.062,
    marginTop: height * 0.05,
  },
});

export default Back;
