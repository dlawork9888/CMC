import React, { useState, useContext } from 'react';
import { View, Image, ScrollView, TouchableOpacity, Platform, Button, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import UserContext from './UserContext';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';



/* 이미지 동적 배율 컴포넌트
const PracticePage2 = () => {
  const [ex, setEx] = useState([
    'https://picsum.photos/200/300',
    'https://picsum.photos/200/300',
    'https://picsum.photos/200/300'
  ]);

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
      <ScrollView>
      {ex.map((item)=>(
        <CustomImage uri={item}/>
      ))}
      </ScrollView>
    </View>
  );

};
*/
/*검색 GET 요청
const PracticePage2 = () => {
  const userContext = useContext(UserContext);

  const getProductByKeyword = async (keyword) => {
    try {
      const response = await axios.get(`http://3.39.131.14:8080/api/v1/product/search?keyword=${encodeURIComponent(keyword)}`, {
        headers: {
          'Authorization': `Bearer ${userContext.userContext.accessToken}`
        }
      });
  
      const data = response.data;
      console.debug(data);
  
      // Handle the response data as needed
  
    } catch (error) {
      console.error(error);
    }
  };
  
  getProductByKeyword('하네스');


  return(
    <></>
  );
};
*/

const PracticePage2 = () => {


  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const openDatePicker = () => {
    if (Platform.OS === 'android') {
      setShowDatePicker(true);
    } else if (Platform.OS === 'ios') {
      // iOS에서 DatePickerIOS 사용
      // ...
    }
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      // 선택한 날짜를 원하는 로직으로 처리
      console.log('Selected date:', date);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={openDatePicker}>
        <Text>1234</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );


};

export default PracticePage2;
