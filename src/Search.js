import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UserContext from './UserContext';
import APIcontext from './APIcontext';
import axios from 'axios';


let sample_searchDoneProducts = [
  {
      image:'https://picsum.photos/200/300',
      designerImage:'https://picsum.photos/200/300',
      designerName:'디자이너1',
      productName:'제품1',
      price:12000,
      productId:-1,
  },
];

let sample_designerSearch = [
  {
    designerImage:'https://picsum.photos/200/300',
    designerName:'디자이너1',
    designerExplaination:'디자이너 1 설명',
    likes:12000,
    designerId: -1,
  },
];




const Search = ({navigation}) => {

  const userContext = useContext(UserContext);
  const API_context = useContext(APIcontext);

  const [searchDoneProducts, setSearchDoneProducts] = useState(sample_searchDoneProducts);
  const [designerSearch,setDesignerSearch] = useState(sample_designerSearch);

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(userContext.userContext.searchHistory);
  
//입력 완성 state
  const [searchDone,setSearchDone] = useState(false);

  const handleSearch = text => {
    const newData = DATA.filter(item => {
      const itemData = item.title.toLowerCase();
      const textData = text.toLowerCase();
      return itemData.indexOf(textData) > -1;
    });
    setFilteredData(newData);
  };

//제품 검색 데이터 요청
  const getProductByKeyword = async (keyword) => {
    try {
      const response = await axios.get(`http://3.39.131.14:8080/api/v1/product/search?keyword=${encodeURIComponent(keyword)}`, {
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${userContext.userContext.accessToken}`
        }
      });
  
      const data = response.data;
      console.debug(data);
      // Handle the response data as needed
      if (data.isSuccess) {
        const parsedProducts = data.data.map((product) => ({
          image: product.mainImgUrl,
          designerImage: product.profileImgUrl,
          designerName: product.designerName,
          productName: product.name,
          price: product.price,
          productId: product.productId
        }));
        setSearchDoneProducts(parsedProducts);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(()=>{
    getProductByKeyword(searchText);
  },[searchText]);

  //디자이너 검색 데이터 요청
  const getDesignersByKeyword = async (keyword) => {
    try {
      const response = await axios.get(`http://3.39.131.14:8080/api/v1/designers/search?keyword=${encodeURIComponent(keyword)}`, {
        headers: {
          'Accept': '*/*',
          'Authorization': `Bearer ${userContext.userContext.accessToken}`
        }
      });
  
      const data = response.data;
      console.debug(data);
          if (data.isSuccess) {
      const parsedDesigners = data.data.map((designer) => ({
        designerImage: designer.designerInfoCard.profileImgUrl,
        designerName: designer.designerInfoCard.name,
        designerExplaination: designer.designerInfoCard.introduce,
        likes: designer.designerInfoCard.likes,
        designerId: designer.designerInfoCard.designerId
      }));
      setDesignerSearch(parsedDesigners);
      console.debug(parsedDesigners);
    }
    } catch (error) {
      //console.error(error);
    }
  };

  useEffect(()=>{
    getProductByKeyword(searchText);
  },[searchText]);

  
  useEffect(() => {
    if (searchText.trim() === '') {
      setSearchDone(false);
    } else {
      setSearchDone(true);
      getProductByKeyword(searchText);
      getDesignersByKeyword(searchText);
    }
  }, [searchText]);

  useEffect(()=>{
    setFilteredData(userContext.userContext.searchHistory);
  },[userContext.userContext.searchHistory]);
















  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#FF5160', borderRadius:4,marginHorizontal:15}}>
        <Icon style={{marginLeft:10}} name="search" size={24} color="#FFFFFF"/>
        <TextInput
          style={{fontSize:16, color:'#FFFFFF'}}
          placeholder="검색어를 입력해주세요."
          placeholderTextColor={'#FFFFFF'}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
{/*검색 전 View*/}
      {!searchDone &&(
        <View style={{ marginTop: 35, marginLeft: 30 }}>
          <Text style={{fontSize:17, color:'#000000'}}>최근 검색</Text>
          {filteredData.map((item, index)=>(
            <TouchableOpacity 
              key={index}
              onPress = {()=>{
                setSearchText(item);
            }}>
              <Text style={{fontSize:20,color:"#A7A7A7",marginTop:12}}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
{/*검색 후 View*/}
    {searchDone && (
    <View>
      <View style={{ marginTop: 35}}>
        <Text style={{fontSize:17, color:'#000000', marginLeft: 20 }}>완성 제품 검색</Text>
        <FlatList
          contentContainerStyle={{marginTop:10}}
          key={2}
          data={searchDoneProducts}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={{width:'42%',marginLeft:'5.5%',marginBottom:10}}>
              <TouchableOpacity
                style={{flex:1}}
                onPress={()=>{
                  userContext.setClickedProductId(item.productId);
                  userContext.setSearchHistory(prevHistory => [searchText,...prevHistory])
                  console.log(userContext.userContext.searchHistory);
                  navigation.navigate('ProductDetails');
                }}
              >
                <Image
                    style={{width:'100%',aspectRatio:1}}
                    source={{uri : item.image}}
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
                <View style={{flexDirection:'row',alignItems:'center',marginTop:3}}>
                  <Image
                    source={require('./Search/heart_icon.png')}
                    style={{width:0,aspectRatio:1,borderRadius:10}}
                  />
                  <Text style={{fontSize:13, color:'#FF5160',marginLeft:3}}>{item.price !== undefined ? item.price.toLocaleString():''}원</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          scrollEnabled={false}
        />
        <View style={{backgroundColor:'#FF516024',marginHorizontal:20,marginTop:10, height:35, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize:17, color:'#000000'}}>전체 보기</Text>
        </View>
      </View>

{/*모집중 제품 검색

      <View style={{ marginTop: 35}}>
        <Text style={{fontSize:17, color:'#000000', marginLeft: 20 }}>모집중 제품 검색</Text>
        <FlatList
          contentContainerStyle={{marginTop:10}}
          key={2}
          data={sample_searchDoneProducts}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={{width:'42%',marginLeft:'5.5%',marginBottom:10}}>
              <Image
                  style={{width:'100%',aspectRatio:1}}
                  source={{uri : item.image}}
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
              <View style={{flexDirection:'row',alignItems:'center',marginTop:3}}>
                <Image
                  source={require('./Search/heart_icon.png')}
                  style={{width:15,aspectRatio:1,borderRadius:10}}
                />
                <Text style={{fontSize:13, color:'#000000',marginLeft:3}}>{item.likes}</Text>
              </View>
            </View>
          )}
          scrollEnabled={false}
        />
        <View style={{backgroundColor:'#FF516024',marginHorizontal:20,marginTop:10, height:35, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize:17, color:'#000000'}}>전체 보기</Text>
        </View>
      </View>

*/}
      
{/*디자이너 검색*/}
      <View style={{ marginTop: 35, marginBottom:50}}>
       <Text style={{fontSize:17, color:'#000000', marginLeft: 20 }}>디자이너 검색</Text>
       <View style={{marginTop:10}}>
        <FlatList
            data={designerSearch}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 20, marginLeft:20 ,flexDirection:'row', alignItems:'flex-start'}}>
                <TouchableOpacity 
                  style={{flex:1,flexDirection:'row', alignItems:'flex-start'}}
                  onPress = {()=>{
                    userContext.setClickedDesignerId(item.designerId);
                    navigation.navigate('DesignerProfile');

                  }}
                >
                <Image source={{ uri: item.designerImage }} style={{ width: 100, height: 100, resizeMode: 'cover' ,borderRadius:50}} />
                  <View style={{flexDirection:'column', justifyContent:'space-between', marginLeft:10}}>
                    <Text style={{ fontSize: 17, marginTop: 10 ,color:'#000000'}}>{item.designerName}</Text>
                    <Text style={{ fontSize: 13, color:'#000000' }}>{item.designerExplaination}</Text>
                    <View style={{flexDirection:'row',alignItems:'center',marginTop:3}}>
                      <Image
                        source={require('./Search/heart_icon.png')}
                        style={{width:15,aspectRatio:1,borderRadius:10}}
                      />
                      <Text style={{fontSize:15, color:'#000000',marginLeft:3}}>{item.likes}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.designerName}
            numColumns={1}
            scrollEnabled={false}
          />
        </View>
        <View style={{backgroundColor:'#FF516024',marginHorizontal:20,marginTop:10, height:35, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize:17, color:'#000000'}}>전체 보기</Text>
        </View>
      </View>
      

    </View>

      
    )}
    

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
  },
  listItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Search;
