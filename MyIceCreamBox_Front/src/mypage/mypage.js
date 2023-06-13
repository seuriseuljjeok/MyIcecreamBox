import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Back from './title/back';
import IceTitle from './title/iceTitle';
import NickName from './header/nickname';
import Pie from './header/piechart';
import IceList from './content/iceList';
import { width, height } from '../global/dimension';

const IceBox = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.title}>
        <Back onPress={() => navigation.navigate('LoggedInMainpage')} />
        <IceTitle />
      </View>
      <View style={styles.header}>
        <NickName />
        <View style={styles.pinkbox}>
          <Pie />
        </View>
        <Text style={{ marginTop: height * 0.021 }}></Text>
      </View>
      <View style={styles.content}>
        <IceList></IceList>
      </View>
      <View style={styles.footer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {},
  scroll: {
    width: width * 0.821,
    height: height * 0.533,
    borderRadius: 20,
    backgroundColor: '#FFFFEE',
  },
  pinkbox: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: width * 0.877,
    height: height * 0.228, // 0.208
    backgroundColor: '#FFF2F2',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#FF6969',
    borderRadius: 20,
    marginTop: height * 0.015,
    padding: 26,
  },
  beigeBox: {
    width: width * 0.821,
    height: height * 0.533,
    backgroundColor: '#AAACCC',
  },
  iceList: {
    flexDirection: 'row',
    margin: width * 0.077,
    justifyContent: 'space-evenly',
  },
});

export default IceBox;
