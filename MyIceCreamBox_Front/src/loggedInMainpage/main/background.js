import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Background = () => {
  const gradientColors = [
    '#C2FFD0',
    '#FFFFFF',
    '#FFA0B1',
    '#A8E0FF',
    '#FF5C97',
    '#7A1137',
  ];
  const gradientLocations = [0, 0.2552, 0.5417, 0.9999, 1.0, 1.0];

  return (
    <LinearGradient
      colors={gradientColors}
      locations={gradientLocations}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.view}
    ></LinearGradient>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Background;
