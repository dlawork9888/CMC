import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView,Text, TouchableOpacity,Image, TextInput, Alert } from 'react-native';
import axios from 'axios';
import UserContext from './UserContext';
import APIcontext from './APIcontext';



const RequestReject = ({navigation}) => {
//Context
 const userContext = useContext(UserContext);
 const API_context = useContext(APIcontext);
 console.log("RequestReject Entered" );
 console.log("Now Clicked CustomID :", userContext.userContext.clickedCustomId)

  //거절 사유 state
  const [ rejectReason, setRejectReason ] = useState('');

  //거절 POST 요청 함수
  const rejectCustomRequest = async () => {
    try {
      const response = await axios.post(
        `http://3.39.131.14:8080/api/v1/designers/custom/${userContext.userContext.clickedCustomId}/rejection`,
        { message: rejectReason },      //request body
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
        '요청 거절 완료!',
        '요청 거절 사유를 전달했어요!\n스토어 센터로 이동합니다.',
        [
            {
            text: '확인',
            onPress: () => {
                console.log('Request Reject Delivery Completed');
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
    <View style={{flex:1, backgroundColor:'#FFFFFF'}}>

{/*헤더*/}
        <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center', backgroundColor:'#FFFFFF', height:60}} >
        <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Image
                source={require('./App/header_back_icon.png')}
                style={{width:49,height:42, resizeMode:'contain'}}
            />
        </TouchableOpacity>
            <Text style={{fontSize:20,color:'#000000'}}>요청 거절</Text>
            <View style={{width:49,height:42,marginRight:10}}></View>
        </View>
{/* 거절 사유 */}
        <ScrollView>
            <View style={{flexDirection:'column', marginHorizontal:15,marginTop:20}}>
                <Text style={{fontSize:25, color:'#000000'}}>거절 사유</Text>
                <TextInput
                style={{borderColor:'#000000', borderWidth:2, borderColor:'#C7C7C7', borderRadius:5,marginVertical:5, padding:10, marginTop:20}}
                placeholder="거절 사유를 입력해주세요"
                multiline={true}
                textAlignVertical='top'
                numberOfLines={4}
                onChangeText={setRejectReason}
                value={rejectReason}
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
                '요청을 거절하시겠어요?',
                [
                    {
                    text: '취소',
                    onPress: () => console.log('Request Reject Delivery Canceled'),
                    style: 'cancel',
                    },
                    {
                    text: '확인',
                    onPress: () => {
                        rejectCustomRequest();
                    },
                    },
                ],
                {cancelable: false},
                );
            }}
            >
            <View style={{height:50,backgroundColor:'#FF5160',marginHorizontal:15,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                <Text style={{fontSize:17,color:'#FFFFFF'}}>요청 거절</Text>
            </View>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default RequestReject;


/*
Alert.alert(
                '',
                '요청 거절 사유를 전달했어요!\n스토어 센터로 이동합니다.',
                [
                    {
                    text: '취소',
                    onPress: () => console.log('Request Reject Delivery Canceled'),
                    style: 'cancel',
                    },
                    {
                    text: '확인',
                    onPress: () => {
                        console.log('Request Reject Delivery Completed');
                        navigation.navigate('StoreCenter')
                    },
                    },
                ],
                {cancelable: false},
                );
*/