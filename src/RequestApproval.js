import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity,Image, Alert, Platform  } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
//UserContext
import UserContext from './UserContext';
import APIcontext from './APIcontext';

//예상기간, 예상견적, 전달사항


const RequestApproval = ({navigation}) => {

//UserContext
const userContext=useContext(UserContext);
const API_context=useContext(APIcontext);
console.log("RequestAPproval Page Entered. UserType : ", userContext.userContext.userType);








//예상 견적 state
  const [expectedPrice, setExpectedPrice] = useState('');

//예상 기간 state
  const [startDay, setStartDay] = useState(new Date());
  const [show_dp_s, set_show_dp_s] = useState(false);

  const openDatePicker_s = () => {
    set_show_dp_s(true);
  };

  const handleDateChange_s = (event, date) => {
    set_show_dp_s(false);
    if (date){
      setStartDay(date);
    } 
  };


  const [finishDay, setFinishDay] = useState(new Date());
  const [show_dp_f, set_show_dp_f] = useState(false);
  const openDatePicker_f = () => {
    set_show_dp_f(true);
  };

  const handleDateChange_f = (event, date) => {
    set_show_dp_f(false);
    if (date){
      setFinishDay(date);
    } 
  };

  const dateTransform = (date) => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const transformedDate = date.getFullYear().toString() +'-'+ month +'-'+ day;
    return transformedDate;
  };

//요청사항 state
  const [requestOption, setRequestOption] = useState('');

//승인 POST 요청 함수
const AcceptCustomRequest = async () => {
  try {
    const response = await axios.post(
      `http://3.39.131.14:8080/api/v1/designers/custom/${userContext.userContext.clickedCustomId}/acceptance`,
      {
        expectStartDate: dateTransform(startDay),
        expectEndDate: dateTransform(finishDay),
        expectPrice: parseInt(expectedPrice),
        message: requestOption
      },                                        //request body
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userContext.userContext.accessToken}`,
        },
      }
    );
    console.log(response);
    console.log(response.data);
    Alert.alert(
      '요청 승인 완료!',
      '요청을 승인했어요!\n스토어 센터로 이동합니다.',
      [
          {
          text: '확인',
          onPress: () => {
              console.log('Request Approval Completed');
              navigation.navigate('StoreCenter')
          },
          },
      ],
      {cancelable: false},
      );


  } catch (error) {
    console.error(error);
  }
};

  

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
      <Text style={{fontSize:20,color:'#000000'}}>요청 승인</Text>
      <View style={{width:49,height:42,marginRight:10}}></View>
    </View>
    <ScrollView style={{backgroundColor:'#FFFFFF'}}>
{/*예상 기간*/}
      <View style={{flexDirection:'column', marginHorizontal:15,marginTop:20}}>
        <Text style={{fontSize:25, color:'#000000'}}>예상 기간</Text>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          
          <TouchableOpacity
            style={{flex:1, alignItems:'flex-end',justifyContent:'center',borderBottomColor: '#000000', borderBottomWidth: 1,height:40,}}
            onPress ={openDatePicker_s}
          >            
            <Text style={{marginRight:10,fontSize:15}}>
              {startDay.getFullYear()}년 {startDay.getMonth()+1}월 {startDay.getDate()}일
            </Text>
          </TouchableOpacity>
          {
            show_dp_s && (
              <DateTimePicker
                value={startDay}
                mode='date'
                display='default'
                onChange={handleDateChange_s}
              />
            )
          }
          {/*
          <TextInput
            style={{
              flex:1,
              fontSize:15,
              height: 40,
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
              marginVertical: 5,
            }}
            placeholder='OOOO년 O월 OO일'
            textAlign='right'
            onChangeText={text => setStartDay(text)}
            value={startDay}
          />
          */}


          <Text style={{fontSize:20, color:'#000000'}}>  ~  </Text>
          
          <TouchableOpacity 
            style={{flex:1, alignItems:'flex-end',justifyContent:'center',borderBottomColor: '#000000', borderBottomWidth: 1,height:40,}}
            onPress = {openDatePicker_f}
          >
            <Text style={{marginRight:10,fontSize:15}}>
              {finishDay.getFullYear()}년 {finishDay.getMonth()+1}월 {finishDay.getDate()}일
            </Text>
          </TouchableOpacity>
          {
            show_dp_f && (
              <DateTimePicker
                value={finishDay}
                mode='date'
                display='default'
                onChange={handleDateChange_f}
              />
            )
          }


          {/*
          <TextInput
            style={{
              flex:1,
              fontSize:15,
              height: 40,
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
              marginVertical: 5,
            }}
            placeholder='OOOO년 O월 OO일'
            textAlign='right'
            onChangeText={text => setFinishDay(text)}
            value={finishDay}
          />
          */}
        </View>
      </View>
{/*예상 견적*/}
      <View style={{flexDirection:'column', marginHorizontal:15,marginTop:20}}>
        <Text style={{fontSize:25, color:'#000000'}}>예상 견적</Text>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <TextInput
            style={{
              flex:1,
              fontSize:15,
              height: 40,
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
              marginVertical: 5,
            }}
            placeholder='0'
            textAlign='right'
            keyboardType='numeric'
            onChangeText={text => setExpectedPrice(text.replace(/[^0-9]/g, ''))}
            value={expectedPrice}
          />
          <Text style={{fontSize:18,color:'#000000'}}>원</Text>
          
        </View>
      </View>
{/*전달 사항*/}
      <View style={{flexDirection:'column', marginHorizontal:15,marginTop:20}}>
        <Text style={{fontSize:25, color:'#000000'}}>전달사항</Text>
        <TextInput
          style={{borderColor:'#000000', borderWidth:1, borderRadius:5,marginVertical:5, padding:10}}
          placeholder="전달 사항을 입력해주세요"
          multiline={true}
          textAlignVertical='top'
          numberOfLines={4}
          onChangeText={setRequestOption}
          value={requestOption}
        />
      </View>

    </ScrollView>
{/*하단 탭*/}
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
    </View>
  );
};

export default RequestApproval;

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