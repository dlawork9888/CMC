import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const designers = [
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

const NewDesignersMore = ({navigation}) => {
  return (
    <View style={{flex:1, backgroundColor:'#FFFFFF'}}>
        <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>신규 디자이너</Text>
        {designers.map((designer) => (
            <View key={designer.name} style={styles.item}>
                <Image style={styles.image} source={{ uri: designer.image }} />
                <View style={{marginLeft:15}}>
                    <Text style={{fontSize:20,color:'#131313',fontWeight:'bold',marginBottom:3}}>{designer.name}</Text>
                    <Text style={{fontSize:15,color:'#131313',marginBottom:3}}>{designer.explanation}</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Image source={require('./NewDesignersMore/heart_icon.png')} style={{width:21,height:21,resizeMode:'cover'}}/>
                        <Text style={{fontSize:18,color:'#131313',fontWeight:'regular',marginLeft:5}}>{designer.likes} likes</Text>
                    </View>
                </View>
            </View>
        ))}
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    justifyContent:'flex-start',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 15,
    marginLeft: 15,
    fontWeight:'bold'
  },
  item: {
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft:15,
    marginBottom:15,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
    borderRadius: 60
  },
});

export default NewDesignersMore;
