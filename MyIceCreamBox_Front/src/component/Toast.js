import Toast from "react-native-root-toast";
import { width, height} from "../global/dimension";
import * as Font from "expo-font";


export const showToast=(type)=>{

  Font.loadAsync({"locus_sangsang": require('icecream_box/assets/fonts/locus_sangsang.otf')});


    const toastOutStyle = {
      width: width * 0.728, // Set the desired width
      height: height * 0.134, // Set the desired height
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      bottom: '18%'
    };
    const toastInStyle = {
      width: width * 0.665, // Set the desired width
      height: height * 0.118, // Set the desired height
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      bottom: '18%'
    };

    Toast.show('', {
      duration: 1000,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: '#FFDDDD',
      textColor: '#000000',
      containerStyle: toastOutStyle,
      opacity: 1,
    });

    Toast.show(type, {
      duration: 1000,
      position: Toast.positions.BOTTOM - height * 0.008,
      shadow: false,
      animation: true,
      hideOnPress: true,
      delay: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      textColor: '#000000',
      containerStyle: toastInStyle,
      textStyle: {
        color: '#000000',
        fontSize: width * 0.041,
        fontFamily: 'locus_sangsang',
      },
    });
  }