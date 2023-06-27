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
  Alert
} from 'react-native';
import axios from 'axios';

//UserContext
import UserContext from './UserContext';
//APIcontext
import APIcontext from './APIcontext';

//홈 화면으로 넘어가면 Stack Navigation 스택 초기화 => 지금은 탭 네비게이션 컴포넌트 화면으로 넘어감.
const Login = ({navigation}) => {
  
  
  //Home 페이지로 넘어가기
  const handleResetStack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Tabs' }],
    });
  };

  //UserContext
  const userContext = useContext(UserContext);

  //APIcontext
  const API_context = useContext(APIcontext);

  //로그인 인풋
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

 //로그인 API요청
 const handleLoginMember = async () => {
  console.log('이메일:',userEmail);
  console.log('비밀번호:',password);
  console.log('요청 주소:',API_context.auth_signin_member);
  try {
    const response = await axios.post(API_context.auth_signin_member, {
      email: userEmail,
      password: password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 로그인 성공 처리
    console.log(response.data);
    const { accessToken, refreshToken, id } = response.data.data;
    userContext.setAccessToken(accessToken);
    userContext.setRefreshToken(refreshToken);
    userContext.setUserId(id);
    handleResetStack();
  } catch (error) {
    // 로그인 실패 처리
    if (error.response) {
      console.log(error);
      Alert.alert(
        '로그인 실패!',
        '아이디와 비밀번호를 확인해주세요!',
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
      Alert.alert(
        '로그인 실패!',
        '아이디와 비밀번호를 확인해주세요!',
        [
          {
            text: '확인',
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
    }
  }
};








//디자이너 로그인
  const handleLoginDesigner = async () => {
    console.log('이메일:',userEmail);
    console.log('비밀번호:',password);
    try {
      const response = await axios.post(API_context.auth_signin_designer, {
        email: userEmail,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // 로그인 성공 처리
      console.log(response.data);
      const { accessToken, refreshToken, id } = response.data.data;
      userContext.setAccessToken(accessToken);
      userContext.setRefreshToken(refreshToken);
      userContext.setUserId(id);
      handleResetStack();
    } catch (error) {
      // 로그인 실패 처리
      if (error.response) {
        console.log(error.response.data.message);
        Alert.alert(
          '로그인 실패!',
          '아이디와 비밀번호를 입력해주세요!',
          [
            {
              text: '확인',
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
      } else {
        console.error(error);
        Alert.alert(
          '로그인 실패!',
          '아이디와 비밀번호를 입력해주세요!',
          [
            {
              text: '확인',
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );
      }
    }
  };




  console.log('Login Page Entered')
  console.log('UserType : ', userContext.userContext.userType)

  
  
    return (
      <ImageBackground source={require('./Login/Login2_Background.png')} style={styles.imagebackground}>

        <View style={styles.logoContainer}>
          <Image source={require('./Login/CMC_logo.png')} style={styles.logo} />
        </View>

        <View style={{paddingHorizontal:30, marginTop:150}}>
          
          <Text style={{ fontSize: 15, color: '#FFFFFF',fontWeight:900, textShadowColor: 'black', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 2 }}>아이디</Text>
          
          <TextInput
            style={styles.input}
            placeholder="아이디"
            value={userEmail}
            onChangeText={text => setUserEmail(text)}
          />
         
          <Text style={{ fontSize: 15, color: '#FFFFFF',fontWeight:900, marginTop:10, textShadowColor: 'black', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 2 }}>비밀번호</Text>
          
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />

          <TouchableOpacity onPress={userContext.userContext.userType === 0 ? handleLoginMember : handleLoginDesigner}>
            <View style={{alignItems:'center', justifyContent:'center', backgroundColor:'#FFFFFF50', borderColor:'#FFFFFF', borderWidth:1, padding:15, borderRadius:5, marginTop:50}}>
              <Text style={{color:'#FFFFFF', fontSize:18, fontWeight:900, textShadowColor: 'black', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 2}}>로그인</Text>
            </View>
          </TouchableOpacity>
          
          
          {/*빠른로그인!
            <TouchableOpacity onPress={()=>navigation.navigate('Tabs')}>
              <View style={{alignItems:'center', justifyContent:'center', backgroundColor:'#FFFFFF50', borderColor:'#FFFFFF', borderWidth:1, padding:15, borderRadius:5, marginTop:50}}>
                <Text style={{color:'#FFFFFF', fontSize:18, fontWeight:900, textShadowColor: 'black', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 2}}>파바박</Text>
              </View>
            </TouchableOpacity>
          */}


          <View style={{alignItems:'center', justifyContent:'center', marginTop:20}}>
            <Text style={{fontSize:15, color:'#FFFFFF',fontWeight:900, textShadowColor: 'black', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 2}}>아직 회원이 아니신가요?</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
              <Text style={{fontSize:15, color:'#FFFFFF',fontWeight:900, textShadowColor: 'black', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 2}}>여기를 눌러 시작해보세요!</Text>
            </TouchableOpacity>
          </View>

        </View>

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

export default Login;






/*



//소셜 로그인 페이지

import React,{useContext} from 'react';
import {
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';

//UserContext
import UserContext from './UserContext';


//홈 화면으로 넘어가면 Stack Navigation 스택 초기화 => 지금은 탭 네비게이션 컴포넌트 화면으로 넘어감.
const Login = ({navigation}) => {
  //UserContext
  const userContext = useContext(UserContext);
  
  console.log('Login Page Entered')
  console.log('UserType : ', userContext.userContext.userType)

  const handleResetStack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Tabs' }],
    });
  };
  
    return (
      <ImageBackground source={require('./Login/Login2_Background.png')} style={styles.imagebackground}>
        <View style={styles.logoContainer}>
            <Image source={require('./Login/CMC_logo.png')} style={styles.logo} />
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleResetStack}>
              <Image source={require('./Login/google_login_button.png')} style={styles.logo}></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleResetStack}>
              <Image source={require('./Login/kakao_login_button.png')} style={styles.logo}></Image>
          </TouchableOpacity>
        </View>
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
    top: '25%',
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
});

export default Login;



*/