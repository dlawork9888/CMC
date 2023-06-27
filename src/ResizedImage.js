import React, { useState } from 'react';
import { View,Image } from 'react-native';


//이미지 url이랑 너비 집어넣으면 알아서 맞춰서 나옴

const ResizedImage = ({ uri, width }) => {
    const [imageRatio, setImageRatio] = useState(1);
  
    const onImageLoad = (event) => {
      const { width, height } = event.nativeEvent.source;
      const ratio = width / height;
      setImageRatio(ratio);
    };
  
    return (
        <View style={{width:width}}>  
            <Image
                source={{ uri }}
                style={{ width: '100%', aspectRatio: imageRatio }}
                resizeMode="contain"
                onLoad={onImageLoad}
            />
        </View>
    );
  };
  
  
export default ResizedImage;