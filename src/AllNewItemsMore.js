import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image } from 'react-native';

let AllNewItems = [
  {
    image: "https://picsum.photos/200/300",
    designerName: "이창재1",
    productName: "디자이너 옷입니다",
    dDay: 7
  },
  {
    image: "https://picsum.photos/200/300",
    designerName: "이창재2",
    productName: "디자이너 옷입니다",
    dDay: 7
  },
  {
    image: "https://picsum.photos/200/300",
    designerName: "이창재3",
    productName: "디자이너 옷입니다",
    dDay: 7
  },
  {
    image: "https://picsum.photos/200/300",
    designerName: "이창재4",
    productName: "디자이너 옷입니다",
    dDay: 7
  },
  {
    image: "https://picsum.photos/200/300",
    designerName: "이창재5",
    productName: "디자이너 옷입니다",
    dDay: 7
  },
  {
    image: "https://picsum.photos/200/300",
    designerName: "이창재6",
    productName: "디자이너 옷입니다",
    dDay: 7
  }
];

const AllNewItemsMore = () => {
  const renderDesignerItem = ({ item, index }) => (
    <View style={styles.designerItemContainer}>
      <Image source={{ uri: item.image }} style={styles.designerItemImage} />
      <View style={styles.designerItemInfoContainer}>
        <Text style={styles.designerName}>{item.designerName}</Text>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={styles.dDay}>D-{item.dDay}</Text>
      </View>
    </View>
  );

  return (
    <View style={{backgroundColor:'#FFFFFF'}}>
      <Text style={styles.title}>전체 디자이너 신제품</Text>
      <FlatList
        marginBottom={50}
        data={AllNewItems}
        renderItem={renderDesignerItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.designerItemsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#000000',
    marginTop: 15,
    marginLeft: 15,
    fontWeight:'bold'
  },
  designerItemsContainer: {
  },
  designerItemContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 5,
    backgroundColor: '#ffffff',
    padding: 10
  },
  designerItemImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  designerItemInfoContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  designerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  productName: {
    fontSize: 14,
    marginBottom: 5
  },
  dDay: {
    fontSize: 14,
    color: '#FF5160'
  }
});

export default AllNewItemsMore;
