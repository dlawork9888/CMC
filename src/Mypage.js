import React,{useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';


//UserContext (userType이 0이면 구매자)
import UserContext, { UserContextProvider } from './UserContext';
import APIcontext from './APIcontext';

let sample_mypageInfo = {
    userImage:'https://picsum.photos/200/300',
    userName:'사용자 이름'

}
const Mypage = ({navigation}) => {

  


  //UserContext
  const userContext = useContext(UserContext)
  const API_context = useContext(APIcontext);


  const [mypageInfo, setMypageInfo] = useState(sample_mypageInfo);

//멤버 상세 정보 조회  
  const getCusInfo = async () => {
    console.log('상세 정보 조회');
    console.log('전송 액세스 토큰:', userContext.userContext.accessToken);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userContext.userContext.accessToken}`
        }
      };

      const response = await axios.get(API_context.get_members_detail, config);
      console.log('응답 데이터:', response.data);
      console.log('상세 정보 조회 성공');

      const { nickname, profileImgUrl } = response.data.data;
      console.log("닉네임 :",nickname);
      console.log('프로필 사진 URL',profileImgUrl)
      setMypageInfo((prevMypageInfo) => ({
        ...prevMypageInfo,
        userImage: profileImgUrl,
        userName: nickname,
      }));

    } catch (error) {
      console.log('상세 정보 조회 에러');
      console.error(error);
      console.error('에러 상태 코드:', error.response.status);
      console.error('에러 메시지:', error.response.data);
    }
  };


  const getDesignerInfo = async (designerId) => {
    try {
      console.log('디자이너 간단 정보 조회');
      console.log('전송 액세스 토큰:', userContext.userContext.accessToken);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userContext.userContext.accessToken}`
        }
      };
      const response = await axios.get(`http://3.39.131.14:8080/api/v1/designers/${designerId}/info`, config);
      console.log('응답 데이터 :', response.data);

      const designerInfo = response.data.data;
      setMypageInfo((prevMypageInfo) => ({
        ...prevMypageInfo,
        userName: designerInfo.name,
        userImage: designerInfo.profileImgUrl,
      }));
    } catch (error) {
      console.error('디자이너 간단정보 조회 실패');
      console.error(error);
      console.error('에러 상태 코드:', error.response.status);
      console.error('에러 메시지:', error.response.data);
    }
  };




  useEffect(() => {
    if (userContext.userContext.userType == 0 )
    {
      getCusInfo();
    } 
    else
    {
      getDesignerInfo(userContext.userContext.userId);
    }
    
  }, []);





  console.log("Mypage entered")
  console.log("UserType :",userContext.userContext.userType)

  return (
    <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
      {/*구매자*/}
      {userContext.userContext.userType===0 ? (
      <ScrollView contentContainerStyle={{zIndex: 0, backgroundColor: '#FFFFFF', alignItems:'center' ,flex:1}}>
          <View style={{ zIndex:1, height: 175,width:'100%', backgroundColor: '#FFE1E4', alignItems: 'center' }} />
              <Image
                source={{uri : mypageInfo.userImage}}
                style={{ position: 'absolute',top:90, zIndex:2, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', width: 170, height: 170, borderRadius:100, borderWidth:5, borderColor:"#FFFFFF" }}
                resizeMode='cover'
              />
              <View 
                style={{position:'absolute', zIndex:3,top:210,width:170, alignItems:'flex-end'}}
              >
                <TouchableOpacity onPress={() => {navigation.navigate('CustomerEditProfile');}}>
                  <Image
                    source={require('./Mypage/edit_button.png')}
                    style={{width:50, height:50, resizeMode:'contain'}}
                  />
                </TouchableOpacity>
              </View>
            <View style={{marginTop:100}}>
              <Text style={{fontSize:23, color:'#000000', fontWeight:'bold'}}>{mypageInfo.userName}</Text>
            </View>
  {/*아래 애들 4개*/}
          
            <View style={{width:'100%'}}>
              <TouchableOpacity onPress={()=>navigation.navigate('MyFavorites')}>
                <View style={{flexDirection:'row',alignItems:'center', marginLeft:20, marginTop:30}}>
                  <Image
                    source={require('./Mypage/mypage_heart.png')}
                    style={{width:25,height:25,resizeMode:'contain'}}  
                  />
                  <Text style={{fontSize:20, color:'#000000',  fontWeight:'700',marginLeft:15}}>찜 목록</Text>
                </View>
              </TouchableOpacity>
              <View style={{flexDirection:'row',alignItems:'center', marginLeft:20, marginTop:30}}>
                <Image
                  source={require('./Mypage/mypage_settings.png')}
                  style={{width:25,height:25,resizeMode:'contain'}}  
                />
                <Text style={{fontSize:20, color:'#000000',  fontWeight:'700',marginLeft:15}}>설정</Text>
              </View>
              <View style={{flexDirection:'row',alignItems:'center', marginLeft:20, marginTop:30}}>
                <Image
                  source={require('./Mypage/mypage_privacypolicy.png')}
                  style={{width:25,height:25,resizeMode:'contain'}}  
                />
                <Text style={{fontSize:20, color:'#000000',  fontWeight:'700',marginLeft:15}}>개인정보 처리 방침</Text>
              </View>
              <View style={{flexDirection:'row',alignItems:'center', marginLeft:20, marginTop:30}}>
                <Image
                  source={require('./Mypage/mypage_version.png')}
                  style={{width:25,height:25,resizeMode:'contain'}}  
                />
                <Text style={{fontSize:20, color:'#000000',  fontWeight:'700',marginLeft:15}}>버전 정보</Text>
              </View>

            </View>
      </ScrollView>


      ):(

/*디자이너*/
      <ScrollView contentContainerStyle={{zIndex: 0, backgroundColor: '#FFFFFF', alignItems:'center' ,flex:1}}>
        <View style={{ zIndex:1, height: 175,width:'100%', backgroundColor: '#FFE1E4', alignItems: 'center' }} />
            <Image
              source={{uri : mypageInfo.userImage}}
              style={{ position: 'absolute',top:90, zIndex:2, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', width: 170, height: 170, borderRadius:100, borderWidth:5, borderColor:"#FFFFFF" }}
              resizeMode='cover'
            />
            <View 
              style={{position:'absolute', zIndex:3,top:210,width:170, alignItems:'flex-end'}}
            >
              <TouchableOpacity onPress={() => {navigation.navigate('DesignerEditProfile');}}>
                <Image
                  source={require('./Mypage/edit_button.png')}
                  style={{width:50, height:50, resizeMode:'contain'}}
                />
              </TouchableOpacity>
            </View>
          <View style={{marginTop:100}}>
            <Text style={{fontSize:23, color:'#000000', fontWeight:'bold'}}>{mypageInfo.userName}</Text>
          </View>
{/*아래 애들 4개*/}
        
          <View style={{width:'100%'}}>
            <TouchableOpacity onPress={()=>navigation.navigate('MyFavorites')}>
              <View style={{flexDirection:'row',alignItems:'center', marginLeft:20, marginTop:30}}>
                <Image
                  source={require('./Mypage/mypage_heart.png')}
                  style={{width:25,height:25,resizeMode:'contain'}}  
                />
                <Text style={{fontSize:20, color:'#000000',  fontWeight:'700',marginLeft:15}}>찜 목록</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('DesignerEditCategory')}>
              <View style={{flexDirection:'row',alignItems:'center', marginLeft:20, marginTop:30}}>
                <Image
                  source={require('./Mypage/sharp_icon.png')}
                  style={{width:25,height:25,resizeMode:'contain'}}  
                />
                <Text style={{fontSize:20, color:'#000000',  fontWeight:'700',marginLeft:15}}>내 카테고리</Text>
              </View>
            </TouchableOpacity>
            <View style={{flexDirection:'row',alignItems:'center', marginLeft:20, marginTop:30}}>
              <Image
                source={require('./Mypage/mypage_settings.png')}
                style={{width:25,height:25,resizeMode:'contain'}}  
              />
              <Text style={{fontSize:20, color:'#000000',  fontWeight:'700',marginLeft:15}}>설정</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center', marginLeft:20, marginTop:30}}>
              <Image
                source={require('./Mypage/mypage_privacypolicy.png')}
                style={{width:25,height:25,resizeMode:'contain'}}  
              />
              <Text style={{fontSize:20, color:'#000000',  fontWeight:'700',marginLeft:15}}>개인정보 처리 방침</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center', marginLeft:20, marginTop:30}}>
              <Image
                source={require('./Mypage/mypage_version.png')}
                style={{width:25,height:25,resizeMode:'contain'}}  
              />
              <Text style={{fontSize:20, color:'#000000',  fontWeight:'700',marginLeft:15}}>버전 정보</Text>
            </View>

          </View>
      </ScrollView>


      )}
    </View>

  );
};

export default Mypage;