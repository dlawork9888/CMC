import React,{useState,useEffect,useContext} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Alert} from 'react-native';
import axios from 'axios';
//'http://3.39.131.14:8080/api/v1/members/body-info'

//UserContext
import UserContext from './UserContext';
import APIcontext from './APIcontext';


let receivedCustomerInfo = {
    customerImage:'https://picsum.photos/200/300',
    customerName:'주문자 이름',
    bodyInfo:{
        height:0.0,
        weight:0.0,
        shoulder:0.0,
        chest:0.0,
        waist:0.0,
        hip:0.0,
        thigh:0.0,
        upper:0.0,
        lower:0.0
    }
}

let bodyInfoHanguel ={
    height:"키",
    weight:"몸무게",
    shoulder:"어깨 너비",
    chest:"가슴 둘레",
    waist:"허리 둘레",
    hip:"엉덩이 둘레",
    thigh:"허벅지 둘레",
    upper:"상체 길이",
    lower:"하체 길이"
}


const CustomerEditProfile = ({navigation}) => {

//UserContext
    const userContext = useContext(UserContext);
//APIcontext
    const API_context = useContext(APIcontext);





    useEffect(()=>{
      console.log('CustomerEditProfile Entered');
      console.log('액세스토큰 :', userContext.userContext.accessToken);
      console.log('리프레시토큰 :', userContext.userContext.refreshToken);
    });

//정보 변경을 위한 state
const [customerInfo, setCustomerInfo] = useState(receivedCustomerInfo);

//신체 정보 조회
  const [isInfoFilled, setIsInfoFilled] = useState(true);
  const getBodyInfo = async () => {
    console.log('신체 정보 조회');
    console.log('전송 액세스 토큰:', userContext.userContext.accessToken);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userContext.userContext.accessToken}`
        }
      };
  
      const response = await axios.get(API_context.get_members_bodyinfo, config);
      console.log(response.data);
      // 신체 정보 조회 성공 처리
      setIsInfoFilled(true);
      console.log('IsInfoFilled : true => put 요청');
  
      // bodyInfo 업데이트
      const bodyInfo = response.data.data.sizes;
      setCustomerInfo(prevCustomerInfo => ({
        ...prevCustomerInfo,
        bodyInfo: {
          ...bodyInfo
        }
      }));
    } catch (error) {
      // 신체 정보 조회 실패 처리
      console.log('신체 정보 조회 실패');
      console.error(error);
      console.error('에러 상태 코드:', error.response.status);
      console.error('에러 메시지:', error.response.data);
      if (error.response.status === 400) {
        setIsInfoFilled(false);
        console.log('IsInfoFilled : false => post 요청');
      } 
    }
  };
  useEffect(() => {
    getBodyInfo();
  }, []);


//신체 정보 기입 여부 조회
  const isBodyinfoFilled = async () => {
    console.log('신체정보 기입여부 조회');
    console.log('전송 액세스 토큰:', userContext.userContext.accessToken);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userContext.userContext.accessToken}`
        }
      };

      const response = await axios.get(API_context.get_menbers_bodyinfo_filled, config);
      console.log(response.data);
    } catch (error) {
      console.log('신체 정보 기입 여부 조회 에러')
      console.error(error);
      console.error('에러 상태 코드:', error.response.status);
      console.error('에러 메시지:', error.response.data);
    }
  };
  //isBodyinfoFilled();

//구매자 상세 정보 조회(닉네임 때문에)
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
      console.log('응답 데이터:', response.data.data);
      console.log('상세 정보 조회 성공');

      const { nickname, profileImgUrl  } = response.data.data; // 닉네임 추출

      setCustomerInfo((prevCustomerInfo) => ({
        ...prevCustomerInfo,
        customerName: nickname,
        customerImage: profileImgUrl,
      }));
    } catch (error) {
      console.log('상세 정보 조회 에러');
      console.error(error);
      console.error('에러 상태 코드:', error.response.status);
      console.error('에러 메시지:', error.response.data);
    }
  };
  useEffect(() => {
    getCusInfo();
  }, []);
  




//닉네임 컴포넌트 => 만들기
    const NicknameComponent = ({ nickname, callback }) => {
        const [isChangable, setIsChangable] = useState(false);
        const [nicknameInput, setNicknameInput] = useState(nickname);
      
        const handleNicknameChange = () => {
          setIsChangable(false);
          callback(nicknameInput); // callback 함수를 호출하여 변경된 닉네임을 상위 컴포넌트로 전달
        };
      
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            {isChangable ? (
              <>
                <TextInput
                  style={{ padding: 0, fontSize: 23, color: '#000000' }}
                  value={nicknameInput}
                  onChangeText={setNicknameInput}
                  placeholder="닉네임"
                />
                <TouchableOpacity onPress={handleNicknameChange}>
                  <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 3, paddingHorizontal: 10, backgroundColor: '#000000', borderRadius: 3, marginLeft: 10 }}>
                    <Text style={{ fontSize: 17, fontWeight: '900', color: '#FFFFFF' }}>완료</Text>
                  </View>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={{ fontSize: 23, color: '#000000', fontWeight: 'bold' }}>{nickname}</Text>
                <TouchableOpacity onPress={() => setIsChangable(true)}>
                  <Image
                    source={require('./CustomerEditProfile/edit_pencil.png')}
                    style={{ width: 22, height: 22, resizeMode: 'contain', marginLeft: 10 }}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
        );
      };


    const handleNicknameChange = (nickname) => {
      setCustomerInfo((prev) => ({
        ...prev,
        customerName: nickname
      }));
    };




//신체 정보 Post 요청
    const postBodyInfo = async () => {
        try {
          const response = await axios.post(
            API_context.post_members_bodyinfo,
            {
              sizes: customerInfo.bodyInfo,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userContext.userContext.accessToken}`,
              },
            }
          );
          const receivedData = response.data;
          if (receivedData.isSuccess) {
            console.log('신체 정보 등록 성공');
            Alert.alert(
              '',
              '신체 정보 저장 완료!',
              [
                {
                  text: '확인',
                  onPress : () => {
                    navigation.goBack();
                  }
                },
              ],
              { cancelable: false },
            );
            // 등록에 성공한 경우 추가적인 처리를 수행할 수 있습니다.
          } else {
            console.log('신체 정보 등록 실패');
            console.log(receivedData);
            Alert.alert(
              '',
              '신체 정보 저장 실패!',
              [
                {
                  text: '확인',
                  style:'cancel'
                },
              ],
              { cancelable: false },
            );
            // 등록에 실패한 경우 에러 처리를 수행할 수 있습니다.
          }
        } catch (error) {
          console.error(error);
          Alert.alert(
            '',
            '에러 발생!',
            [
              {
                text: '확인',
                style:'cancel'
              },
            ],
            { cancelable: false },
          );
          // 에러 발생 시 에러 처리를 수행할 수 있습니다.
        }
      };


//신체 정보 Put 요청
    const putBodyInfo = async () => {
      try {
        const response = await axios.put(
          API_context.put_members_bodyinfo,
          {
            sizes: customerInfo.bodyInfo,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userContext.userContext.accessToken}`,
            },
          }
        );
        const receivedData = response.data;
        if (receivedData.isSuccess) {
          console.log('신체 정보 등록 성공');
          Alert.alert(
            '',
            '신체 정보 저장 완료!',
            [
              {
                text: '확인',
                onPress : () => {
                  navigation.goBack();
                }
              },
            ],
            { cancelable: false },
          );
          // 등록에 성공한 경우 추가적인 처리를 수행할 수 있습니다.
        } else {
          console.log('신체 정보 등록 실패');
          console.log(receivedData);
          Alert.alert(
            '',
            '신체 정보 저장 실패!',
            [
              {
                text: '확인',
                style:'cancel'
              },
            ],
            { cancelable: false },
          );
          // 등록에 실패한 경우 에러 처리를 수행할 수 있습니다.
        }
      } catch (error) {
        console.error(error);
        Alert.alert(
          '',
          '에러 발생!',
          [
            {
              text: '확인',
              style:'cancel'
            },
          ],
          { cancelable: false },
        );
        // 에러 발생 시 에러 처리를 수행할 수 있습니다.
      }
    };





      
      

  const handleBodyInfoChange = (key, value) => {
    setCustomerInfo((prev) => ({
      ...prev,
      bodyInfo: {
        ...prev.bodyInfo,
        [key]: value,
      },
    }));
  };

  return (
    <ScrollView contentContainerStyle={{zIndex: 0, backgroundColor: '#FFFFFF', alignItems:'center'}}>
        <View style={{ zIndex:1, height: 175,width:'100%', backgroundColor: '#FFE1E4', alignItems: 'center' }}>
            <View style={{width:'100%',flexDirection:'row', height:60,justifyContent:'space-between', alignItems:'center'}}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image
                        source={require('./OrdererInformation/header_back_icon.png')}
                        style={{width:49, height:42}}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  if (isInfoFilled) {
                    // isInfoFilled이 true인 경우에 수행할 작업
                    putBodyInfo();
                  } else {
                    // isInfoFilled이 false인 경우에 수행할 작업
                    postBodyInfo();
                  }
                }}>
                    <Text style={{fontSize:21,color:'#000000',paddingHorizontal:15}}>
                        저장
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{ position: 'absolute',top:90, zIndex:2, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', width: 170, height: 170, borderRadius:100 }}>
            <Image
                source={{uri : customerInfo.customerImage}}
                style={{width:160,height:160, borderRadius:100}}
                resizeMode='cover'
            />
        </View>
        <View style={{marginTop:100}}>
            <NicknameComponent nickname={customerInfo.customerName} callback={handleNicknameChange}/>
        </View>
{/*신체정보*/}
        <View style={{width:'100%',paddingHorizontal:20,marginTop:20}}>
            {Object.keys(customerInfo.bodyInfo).map((key) => {
                return (
                    <View 
                        key={key}
                        style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center', borderWidth:1, borderColor:'#D6D6DC',borderRadius:10,padding:20,marginBottom:20}}
                    >
                        <Text style={{fontSize:20,fontWeight:'bold', color:'#000000'}}>{bodyInfoHanguel[key]}</Text>
                        <TextInput
                            style={{fontSize:20, color:'#000000', marginRight:50, padding:0}}
                            value={customerInfo.bodyInfo[key].toString()}
                            onChangeText={(value) => handleBodyInfoChange(key, value)}
                        />
                    </View>
                );
            })}
        </View>
{/*값이 잘 바뀌는지 확인용 */}

{/*나중에 싹다 날리면 됨 
<Text style={{fontSize:30}}>값 바뀌는지 확인용</Text>
        <View style={{width:'100%',paddingHorizontal:20,marginTop:20}}>
            {Object.keys(customerInfo.bodyInfo).map((key) => {
                return (
                    <View 
                        key={key}
                        style={{flexDirection:'row',justifyContent:'space-between', borderWidth:1, borderColor:'#D6D6DC',borderRadius:10,padding:20,marginBottom:20}}
                    >
                        <Text style={{fontSize:20,fontWeight:'bold', color:'#000000'}}>{bodyInfoHanguel[key]}</Text>
                        <Text style={{fontSize:20, color:'#000000',marginRight:50}}>{customerInfo.bodyInfo[key]}</Text>
                    </View>
                );
            })}
        </View>

*/}
    </ScrollView>

  );
};

export default CustomerEditProfile;