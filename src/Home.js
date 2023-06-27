import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground,Image } from 'react-native';
import { ScrollView,FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
//UserContext
import UserContext from './UserContext';
import APIcontext from './APIcontext';




//샘플 데이터
//단일 객체
let sample_topProduct = {
  image : "://ku-cmc-bucket.s3.ap-northeast-2.amazonaws.com/ROLE_DESIGNER/info/6/product-img/5/THUMBNAIL/e1b6a72c-00e4-4aca-942b-f4d8af3aaf64https",
  price : 11,
  name : "카우하이드 싱글 라이더 자켓",
  hashTags : [
    "편함", "천연가죽", "저렴함"
  ],
};




//인기 상품
let sample_favoriteDesignerNewItem = [

];

//객체 배열
let sample_allNewItem = [

];




//객체 배열
let sample_popularDesignersByMaterial = [

];

//객체 배열
let sample_popularDesignersByCategory = [

];

//객체 배열
let sample_newDesigners = [
  {
    image : "https://picsum.photos/200/300",
    name : "임태규1",
    hashTags : [
      "상의","하의","데님"
    ],
    received_designerId: -1
  },
  ];

const Home = ({navigation}) => {
  //UserContext
  const userContext = useContext(UserContext);
  const API_context = useContext(APIcontext);
  console.log("Home Entered");
  console.log("UserType :",userContext.userContext.userType);
  console.log("User Access Token :", userContext.userContext.accessToken);
  console.log("User Refresh Token :", userContext.userContext.refreshToken);
  console.log("UserID :", userContext.userContext.userId);

  //States
  const [topProduct, setTopProduct] = useState(sample_topProduct);
  const [favoriteDesignerNewItem, setFavoriteDesignerNewItem] = useState(sample_favoriteDesignerNewItem);
  const [allNewItem,setAllNewItem] = useState(sample_allNewItem);
  const [popularDesignersByMaterial, setPopularDesignersByMaterial] = useState(sample_popularDesignersByMaterial);
  const [popularDesignersByCategory, setPopularDesignersByCategory] = useState(sample_popularDesignersByCategory);
  const [newDesigners, setNewDesigners] = useState(sample_newDesigners);





  // 좋아요 순 인기 디자이너 get 요청 함수
  const getTopLikedDesigners = async () => {
    try {
      const response = await axios.get(API_context.get_likes_descend_designers, {
        params: {
          limit: 7
        },
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*',
          'Authorization': `Bearer ${userContext.userContext.accessToken}`
        }
      });

      const designers = response.data.data.popularDesigners;
      const formattedDesigners = designers.map(designer => ({
        image: designer.profileImgUrl,
        name: designer.name,
        hashTags: designer.categoryNames,
        received_designerId: designer.designerId
      }));

      setPopularDesignersByCategory(formattedDesigners);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


//신규 디자이너 get 요청
const getNewDesigners = async () => {
  try {
    const response = await axios.get(API_context.get_likes_descend_designers, {
      params: {
        duration: 10,
        limit: 7
      },
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': `Bearer ${userContext.userContext.accessToken}`
      }
    });

    console.log('신규 디자이너 응답 데이터:',response.data.data.popularDesigners);
    const designers = response.data.data.popularDesigners;
    const formattedDesigners = designers.map(designer => ({
      image: designer.profileImgUrl,
      name: designer.name,
      hashTags: designer.categoryNames,
      received_designerId: designer.designerId
    }));

    console.log(formattedDesigners);
    setNewDesigners(formattedDesigners);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


//인기 제품
const getPopularProducts = async () => {
  try {
    const response = await axios.get(API_context.get_popular_products, {
      pageable: {
          page: 5,
          size: 5,
          sort: []
        },
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': `Bearer ${userContext.userContext.accessToken}`
      },
    });

    console.debug("인기 상품 :",response.data.data);
    const products = response.data.data;
    const formattedProducts = products.map(product => ({
      image: product.mainImgUrl,
      designerName: product.designerName,
      productName: product.name,
      received_productId: product.productId,
      productLikes: product.productLikeCount,
      received_designerId: product.designerId,
      price: product.price,
      designerProfileImage : product.profileImgUrl,
    }));
    setFavoriteDesignerNewItem(formattedProducts);
{/*
    const topItem = response.data.data[0];
    const formattedTopItem = {
      image: topItem.mainImgUrl,
      price: 11,
      name: topItem.name,
      hashTags : ["깔끔", "편안", "데일리"]
    };
    setTopProduct(formattedTopItem);
*/}
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};




//전체 신제품
const getAllProducts = async () => {
  try {
    const response = await axios.get(API_context.get_all_products, {
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        'Authorization': `Bearer ${userContext.userContext.accessToken}`
      },
    });
    
    console.debug('전체 제품 :',response.data.data);
    const products = response.data.data;
    const formattedProducts = products.map(product => ({
      image: product.mainImgUrl,
      designerName: product.designerName,
      productName: product.name,
      received_productId: product.productId,
      productLikes: product.productLikeCount,
      received_designerId: product.designerId,
      price: product.price,
      designerProfileImage : product.profileImgUrl,
    }));
    setAllNewItem(formattedProducts);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


  useEffect(() => {
    getTopLikedDesigners();
    getNewDesigners();
    getPopularProducts();
    getAllProducts();
  }, []);

  

  




  return (
  <View style={{flex:1,backgroundColor:'#FFFFFF'}}> 
    <ScrollView>
      <ImageBackground source={require("./Home/mock_pic.jpg")} style={{resizeMode: 'cover',justifyContent: 'center'}}>
        <View style = {styles.container_top}>
          <Text style={{fontSize: 50,color:"#FF5160", marginTop:10,marginLeft:15}}>D-{topProduct.price}</Text>
          <Text style={{fontSize: 25,color:"#999999", marginTop:30,marginLeft:15}}>{topProduct.name}</Text>
          {/* map */}
          <View style={{flexDirection:'row',marginTop:10}}>
            {topProduct.hashTags.map((tag, index) => (
              <Text key={index} style={[styles.hashtag,{fontSize:12,marginLeft:10,color:"#999999"}]}>
                #{tag}
              </Text>
            ))}
          </View>
        </View>
      </ImageBackground>


{/*인기상품*/}       
    <View style={styles.container1}>

      <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20,marginLeft:15,marginRight:15}}>
        <Text style={{fontSize:18,color:"#131313"}}>인기 상품</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('FavoriteDesignerMoreItems')}>
          <Text>더보기</Text>
        </TouchableOpacity>
      </View>
    
      <FlatList
        marginLeft={15}
        marginTop={10}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={favoriteDesignerNewItem}
        renderItem={({item}) =>
        <TouchableOpacity onPress={()=>{
          navigation.navigate('ProductDetails')
          userContext.setClickedProductId(item.received_productId)
          }}>
          <View style={{marginRight:15}}>
            <View style={{width:100,height:100}}>
              <Image
                source={{uri:item.image}}
                resizeMode='cover'
                style={{width:'100%', height:'100%'}}
              />
            </View>
            <View style={{flexDirection:'row', alignItems:'center', marginVertical:2}}>
                <Image 
                  style={{width:18, height:18, resizeMode: 'cover', borderRadius:1000, marginRight:5}}
                  source={{ uri: item.designerProfileImage}}
                />
                <Text style={{fontSize:14,color:"#131313"}}>{item.designerName}</Text>
              </View>
            <Text style={{fontSize:12,flexWrap: 'wrap', maxWidth: 120}}>{item.productName}</Text>
            <Text style={{fontSize:12,color:"#FF5160"}}>{item.price.toLocaleString()}원</Text>
          </View>
        </TouchableOpacity>
        }
/*리스트를 뷰로 뿌릴때 키 설정이 중요, 그래서 보내주는 디자이너 정보에 디자이너 고유 키 값까지 포함되어야함.*/
        keyExtractor={item => item.designerName}
      />
    </View>
    

{/*전체 디자이너 신제품*/}    
    <View style={styles.container1}>

        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20,marginLeft:15,marginRight:15}}>
        <Text style={{fontSize:18,color:"#131313"}}>전체 신제품</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('AllNewItemsMore')}>
          <Text>더보기</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        marginLeft={15}
        marginTop={10}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={allNewItem}
        renderItem={({item}) =>
          <TouchableOpacity onPress={()=>{
            navigation.navigate('ProductDetails')
            userContext.setClickedProductId(item.received_productId)
          }}>
            <View style={{marginRight:15}}>
              <View style={{width:100,height:100}}>
                <Image
                  source={{uri:item.image}}
                  resizeMode='cover'
                  style={{width:'100%', height:'100%'}}
                />
              </View>
              <View style={{flexDirection:'row', alignItems:'center', marginVertical:2}}>
                <Image 
                  style={{width:18, height:18, resizeMode: 'cover', borderRadius:1000, marginRight:5}}
                  source={{ uri: item.designerProfileImage}}
                />
                <Text style={{fontSize:14,color:"#131313"}}>{item.designerName}</Text>
              </View>
              <Text style={{fontSize:12,flexWrap: 'wrap', maxWidth: 120}}>{item.productName}</Text>
              <Text style={{fontSize:12,color:"#FF5160"}}>{item.price.toLocaleString()}원</Text>
            </View>
          </TouchableOpacity>
        }
/*리스트를 뷰로 뿌릴때 키 설정이 중요, 그래서 보내주는 디자이너 정보에 디자이너 고유 키 값까지 포함되어야함.*/
        keyExtractor={item => item.designerName}
      />
    </View>  





      <View style={{width:'100%',height:5,backgroundColor:"#E4E4E4",marginTop:10}}/>



{/*
      <View style={styles.container1}>
        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20,marginLeft:15,marginRight:15}}>
          <Text style={{fontSize:18,color:"#131313"}}>소재별 인기 디자이너</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('PopularDesignersByMaterialMore')}>
            <Text>더보기</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          marginLeft={15}
          marginTop={10}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={popularDesignersByMaterial}
          renderItem={({item}) =>       
          <TouchableOpacity onPress={()=>navigation.navigate('DesignerProfile')}>
            <View style={{marginRight:15,alignItems:'center'}}>
              <View style={{width:90,height:90}}>
                <Image
                  source={{uri:item.image}}
                  resizeMode='cover'
                  style={{width:'100%', height:'100%'}}
                  borderRadius={50}
                />
              </View>
              <Text style={{fontSize:15,color:"#131313"}}>{item.name}</Text>

              <Text style={{fontSize:12}}>{item.hashTags.map(tag => ' #'+tag)}</Text>
            </View>
          </TouchableOpacity>
          }
          keyExtractor={item => item.name}
        />
      </View>
    소재별 인기 디자이너 */}
 

{/*인기 디자이너*/}
 <View style={styles.container1}>


        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20,marginLeft:15,marginRight:15}}>
          <Text style={{fontSize:18,color:"#131313"}}>인기 디자이너</Text>
          <TouchableOpacity onPress={()=>{
            navigation.navigate('PopularDesignersByCategoryMore')
          }}>
            <Text>더보기</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          marginLeft={0}
          marginTop={10}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={popularDesignersByCategory}
          renderItem={({item,index}) =>
          <TouchableOpacity onPress={()=>{
            navigation.navigate('DesignerProfile');
            userContext.setClickedDesignerId(item.received_designerId)
          }}>
            <View style={{marginLeft: index === 0 ?15:0,marginRight:15,alignItems:'center'}}>
              <View style={{width:90,height:90}}>
                <Image
                  source={{uri:item.image}}
                  resizeMode='cover'
                  style={{width:'100%', height:'100%'}}
                  borderRadius={500}
                />
              </View>
              <Text style={{fontSize:15,color:"#131313"}}>{item.name}</Text>
              <Text style={{fontSize:12,flexWrap: 'wrap', maxWidth: 100}}>{item.hashTags.map(tag => ' #'+tag)}</Text>
            </View>
          </TouchableOpacity>
          }
          keyExtractor={item => item.name}
        />
      </View>



 {/*신규 디자이너*/}
 <View style={styles.container1}>


        <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20,marginLeft:15,marginRight:15}}>
          <Text style={{fontSize:18,color:"#131313"}}>신규 디자이너</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('NewDesignersMore')}>
            <Text>더보기</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          marginLeft={0}
          marginTop={10}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={newDesigners}
          renderItem={({item, index}) =>
/*Touchable Opacity*/
            <TouchableOpacity onPress={()=>{
              navigation.navigate('DesignerProfile');
              userContext.setClickedDesignerId(item.received_designerId)
            }}>
            <View style={{marginLeft: index === 0 ?15:0,marginRight:15,alignItems:'center'}}>
              <View style={{width:90,height:90}}>
                <Image
                  source={{uri:item.image}}
                  resizeMode='cover'
                  style={{width:'100%', height:'100%'}}
                  borderRadius={50}
                />
              </View>
              <Text style={{fontSize:15,color:"#131313"}}>{item.name}</Text>
{/*여기 다시 한번 볼 필요 있음*/}
              <Text style={{fontSize:12,flexWrap: 'wrap', maxWidth: 100}}>{item.hashTags.map(tag => ' #'+tag)}</Text>
            </View>
          </TouchableOpacity>
          }
/*리스트를 뷰로 뿌릴때 키 설정이 중요, 그래서 보내주는 디자이너 정보에 디자이너 고유 키 값까지 포함되어야함.*/
          keyExtractor={item => item.name}
        />
      </View>

{/*
<TouchableOpacity onPress={()=>navigation.navigate('PracticePage')}>
  <Text>Go to PracticePage</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>navigation.navigate('PracticePage2')}>
  <Text>Go to PracticePage2</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>navigation.navigate('ProgressBarExample')}>
  <Text>Go to ProgressBarExample</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>navigation.navigate('ImageResizingExample')}>
  <Text>Go to ImageResizingExample</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>navigation.navigate('ProductRegistration')}>
  <Text>Go to ProductRegistration</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>navigation.navigate('LoginPractice')}>
  <Text>Go to LoginPractice</Text>
</TouchableOpacity>
*/}


{/*아래 너무 붙지 않게 경계 View*/}
      <View style={{height:50}}></View>


    </ScrollView>
  </View>
  );
};

const styles = StyleSheet.create({
  container_top : {
    height : 210,
    width: '100%', 
  },
  container1:{
    width:'100%',
    /*높이 설정 안하고 그냥 내부 컴포넌트에 맞게 줄어들게끔*/
  },
});

export default Home;