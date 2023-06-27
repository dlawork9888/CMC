import React,{useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import axios from 'axios';
import UserContext from './UserContext';
import APIcontext from './APIcontext';
import ResizedImage from './ResizedImage';

//새주문 SampleData
let sample_newOrder = [
    {
        ordererImage: 'https://picsum.photos/200/300',
        ordererName : '첫번째',
        category : '캐시미어 니트',
        price : 125000,
        orderUid: '2'
    },
    {
        ordererImage: 'https://picsum.photos/200/300',
        ordererName : '두번째',
        category : '캐시미어 니트',
        price : 125000,
        orderUid : '1'
    },
    {
        ordererImage: 'https://picsum.photos/200/300',
        ordererName : '김찬우4',
        category : '캐시미어 니트',
        price : 125000,
        orderUid: '3'
    },
    {
        ordererImage: 'https://picsum.photos/200/300',
        ordererName : '김찬우3',
        category : '캐시미어 니트',
        price : 125000,
        orderUid :'4'
    },
    {
        ordererImage: 'https://picsum.photos/200/300',
        ordererName : '김찬우',
        category : '캐시미어 니트',
        price : 125000,
        orderUid :'5'
    },
    {
        ordererImage: 'https://picsum.photos/200/300',
        ordererName : '김찬우',
        category : '캐시미어 니트',
        price : 125000,
        orderUid :'6'
    },
    {
        ordererImage: 'https://picsum.photos/200/300',
        ordererName : '김찬우',
        category : '캐시미어 니트',
        price : 125000,
        orderUid :'7'
    }
];
//제작중 샘플 데이터
let sampleUnderWay = [
    {
        productImage:'https://picsum.photos/400/200',
        productName: '캐시미어 니트',
        productCategory:'캐시백 니트',
        productPrice:125000,
        progress:1,                         //0=> 디자인으로 가는중, 1=> 샘플 제작으로 가는중 , 2=> 최종본 완성으로 가는중, 3=> 최종본 완성 
        orderUid:'1'
    },
    {
        productImage:'https://picsum.photos/200/300',
        productName: '캐시미어 니트',
        productCategory:'캐시백 니트',
        productPrice:125000,
        progress:2,
        orderUid:'2'
    },
    {
        productImage:'https://picsum.photos/200/300',
        productName: '캐시미어 니트',
        productCategory:'캐시백 니트',
        productPrice:125000,
        progress:3,
        orderUid:'3'
    },
    {
        productImage:'https://picsum.photos/200/300',
        productName: '캐시미어 니트',
        productCategory:'캐시백 니트',
        productPrice:125000,
        progress:0,
        orderUid:'4'
    },
    {
        productImage:'https://picsum.photos/200/300',
        productName: '캐시미어 니트',
        productCategory:'캐시백 니트',
        productPrice:125000,
        progress:1,
        orderUid:'5'
    },
];

let statistics = {
    newOrder:2,
    OrderCompleted:2,
    releaseCompleted:10,
    shipping:2,
    deliveryCompleted:2,
    cancellationRequest:2,
    returnRequest:2,
    purchaseConfirmation:2,
    settlement:10000,
    customerInflow: 32,
    customerLikes:15,
    customerOrder:7
}




const StoreCenter = ({navigation}) => {

    //UserContext
    const userContext = useContext(UserContext);
    const API_context = useContext(APIcontext);

    console.log("StoreCenter Page Entered. UserType : ", userContext.userContext.userType);

    //새주문, 제작중, 통계 눌림 State
    //0,1,2
    const [topBar, setTopBar] = useState(0);

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
    






//커스텀 요청 (새주문) get요청
const[receivedData, setReceivedData] = useState();             //받은 새주문 목록
const [newOrder, setNewOrder] = useState(sample_newOrder);
const getCustomRequests = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userContext.userContext.accessToken}`
        }
      };
  
      const response = await axios.get(API_context.get_all_custom_request, config);
      console.log('새 주문 목록 요청 성공');
      console.log('응답 데이터:', response.data.data);
  
      // 받은 새 주문 목록 저장
      setReceivedData(response.data.data);
  
      // 데이터 파싱
      const parsedData = response.data.data.map((item) => {
        return {
          ordererImage: item.memberProfileImgUrl,
          ordererName: item.memberName,
          category: item.title,
          price: item.desiredPrice,
          orderUid: item.customId.toString()
        };
      });
  
      // 파싱된 데이터를 newOrder 상태로 업데이트
      setNewOrder(parsedData);
    } catch (error) {
      console.error('Failed to fetch custom requests');
      console.error(error);
      console.error(error.response);
      console.error('Error status code:', error.response.status);
      console.error('Error message:', error.response.data);
    }
  };

  useEffect(() => {
    getCustomRequests();
  }, []);

  





    

    const [underWay, setUnderway] = useState(sampleUnderWay);


















/*렌더링 파트*/
    return (
        <View style={styles.container}>
            <View style={{marginTop:10,flexDirection:'row', justifyContent:'space-around'}}>
                <TouchableOpacity onPress={()=>setTopBar(0)}>
                    <Text style={{fontSize:16, color: (topBar === 0) ? '#000000' : '#9A9A9A', fontWeight: (topBar == 0) ? 'bold' : 'normal'}}>새주문</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setTopBar(1)}>
                    <Text style={{fontSize:16, color: (topBar === 1) ? '#000000' : '#9A9A9A', fontWeight: (topBar == 1) ? 'bold' : 'normal'}}>제작중</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setTopBar(2)}>
                    <Text style={{fontSize:16, color: (topBar === 2) ? '#000000' : '#9A9A9A', fontWeight: (topBar == 2) ? 'bold' : 'normal'}}>통계</Text>
                </TouchableOpacity>
            </View>
{/*경계 View 컴포넌트*/}
        <View style={{backgroundColor:'#DFDFDF',marginTop:10,height:1}}></View>
{/* 새주문 */}
        {topBar === 0 && (
            <ScrollView style={{flexDirection:'column'}}>
                <View style={{height:20}}/>
                {newOrder.map(order => (
                    <TouchableOpacity key={order.orderUid} onPress={()=>{
                        navigation.navigate('RequestInformation');
                        userContext.setClickedCustomId(order.orderUid);
                    }}>
                        <View style={{paddingHorizontal:20,paddingVertical:10, marginHorizontal:20,marginBottom:20, borderWidth:1, borderColor:'#DFDFDF'}}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Image
                                    source = {{ uri : order.ordererImage }}
                                    style = {{width:40, aspectRatio : 1, borderRadius:20}}
                                />
                                <Text style={{fontSize:17, marginLeft:10,color:'#000000'}}>{order.ordererName}</Text>
                            </View>
                            <Text style={{fontSize:15, marginTop:10, color:'#000000'}}>제목 : {order.category}</Text>
                            <Text style={{fontSize:15, marginTop:10, color:'#000000'}}>가격 : {order.price}원</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        )}
{/*제작중*/}
        {
            topBar === 1 && (
                <View style={{flex:1}}>
                    <ScrollView style={{flexDirection:'column'}}>
                        {underWay.map((product, index) => {
                            return (
                                <View key={index}>
                                    <View 
                                        key={product.orderUid}
                                        style={{marginHorizontal:15}}
                                    >
                                        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:30}}>
                                            {product.progress ===0 &&(<Text style = {{fontSize: 20, fontWeight: 800, color: '#000000'}}>디자인 중...</Text>)}
                                            {product.progress ===1 &&(<Text style = {{fontSize: 20, fontWeight: 800, color: '#000000'}}>샘플 제작 중...</Text>)}
                                            {product.progress ===2 &&(<Text style = {{fontSize: 20, fontWeight: 800, color: '#000000'}}>최종본 제작 중...</Text>)}
                                            {product.progress ===3 &&(<Text style = {{fontSize: 20, fontWeight: 800, color: '#000000'}}>최종본 제작 완료!</Text>)}
                                            <TouchableOpacity onPress={()=>navigation.navigate('UnderwayDetails')}>
                                                <View style={{backgroundColor:'#FF5160',borderRadius:5,width:60,alignItems:'center',justifyContent:'center'}}>
                                                    <Text style={{fontSize:15,fontWeight:800, color:'#FFFFFF'}}>편집</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{marginTop:10}}>
                                            <ResizedImage 
                                                uri={product.productImage} 
                                                width={250}
                                            />
                                        </View>
                                        <Text style = {{fontSize: 17, color: '#000000',marginTop:10}}>{product.productName}</Text>
                                        <Text style = {{fontSize: 17, color: '#000000',marginTop:10}}>종류 : {product.productCategory}</Text>
                                        <Text style = {{fontSize: 17, color: '#000000',marginTop:10}}>가격 : {product.productPrice}원</Text>
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
                                    <View style={{height:5,backgroundColor:'#E4E4E4', marginTop:30}}></View>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
            )
        }
{/*통계*/}
        {
            topBar === 2 && (
                <ScrollView style={{flexDirection:'column'}}>

{/*현황*/}
                    <View style={{marginVertical:30, marginHorizontal:15}}>
                        <Text style={{fontSize:25, color:'#000000', fontWeight:900}}>주문/배송</Text>

                        <View style={{flexDirection:'row',marginTop:25}}>
                            <View style={{width:150}}>
                                <Text style={{fontSize:20, color:'#000000'}}>신규 주문</Text>
                            </View>
                            <Text style={{fontSize:20, color:'#000000'}}>{statistics.newOrder}건</Text>
                        </View>

                        <View style={{flexDirection:'row',marginTop:15}}>
                            <View style={{width:150}}>
                                <Text style={{fontSize:20, color:'#000000'}}>주문 완료</Text>
                            </View>
                            <Text style={{fontSize:20, color:'#000000'}}>{statistics.OrderCompleted}건</Text>
                        </View>

                        <View style={{flexDirection:'row',marginTop:15}}>
                            <View style={{width:150}}>
                                <Text style={{fontSize:20, color:'#000000'}}>출고 완료</Text>
                            </View>
                            <Text style={{fontSize:20, color:'#000000'}}>{statistics.releaseCompleted}건</Text>
                        </View>

                        <View style={{flexDirection:'row',marginTop:15}}>
                            <View style={{width:150}}>
                                <Text style={{fontSize:20, color:'#000000'}}>배송 중</Text>
                            </View>
                            <Text style={{fontSize:20, color:'#000000'}}>{statistics.shipping}건</Text>
                        </View>
                        
                        <View style={{flexDirection:'row',marginTop:15}}>
                            <View style={{width:150}}>
                                <Text style={{fontSize:20, color:'#000000'}}>배송 완료</Text>
                            </View>
                            <Text style={{fontSize:20, color:'#000000'}}>{statistics.deliveryCompleted}건</Text>
                        </View>

                        <Text style={{fontSize:25, color:'#000000',marginTop:30, fontWeight:900}}>클레임/정산</Text>

                        <View style={{flexDirection:'row',marginTop:15}}>
                            <View style={{width:150}}>
                                <Text style={{fontSize:20, color:'#000000'}}>취소 요청</Text>
                            </View>
                            <Text style={{fontSize:20, color:'#000000'}}>{statistics.cancellationRequest}건</Text>
                        </View>

                        <View style={{flexDirection:'row',marginTop:15}}>
                            <View style={{width:150}}>
                                <Text style={{fontSize:20, color:'#000000'}}>반품 요청</Text>
                            </View>
                            <Text style={{fontSize:20, color:'#000000'}}>{statistics.returnRequest}건</Text>
                        </View>

                        <View style={{flexDirection:'row',marginTop:15}}>
                            <View style={{width:150}}>
                                <Text style={{fontSize:20, color:'#000000'}}>구매 확정</Text>
                            </View>
                            <Text style={{fontSize:20, color:'#000000'}}>{statistics.purchaseConfirmation}건</Text>
                        </View>

                        <View style={{flexDirection:'row',marginTop:15}}>
                            <View style={{width:150}}>
                                <Text style={{fontSize:20, color:'#000000'}}>정산금</Text>
                            </View>
                            <Text style={{fontSize:20, color:'#000000'}}>{statistics.settlement}원</Text>
                        </View>

                        <Text style={{fontSize:25, color:'#000000',marginTop:30, fontWeight:900}}>고객 현황</Text>

                        <View style={{flexDirection:'row',marginTop:15}}>
                            <View style={{width:150}}>
                                <Text style={{fontSize:20, color:'#000000'}}>고객 유입</Text>
                            </View>
                            <Text style={{fontSize:20, color:'#000000'}}>{statistics.customer}건</Text>
                        </View>

                        <View style={{flexDirection:'row',marginTop:15}}>
                            <View style={{width:150}}>
                                <Text style={{fontSize:20, color:'#000000'}}>좋아요</Text>
                            </View>
                            <Text style={{fontSize:20, color:'#000000'}}>{statistics.customerLikes}건</Text>
                        </View>

                        <View style={{flexDirection:'row',marginTop:15}}>
                            <View style={{width:150}}>
                                <Text style={{fontSize:20, color:'#000000'}}>주문 수</Text>
                            </View>
                            <Text style={{fontSize:20, color:'#000000'}}>{statistics.customerOrder}건</Text>
                        </View>

                    </View>
                    
                </ScrollView>
            )
        }

        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
});

export default StoreCenter;