import Button from "../component/Button";
import DoubleCheckBtn from "./doubleCheck_btn";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Text,View, Keyboard, Pressable, Alert} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Input, { ReturnKeyTypes } from "./input";
import * as Font from "expo-font";
import { useState, useEffect, useRef} from "react";
import {width, height } from '../global/dimension';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { showToast } from "../component/Toast";

const SignUp = () => {

    const navigation = useNavigation();

    //아이디, 비밀번호, 비밀번호 확인, 닉네임, 에러 메세지 저장할 상태 변수
    const [email, setEmail] = useState('');
    const [pw, setPW] = useState('');
    const [checkPW, setCheckPW]= useState('');
    const [nickname, setNickname] = useState('');
    const [existence, setExistence] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const emailRef = useRef();
    const pwRef = useRef();
    const confirmPWRef = useRef();

    //email, 비밀번호, 비밀번호 확인, 닉네임 입력이 없고 에러메세지가 존재하는 경우 => 회원가입 비활성화
    const [disabled, setDisabled] = useState(true);

    const yes = '사용 가능한 닉네임입니다.' ;
    const no = '이미 존재하는 닉네임입니다.' ;
    const success = '회원가입이 완료되었습니다.' ;


    useEffect(()=>{
        let errMsg='';
        if (pw !== checkPW) { errMsg = '*비밀번호가 일치하지 않습니다.';}
        else{errMsg='';}
        setErrorMessage(errMsg);
    }, [pw,checkPW]);

    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        if(nickname!='') showToast(existence);
      }, [existence]);

    useEffect(()=>{
        setDisabled(!(email && pw && checkPW && nickname && !errorMessage));
    }, [email,pw,checkPW,nickname,errorMessage]);

    useEffect(() => {loadFonts();}, []);

    async function loadFonts() {
        await Font.loadAsync({
        locus_sangsang: require('../../assets/fonts/locus_sangsang.ttf'),
        });
        setFontsLoaded(true);
    }

    if (!fontsLoaded) {return null;}

    function signup() {
        axios({
            method: 'post',
            url: 'http://ec2-13-209-138-31.ap-northeast-2.compute.amazonaws.com:8080/users/join',
            data: {
              email: email,
              pw: pw,
              nickname: nickname,
            },
          }).then(function (resp) {
              if (resp.data.description== null) {
                Alert.alert('회원가입 성공', success);                
                navigation.navigate('Login');
              } else {Alert.alert('회원가입 실패', resp.data.description);}
            })
            .catch(function (err) { console.log(`Error Message: ${err}`);});
        
    }

    async function checkNickname() {
        try {
            const resp = await axios.post('http://ec2-13-209-138-31.ap-northeast-2.compute.amazonaws.com:8080/users/nickname', {
            nickname: nickname,
            });
            const errmsg = resp.data.description;

            if (resp.data.description == null) {
            if (resp.data.data.existence) {setExistence(no);} 
            else if (!resp.data.data.existence) {setExistence(yes);}
            } else {setExistence(errmsg);}
        } catch (err) {
            console.log(`Error Message: ${err}`);
        }
        return existence; 
    }

    function showToastAndCheckNickname() {
        checkNickname();
    }

    return(
        <KeyboardAwareScrollView contentContainerStyle={{flex:1}}> 
            <Pressable style={styles.container} onPress={()=>Keyboard.dismiss()}>
                <StatusBar style="auto"/>
                <View style={styles.header}>
                    <Text style={[styles.basicText,styles.title]}>회원가입</Text>
                </View>
                <View style={{top:'14.19%'}}>
                    <View style={[styles.input]}>
                        <View>
                            <Input 
                                title={"아이디"}
                                returnKeyType={ReturnKeyTypes.NEXT}
                                value={email}
                                onChangeText={text=>setEmail(text)}
                                onSubmitEditing={()=>{
                                    setEmail(email);
                                    emailRef.current.focus();
                                }} />
                        </View>
                        <View>
                            <Input 
                                ref={emailRef}
                                title={"비밀번호"}
                                returnKeyType={ReturnKeyTypes.NEXT}
                                secureTextEntry
                                value={pw}
                                onChangeText={text=>setPW(text)}
                                onSubmitEditing={()=>{pwRef.current.focus();}}
                                />
                        </View>
                        <View>
                            <Input 
                                ref={pwRef}
                                title={"비밀번호 확인"}
                                returnKeyType={ReturnKeyTypes.NEXT}
                                secureTextEntry
                                value={checkPW}
                                onChangeText={text=>setCheckPW(text)}
                                onSubmitEditing={()=>{confirmPWRef.current.focus();}} />
                            <View style={styles.checkPassword}>
                                <Text style={styles.errorText}>{errorMessage}</Text>
                            </View>
                        </View>
                        <View>
                            <Input 
                                ref={confirmPWRef}
                                title={"닉네임"}
                                returnKeyType={ReturnKeyTypes.DONE}
                                value={nickname}
                                minLength={2}
                                maxLength={15}
                                onChangeText={text=>setNickname(text)}
                                />
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={{flexDirection:'row-reverse'}}>
                        <DoubleCheckBtn  
                            color='#FF6969'
                            buttonStyle={[
                                {width: width*0.3, height: height*0.04,marginBottom: '18%',top:'5%'}]}
                            title='중복 확인'
                            onPress={showToastAndCheckNickname}
                            disabled={disabled}/>
                    </View>
                    <View style={styles.submit}>
                        <Button
                            color='rgba(255, 232, 143, 1)'
                            buttonStyle={[
                                {width: width*0.6 ,height: height*0.06, margin:'0%'}]}
                            title='확인'
                            onPress={() => {signup()}}
                            disabled={disabled}/>       
                    </View>              
                </View>
            </Pressable>
    </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        alignItems:'center',
        width:width, 
        height:height
    },
    header:{
        top:'10.9%', 
        width : width * 0.346 ,
        height : height * 0.056
    },
    basicText:{
        fontFamily: 'locus_sangsang',
        fontStyle: 'normal',
        color: '#000000',
        textAlign: 'center'
    },
    title:{fontSize: 40,}
    ,text:{fontSize: 20,}
    ,
    input:{
        width:width * 0.88, 
        height : height*0.14
    },
    inputText:{
        padding:5,
        borderColor: '#FF6969',
        borderRadius: 20,
        borderWidth: 2,
        height: '60%'
    },
    errorText:{
        fontFamily: 'locus_sangsang',
        fontStyle: 'normal',
        color: '#FF6969',
        textAlign: 'right',
        fontSize: 10
    },
    checkPassword:{
        bottom:'20%',
        justifyContent: 'flex-end',
    },
    footer:{
        top:'54.8%', 
        width:width * 0.88, 
        height : height*0.14
    },
    submit:{
        width:width * 0.88, 
        flexDirection:'row', 
        justifyContent:'center'
    }

});

export default SignUp;
