import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

const CustomProgressBar = ({width, number}) =>{
    
  const [progress, setProgress] = useState(0);

  if (number === 0) 
  {
    number = 0.35;
  } 
  else if (number === 1) 
  {
    number = 0.6;
  } else if (number === 2) 
  {
    number = 0.85;
  } 
  else if (number === 3) 
  {
    number = 1;
  }
  
  useEffect(() => {
    // 2초 후에 progress를 0.7로 변경
    setTimeout(() => {
      setProgress(number);
    }, 200);
  }, []);

  return(
      <ProgressBar 
        progress={progress} 
        width={width} 
        borderWidth={0} // BorderWidth를 0으로 설정
        borderColor={'transparent'} // BorderColor를 투명색으로 설정
        unfilledColor={'#D9D9D9'} // 채워지지 않은 부분의 색상을 설정
        color={'#FF5160'}
      />
  );
};

const ProgressBarExample = () => {

  const [containerWidth, setContainerWidth] = useState(0);

  const onContainerLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  return (
    <View onLayout={onContainerLayout} style={{width:300}}>
      <CustomProgressBar 
        width={containerWidth}
        number={1}
      />
    </View>
  );
};

export default ProgressBarExample;
