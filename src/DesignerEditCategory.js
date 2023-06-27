import React, { useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import axios from 'axios';
//UserContext
import UserContext, { UserContextProvider } from './UserContext';
import APIcontext from './APIcontext';


let designerInfo = {
  designerImage: 'https://picsum.photos/200/300',
  designerName: '사용자 이름',
  categoryList: [
    {
      category: '상의',
      subcategory: ['니트', '맨투맨']
    },
    {
      category: '하의',
      subcategory: ['데님', '면바지', '카고바지']
    }
  ]
};

const DesignerEditCategory = ({ navigation }) => {
  //UserContext
  const userContext = useContext(UserContext);

  const API_context = useContext(APIcontext);

  console.log("DesignerEditProfile entered");
  console.log("UserType :", userContext.userContext.userType);

  //카테고리 추가, 수정을 위한 State
  const [userInfo, setUserInfo] = useState(designerInfo);
  const [profileImage, setProfileImage] = useState('');


//디자이너 자기 간단 정보 조회(프사땜에)


  const getDesignerInfo = async (designerId) => {
    try {
      console.log('디자이너 간단 정보 조회');
      console.log('전송 액세스 토큰:', userContext.userContext.accessToken);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userContext.userContext.accessToken}`
        }
      };
      const response = await axios.get(`http://3.39.131.14:8080/api/v1/designers/${designerId}/info`, config);
      console.log('응답 데이터 지금여기 :', response.data.data.profileImgUrl);
      setProfileImage(response.data.data.profileImgUrl);

    } catch (error) {
      console.error('디자이너 간단정보 조회 실패');
      console.error(error);
      console.error('에러 상태 코드:', error.response.status);
      console.error('에러 메시지:', error.response.data);
    }
  };

//자신의 카테고리 조회
  const getMyCategory = async () => {
    console.log('자신의 카테고리 조회');
    console.log('전송 액세스 토큰:', userContext.userContext.accessToken);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userContext.userContext.accessToken}`
        }
      };
      const response = await axios.get(API_context.get_designer_my_category, config);
      console.log('응답 데이터:', response.data);

      // 응답 데이터 구조 변환 및 필드 이름 변경
      const transformedData = response.data.data.categoryViews.map(categoryView => ({
        category: categoryView.highCategoryName,
        subcategory: categoryView.lowCategoryNames
      }));
      // categoryList 업데이트
      setUserInfo(prevUserInfo => ({
        ...prevUserInfo,
        categoryList: transformedData
      }));


      console.log('자신의 카테고리 조회 성공');
    } catch (error) {
      console.log('자신의 카테고리 조회 에러');
      console.error(error);
      console.error('에러 상태 코드:', error.response.status);
      console.error('에러 메시지:', error.response.data);
      if(error.response.data.code == 3005){
        setUserInfo(prevUserInfo => ({
          ...prevUserInfo,
          categoryList: []
        }));
        
      }
      
    }
  };
  useEffect(() => {
    getMyCategory();
    getDesignerInfo(userContext.userContext.userId)
  }, []);

  // 카테고리 정보 업데이트 함수
  const updateCategory = async () => {
    console.log('카테고리 정보 업데이트');
  
    const categories = userInfo.categoryList.map((categoryItem) => ({
      highCategoryName: categoryItem.category,
      lowCategoryNames: categoryItem.subcategory,
    }));
  
    const requestData = {
      categoryParams: categories, 
    };
  
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userContext.userContext.accessToken}`
        }
      };
  
      const response = await axios.patch(API_context.patch_designer_my_category, requestData, config);
      console.log('응답 데이터:', response.data);
      console.log('카테고리 정보 업데이트 성공');
      Alert.alert(
        '카테고리 저장 완료!',
        '이전 페이지로 이동합니다.',
        [
          {text:'확인', onPress: () => navigation.goBack()},
        ],
        {cancelable: false}
      );
    } catch (error) {
      console.log('카테고리 정보 업데이트 에러');
      console.error(error);
      console.error('에러 상태 코드:', error.response.status);
      console.error('에러 메시지:', error.response.data);
    }
  };
  


  //대분류 추가 컴포넌트
  const CategoryComponent = ({callback,categoryIndex}) => {

    const [isChangable,setIsChangable] = useState(false);
    const [categoryText, setCategoryText] = useState('');
    
    const handleAddCategory = () => {
      console.log('Add Category:', categoryText);
      callback(categoryIndex, categoryText)
      setCategoryText('');
      setIsChangable(false);
    };

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', width: '100%' }}>
        {isChangable ? (
          <View style={{  height: 50,flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', width: '100%', borderBottomWidth: 2, borderBottomColor: '#000000'}}>
            <TextInput
              value={categoryText}
              multiline={true}
              onChangeText={setCategoryText}
              style={{ fontSize: 25, color: '#000000', width: 200, paddingVertical: 0 }}
              placeholder='대분류 입력'
            />
            <TouchableOpacity onPress={handleAddCategory} style={{paddingVertical:4,paddingHorizontal:15,borderRadius:5, backgroundColor:'#000000',alignItems:'center',justifyContent:'center'}}>
              <Text style={{ fontSize: 15, color: '#FFFFFF', fontWeight:900 }}>추가</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            onPress={() => setIsChangable(true)}
            style={{width:'100%'}}
          >
            <View style={{ height: 50, borderBottomWidth: 2, borderBottomColor: '#000000', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 25, color: '#00000050' }}>대분류 추가</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  //대분류 추가 함수
  const handleCategoryAdd = (categoryIndex, newCategory) => {
    setUserInfo((prevUserInfo) => {
      const updatedCategoryList = [...prevUserInfo.categoryList];
      updatedCategoryList.push({
        category: newCategory,
        subcategory: [],
      });
      return { ...prevUserInfo, categoryList: updatedCategoryList };
    });
  };
  
  //대분류 수정 컴포넌트
  const EditCategoryComponent = ({ categoryInput, onDelete, onUpdate }) => {
    const [isChangable, setIsChangable] = useState(false);
    const [categoryText, setCategoryText] = useState(categoryInput);
  
    const handleUpdateCategory = () => {
      onUpdate(categoryText);
      setIsChangable(false);
    };
  
    return (
      <View
        style={{
          height: 50,
          borderBottomWidth: 2,
          borderBottomColor: '#000000',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {isChangable ? (
          <>
            <TextInput
              value={categoryText}
              multiline={true}
              onChangeText={setCategoryText}
              style={{ fontSize: 25, color: '#000000', width: 200, paddingVertical: 0, paddingHorizontal: 0 }}
              placeholder='대분류 입력'
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity onPress={onDelete}>
                <Image
                  source={require('./DesignerEditProfile/trashcan_icon.png')}
                  style={{ width: 22, height: 22, resizeMode: 'contain' }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleUpdateCategory}>
                <Image
                  source={require('./DesignerEditProfile/check_icon.png')}
                  style={{ width: 22, height: 22, resizeMode: 'contain', marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={{ fontSize: 25, color: '#000000' }}>{categoryInput}</Text>
            <TouchableOpacity onPress={() => setIsChangable(true)}>
              <Image
                source={require('./DesignerEditProfile/edit_pencil.png')}
                style={{ width: 22, height: 22, resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

  // 대분류 삭제 함수
  const handleCategoryDelete = (categoryIndex) => {
    setUserInfo((prevUserInfo) => {
      const updatedCategoryList = [...prevUserInfo.categoryList];
      updatedCategoryList.splice(categoryIndex, 1);
      return { ...prevUserInfo, categoryList: updatedCategoryList };
    });
  };

  // 대분류 업데이트 함수
  const handleCategoryUpdate = (categoryIndex, updatedCategory) => {
    setUserInfo((prevUserInfo) => {
      const updatedCategoryList = [...prevUserInfo.categoryList];
      updatedCategoryList[categoryIndex].category = updatedCategory;
      return { ...prevUserInfo, categoryList: updatedCategoryList };
    });
  };

  


  //소분류 추가 컴포넌트
  const SubcategoryComponent = ({callback,categoryIndex}) => {
    const [isChangable, setIsChangable] = useState(false);
    const [subcategoryText, setSubcategoryText] = useState('');

    const handleAddSubcategory = () => {
      console.log('Add subcategory:', subcategoryText);
      callback(categoryIndex, subcategoryText)
      setSubcategoryText('');
      setIsChangable(false);
    };

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', width: '100%' }}>
        {isChangable ? (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', width: '100%' }}>
            <TextInput
              value={subcategoryText}
              multiline={true}
              onChangeText={setSubcategoryText}
              style={{ fontSize: 22, color: '#000000', width: 200, paddingVertical: 0 }}
              placeholder='소분류 입력'
            />
            <TouchableOpacity onPress={handleAddSubcategory}  style={{paddingVertical:4,paddingHorizontal:15,borderRadius:5, backgroundColor:'#000000',alignItems:'center',justifyContent:'center'}}>
              <Text style={{ fontSize: 15, color: '#FFFFFF', fontWeight:900 }}>추가</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setIsChangable(true)}>
            <Text style={{ fontSize: 22, color: '#00000050' }}>소분류 추가</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  
  //소분류 추가 함수
  const handleSubcategoryAdd = (categoryIndex, newSubcategory) => {
    setUserInfo((prevUserInfo) => {
      const updatedCategoryList = [...prevUserInfo.categoryList];
      const updatedCategory = { ...updatedCategoryList[categoryIndex] };
      updatedCategory.subcategory.push(newSubcategory);
      updatedCategoryList[categoryIndex] = updatedCategory;
      return { ...prevUserInfo, categoryList: updatedCategoryList };
    });
  };

  //소분류 수정 컴포넌트
  const EditSubcategoryComponent = ({ categoryInput, onDelete, onUpdate }) => {
    const [isChangable, setIsChangable] = useState(false);
    const [categoryText, setCategoryText] = useState(categoryInput);
  
    const handleUpdateCategory = () => {
      onUpdate(categoryText);
      setIsChangable(false);
    };

    return (
      <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {isChangable ? (
          <>
            <TextInput
              value={categoryText}
              multiline={true}
              onChangeText={setCategoryText}
              style={{ fontSize: 22, color: '#000000', width: 200, paddingVertical: 0, paddingHorizontal: 0 }}
              placeholder='소분류 입력'
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity onPress={onDelete}>
                <Image
                  source={require('./DesignerEditProfile/trashcan_icon.png')}
                  style={{ width: 22, height: 22, resizeMode: 'contain' }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleUpdateCategory}>
                <Image
                  source={require('./DesignerEditProfile/check_icon.png')}
                  style={{ width: 22, height: 22, resizeMode: 'contain', marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={{ fontSize: 22, color: '#000000' }}>{categoryInput}</Text>
            <TouchableOpacity onPress={() => setIsChangable(true)}>
              <Image
                source={require('./DesignerEditProfile/edit_pencil.png')}
                style={{ width: 22, height: 22, resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

  // 소분류 삭제 함수
const handleSubcategoryDelete = (categoryIndex, subcategoryIndex) => {
  setUserInfo((prevUserInfo) => {
    const updatedCategoryList = [...prevUserInfo.categoryList];
    updatedCategoryList[categoryIndex].subcategory.splice(subcategoryIndex, 1);
    return { ...prevUserInfo, categoryList: updatedCategoryList };
  });
};

// 소분류 업데이트 함수
const handleSubcategoryUpdate = (categoryIndex, subcategoryIndex, updatedSubcategory) => {
  setUserInfo((prevUserInfo) => {
    const updatedCategoryList = [...prevUserInfo.categoryList];
    updatedCategoryList[categoryIndex].subcategory[subcategoryIndex] = updatedSubcategory;
    return { ...prevUserInfo, categoryList: updatedCategoryList };
  });
};


  return (
    <ScrollView contentContainerStyle={{ zIndex: 0, backgroundColor: '#FFFFFF', alignItems: 'center', paddingBottom: 70 }}>
      <View style={{ zIndex: 1, height: 175, width: '100%', backgroundColor: '#FFE1E4', alignItems: 'center' }}>
        <View style={{ width: '100%', flexDirection: 'row', height: 60, justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('./DesignerEditProfile/header_back_icon.png')}
              style={{ width: 49, height: 42 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
            updateCategory();
            }}
           >
            <Text style={{ fontSize: 21, color: '#000000', paddingHorizontal: 15 }}>
              저장
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ position: 'absolute', top: 90, zIndex: 2, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', width: 170, height: 170, borderRadius: 100 }}>
        <Image
          source={{ uri: profileImage }}
          style={{ width: 160, height: 160, borderRadius: 100 }}
          resizeMode='cover'
        />
      </View>
      <View style={{ marginTop: 70 }}>
        {/*<Text style={{ fontSize: 23, color: '#000000', fontWeight: 'bold' }}>{userInfo.designerName}</Text>*/}
      </View>

      {/*카테고리*/}
      <View style={{ width: '100%' }}>
        <Text style={{ fontSize: 28, color: '#000000', marginLeft: 15, marginTop: 40 }}>카테고리 설정</Text>

        {userInfo.categoryList.map((category, categoryIndex) => (
          <View key={categoryIndex}>
            <View style={{ marginHorizontal: 30, marginTop: 30 }}>

              <EditCategoryComponent 
                categoryInput={category.category} 
                onDelete={() => handleCategoryDelete(categoryIndex)}
                onUpdate={(updatedCategory) => handleCategoryUpdate(categoryIndex, updatedCategory)}
              />


              {/*
              <View
                style={{
                  height: 50,
                  borderBottomWidth: 2,
                  borderBottomColor: '#000000',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={{ fontSize: 25, color: '#000000' }}>{category.category}</Text>
                <TouchableOpacity>
                  <Image
                    source={require('./DesignerEditProfile/edit_pencil.png')}
                    style={{ width: 22, height: 22, resizeMode: 'contain' }}
                  />
                </TouchableOpacity>
              </View>
              */}



              <View style={{ marginHorizontal: 15 }}>
                {category.subcategory.map((subcategory, subcategoryIndex) => (
                  <View
                    key={subcategoryIndex}
                  >
                    <EditSubcategoryComponent 
                      categoryInput={subcategory}
                      onDelete={() => handleSubcategoryDelete(categoryIndex, subcategoryIndex)}
                      onUpdate={(updatedSubcategory) => handleSubcategoryUpdate(categoryIndex, subcategoryIndex, updatedSubcategory)}
                    />
                    {/*
                    <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: 22, color: '#000000' }}>{subcategory}</Text>
                      <TouchableOpacity>
                        <Image
                          source={require('./DesignerEditProfile/edit_pencil.png')}
                          style={{ width: 22, height: 22, resizeMode: 'contain' }}
                        />
                      </TouchableOpacity>
                    </View>
                  */}

                  </View>
                ))}
                <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <SubcategoryComponent callback={handleSubcategoryAdd} categoryIndex={categoryIndex}/>
                  {/* <TouchableOpacity onPress={() => handleSubcategoryAdd(categoryIndex, '소분류')}>
                    <Text style={{ fontSize: 22, color: '#00000050' }}>소분류 추가</Text>
                  </TouchableOpacity> */}
                </View>
              </View>
            </View>
            <View style={{ backgroundColor: '#E4E4E4', height: 5, marginTop: 10 }} />
          </View>
        ))}
        <View style={{ marginHorizontal: 30, marginTop: 30 }}>
          <CategoryComponent callback={handleCategoryAdd} categoryIndex={userInfo.categoryList.length} />
        </View>
      </View>
    </ScrollView>
  );
};

export default DesignerEditCategory;
