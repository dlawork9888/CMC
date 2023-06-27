//일반 로그인(소셜 로그인 페이지 코드는 밑에 주석 처리 )

import React,{useContext,useState} from 'react';
import {
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView
} from 'react-native';
import axios from 'axios';


//UserContext
import UserContext from './UserContext';
//APIcontext
import APIcontext from './APIcontext';

//홈 화면으로 넘어가면 Stack Navigation 스택 초기화 => 지금은 탭 네비게이션 컴포넌트 화면으로 넘어감.
const SignUp = ({navigation}) => {
  //UserContext
  const userContext = useContext(UserContext);
  //APIcontext
  const API_context = useContext(APIcontext);

  //로그인 인풋
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCorrection, setPasswordCorrection] = useState('');
  const [contact, setContact] = useState('');
  const [nickname, setNickname] = useState('');

  console.log('Login Page Entered')
  console.log('UserType : ', userContext.userContext.userType)

  //회원가입 API 요청
  const handleSignUpMember = async () => {
    try {
      const response = await axios.post(API_context.auth_signup_member, {
        email: userEmail,
        password: password,
        nickname: nickname,
        name: userName,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // 회원가입 성공 처리
      console.log(response.data);
      Alert.alert(
        '회원 가입 완료!',
        '로그인 화면으로 이동합니다.',
        [
          {
            text: '확인',
            onPress : () => {
              navigation.navigate('Login')
            }
          },
        ],
        { cancelable: false },
      );
    } catch (error) {
      // 회원가입 실패 처리
      if (error.response) {
        console.log(error.response.data.message);
        Alert.alert(
          '회원가입 실패..',
          '잠시후 다시 시도해주세요!',
          error.response.data.message,
          [
            {
              text: '확인',
              style: 'cancel',
            },
          ],
          { cancelable: false },
        );
      } else {
        console.error(error);
      }
    }
  };

  const handleSignUpDesigner = async () => {
    try {
      const response = await axios.post(API_context.auth_signup_designer, {
        email: userEmail,
        password: password,
        nickname: nickname,
        name: userName,
        contact: contact
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // 로그인 성공 처리
      console.log(response.data);
      Alert.alert(
        '회원 가입 완료!',
        '로그인 화면으로 이동합니다.',
        [
          {
            text: '확인',
            onPress : () => {
              navigation.navigate('Login')
            }
          },
        ],
        { cancelable: false },
      );
    } catch (error) {
      // 로그인 실패 처리
      if (error.response) {
        console.log(error.response.data.message);
        Alert.alert(
          '',
          error.response.data.message,
          [
            {
              text: '확인',
              style: 'cancel',
            },
          ],
          { cancelable: false },
        );
      } else {
        console.error(error);
      }
    }
  };

  const handleSignUp = () => {
    if (userEmail === '' || password === '' || passwordCorrection === '' || nickname ==='' || userName === '') {
      // 필수 항목이 비어있을 때
      Alert.alert(
        '필수 정보 확인',
        '필수 정보가 모두 입력되었는지 확인해주세요.',
        [
          {
            text: '확인',
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
    } else if (userContext.userContext.userType === 1) {
      // userType이 1일 때
      if (password !== passwordCorrection) {
        // 비밀번호와 비밀번호 확인이 일치하지 않을 때
        Alert.alert(
          '비밀번호 확인',
          '비밀번호가 일치하지 않습니다.',
          [
            {
              text: '확인',
              style: 'cancel',
            },
          ],
          { cancelable: false },
        );
      } else if (contact === '') {
        // userType이 1이면서 contact도 비어있을 때
        Alert.alert(
          '연락처 확인',
          '연락처를 입력해주세요.',
          [
            {
              text: '확인',
              style: 'cancel',
            },
          ],
          { cancelable: false },
        );
      } else {
        // 조건을 모두 통과한 경우
        handleSignUpDesigner();
      }
    } else {
      // userType이 0인 경우
      if (password !== passwordCorrection) {
        // 비밀번호와 비밀번호 확인이 일치하지 않을 때
        Alert.alert(
          '비밀번호 확인',
          '비밀번호가 일치하지 않습니다.',
          [
            {
              text: '확인',
              style: 'cancel',
            },
          ],
          { cancelable: false },
        );
      } else {
        // 조건을 모두 통과한 경우
        handleSignUpMember();
      }
    }
  };
  
  
  


    return (
      <ImageBackground source={require('./Login/Login2_Background.png')} style={styles.imagebackground}>

      <ScrollView>
        <View style={{paddingHorizontal:30, marginTop:150}}>
          
          <Text style={{ fontSize: 15, color: '#FFFFFF',fontWeight:900, textShadowColor: 'black', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 2 }}>아이디</Text>
          
          <TextInput
            style={styles.input}
            placeholder="아이디"
            value={userEmail}
            onChangeText={text => setUserEmail(text)}
          />

          <Text style={{ fontSize: 15, color: '#FFFFFF',fontWeight:900, textShadowColor: 'black', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 2 }}>이름</Text>
          
          <TextInput
            style={styles.input}
            placeholder="이름"
            value={userName}
            onChangeText={text => setUserName(text)}
          />

          <Text style={{ fontSize: 15, color: '#FFFFFF',fontWeight:900, textShadowColor: 'black', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 2 }}>닉네임</Text>
          
          <TextInput
            style={styles.input}
            placeholder="닉네임"
            value={nickname}
            onChangeText={text => setNickname(text)}
          />
         
          <Text style={{ fontSize: 15, color: '#FFFFFF',fontWeight:900, marginTop:10, textShadowColor: 'black', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 2 }}>비밀번호</Text>
          
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />

          <Text style={{ fontSize: 15, color: '#FFFFFF',fontWeight:900, marginTop:10, textShadowColor: 'black', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 2 }}>비밀번호 확인</Text>
          
          <TextInput
            style={styles.input}
            placeholder="비밀번호 확인"
            secureTextEntry
            value={passwordCorrection}
            onChangeText={text => setPasswordCorrection(text)}
          />

          {userContext.userContext.userType === 1 ? (
          <>
            <Text style={{ fontSize: 15, color: '#FFFFFF',fontWeight:900, marginTop:10, textShadowColor: 'black', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 2 }}>연락처</Text>
            
            <TextInput
              style={styles.input}
              placeholder="연락처"
              value={contact}
              onChangeText={text => setContact(text)}
            />
          </>
          ):(
            <></>
          )}

          <TouchableOpacity onPress={handleSignUp} style={{marginBottom:50}}>
            <View style={{alignItems:'center', justifyContent:'center', backgroundColor:'#FFFFFF50', borderColor:'#FFFFFF', borderWidth:1, padding:15, borderRadius:5, marginTop:50}}>
              <Text style={{color:'#FFFFFF', fontSize:18, fontWeight:900, textShadowColor: 'black', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 2}}>회원가입</Text>
            </View>
          </TouchableOpacity>
        
        </View>
        </ScrollView>

      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagebackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: '15%',
    left: '25%',
    right: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  buttonsContainer:{
    position: 'absolute',
    bottom: '20%',
    left: '25%',
    right: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  logo: {
    resizeMode: 'contain',
    opacity: 1,
    marginTop: 10
  },
  input: {
    // Input styles
    backgroundColor:'#FFFFFF',
    borderRadius:10,
    paddingHorizontal: 10,
    paddingVertical:5,
    marginBottom: 10,
    marginTop:10,
  },
});

export default SignUp;