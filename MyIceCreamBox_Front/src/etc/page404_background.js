import {useWindowDimensions, Image, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ErrorBackground = () => {
  const screenWidth = useWindowDimensions().width
  const screenHeight = useWindowDimensions().height
  
  const gradientColors = [
    'rgba(194, 255, 208, 1)',
    'rgba(255, 255, 255, 0.9851)',
    'rgba(255, 160, 177, 0.9684)',
    'rgba(168, 224, 255, 0.7656)',
    'rgba(255, 92, 151, 0)',
    'rgba(122, 17, 55, 0)',
  ];
  const gradientLocations = [0, 0.2552, 0.5417, 0.9999, 1.0, 1.0];

  return (
    <View style={{flexDirection:'column-reverse'}}>
    <LinearGradient
            colors={gradientColors}
            locations={gradientLocations}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{width: screenWidth,  height: screenHeight}}
          >
                
    </LinearGradient>
    <Image
    source={require('../../assets/mainpage/main_vector.png')}
    style={{position: 'absolute',width: screenWidth,  height: screenHeight*0.367, resizeMode: 'stretch', top:'63.2%'}}
    >
    </Image>
    </View>
  );
};

export default ErrorBackground;