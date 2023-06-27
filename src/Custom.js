import React, { useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, ScrollView, FlatList,Image } from 'react-native';
import UserContext from './UserContext';
import axios from 'axios';
import APIcontext from './APIcontext';
import ResizedImage from './ResizedImage';
import ProgressBar from 'react-native-progress/Bar';

let sample_recruitingProducts = [
    {
        productImage:'https://picsum.photos/200/300',
        designerImage: 'https://picsum.photos/200/300',
        designerName: '디자이너1',
        productName: 'Product Name2',
        //dDay: 7,
        accepted: 'REQUESTINg',
        designerId: -1,
        customId: -1,
    }
]

let sampleUnderWay = [
    {
        productImage:'https://media.istockphoto.com/id/157692462/ko/%EC%82%AC%EC%A7%84/%EC%95%9E%EB%A7%88%EB%8B%B9-%EB%B8%94%EB%9E%99-%EA%B0%80%EC%A3%BD-%EC%9E%AC%ED%82%B7%EC%9D%84-%ED%9D%B0%EC%83%89-%EB%B0%94%ED%83%95%EC%97%90-%EA%B7%B8%EB%A6%BC%EC%9E%90%EC%99%80-w-%ED%81%B4%EB%A6%AC%ED%95%91-%EA%B2%BD%EB%A1%9C%EB%A5%BC.jpg?s=612x612&w=0&k=20&c=5UsoRvLFr1dJE5GSD4FB6OThg5lrOsDnaJ5KMvE9lrY=',
        productName: '천연 가죽 자켓',
        productCategory:'캐시백 니트',
        productPrice:125000,
        progress:1,                         //0=> 디자인으로 가는중, 1=> 샘플 제작으로 가는중 , 2=> 최종본 완성으로 가는중, 3=> 최종본 완성 
        orderUid:1,
        desingerProfileImage:'https://picsum.photos/400/200',
        designerName:'김씨가죽공방'
    },
    {
        productImage:'https://image.babathe.com/goods/G302322678/G302322678_1.jpg/babathe/optimize',
        productName: '프린팅 티셔츠',
        productCategory:'캐시백 니트',
        productPrice:125000,
        progress:2,                         //0=> 디자인으로 가는중, 1=> 샘플 제작으로 가는중 , 2=> 최종본 완성으로 가는중, 3=> 최종본 완성 
        orderUid:1,
        desingerProfileImage:'https://picsum.photos/400/200',
        designerName:'프린팅조아'
    },
    
];


const Custom = ({navigation}) => {

    const userContext = useContext(UserContext);
    const API_context = useContext(APIcontext);

    const [recruitingProducts, setRecruitingProducts ] = useState(sample_recruitingProducts);
    const [underWay, setUnderway] = useState(sampleUnderWay);


    
    const getRequestInfo = async () => {
        try {
          const response = await axios.get(`http://3.39.131.14:8080/api/v1/members/custom`, {
            headers: {
              'Accept': '*/*',
              'Authorization': `Bearer ${userContext.userContext.accessToken}`
            }
          });
      
          const data = response.data.data;
          console.debug(data);
      
          const formattedData = data.map(item => ({
            productImage: item.customThumbnailImgUrl,
            designerImage: item.designerProfileImgUrl,
            designerName: item.designerName,
            productName: item.title,
            accepted: item.accepted,
            designerId: item.designerId,
            customId: item.customId
          }));
      
          setRecruitingProducts(formattedData);
        } catch (error) {
          console.error(error.data);
        }
      };
      
      
      useEffect(() => {
        getRequestInfo();
      }, []);
    





  const [isRecruiting, setIsRecruiting] = useState(true);

  const toggleIsRecruiting = () => {
    setIsRecruiting(!isRecruiting);
  };
  

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
    <ScrollView style={{backgroundColor:'#FFFFFF'}}>
        <View style={{marginTop:10,flexDirection:'row', justifyContent:'space-around'}}>
            <TouchableOpacity onPress={toggleIsRecruiting}>
                <Text style={{fontSize:16, color: isRecruiting ? '#000000' : '#9A9A9A', fontWeight: isRecruiting ? 'bold' : 'normal'}}>요청중</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleIsRecruiting}>
                <Text style={{fontSize:16, color: !isRecruiting ? '#000000' : '#9A9A9A', fontWeight: !isRecruiting ? 'bold' : 'normal'}}>제작중</Text>
            </TouchableOpacity>
        </View>
{/*경계 View 컴포넌트*/}
        <View style={{backgroundColor:'#DFDFDF',marginTop:10,height:1}}></View>
{/*모집 중인 제품 리스트*/}
        {isRecruiting&&(
            <View style={{marginTop:20}}>
                <FlatList
                    data={recruitingProducts}
                    renderItem={({item})=>(
                        <TouchableOpacity 
                            onPress = {()=>{
                                userContext.setClickedCustomId(item.customId);
                                navigation.navigate('CustomerRequestInformation');
                            }}
                            style={{width:'42%',marginLeft:'5.5%',marginBottom:10}}
                        >
                            <Image
                                style={{width:'100%',aspectRatio:1}}
                                source={{uri : item.productImage}}
                                >
                            </Image>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:3}}>
                            <Image
                            source={{uri: item.designerImage}}
                            style={{width:15,aspectRatio:1,borderRadius:10}}
                            />
                            <Text style={{fontSize:13, color:'#000000',marginLeft:3}}>{item.designerName}</Text>
                        </View>
                        <Text style={{fontSize:17, color:'#000000',marginTop:3}}>{item.productName}</Text>
                        <View style={{flexDirection:'row',alignItems:'center',marginTop:3,justifyContent:'space-between'}}>
                            <Text style={{fontSize:17, color:'#FF5160',marginLeft:3}}></Text>
                            <View style={{
                                backgroundColor:item.accepted !== "APPROVAL"? '#FF5160':'#A3F1B4',
                                height:20,width:70,
                                borderRadius:4,
                                alignItems:'center',
                                justifyContent:'center'
                                }}
                            >
                                
                                {item.accepted === 'REQUESTING' ? 
                                    (
                                        <Text style={{fontSize:14,color:'#FFFFFF'}}>요청중</Text>
                                    ):(
                                        item.accepted === 'REFUSAL' ?
                                        (
                                            <Text style={{fontSize:14,color:'#FFFFFF'}}>거절됨</Text>
                                        ):(
                                            <Text style={{fontSize:14,color:'#FFFFFF'}}>승인됨</Text>
                                        )
                                        
                                    )}
    
                            </View>
                        </View>
                    </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.productName}
                    numColumns={2}
                    scrollEnabled={false}
                />
            </View>
        )}
{/*참여 마감 눌렀을때 나오는 컴포넌트*/}
        {!isRecruiting&&(
            <View style={{flex:1}}>
            <ScrollView style={{flexDirection:'column'}}>
                {underWay.map((product, index) => {
                    return (
                        <View key={index}>
                            <View 
                                key={product.orderUid}
                                style={{marginHorizontal:15}}
                            >
                {/*
                                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:30}}>
                                    {product.progress ===0 &&(<Text style = {{fontSize: 20, fontWeight: 800, color: '#000000'}}>디자인 중...</Text>)}
                                    {product.progress ===1 &&(<Text style = {{fontSize: 20, fontWeight: 800, color: '#000000'}}>샘플 제작 중...</Text>)}
                                    {product.progress ===2 &&(<Text style = {{fontSize: 20, fontWeight: 800, color: '#000000'}}>최종본 제작 중...</Text>)}
                                    {product.progress ===3 &&(<Text style = {{fontSize: 20, fontWeight: 800, color: '#000000'}}>최종본 제작 완료!</Text>)}
                                </View>
                */}

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
                                <View style={{marginTop:10, alignItems:'center'}}>
                                    <ResizedImage 
                                        uri={product.productImage} 
                                        width={250}
                                    />
                                </View>

                                <View style={{alignItems:'center'}}>
                                    <View style={{width:containerWidth,paddingHorizontal:30}}>
                                        <View style={{flexDirection:'row', alignItems:'center', marginTop:5}}>
                                            <Image
                                                source={{uri:product.desingerProfileImage}}
                                                style={{width:18, height:18, resizeMode:'cover', borderRadius:1000}}
                                            />
                                            <Text style={{color:'#000000', marginLeft:5}}>
                                                {product.designerName}
                                            </Text>
                                        </View>
                                        <Text style={{color:'#000000', marginTop:5, fontSize:17}}>
                                            {product.productName}
                                        </Text>
                                        
                                    </View>
                                </View>

                {/*
                                <Text style = {{fontSize: 17, color: '#000000',marginTop:10}}>{product.productName}</Text>
                                <Text style = {{fontSize: 17, color: '#000000',marginTop:10}}>종류 : {product.productCategory}</Text>
                                <Text style = {{fontSize: 17, color: '#000000',marginTop:10}}>가격 : {product.productPrice}원</Text>
                                
                */}    


                            </View>
                            <View style={{height:5,backgroundColor:'#E4E4E4', marginTop:30}}></View>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
        )}
    </ScrollView>
  );
}

export default Custom;
