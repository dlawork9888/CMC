import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity,Image, Alert, Platform  } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
//UserContext
import UserContext from './UserContext';
import APIcontext from './APIcontext';

//예상기간, 예상견적, 전달사항


const CustomerRequestApproval = ({navigation}) => {

//UserContext
const userContext=useContext(UserContext);
const API_context=useContext(APIcontext);
console.log("CustomerRequestAPproval Page Entered. UserType : ", userContext.userContext.userType);
console.log("Custom Id :", userContext.userContext.clickedCustomId);
console.log('CustomResult ID : ', userContext.userContext.currentCustomResultId);







//예상 견적 state
  const [expectedPrice, setExpectedPrice] = useState('');

//예상 기간 state
  const [startDay, setStartDay] = useState('OOOO년OO월OO일');
  const [finishDay, setFinishDay] = useState('OOOO년OO월OO일');




//요청사항 state
  const [requestOption, setRequestOption] = useState('');


//승인 정보 get 요청 함수  
const getApprovalResult = async () =>{
  try {
      const response = await axios.get(`http://3.39.131.14:8080/api/v1/members/custom/${userContext.userContext.clickedCustomId}/custom-result/${userContext.userContext.currentCustomResultId}/acceptance`, {
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${userContext.userContext.accessToken}`
        }
      });
      const data = response.data.data;
      console.debug('승인데이터 :',data);
      setStartDay(data.expectStartDate);
      setFinishDay(data.expectEndDate);
      setExpectedPrice(data.desiredPrice);
      setRequestOption(data.message);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(()=>{
    getApprovalResult();
  },[]);
  

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
      <Text style={{fontSize:20,color:'#000000'}}>디자이너 메시지</Text>
      <View style={{width:49,height:42,marginRight:10}}></View>
    </View>
    <ScrollView style={{backgroundColor:'#FFFFFF'}}>
{/*예상 기간*/}
      <View style={{flexDirection:'column', marginHorizontal:15,marginTop:20}}>
        <Text style={{fontSize:25, color:'#000000'}}>예상 기간</Text>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          
          <TouchableOpacity
            style={{flex:1, alignItems:'flex-end',justifyContent:'center',borderBottomColor: '#000000', borderBottomWidth: 1,height:40,}}
          >            
            <Text style={{marginRight:10,fontSize:15,color:'#000000'}}>
              {startDay.slice(0,4)}년 {startDay.slice(5,7)}월 {startDay.slice(8,10)}일
            </Text>
          </TouchableOpacity>


          <Text style={{fontSize:20, color:'#000000'}}>  ~  </Text>
          
          <TouchableOpacity 
            style={{flex:1, alignItems:'flex-end',justifyContent:'center',borderBottomColor: '#000000', borderBottomWidth: 1,height:40,}}
          >
            <Text style={{marginRight:10,fontSize:15,color:'#000000'}}>
              {finishDay.slice(0,4)}년 {finishDay.slice(5,7)}월 {finishDay.slice(8,10)}일
            </Text>
          </TouchableOpacity>

        </View>
      </View>
{/*예상 견적*/}
      <View style={{flexDirection:'column', marginHorizontal:15,marginTop:20}}>
        <Text style={{fontSize:25, color:'#000000'}}>예상 견적</Text>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text
            style={{
              flex:1,
              fontSize:15,
              height: 40,
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
              marginVertical: 5,
              textAlign:'right',
              textAlignVertical:'center',
              paddingHorizontal:10,
              color:'#000000'
            }}
          >
            {expectedPrice}
          </Text>
          <Text style={{fontSize:18,color:'#000000'}}>원</Text>
          
        </View>
      </View>
{/*전달 사항*/}
      <View style={{flexDirection:'column', marginHorizontal:15,marginTop:20}}>
        <Text style={{fontSize:25, color:'#000000'}}>전달사항</Text>
          <Text
            style={{borderColor:'#000000', borderWidth:1, borderRadius:5,marginVertical:5, padding:10, color:'#000000'}}
          >
            {requestOption}
          </Text>
      </View>

    </ScrollView>

{/*하단 탭
      <View style={{flexDirection:'row',alignItems:'center', height:80,borderTopColor:'#9A9A9A50', borderTopWidth:1}}>
        <TouchableOpacity
          style={{flex:1}} 
          onPress={()=>{
            Alert.alert(
              '',
              '요청을 승인할까요?',
              [
                {
                  text: '취소',
                  onPress: () => console.log('Request Approval Delivery Canceled'),
                  style: 'cancel',
                },
                {
                  text: '확인',
                  onPress: () => {
                    //
                    console.debug('예상 기간 시작 날짜 :',dateTransform(startDay));
                    console.debug('예상 기간 종료 날짜 :',dateTransform(finishDay));
                    console.debug('예상 견적 :', parseInt(expectedPrice));
                    console.debug('전달 사항 :', requestOption);
                    AcceptCustomRequest();
                  },
                },
              ],
              {cancelable: false},
            );
          }}
        >
          <View style={{height:50,backgroundColor:'#FF5160',marginHorizontal:15,alignItems:'center',justifyContent:'center',borderRadius:5}}>
              <Text style={{fontSize:17,color:'#FFFFFF'}}>요청 승인 및 상세 견적 전달</Text>
          </View>
        </TouchableOpacity>
      </View>
      */}






    </View>

  );
};

export default CustomerRequestApproval;

/*
            Alert.alert(
              '전달 완료!',
              '제작 기간, 예상 견적, 전달 사항을 전달했어요!\n스토어 센터로 이동합니다.',
              [
                {
                  text: '취소',
                  onPress: () => console.log('Request Approval Delivery Canceled'),
                  style: 'cancel',
                },
                {
                  text: '확인',
                  onPress: () => {
                    console.log('Request Approval Delivery Completed');
                    navigation.navigate('StoreCenter')
                  },
                },
              ],
              {cancelable: false},
            );
*/