import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';


let ordererInfo = {
    ordererImage:'https://picsum.photos/200/300',
    ordererName:'주문자 이름',
    bodyInfo:{
        height:170.0,
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


const OrdererInformation = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={{zIndex: 0, backgroundColor: '#FFFFFF', alignItems:'center'}}>
        <View style={{ zIndex:1, height: 175,width:'100%', backgroundColor: '#FFE1E4', alignItems: 'center' }}>
            <View style={{width:'100%', height:60,justifyContent:'center'}}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image
                        source={require('./OrdererInformation/header_back_icon.png')}
                        style={{width:49, height:42}}
                    />
                </TouchableOpacity>
            </View>
        </View>
        <View style={{ position: 'absolute',top:90, zIndex:2, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', width: 170, height: 170, borderRadius:100 }}>
            <Image
                source={{uri : ordererInfo.ordererImage}}
                style={{width:160,height:160, borderRadius:100}}
                resizeMode='cover'
            />
        </View>
        <View style={{marginTop:100}}>
            <Text style={{fontSize:23, color:'#000000', fontWeight:'bold'}}>{ordererInfo.ordererName}</Text>
        </View>
{/*신체정보*/}
        <View style={{width:'100%',paddingHorizontal:20,marginTop:20}}>
        {Object.keys(ordererInfo.bodyInfo).map((key) => {
            return (
                <View 
                    key={key}
                    style={{flexDirection:'row',justifyContent:'space-between', borderWidth:1, borderColor:'#D6D6DC',borderRadius:10,padding:20,marginBottom:20}}
                >
                    <Text style={{fontSize:20,fontWeight:'bold', color:'#000000'}}>{bodyInfoHanguel[key]}</Text>
                    <Text style={{fontSize:20, color:'#000000',marginRight:50}}>{ordererInfo.bodyInfo[key]}</Text>
                </View>
            );
        })}
        </View>
    </ScrollView>

  );
};

export default OrdererInformation;