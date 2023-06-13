import { Pressable, Text, StyleSheet} from 'react-native';
import { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import * as Font from 'expo-font';

const Button = ({title, onPress, buttonStyle, disabled}) => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {loadFonts();}, []);
  
      async function loadFonts() {
          await Font.loadAsync({
          locus_sangsang: require('../../assets/fonts/locus_sangsang.ttf'),
          });
          setFontsLoaded(true);
      }
  
      if (!fontsLoaded) {
          return null;
      }

    Font.loadAsync({"locus_sangsang": require('icecream_box/assets/fonts/locus_sangsang.otf')});
    
    return (
        <Pressable
            style={({pressed})=>[
                styles.button,
                {backgroundColor:'#FFE88F'},
                pressed && {backgroundColor:'#F3D048'},
                buttonStyle,
            ]}
            onPressOut={onPress}
            disabled={disabled}
            >
                <Text style={styles.title}>{title}</Text>
        </Pressable>
        );
};

Button.proptypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    buttonStyle: PropTypes.object,
    disabled:PropTypes.bool
};

const styles = StyleSheet.create({
    button:{
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset:{
            width: 0,
            height:2,
          },
          shadowOpacity: 6,
          shadowRadius: 27,
          shadowColor: 'rgba(29, 29, 29, 0.25)',
          borderRadius: 27,
          fontColor: '#393939',
    },
    title: {
        color: 'rgba(57, 57, 57, 1)',
        fontSize: 24,
        fontStyle: 'normal',
        fontFamily: 'locus_sangsang',
        textAlign: 'center'
    }
})


export default Button;