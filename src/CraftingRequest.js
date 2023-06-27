/*
    private func createMultiPartData(boundary: String, param: [String: Codable]?, imageList: [String: [ImageFile]]?) -> Data {
        var body = Data()
        let boundaryPrefix = "--\(boundary)"

        if let imageList = imageList {
            for (key, images) in imageList {
                for image in images {
                    body.append("\(boundaryPrefix)\r\n".data(using: .utf8)!)
                    body.append("Content-Disposition: form-data; name=\"\(key)\"; filename=\"\(image.filename).png\"\r\n".data(using: .utf8)!)
                    body.append("Content-Type: image/\(image.type)\r\n\r\n".data(using: .utf8)!)
                    body.append(image.data)
                    body.append("\r\n".data(using: .utf8)!)
                }
            }
        }
        
        if let param = param {
            for (key, value) in param {
                guard let data = try? JSONEncoder().encode(value) else { continue }
                body.append("\(boundaryPrefix)\r\n".data(using: .utf8)!)
                body.append("Content-Disposition: form-data; name=\"\(key)\"\r\n".data(using: .utf8)!)
                body.append("Content-Type: application/json\r\n\r\n".data(using: .utf8)!)
                body.append("\(String(decoding: data, as: UTF8.self))\r\n".data(using: .utf8)!)
            }
        }
        
        body.append(boundaryPrefix.data(using: .utf8)!)
        return body
    } 
    
  */

import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity,Image, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import UserContext from './UserContext';
import APIcontext from './APIcontext';
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker'
import RNFetchBlob from 'rn-fetch-blob';
import 'react-native-get-random-values';

const CraftingRequest = ({navigation}) => {
  console.log("CraftingRequest Entered");

//Context
  const userContext = useContext(UserContext);
  const API_context = useContext(APIcontext);


//제목 state
  const [title, setTitle] = useState('');


//카테고리 state
  //요청으로 받은 데이터를 저장하기 위한 State
  const [receivedCateData, setReceivedCateData] = useState([]);
  //대분류
  const [openCategory, setOpenCategory] = useState(false);
  const [categoryValue, setCategoryValue] = useState(null);
  const [categoryItems, setCategoryItems] = useState([
      {label: '보기1', value: '1'},
      {label: '보기2', value: '2'},
  ]);
  //소분류
  const [openSubcategory, setOpenSubcategory] = useState(false);
  const [subcategoryValue, setSubcategoryValue] = useState(null);
  const [subcategoryItems, setSubcategoryItems] = useState([
      {label: '대분류를 먼저 선택해주세요!', value: '1'},
  ]);

//희망가격 state
  const [Price, setPrice] = useState(0);
  //const [highestPrice, setHighestPrice] = useState('');

//요청사항 state
  const [requestOption, setRequestOption] = useState('');

//해당 디자이너 UserID state => 일단은 sibalwhy2로 통일
  const [designerID, setDesignerID] = useState(userContext.userContext.clickedDesignerId);

//업로드할 사진 state
  const [pics, setPics] = useState([]);
  const [picFiles, setPicFiles] = useState([]);
  const handleImagePicker = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        privateDirectory: true
      },
    };
  
    launchImageLibrary(options, async (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        try {
          const source = { uri: response.assets[0].uri };
          console.log('선택한 이미지 uri 경로', source.uri);
  
          // 파일 읽기
          const fileData = await RNFetchBlob.fs.readFile(source.uri, 'base64');
          const fileName = `image_${pics.length + 1}.jpg`;
  
          // 파일 객체 생성
          const file = {
            uri: source.uri,
            name: fileName,
            type: 'image/jpeg',
            //data: fileData,
          };
  
          // picFiles에 파일 추가
          setPicFiles(prevPicFiles => [...prevPicFiles, file]);
          console.debug("picFiles :", picFiles);
          // pics에 URI 추가
          setPics(prevPics => [...prevPics, source]);
        } catch (error) {
          console.log('Error while reading file:', error);
        }
      }
    });
  };
















//디자이너 카테고리 가져오기 GET 요청
const getDesignerCategories = async (designerId) => {
  try {
    console.log('디자이너 전체 카테고리 조회');
    console.log('전송 액세스 토큰:', userContext.userContext.accessToken);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userContext.userContext.accessToken}`
      }
    };
    const response = await axios.get(`http://3.39.131.14:8080/api/v1/designers/${designerId}/categories`, config);
    console.log('Designer categories:', response.data);

    // 받아온 카테고리 정보를 처리하는 로직 추가
    const categoryData = response.data.data;
    // 예시로 카테고리 정보를 콘솔에 출력하는 로직
    categoryData.categoryViews.forEach((categoryView) => {
      console.log('High Category:', categoryView.highCategoryName);
      console.log('Low Categories:', categoryView.lowCategoryNames);
    });
    //카테고리 정보 전체 저장, 출력
    setReceivedCateData(categoryData.categoryViews);
    //대분류 파싱
    const transformedCategoryItems = categoryData.categoryViews.map((categoryView, index) => {
      return {
        label: categoryView.highCategoryName,
        value: categoryView.highCategoryName,
      };
    });
    setCategoryItems(transformedCategoryItems);
    console.log(categoryItems);
  } catch (error) {
    console.error('디자이너 전체 카테고리 조회 실패');
    console.error(error);
    console.error(error.response);
    console.error('에러 상태 코드:', error.response.status);
    console.error('에러 메시지:', error.response.data);
  }
};
useEffect(()=>{
  getDesignerCategories(designerID);
},[])















//대분류 선택 시 하위 카테고리(subcategory) 업데이트
const handleCategoryChange = (value) => {
  setCategoryValue(value);
};
useEffect(() => {
  console.log('선택된 대분류:', categoryValue);
  console.log('receivedCateData:', receivedCateData);

  // categoryValue와 일치하는 객체 찾기
  const selectedCategory = receivedCateData.find((category) => category.highCategoryName === categoryValue);

  if (selectedCategory) {
    console.log('하위 카테고리:', selectedCategory.lowCategoryNames);
    const transformedSubcategoryItems = selectedCategory.lowCategoryNames.map((subcategory, index) => {
      return {
        label: subcategory,
        value: subcategory,
      };
    });
    console.log('변경된 하위 카테고리:', transformedSubcategoryItems);
    setSubcategoryItems(transformedSubcategoryItems);
  } else {
    console.log('일치하는 카테고리가 없습니다.');
  }
}, [categoryValue]);











/*
const createFormData = (boundary, param, imageList) => {
  let body = '';
  const boundaryPrefix = `--${boundary}\r\n`;

  if (imageList) {
    for (const [key, images] of Object.entries(imageList || {})) {
      for (const image of images || []) {
        body += boundaryPrefix;
        body += `Content-Disposition: form-data; name="${key}"; filename="${image.name}"\r\n`;
        body += `Content-Type: ${image.type}\r\n\r\n`;
        body += `${image.fileData}\r\n`;
      }
    }
  }

  if (param) {
    for (const [key, value] of Object.entries(param)) {
      const jsonValue = JSON.stringify(value);
      body += boundaryPrefix;
      body += `Content-Disposition: form-data; name="${key}"\r\n`;
      body += 'Content-Type: application/json\r\n\r\n';
      body += `${jsonValue}\r\n`;
    }
  }

  body += `${boundaryPrefix}--`;

  return body;
};

// Usage:
const customRegisterParams = {
  title: title,
  highCategory: categoryValue,
  lowCategory: subcategoryValue,
  desiredPrice: parseInt(Price),
  requirement: requestOption,
  designerId: parseInt(designerID)
};

const imageList = {
  key1: picFiles, // Assuming 'picFiles' contains an array of image file objects
};






function generateBoundary() {
  return `---------------------------${Date.now().toString(16)}`;
}
const formData = createFormData(generateBoundary(), customRegisterParams, imageList);
console.log("formData :", formData);
*/



const postCustomRequest = async () => {
  try {
    const config = {
      'Content-Type': `multipart/form-data`,
      'Authorization': `Bearer ${userContext.userContext.accessToken}`,
    };

    formData = new FormData();

    picFiles.forEach((file, index) => {
      formData.append('files', file);
    });
    
    const customRegisterParams = {
      title: title,
      highCategory: categoryValue,
      lowCategory: subcategoryValue,
      desiredPrice: parseInt(Price),
      requirement: requestOption,
      designerId: parseInt(designerID)
    };

    
    const plusAppJson = JSON.stringify(customRegisterParams);

    formData.append('customRegisterParams', plusAppJson);
    
    console.log(formData);
    const response = await axios.post(API_context.post_crafting_request, 2, 
      {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${userContext.userContext.accessToken}`,
        },
        transformRequest: () => formData,
      });

    console.log('Custom request created:', response.data);
    
    Alert.alert(
      '커스텀 제작 요청 성공!',
      '이전 페이지로 이동합니다.',
      [
        {
          text: '확인',
          onPress: () => {
            navigation.goBack();
          },
        },
      ],
      { cancelable: false },
    );
    // 받아온 응답 데이터를 처리하는 로직 추가
  } catch (error) {
    console.error(error);
    console.error('커스텀 제작 요청 생성 실패');
    Alert.alert(
      '커스텀 제작 요청 실패!',
      '잠시 후 다시 시도해주세요.',
      [
        {
          text: '확인',
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }
};


/*
const postCustomRequest = async () => {
  try {

    const headers = {
      'Content-Type': `multipart/form-data`,
      'Authorization': `Bearer ${userContext.userContext.accessToken}`
    };

    const formData = new FormData();

    picFiles.forEach((file, index) => {
      formData.append('files', file);
    });

    
    const customRegisterParams = {
      title: title,
      highCategory: categoryValue,
      lowCategory: subcategoryValue,
      desiredPrice: parseInt(Price),
      requirement: requestOption,
      designerId: parseInt(designerID)
    };

    const plusAppJson = new Blob([JSON.stringify(customRegisterParams)],{type: 'application/json'});

    formData.append('customRegisterParams', plusAppJson);

    console.log('전송 데이터 :', formData);
    const response = await fetch(API_context.post_crafting_request, {
      method: 'POST',
      headers: headers,
      body: formData
    });


    if (response.ok) {
      const responseData = await response.json();
      console.log('Custom request created:', responseData);
      
      Alert.alert(
        '커스텀 제작 요청 성공!',
        '이전 페이지로 이동합니다.',
        [
          {
            text: '확인',
            onPress: () => {
              navigation.goBack();
            },
          },
        ],
        { cancelable: false },
      );
      
      // 받아온 응답 데이터를 처리하는 로직 추가
    } else {
      console.error('커스텀 제작 요청 생성 실패');
      console.error('에러 상태 코드:', response.status);
      console.error('에러 메시지:', await response.text());
      console.error('에러 응답:',response);
      Alert.alert(
        '커스텀 제작 요청 실패!',
        '잠시 후 다시 시도해주세요.',
        [
          {
            text: '확인',
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
    }
  } catch (error) {
    console.error(error);
    console
    Alert.alert(
      '커스텀 제작 요청 실패!',
      '잠시 후 다시 시도해주세요.',
      [
        {
          text: '확인',
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }
};
*/













  return (
    <View style={{flex:1,backgroundColor:'#FFFFFF'}}>
{/*헤더*/}
    <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center', backgroundColor:'#FFFFFF', height:60}} >
      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Image
          source={require('./App/header_back_icon.png')}
          style={{width:49,height:42, resizeMode:'contain'}}
        />
      </TouchableOpacity>
      <Text style={{fontSize:20,color:'#000000'}}>제작 요청</Text>
      <View style={{width:49,height:42,marginRight:10}}></View>
    </View>
    <ScrollView style={{backgroundColor:'#FFFFFF'}}>
{/*제목*/}
      <View style={{flexDirection:'column', marginHorizontal:15,marginTop:20}}>
        <Text style={{fontSize:25, color:'#000000'}}>제목</Text>
        <TextInput
          style={{
            fontSize:15,
            height: 40,
            borderBottomColor: '#000000',
            borderBottomWidth: 1,
            marginVertical: 5,
          }}
          maxLength={30}
          placeholder="제목을 입력해주세요. (최대 30자)"
          value={title}
          onChangeText={setTitle}
        />
      </View>
{/*카테고리*/}
      <View style={{flexDirection:'column', marginHorizontal:15,marginTop:20}}>
        <Text style={{fontSize:25, color:'#000000'}}>카테고리</Text>
        <DropDownPicker
          style={{marginTop:10}}
          open={openCategory}
          value={categoryValue}
          items={categoryItems}
          setOpen={setOpenCategory}
          setValue={handleCategoryChange}
          setItems={setCategoryItems}
          placeholder="대분류"
          listMode="MODAL"
          modalProps={{
            animationType: 'fade',
          }}
          modalTitle="대분류"
        />
        <DropDownPicker
          style={{marginTop:10}}
          open={openSubcategory}
          value={subcategoryValue}
          items={subcategoryItems}
          setOpen={setOpenSubcategory}
          setValue={setSubcategoryValue}
          setItems={setSubcategoryItems}
          placeholder="소분류"
          listMode="MODAL"
          modalProps={{
            animationType: 'fade',
          }}
          modalTitle="소분류"
        />
      </View>
{/*희망 가격*/}
      <View style={{flexDirection:'column', marginHorizontal:15,marginTop:20}}>
        <Text style={{fontSize:25, color:'#000000'}}>희망가격</Text>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <TextInput
            style={{
              flex:1,
              fontSize:15,
              height: 40,
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
              marginVertical: 5,
            }}
            placeholder='0'
            textAlign='right'
            keyboardType='numeric'
            onChangeText={setPrice}
            value={Price}
          />
          <Text style={{fontSize:18,color:'#000000'}}>원</Text>
        </View>
      </View>
{/*요청 사항*/}
      <View style={{flexDirection:'column', marginHorizontal:15,marginTop:20}}>
        <Text style={{fontSize:25, color:'#000000'}}>요청사항</Text>
        <TextInput
          style={{borderColor:'#000000', borderWidth:1, borderRadius:5,marginVertical:5, padding:10}}
          placeholder="요청사항을 입력하세요!"
          multiline={true}
          textAlignVertical='top'
          numberOfLines={4}
          onChangeText={setRequestOption}
          value={requestOption}
        />
      </View>
{/*사진 업로드*/}
      <View style={{flexDirection:'column', marginHorizontal:15,marginTop:15}}>
        <Text style={{fontSize:25, color:'#000000'}}>사진 업로드</Text>
        <ScrollView horizontal={true} style={{marginTop:10}}>
          {pics.map((pic,index)=>(
            <Image
              source={pic}
              style= {{width:100,height:100,resizeMode:'cover', marginRight:10, borderRadius:5}}
              key = {index}

            />
          ))}
          <TouchableOpacity onPress={handleImagePicker}>
            <Image
              source={require('./CraftingRequest/image_plus.png')}
              style= {{width:100,height:100,resizeMode:'cover', marginRight:10, borderRadius:5}}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
      {/*권한 요청 필요. 추후 작성 예정*/}
{/*요청하기*/}
<View style={{height:70, borderTopWidth:2, borderTopColor:'#DDDDDD',marginTop:50}}>
  <TouchableOpacity
    onPress={()=>{
      postCustomRequest();
    }} 
    style={{margin:10, backgroundColor:'#FF5160', height:50,borderRadius:5, alignItems:'center', justifyContent:'center'}}
  >
    <Text style={{fontSize:17, color:'#FFFFFF'}}>요청하기</Text>
  </TouchableOpacity>
</View>
    </ScrollView>
    </View>
  );
};

export default CraftingRequest;
