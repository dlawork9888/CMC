import React,{useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker'
import {PermissionsAndroid} from 'react-native';
import axios from 'axios';

//UserContext
import UserContext, { UserContextProvider } from './UserContext';
import APIcontext from './APIcontext';


let desingerInfo = {
    designerImage:'https://picsum.photos/200/300',
    designerName:'사용자 이름',
};

const DesignerEditProfile = ({navigation}) => {

  //UserContext
  const userContext = useContext(UserContext)
//API context
  const API_context = useContext(APIcontext);

  const [userInfo , setUserInfo] = useState(desingerInfo);
  const [desingerExplanation, setDesignerExplanation ] = useState('');
  

  console.log("DesignerEidtProfile entered")
  console.log("UserType :",userContext.userContext.userType)

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
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        designerName: designerInfo.name,
        designerImage: designerInfo.profileImgUrl,
      }));
      setDesignerExplanation(designerInfo.introduce === null ? '': designerInfo.introduce);
    } catch (error) {
      console.error('디자이너 간단정보 조회 실패');
      console.error(error);
      console.error('에러 상태 코드:', error.response.status);
      console.error('에러 메시지:', error.response.data);
    }
  };
  useEffect(()=>{
    getDesignerInfo(userContext.userContext.userId);
  },[]);
  


  const handleImagePicker = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        privateDirectory: true
      },
    };
  
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
  
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.assets[0].uri };
        console.log('선택한 이미지 uri 경로',source.uri);
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          designerImage: source.uri,
        }));
      }
    });
  };
  



  return (
    <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
        <ScrollView contentContainerStyle={{zIndex: 0, backgroundColor: '#FFFFFF', alignItems:'center', paddingBottom:70}}>

            <View style={{ zIndex:1, height: 175,width:'100%', backgroundColor: '#FFE1E4', alignItems: 'center' }}>
                <View style={{width:'100%',flexDirection:'row', height:60,justifyContent:'space-between', alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                        <Image
                            source={require('./DesignerEditProfile/header_back_icon.png')}
                            style={{width:49, height:42}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleImagePicker}>
                        <Text style={{fontSize:21,color:'#000000',paddingHorizontal:15}}>
                            저장
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ position: 'absolute',top:90, zIndex:2, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', width: 170, height: 170, borderRadius:100 }}>
                <TouchableOpacity onPress={handleImagePicker}>
                    <Image
                        source={{uri : userInfo.designerImage}}
                        style={{width:160,height:160, borderRadius:100}}
                        resizeMode='cover'
                    />
                </TouchableOpacity>
            </View>
            <View style={{marginTop:100}}>
                <Text style={{fontSize:23, color:'#000000', fontWeight:'bold'}}>{userInfo.designerName}</Text>
            </View>

            <View style={{width:'100%',paddingHorizontal:20}}>
                <Text style={{fontSize:25, color:'#000000'}}>자기 소개</Text>
                <TextInput
                    style={{borderColor:'#000000', borderWidth:2, borderColor:'#C7C7C7', borderRadius:5,marginVertical:5, padding:10, marginTop:20}}
                    placeholder="자기 소개를 입력해주세요"
                    multiline={true}
                    textAlignVertical='top'
                    numberOfLines={4}
                    onChangeText={setDesignerExplanation}
                    value={desingerExplanation}
                />
            </View>
        </ScrollView>
    </View>

  );
};

export default DesignerEditProfile;