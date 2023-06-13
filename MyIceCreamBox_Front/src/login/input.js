import { StyleSheet, Text, View, Platform, TextInput} from "react-native";
import { forwardRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import * as Font from 'expo-font';

// export const KeyboardTypes = {
//     DEFAULT: 'default',
//     EMAIL:'email'
// }

export const ReturnKeyTypes = {
    DONE: 'done',
    NEXT: 'next'
}


const Input = forwardRef(
    (
        {title, onChangeText, maxLength, returnKeyType, secureTextEntry, value, onSubmitEditing, disabled}, 
        ref ) => {
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
                <View 
                    behavior={Platform.select({ios:'padding'})}
                    style={styles.container}>
                    <Text style={styles.text}>{title}</Text>
                    <TextInput
                        style={styles.inputText}
                        autoCapitalize="none"
                        autoCorrect={false}
                        maxLength={maxLength}
                        returnKeyType={returnKeyType}
                        secureTextEntry={secureTextEntry}
                        onChangeText={onChangeText}
                        onSubmitEditing={onSubmitEditing}
                        disabled={disabled}
                        value={value}
                        ref={ref}
                        />
                </View>
            );
        }
);

Input.displayName="Input";



Input.defaultProps = {
    // keyboardType: KeyboardTypes.DEFAULT,
    returnKeyType: ReturnKeyTypes.DONE
};

Input.propTypes = {
    disabled: PropTypes.bool
};

const styles = StyleSheet.create(
    {
        container:{
            width:'100%',
            height:'100%',
        },
        text:{
            fontStyle: 'normal',
            fontFamily: 'locus_sangsang',
            fontSize: 20,
            color: '#000000',
            left: '7%',
            marginBottom: '3%'
        },
        inputText:{
            padding:'5%',
            fontSize:16,
            fontFamily: 'locus_sangsang',
            borderColor: '#FF6969',
            borderRadius: 20,
            borderWidth: 2,
            height: '54%',
        }
    }
);

export default Input;