import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';


//SampleData
let product = {
    image:'https://picsum.photos/200/300',
    name:'캐시미어니트',
    category:'니트',
    price:125000,
    progress:2,
    designs: [
        'https://picsum.photos/200/300',
        'https://picsum.photos/200/300',
        'https://picsum.photos/200/300'
    ],
    samples: [
        'https://picsum.photos/200/300',
        'https://picsum.photos/200/300',
        'https://picsum.photos/200/300'
    ],
    finishedGoods: [
        'https://picsum.photos/200/300',
        'https://picsum.photos/200/300',
        'https://picsum.photos/200/300'
    ],

}
const UnderwayDetails = ({navigation}) => {

    //ProgressBar를 위한 상위 컨테이너 너비 계산
    const [containerWidth, setContainerWidth] = useState(0);
    const onContainerLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width);
    };

    //커스텀 프로그래스 바(너비와 단계를 넣으면 알아서 출력해줌)
    const CustomProgressBar = ({width, number}) =>{
    
        const [progress, setProgress] = useState(0);
      
        if (number === 0) 
        {
          number = 0.25;
        } 
        else if (number === 1) 
        {
          number = 0.5;
        } else if (number === 2) 
        {
          number = 0.75;
        } 
        else if (number === 3) 
        {
          number = 1;
        }
        
        useEffect(() => {
          // 0.2초 후에 progress를 위 수들로 변경
          setTimeout(() => {
            setProgress(number);
          }, 200);
        }, []);
      
        return(
            <View>
                <View style={{width:'100%',justifyContent:'center', height:40}}>

                    <View style={{position:'absolute', left:-10,height:20,width:20, borderRadius:1000, backgroundColor: progress <= 0 ? '#D9D9D9' : '#FF5160', zIndex:1, alignItems:'center',justifyContent:'center'}}>
                        <Image source={require('./StoreCenter/white_right_arrow_icon.png')} style={{width:10, height:10, resizeMode:'contain'}}/>
                    </View>

                    <View style={{position:'absolute', left:'30%',height:20,width:20, borderRadius:1000, backgroundColor: progress <= 0.29 ? '#D9D9D9' : '#FF5160', zIndex:1, alignItems:'center',justifyContent:'center'}}>
                        <Image source={require('./StoreCenter/white_right_arrow_icon.png')} style={{width:10, height:10, resizeMode:'contain'}}/>
                    </View>

                    <View style={{position:'absolute', left:'63%',height:20,width:20, borderRadius:1000, backgroundColor: progress <= 0.62 ? '#D9D9D9' : '#FF5160', zIndex:1, alignItems:'center',justifyContent:'center'}}>
                        <Image source={require('./StoreCenter/white_right_arrow_icon.png')} style={{width:10, height:10, resizeMode:'contain'}}/>
                    </View>

                    <View style={{position:'absolute', left:'95%',height:20,width:20, borderRadius:1000, backgroundColor: progress <= 0.94 ? '#D9D9D9' : '#FF5160', zIndex:1, alignItems:'center',justifyContent:'center'}}>
                        <Image source={require('./StoreCenter/white_right_arrow_icon.png')} style={{width:10, height:10, resizeMode:'contain'}}/>
                    </View>

                    <ProgressBar 
                        progress={progress} 
                        width={width} 
                        borderWidth={0}
                        borderColor={'transparent'} // BorderColor를 투명색으로 설정
                        unfilledColor={'#D9D9D9'} // 채워지지 않은 부분의 색상을 설정
                        color={'#FF5160'}
                    />

                </View>
            </View>
        );
      };


  return (
    <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
        <ScrollView contentContainerStyle={{flexDirection:'column'}}>
            <View style={{marginHorizontal:30, marginTop:30}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image
                        source={{ uri : product.image}}
                        style={{width:150, aspectRatio:1}}
                    />
                    <View style={{marginLeft:15}}>
                        <Text style={{fontSize:20,color:'#000000'}}>제품명 : {product.name}</Text>
                        <Text style={{fontSize:20,color:'#000000',marginTop:15}}>제품 종류 : {product.category}</Text>
                        <Text style={{fontSize:20,color:'#000000',marginTop:15}}>가격 : {product.price}</Text>
                    </View>
                </View>
                <View onLayout={onContainerLayout} style={{marginHorizontal:20,marginTop:20}}>
                    <CustomProgressBar
                        width={containerWidth}
                        number={product.progress}
                    />
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between', marginTop:5}}> 
                    <Text style={{fontSize:12, fontWeight: product.progress===0 ? 900 : 'normal', color: product.progress===0 ? '#000000' : '#FF5160'}}>주문 접수</Text>
                    <Text style={{fontSize:12, fontWeight: product.progress===1 ? 900 : 'normal', color: product.progress===1 ? '#000000' : '#FF5160'}}>     디자인</Text>
                    <Text style={{fontSize:12, fontWeight: product.progress===2 ? 900 : 'normal', color: product.progress===2 ? '#000000' : '#FF5160'}}>       샘플 제작</Text>
                    <Text style={{fontSize:12, fontWeight: product.progress===3 ? 900 : 'normal', color: product.progress===3 ? '#000000' : '#FF5160'}}>최종본 완성</Text>
                </View>
            </View>
{/*디자인*/}
            <View style={{marginLeft:15, marginTop:20}}>
                <Text style={{fontSize:25, color:'#000000'}}>디자인</Text>
                <ScrollView
                    horizontal={true}
                    style={{marginTop:10}}
                >
                    {product.designs.map((design, index) => (
                        <View key={index}>
                            <Image 
                                source={{ uri: design }} 
                                style={{ width: 140, height: 140, marginRight:10, marginBottom: 10, borderRadius:8}}
                                resizeMode='cover'
                            />
                        </View>
                    ))}
                    <Image 
                        source={require('./UnderwayDetails/Image_Add.png')} 
                        style={{ width: 140, height: 140, marginRight:10, marginBottom:10, borderRadius:8}} 
                        resizeMode='cover'
                    />
                </ScrollView>
            </View>
{/*샘플*/}
            <View style={{marginLeft:15, marginTop:20}}>
                <Text style={{fontSize:25, color:'#000000'}}>샘플</Text>
                <ScrollView
                    horizontal={true}
                    style={{marginTop:10}}
                >
                    {product.samples.map((sample, index) => (
                        <View key={index}>
                            <Image 
                                source={{ uri: sample }} 
                                style={{ width: 140, height: 140, marginRight:10, marginBottom: 10, borderRadius:8}}
                                resizeMode='cover'
                            />
                        </View>
                    ))}
                    <Image 
                        source={require('./UnderwayDetails/Image_Add.png')} 
                        style={{ width: 140, height: 140, marginRight:10, marginBottom:10, borderRadius:8}} 
                        resizeMode='cover'
                    />
                </ScrollView>
            </View>
{/*완제품*/}
            <View style={{marginLeft:15, marginTop:20, marginBottom:30}}>
                <Text style={{fontSize:25, color:'#000000'}}>완제품</Text>
                <ScrollView
                    horizontal={true}
                    style={{marginTop:10}}
                >
                    {product.finishedGoods.map((finishedGood, index) => (
                        <View key={index}>
                            <Image 
                                source={{ uri: finishedGood }} 
                                style={{ width: 140, height: 140, marginRight:10, marginBottom: 10, borderRadius:8}}
                                resizeMode='cover'
                            />
                        </View>
                    ))}
                    <Image 
                        source={require('./UnderwayDetails/Image_Add.png')} 
                        style={{ width: 140, height: 140, marginRight:10, marginBottom:10, borderRadius:8}} 
                        resizeMode='cover'
                    />
                </ScrollView>
            </View>
        </ScrollView>
{/*하단 탭*/}
        <View style={{flexDirection:'row',alignItems:'center', height:80,borderTopColor:'#9A9A9A50', borderTopWidth:1}}>
            <TouchableOpacity style={{flex:1}}>
            <View style={{height:50,backgroundColor:'#9A9A9A',marginHorizontal:15,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                <Text style={{fontSize:12,color:'#FFFFFF',textAlign:'center'}}>제작완료를 위해{'\n'}완제품 사진을 등록해주세요.</Text>
            </View>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default UnderwayDetails;
