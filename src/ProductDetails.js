import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, Dimensions,Text, TouchableOpacity } from 'react-native';
import UserContext from './UserContext';
import APIcontext from './APIcontext';
import axios from 'axios';

let sample_productInfo={
    productImage : [
        'https://picsum.photos/400/300',
        'https://picsum.photos/seed/picsum/400/300'
    ],
    productCategory: '카테고리1>카테고리2',
    productName: '상품 명 상품 명 상품 명',
    productHashtags:[
        '해쉬태그1', '해쉬태그2', '해쉬태그3'
    ],
    productPrice: 200000,
    designerInfo: {
        designerImage:'https://picsum.photos/200/300',
        designerName:'디자이너 이름',
        designerExplaination:'디자이너 설명',
        designerLikes: 12000,
        designerId:-1,
    },
    productExplaination:['https://picsum.photos/200/300','https://picsum.photos/200/300',],
    productDescription:'123124123124',
    productLikes:20000,
}

const ProductDetails = ({navigation}) => {
  

  const userContext = useContext(UserContext);
  const API_context = useContext(APIcontext);

  console.log('Product Details Page Entered.');
  console.log('Product Id :', userContext.userContext.clickedProductId);

//상품 정보 get 요청  함수
  const[ productInfo, setProductInfo ] = useState(sample_productInfo);


  const getProductInfo = async () => {
    try {
      const response = await axios.get(`http://3.39.131.14:8080/api/v1/product/${userContext.userContext.clickedProductId}/details`, {
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${userContext.userContext.accessToken}`
        }
      });
  
      const data = response.data.data;
      console.debug(data);
  
      const formattedProductInfo = {
        productImage: data.thumbnailImgUrlList,
        productCategory: `${data.highCategory} > ${data.lowCategory}`,
        productName: data.name,
        productHashtags: data.tag.split(','),
        productPrice: data.price ? data.price.toLocaleString() : '',
        designerInfo: {
          designerImage: data.designerInfoCard.profileImgUrl,
          designerName: data.designerInfoCard.name,
          designerExplaination: data.designerInfoCard.introduce,
          designerLikes: data.designerInfoCard.likes,
          designerId: data.designerInfoCard.designerId
        },
        productExplaination: data.descriptionImgList,
        productDescription: data.description,
        productLikes: data.productLikeCount
      };
      console.log('포멧 데이터 :',formattedProductInfo)
      setProductInfo(formattedProductInfo);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    getProductInfo();
  }, []);



  //여기부터
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / Dimensions.get('window').width);
    setCurrentIdx(index);
  };
  //여기까지 인스타그램처럼 이미지 넘기기




  //정보, 리뷰, 문의 탭 관리 useState
  const [selectedTab,setSelectedTab]=useState(0);
  
  const tabPress = (index) =>{
    setSelectedTab(index);
  }

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


  return (
  <View style={{flex:1}}>
    <ScrollView style={{backgroundColor:'#FFFFFF'}}>
{/*여기부터*/}
      <View>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
        >
          {productInfo.productImage.map((photo, index) => (
            <Image key={index} source={{ uri: photo }} style={styles.image} />
          ))}
        </ScrollView>
        <View style={styles.pagination}>
          {productInfo.productImage.map((photo, index) => (
            <View key={index} style={[styles.dot, index === currentIdx && styles.activeDot]} />
          ))}
        </View>
      </View>
{/*여기까지 인스타그램처럼 이미지 넘기기*/}


    {/*제품 정보 + 디자이너 정보창 */}
        <View style={{flexDirection:'column'}}>
            
            {/*제품 정보창*/}
            <View style={{flexDirection:'column', marginLeft:15,marginTop:15}}>
                <Text style={{fontSize:15,color:'#000000'}}>{productInfo.productCategory}</Text>
                <Text style={{fontSize:25,color:'#000000',fontWeight:'bold',marginTop:5}}>{productInfo.productName}</Text>
                <View style={{flexDirection:'row',marginTop:5}}>
                    {productInfo.productHashtags.map((tag, index) => (
                    <Text key={index} style={{fontSize:12,marginRight:10,color:"#000000"}}>
                        #{tag}
                    </Text>
                    ))}
                </View>
                <Text style={{fontSize:20,color:'#000000',fontWeight:'bold',marginTop:5}}>{productInfo.productPrice}원</Text>
            </View>
            
            {/*디자이너 정보창*/}
            <View style={{flexDirection:'row',marginTop:15,marginLeft:15}}>
                <View style={{flexDirection:'column',alignItems:'center'}}>
                    <Image 
                        source={{uri : productInfo.designerInfo.designerImage}}
                        style={{
                            width:50,
                            height:50,
                            resizeMode:'cover',
                            borderRadius:25
                        }}
                    />
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image
                            source={require('./ProductDetails/heart_icon.png')}
                            style={{width:12,height:12,resizeMode:'cover'}}
                        />
                        <Text style={{fontSize:12,color:'#000000',marginLeft:2}}>{productInfo.designerInfo.designerLikes}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'column',justifyContent:'center',marginLeft:15}}>
                    <Text style={{fontSize:15,color:'#000000'}}>{productInfo.designerInfo.designerName}</Text>
                    <Text style={{fontSize:12,color:'#000000',marginTop:10}}>{productInfo.designerInfo.designerExplaination}</Text>
                </View>
            </View>
        </View>
        {/*경계 View*/}
        <View style={{backgroundColor:'#E4E4E4',width:'100%',height:5,marginTop:15}}></View>


        {/*정보, 리뷰, 문의*/}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%', height: 40 }}>
            <TouchableOpacity onPress={()=>tabPress(0)}>
                <Text style={{ fontSize: 17, color: selectedTab === 0 ? '#FF5160':'#000000',paddingLeft:10,paddingRight:10 }}>정보</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>tabPress(1)}> 
                <Text style={{ fontSize: 17, color: selectedTab === 1 ? '#FF5160':'#000000',paddingLeft:10,paddingRight:10 }}>리뷰</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>tabPress(2)}>
                <Text style={{ fontSize: 17, color: selectedTab === 2 ? '#FF5160':'#000000',paddingLeft:10,paddingRight:10 }}>문의</Text>
            </TouchableOpacity>
        </View>

{/*경계 View*/}
<View style={{backgroundColor:'#E4E4E4',width:'100%',height:2}}></View>
        
        {/*정보, 리뷰, 문의*/}
        <View>
          {selectedTab === 0 && (
            <View>
              <Text style={{fontSize:20, color:'#000000', margin:15, fontWeight:700}}>
                제품 상세
              </Text>
              <Text style={{fontSize:15, color:'#000000',marginHorizontal:15, marginBottom:15 }}>
                {productInfo.productDescription}
              </Text>
              {productInfo.productExplaination.map((uri,index)=>(
                <CustomImage key={index} uri={uri}/>
              ))}
            </View>
          )}
          {selectedTab === 1 && (
            <View>
              <Text>리뷰</Text>
            </View>
          )}
          {selectedTab === 2 && (
            <View>
              <Text>문의</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={{flexDirection:'row',alignItems:'center', height:80,borderTopColor:'#9A9A9A50', borderTopWidth:1, backgroundColor:'#FFFFFF'}}>
        <View style={{flexDirection:'column', alignItems:'center',marginLeft:15}}>
          <Image
              source={require('./DesignerProfile/hallow_heart.png')}
              style={{width:35,height:35,resizeMode:'cover'}}
          />
          <Text style={{fontSize:14,color:'#000000'}}>{productInfo.productLikes}</Text>
        </View>
        <TouchableOpacity style={{flex:1}}>
          <View style={{height:50,backgroundColor:'#FF5160',marginHorizontal:15,alignItems:'center',justifyContent:'center',borderRadius:5}}>
              <Text style={{fontSize:17,color:'#FFFFFF',textAlign:'center', fontWeight:700}}>신청하기</Text>
          </View>
        </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#00000030'
  },
  container1: {
    height: 300,
  },
  image: {
    width: Dimensions.get('window').width,
    height: 300,
    resizeMode: 'contain',
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C4C4C4',
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#000000',
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

export default ProductDetails;
