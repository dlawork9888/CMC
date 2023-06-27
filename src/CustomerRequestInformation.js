import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity,Image, Modal } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
//UserContext
import UserContext from './UserContext';

//SampleData(단일)
let sample_requestInfo = {
    requestName : '스웨이드 로즈 니트',
    ordererImage : 'https://picsum.photos/200/300',
    ordererName : '김찬우',
    category : '상의',
    subcategory : '니트',
    lowestPrice : 50000,
    highestPrice : 100000,
    requestOption : 'This is a long text that needs to wrap to the next line when it reaches the end of the parent view.',
    references : [
        'https://picsum.photos/200/300',
        'https://picsum.photos/200/300',

    ],
    accepted:'REQUESTING',
    customResultId: -1,
}
const CustomerRequestInformation = ({navigation}) => {
    //UserContext
    const userContext = useContext(UserContext);
    console.log("RequestInformation Page Entered. UserType : ", userContext.userContext.userType);
    console.log("Now Clicked Custom's ID :", userContext.userContext.clickedCustomId)

    //렌더링 정보 
    const [requestInfo, setRequestInfo] = useState(sample_requestInfo);

    //승인/거절 누르면 나오는 모달 창 컨트롤 State
    //const [modalVisible, setModalVisible] = useState(false);

    const getRequestInfo = async () => {
        try {
          const response = await axios.get(`http://3.39.131.14:8080/api/v1/members/custom/${userContext.userContext.clickedCustomId}/detail`, {
            headers: {
              'Accept': '*/*',
              'Authorization': `Bearer ${userContext.userContext.accessToken}`
            }
          });
      
          const data = response.data.data;
          console.debug(data);
          const formattedData = {
            requestName: data.title,
            ordererImage: data.customReferenceImgs[0],
            category: data.highCategory,
            subcategory: data.lowCategory,
            lowestPrice: data.desiredPrice,
            //highestPrice: null
            requestOption: data.requirement,
            references: data.customReferenceImgs,
            accepted: data.accepted,
            customResultId: data.customResultId,
          };
          console.debug('포맷 데이터 :', formattedData);
          setRequestInfo(formattedData);
        } catch (error) {
          console.error(error);
        }
      };
      
      
      useEffect(() => {
        getRequestInfo();
      }, []);

      useEffect(()=>{
        if(requestInfo.accepted === "REFUSAL"){
            getRejectResult();
        } else if (requestInfo.accepted === "APPROVAL") {
            getApprovalResult();
        }
      },[requestInfo])




      const [ rejectResult, setRejectResult ] = useState(
        {
            customResultId: -1, 
            message: ""
        }
        ); 
//거절 정보 get 요청 함수
      const getRejectResult = async () => {
        try {
          const response = await axios.get(`http://3.39.131.14:8080/api/v1/members/custom/${userContext.userContext.clickedCustomId}/custom-result/${requestInfo.customResultId}/rejection`, {
            headers: {
              'Accept': '*/*',
              'Authorization': `Bearer ${userContext.userContext.accessToken}`
            }
          });
          const data = response.data.data;
          console.debug('거절 데이터 :',data);
          const formattedData = {
            customResultId: data.customResultId,
            message: data.message
          }
          console.debug('거절 포멧 데이터 :',formattedData);
          setRejectResult(formattedData);
        } catch (error) {
          console.error(error.data);
        }
      };







//거절 모달 컨트롤 State
      const [rejectModalVisible, setRejectModalVisible] = useState(false);


      const [ApprovalResult, setApprovalResult] = useState()
//승인 정보 get 요청 함수
const getApprovalResult = async () =>{
    try {
        const response = await axios.get(`http://3.39.131.14:8080/api/v1/members/custom/${userContext.userContext.clickedCustomId}/custom-result/${requestInfo.customResultId}/acceptance`, {
          headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${userContext.userContext.accessToken}`
          }
        });
        const data = response.data.data;
        console.debug('승인데이터 :',data);

      } catch (error) {
        console.error(error);
      }
    };
      










/*렌더링 파트*/
    return (
    <View style={{flex:1,backgroundColor:'#FFFFFF'}}>
{/*헤더*/}
    <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center', backgroundColor:'#FFFFFF', height:60}} >
      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Image
          source={require('./App/header_back_icon.png')}
          style={{width:49,height:42, resizeMode:'contain'}}
        />
      </TouchableOpacity>
      <Text style={{fontSize:20,color:'#000000'}}>요청 정보</Text>
      <View style={{width:49,height:42,marginRight:10}}></View>
    </View>



    <ScrollView style={{backgroundColor:'#FFFFFF'}}>
{/*요청 상태*/}
    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginHorizontal:15,marginTop:30}}>
        <Text style={{fontSize:25, color:'#000000'}}>요청 상태</Text>
        <TouchableOpacity 
            style={{ 
                backgroundColor:requestInfo.accepted === 'APPROVAL'? '#A3F1B4':'#FF5160', 
                alignItems:'center',
                justifyContent:'center', 
                borderRadius:5
                }}
                onPress={() => {
                    if (requestInfo.accepted === 'REFUSAL') {
                        //setRejectModalVisible(true);
                    } else if (requestInfo.accepted === 'APPROVAL') {
                        userContext.setCurrentCustomResultId(requestInfo.customResultId)
                        navigation.navigate('CustomerRequestApproval');
                    } else if (requestInfo.accepted === 'APPROVAL') {

                    }
                  }}
        >
            <Text style={{color: '#FFFFFF',fontSize:15,fontWeight:700,marginHorizontal:10, marginVertical:3}}>
                {requestInfo.accepted === 'REQUESTING' ? 
                    (
                        '요청중'
                    ) : (
                        requestInfo.accepted === 'REFUSAL' ?
                        (
                            '거절됨'
                        ):(
                            '승인됨'
                        )
                    )
                }
            </Text>
        </TouchableOpacity>
    </View>
{/*거절 사유*/}
    { requestInfo.accepted === 'REFUSAL' ? (
        <View style={{backgroundColor: '#FF5160', marginHorizontal:15,paddingHorizontal:10,paddingVertical:7, marginVertical:5, borderRadius:5}}>
            <Text style={{fontSize:15, fontWeight:800, color:'#FFFFFF'}}>거절 사유</Text>
            <Text style={{fontSize:15, fontWeight:500, color:'#FFFFFF', marginTop:2}}>{rejectResult.message}</Text>
        </View>
        ):(<></>)
    }
{/*제목*/}
      <View style={{flexDirection:'column', marginHorizontal:15,marginTop:20}}>
        <Text style={{fontSize:25, color:'#000000'}}>제목</Text>
        <Text style={{marginTop:15, color: '#000000',fontSize:15}}>
            {requestInfo.requestName}
        </Text>
      </View>
{/*요청자 정보
        <View style={{flexDirection:'column', marginHorizontal:15,marginTop:30}}>
            <Text style={{fontSize:25, color:'#000000'}}>요청자 정보</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('OrdererInformation')}>
                <View style={{flexDirection:'row', alignItems:'center',marginTop:15}}>
                    <Image
                        source = {{ uri : requestInfo.ordererImage }}
                        style = {{width:40, aspectRatio : 1, borderRadius:20}}
                    />
                    <Text style={{fontSize:17, marginLeft:10,color:'#000000'}}>{requestInfo.ordererName}</Text>
                </View>
            </TouchableOpacity>
        </View>
*/}



{/*카테고리*/}
      <View style={{flexDirection:'column', marginHorizontal:15,marginTop:30}}>
        <Text style={{fontSize:25, color:'#000000'}}>카테고리</Text>
        <View style={{flexDirection:'row'}}>
            <Text style={{marginTop:15,marginLeft:5, color: '#000000',fontSize:15, fontWeight:900}}>
                대분류
            </Text>
            <Text style={{marginTop:15, color: '#000000',fontSize:15, marginLeft:15}}>
                {requestInfo.category}
            </Text>
        </View>
        <View style={{flexDirection:'row'}}>
            <Text style={{marginTop:15,marginLeft:5, color: '#000000',fontSize:15, fontWeight:900}}>
                소분류
            </Text>
            <Text style={{marginTop:15, color: '#000000',fontSize:15, marginLeft:15}}>
                {requestInfo.subcategory}
            </Text>
        </View>
      </View>
{/*희망 가격*/}
      <View style={{flexDirection:'column', marginHorizontal:15,marginTop:30}}>
        <Text style={{fontSize:25, color:'#000000'}}>희망가격</Text>
        <View style={{flexDirection:'row'}}>
            <View style={{marginLeft:15,borderBottomWidth:1}}>
                <Text style={{marginTop:15, color: '#000000',fontSize:15, marginLeft:15, paddingBottom:3}}>
                    {requestInfo.lowestPrice}원
                </Text>
            </View>
            {/*
            <Text style={{marginTop:15, color: '#000000',fontSize:15, marginLeft:15, paddingBottom:3, borderBottomColor:'#00000000',borderBottomWidth:1}}>
                ~
            </Text>
            <Text style={{marginTop:15, color: '#000000',fontSize:15, marginLeft:15, paddingBottom:3, borderBottomColor:'#000000',borderBottomWidth:1}}>
                {sampleRequestInfo.highestPrice}원
            </Text>
            */}
        </View>
      </View>
{/*요청 사항*/}
      <View style={{flexDirection:'column', marginHorizontal:15,marginTop:30}}>
        <Text style={{fontSize:25, color:'#000000'}}>요청사항</Text>
        <View style={{flex:1,minHeight:40, borderWidth:3,borderColor:'#9A9A9A30',padding:8, marginTop:15, borderRadius:5}}>
            <Text style={{flexWrap:'wrap', color:'#000000',fontSize:15,lineHeight:20}}>
                {requestInfo.requestOption}
            </Text>
        </View>
      </View>
{/*레퍼런스*/}
      <View style={{flexDirection:'column', marginHorizontal:15,marginTop:15,marginBottom: 50}}>
        <Text style={{fontSize:25, color:'#000000'}}>레퍼런스</Text>
        <ScrollView 
            horizontal={true}
            scrollEnabled={true}
        >
            {requestInfo.references.map((reference, index) => (
                <View key={index} style={{width: 100, height: 100, marginRight: 10}}>
                    <Image source={{uri: reference}} style={{flex: 1, width: undefined, height: undefined}} resizeMode="cover" />
                </View>
            ))}
        </ScrollView>
      </View>
      {/*권한 요청 필요. 추후 작성 예정*/}
    </ScrollView>
    
    
    
    <Modal 
        visible={rejectModalVisible}
        animationType="fade"
        transparent={true}
    >   
        <View style={{flex:1,backgroundColor:'#00000080'}}> 
            <TouchableOpacity
                onPress={()=>setRejectModalVisible(false)}
            >
                <Text style={{fontSize:20,color:'#000000'}}>닫기</Text>
            </TouchableOpacity>
        </View>
    </Modal>


{/*승인/거절 누르면 나오는 모달
        <Modal 
            visible={modalVisible}
            animationType="fade"
            transparent={true}
        >
            <View style={{flex:1,backgroundColor:'#00000080'}}> 

                <View style={{backgroundColor:'#FFFFFF',flex:1, marginVertical:250, marginHorizontal:60, paddingBottom:5, borderRadius:5}}>
                    <TouchableOpacity 
                        onPress={()=>{
                            navigation.navigate('RequestApproval');
                            setModalVisible(false);
                        }}
                        style={{backgroundColor:'#FF5160', flex:1, alignItems:'center', justifyContent:'center', marginTop:5, marginHorizontal:5, borderRadius:5}}
                    >
                        <Text style={{fontSize:20,color:'#FFFFFF'}}>승인</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={()=>{
                            navigation.navigate('RequestReject');
                            setModalVisible(false);
                        }}
                        style={{backgroundColor:'#FF5160', flex:1, alignItems:'center', justifyContent:'center', marginTop:5, marginHorizontal:5, borderRadius:5}}
                    >
                        <Text style={{fontSize:20,color:'#FFFFFF'}}>거절</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={()=>setModalVisible(false)}
                        style={{backgroundColor:'#9A9A9A', flex:1, alignItems:'center', justifyContent:'center', marginTop:5, marginHorizontal:5, borderRadius:5}}
                    >
                        <Text style={{fontSize:20,color:'#FFFFFF'}}>닫기</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
*/}


    </View>
  );
};


export default CustomerRequestInformation;
