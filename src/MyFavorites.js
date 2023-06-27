import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, FlatList,Image } from 'react-native';

let recruitingProducts = [
    {
        productImage:'https://picsum.photos/200/300',
        designerImage: 'https://picsum.photos/200/300',
        designerName: '디자이너1',
        productName: 'Product Name2',
        dDay: 7
    },{
        productImage:'https://picsum.photos/200/300',
        designerImage: 'https://picsum.photos/200/300',
        designerName: '디자이너2',
        productName: 'Product Name2',
        dDay: 7
    },{
        productImage:'https://picsum.photos/200/300',
        designerImage: 'https://picsum.photos/200/300',
        designerName: '디자이너3',
        productName: 'Product Name3',
        dDay: 7
    },{
        productImage:'https://picsum.photos/200/300',
        designerImage: 'https://picsum.photos/200/300',
        designerName: '디자이너4',
        productName: 'Product Name4',
        dDay: 7
    },{
        productImage:'https://picsum.photos/200/300',
        designerImage: 'https://picsum.photos/200/300',
        designerName: '디자이너5',
        productName: 'Product Name5',
        dDay: 7
    },{
        productImage:'https://picsum.photos/200/300',
        designerImage: 'https://picsum.photos/200/300',
        designerName: '디자이너6',
        productName: 'Product Name7',
        dDay: 7
    },{
        productImage:'https://picsum.photos/200/300',
        designerImage: 'https://picsum.photos/200/300',
        designerName: '디자이너7',
        productName: 'Product Name7',
        dDay: 7
    },{
        productImage:'https://picsum.photos/200/300',
        designerImage: 'https://picsum.photos/200/300',
        designerName: '디자이너8',
        productName: 'Product Name8',
        dDay: 7
    },
]

const favoriteDesigners = [
    {
      image: 'https://picsum.photos/200/300',
      name: '디자이너1',
      explanation: '디자이너1 설명',
      likes: 12000,
    },
    {
      image: 'https://picsum.photos/200/300',
      name: '디자이너2',
      explanation: '디자이너2 설명',
      likes: 12000,
    },
    {
      image: 'https://picsum.photos/200/300',
      name: '디자이너3',
      explanation: '디자이너3 설명',
      likes: 12000,
    },
    {
      image: 'https://picsum.photos/200/300',
      name: '디자이너4',
      explanation: '디자이너4 설명',
      likes: 12000,
    },
    {
      image: 'https://picsum.photos/200/300',
      name: '디자이너5',
      explanation: '디자이너5 설명',
      likes: 12000,
    },
    {
      image: 'https://picsum.photos/200/300',
      name: '디자이너6',
      explanation: '디자이너6 설명',
      likes: 12000,
    },
    {
      image: 'https://picsum.photos/200/300',
      name: '디자이너7',
      explanation: '디자이너7 설명',
      likes: 12000,
    },
    {
      image: 'https://picsum.photos/200/300',
      name: '디자이너8',
      explanation: '디자이너8 설명',
      likes: 12000,
    },
  ];

const MyFavorites = ({navigation}) => {
  const [isRecruiting, setIsRecruiting] = useState(true);

  const toggleIsRecruiting = () => {
    setIsRecruiting(!isRecruiting);
  };
  
  return (
    <View style={{backgroundColor:'#FFFFFF',flex:1}}>
        <View style={{marginTop:10,flexDirection:'row', justifyContent:'space-around'}}>
            <TouchableOpacity onPress={toggleIsRecruiting}>
                <Text style={{fontSize:16, color: isRecruiting ? '#000000' : '#9A9A9A', fontWeight: isRecruiting ? 'bold' : 'normal'}}>상품 찜</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleIsRecruiting}>
                <Text style={{fontSize:16, color: !isRecruiting ? '#000000' : '#9A9A9A', fontWeight: !isRecruiting ? 'bold' : 'normal'}}>디자이너 찜</Text>
            </TouchableOpacity>
        </View>
{/*경계 View 컴포넌트*/}
        <View style={{backgroundColor:'#DFDFDF',marginTop:10,height:1}}></View>
{/*모집 중인 제품 리스트*/}
        {isRecruiting&&(
                <FlatList
                    contentContainerStyle={{paddingTop:20,justifyContent:'space-around'}}                                       /*여기 이딴식으로 비율로 설정할바엔 그냥 픽셀로 설정하는게 나음*/
                    data={recruitingProducts}
                    renderItem={({item})=>(
                    <View style={{width:'42%',marginLeft:'5.5%',marginBottom:10}}>
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
                            <Text style={{fontSize:17, color:'#FF5160',marginLeft:3}}>D-{item.dDay}</Text>
                            <Image
                                source={require('./MyFavorites/heart_icon.png')}
                                style={{width:21,aspectRatio:1}}
                            />
                        </View>
                    </View>
                    )}
                    keyExtractor={(item) => item.productName}
                    numColumns={2}
                    scrollEnabled={true}
                />
        )}
{/*참여 마감 눌렀을때 나오는 컴포넌트*/}
        {!isRecruiting&&(

                <ScrollView contentContainerStyle={{alignItems:'center',paddingBottom:30}}>
                    {favoriteDesigners.map((designer) => (
                        <View
                            key={designer.name}
                            style={{flexDirection:'row', alignItems:'center', marginTop:30}}
                        >
                            <Image
                                source={{ uri: designer.image }}
                                style={{width:90, aspectRatio:1, borderRadius:50}}
                                resizeMode='cover'
                            />
                            <View style={{marginLeft:20, width:200}}>
                                <Text style={{fontSize:20,color:'#131313',fontWeight:'bold',marginBottom:3}}>{designer.name}</Text>
                                <Text style={{fontSize:15,color:'#131313',marginBottom:3}}>{designer.explanation}</Text>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <Image source={require('./MyFavorites/heart_icon.png')} style={{width:21,height:21,resizeMode:'cover'}}/>
                                    <Text style={{fontSize:18,color:'#131313',fontWeight:'regular',marginLeft:5}}>{designer.likes} likes</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
        )}
    </View>
  );
}

export default MyFavorites;
