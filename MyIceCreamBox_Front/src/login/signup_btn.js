import { Pressable, Text, StyleSheet} from "react-native";
import { useEffect, useState} from "react";
import PropTypes from 'prop-types';
import * as Font from 'expo-font';

const SignUpButton = ({title, onPress, buttonStyle}) => {
    
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
                pressed,
                buttonStyle,
            ]}
            onPressOut={onPress}
            >
            <Text style={styles.title}>{title}</Text>
        </Pressable>
        );
};

SignUpButton.proptypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    buttonStyle: PropTypes.object,
};

const styles = StyleSheet.create({
    button:{
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset:{ width: 0, height:2,},
        shadowOpacity: 6,
        shadowRadius: 27,
        shadowColor: 'rgba(29, 29, 29, 0.25)',
        borderRadius: 27,
        fontColor: '#000000',
        
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 20,
        color: '#000000',
        textAlign: 'center'
    },
    title: {
        color: 'rgba(0, 0, 0, 1)',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center',
        fontFamily: 'locus_sangsang'
    }
})


export default SignUpButton;