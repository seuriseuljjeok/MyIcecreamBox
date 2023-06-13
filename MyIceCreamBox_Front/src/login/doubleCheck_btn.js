import { Pressable, Text, StyleSheet} from "react-native";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import * as Font from 'expo-font';
import { showToast } from "../component/Toast";





const DoubleCheckBtn = ({title, onPress, buttonStyle, disabled}) => {

    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        loadFonts();
    }, []);

    async function loadFonts() {
        await Font.loadAsync({
        locus_sangsang: require('../../assets/fonts/locus_sangsang.ttf'),
        });
        setFontsLoaded(true);
    }

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Pressable
            style={({pressed})=>[
                styles.button,
                {backgroundColor:'#FF6969'},
                pressed && {backgroundColor:'#FF6969'},
                buttonStyle,
            ]}
            // onPress={onPress}
            onPressOut={onPress}
            disabled={disabled}
            >
            <Text style={styles.title}>{title}</Text>
        </Pressable>
    );
};

DoubleCheckBtn.proptypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    buttonStyle: PropTypes.object,
    disabled: PropTypes.bool
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
      
          fontColor: '#ffffff',
    },
    title: {
        color: '#ffffff',
        fontSize: 16,
        fontStyle: 'normal',
        fontFamily: 'locus_sangsang',
        textAlign: 'center'
    }
})


export default DoubleCheckBtn;