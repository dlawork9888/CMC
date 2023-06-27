import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert} from 'react-native';


const ProductRegistration = ({navigation}) => {

  return (
    <View style={{ flex: 1, backgroundColor:'#FFFFFF'}}>
{/*헤더*/}
        <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center', backgroundColor:'#FFFFFF', height:60}} >
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Image
                    source={require('./App/header_back_icon.png')}
                    style={{width:49,height:42, resizeMode:'contain'}}
                />
            </TouchableOpacity>
            <Text style={{fontSize:20,color:'#000000'}}>상품 등록</Text>
            <View style={{width:49,height:42,marginRight:10}}></View>
        </View>

        <ScrollView>
        
        </ScrollView>

{/*하단 탭 */}
        <View style={{flexDirection:'row',alignItems:'center', height:80,borderTopColor:'#9A9A9A50', borderTopWidth:1}}>
            <TouchableOpacity
            style={{flex:1}} 
            onPress={()=>{
                Alert.alert(
                '상품 등록 완료!',
                '상품 상세 페이지로 이동합니다',
                [
                    {
                    text: '취소',
                    onPress: () => console.log('Product Registration Canceled'),
                    style: 'cancel',
                    },
                    {
                    text: '확인',
                    onPress: () => {
                        console.log('Product Registration Completed');
                        navigation.navigate('Home')
                    },
                    },
                ],
                {cancelable: false},
                );
            }}
            >
            <View style={{height:50,backgroundColor:'#FF5160',marginHorizontal:15,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                <Text style={{fontSize:17,color:'#FFFFFF'}}>상품 등록</Text>
            </View>
            </TouchableOpacity>
        </View>



    </View>
  );
};

export default ProductRegistration