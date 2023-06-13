import { Pressable, Text } from "react-native";
import {useEffect, useState} from 'react';
import { StyleSheet } from "react-native";
import PropTypes from 'prop-types';
import * as Font from 'expo-font';


const MainToLoginBtn = ({title, onPress, buttonStyle}) => {

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
                {backgroundColor:'#FFDDDD'},
                pressed && {backgroundColor:'#FFffff'},
                buttonStyle,
            ]}
            onPressOut={onPress}
            >
                <Text style={styles.title}>{title}</Text>
        </Pressable>
        );
};

MainToLoginBtn.proptypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    buttonStyle: PropTypes.object,
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
        fontFamily:'locus_sangsang',
        fontSize: 24,
        fontStyle: 'normal',
        // fontWeight: 400,
        textAlign: 'center'
    }
})


export default MainToLoginBtn;