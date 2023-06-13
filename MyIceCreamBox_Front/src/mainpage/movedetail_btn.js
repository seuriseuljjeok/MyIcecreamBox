import { Pressable, Text } from "react-native";
import { StyleSheet } from "react-native";
import PropTypes from 'prop-types'

const DetailButton = ({title, onPress, buttonStyle}) => {
    return (
        <Pressable
            style={({pressed})=>[
                styles.button,
                {backgroundColor:'#FFE88F'},
                pressed && {backgroundColor:'#F3D048'},
                buttonStyle,
            ]}
            onPressOut={onPress}
            >
                <Text style={styles.title}>{title}</Text>
        </Pressable>
        );
};

DetailButton.proptypes = {
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
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: 400,
        textAlign: 'center'
    }
})


export default DetailButton;