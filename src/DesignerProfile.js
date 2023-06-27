import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, FlatList, TouchableOpacity} from 'react-native';
import { useState, useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserContext from './UserContext';
import APIcontext from './APIcontext';
import axios from 'axios';

let sample_designerInfo = {
    image: 'https://picsum.photos/200/300',
    name: '디자이너 이름',
    explanation: '디자이너 설명',
    hashTags: ['해쉬태그1', '해쉬태그2', '해쉬태그3'], //상위 카테고리
    likes: 12000,
    subcategory:[],
};

let sample_designerProducts = [
    {
        image:'https://picsum.photos/200/300',
        productId:-1,
    },
];

let sample_designerPortfolio = [    
    'https://picsum.photos/200/300',
    'https://picsum.photos/200/300'
]


const DesignerProfile = ({navigation}) => {




    const userContext = useContext(UserContext);
    const API_context = useContext(APIcontext);
    console.log('DesignerProfile Entered');
    console.log('디자이너 아이디 :', userContext.userContext.clickedDesignerId );

    const [designerInfo, setDesignerInfo] = useState(sample_designerInfo);
    const [designerProducts, setDesignerProducts] = useState(sample_designerProducts);
    const [designerPortfolio, setDesignerPortfolio] = useState(sample_designerPortfolio);
    
    
    const getDesignerInfo = async () => {
        try {
            const response = await axios.get(`http://3.39.131.14:8080/api/v1/designers/${userContext.userContext.clickedDesignerId}/info`, {
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${userContext.userContext.accessToken}`
                }
            });
        
            const data = response.data;
            const formattedData =  {
                image: data.data.profileImgUrl,
                name: data.data.name,
                explanation: data.data.introduce,
                hashTags: data.data.highCategoryNames,
                likes: data.data.likes,
                subcategory:data.data.lowCategoryNames,
            }
            setDesignerInfo(formattedData);
        } catch (error) {
            console.error(error);
        }
    };



    
 
//디자이너가 제작했던 제품을 요청
    const getDesignerProducts = async () => {
        try {
          const response = await axios.get(`http://3.39.131.14:8080/api/v1/product/designers/${userContext.userContext.clickedDesignerId}`, {
            headers: {
              'Accept': '*/*',
              'Authorization': `Bearer ${userContext.userContext.accessToken}`
            }
          });
      
          const data = response.data.data;
          console.log(data)
          const formattedData = data.map(item => ({
            image: item.mainImgUrl,
            productId: item.productId
          }));
          setDesignerProducts(formattedData);

        } catch (error) {
          console.error(error.data)
        }
      };







    const getDesignerPortFolio = async () => {
        try {
          const response = await axios.get(`http://3.39.131.14:8080/api/v1/designers/${userContext.userContext.clickedDesignerId}/profiles/portfolios`
          , {
            headers: {
              'Accept': '*/*',
              'Authorization': `Bearer ${userContext.userContext.accessToken}`
            }
          });
          const data = response.data.data;
          setDesignerPortfolio(data.portfolioImgUrls);
        } catch (error) {
            console.error(error)
          }
        };



        useEffect(()=>{
            getDesignerInfo();
            getDesignerProducts();
            getDesignerPortFolio();
        },[]);



        const CustomImage = ({uri}) => {
            //designerPortfolioImage 비율 동적 계산 useState
            const [designerPortfolioImageRatio, setdesignerPortfolioImageRatio] = useState(1);
            //비율 ( width / height ) 계산 함수
            const ondesignerPortfolioImageLoad = (event) => {
                const { width, height } = event.nativeEvent.source;
                const ratio = width / height;
                setdesignerPortfolioImageRatio(ratio);
            };
      
            return(
              <Image
                source={{ uri : uri}}
                style={{ width: '100%', aspectRatio: designerPortfolioImageRatio }}
                resizeMode="contain"
                onLoad={ondesignerPortfolioImageLoad}
              />
            );
      
        };

//제작했던 제품 펼쳐보기 <= 펼쳐보기가 true, 한줄로 보기가 false
    const [expand,setExpand] = useState(true);
//펼쳐보기 FlatList column 수 state
    const columnCount = 2;


//designerPortfolioImage 비율 동적 계산 useState
    const [designerPortfolioImageRatio, setdesignerPortfolioImageRatio] = useState(1);
//비율 ( width / height ) 계산 함수
    const ondesignerPortfolioImageLoad = (event) => {
        const { width, height } = event.nativeEvent.source;
        const ratio = width / height;
        setdesignerPortfolioImageRatio(ratio);
    };

  return (
<View style={{flex:1}}>
<View>
<ScrollView style={{backgroundColor:'#ffffff'}}>
{/*디자이너 기본 정보*/}
        <View style={{flexDirection:'row', alignItems:'center', height:150, backgroundColor:'#FFFFFF',marginLeft:20, marginRight:20}}>
            <Image
                source = {{ uri : designerInfo.image }}
                style = {{height: 100, width:100, borderRadius:50, resizeMode:'cover'}} 
            />
            <View style={{flexDirection:'column', justifyContent:'space-around', height:100, marginLeft:30}}>
                <Text style={{fontSize:20, color:'#000000'}}>{designerInfo.name}</Text>
                <Text style={{fontSize:15, color:'#000000'}}>{designerInfo.explanation}</Text>
                <View style={{flexDirection:'row'}}>
                    {designerInfo.hashTags.map((item, index) => (
                     <Text key={index} style={{marginRight:5}}>#{item}</Text>
                    ))}
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Image
                        source={require('./DesignerProfile/heart_icon.png')}
                        style={{height:20,width:20,resizeMode:'cover'}}>
                    </Image>
                    <Text style={{fontSize:13,color:'#000000',marginLeft:5}}>{designerInfo.likes}</Text>
                </View>
            </View>
        </View>
{/*경계 View 컴포넌트*/}
        <View style={{height:5, backgroundColor:'#E4E4E4'}}></View>
{/*제작했던 제품*/}
        <View>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <Text style={{marginLeft:20,marginTop:20,marginBottom:20,fontSize:20, color:'#000000'}}>
                    제작했던 제품
                </Text>
{/*expand state 반대로 변경(true, false)*/}
                <TouchableOpacity onPress={()=>setExpand(!expand)}>
                    <Text style={{marginRight:20, fontSize:15, color:'#9A9A9A'}}>
                        {expand?('펼쳐보기'):('한 줄로 보기')}
                    </Text>
                </TouchableOpacity>
            </View>
            {expand ? (
                <FlatList
                    style={{marginLeft:10,marginBottom:10}}
                    data={designerProducts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={()=>{
                            userContext.setClickedProductId(item.productId);  
                            navigation.navigate('ProductDetails');
                        }}>
                            <Image style={{width:115, height:140,resizeMode:'cover',marginRight:10}} source={{ uri: item.image }} />
                        </TouchableOpacity>
                    )}
                    horizontal={true}
                />
                )
            :(
                <View>
                    <FlatList
                        contentContainerStyle={{
                        }}
                        key={columnCount}
                        data={designerProducts}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={columnCount}
                        renderItem={({ item }) => (
                            <Image
                                style={{margin:'2.5%',width:'45%',aspectRatio:1 }}
                                source={{uri : item.image}}
                                >
                            </Image>
                        )}
                        scrollEnabled={false}
                    />
                </View>
            )}
        </View>
{/*경계 View 컴포넌트*/}
        <View style={{height:5, backgroundColor:'#E4E4E4'}}></View>
        <View style={{}}>
            <Text style={{marginLeft:20,marginTop:20,marginBottom:20,fontSize:20, color:'#000000'}}>
                포트폴리오
            </Text>
            {designerPortfolio.map((uri, index)=>(
                <CustomImage
                    key = {index}
                    uri={uri}
                />
            ))}
        </View>
</ScrollView>
</View>
{/*하단 플로팅 버튼을 위해 ScrollView를 View로 감싸고 그 아래 플로팅 View를 놓고 그 두개를 다시 View로 감싸줬음.*/}
<View style={[styles.floatingView, {flexDirection:'row',alignItems:'center'}]}>
    <View style={{flexDirection:'column', alignItems:'center',marginLeft:15}}>
        <Image
            source={require('./DesignerProfile/hallow_heart.png')}
            style={{width:35,height:35,resizeMode:'cover'}}
        />
        <Text style={{fontSize:14,color:'#000000'}}>{designerInfo.likes}</Text>
    </View>
        <TouchableOpacity
            style={{flex:1}} 
            onPress={()=>navigation.navigate('CraftingRequest')}>
            <View style={{height:50,backgroundColor:'#FF5160',marginHorizontal:15,alignItems:'center',justifyContent:'center',borderRadius:5}}>
                <Text style={{fontSize:17,color:'#FFFFFF'}}>제작 요청</Text>
            </View>
        </TouchableOpacity>
    </View>
</View>



  );
}

const styles = StyleSheet.create({
    textFont12 : {
        fontSize: 12,
        color:'#000000',
    },
    floatingView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 80,
        backgroundColor: '#FFFFFF',
        borderTopWidth:1,
        borderColor:'#9A9A9A'
    },

});

export default DesignerProfile;
