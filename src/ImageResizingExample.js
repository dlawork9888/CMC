import React, { useState } from 'react';
import { View,Image } from 'react-native';

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
  

  const ImageResizingExample = () => {
    return (
      <ResizedImage uri={'https://picsum.photos/200/400'} width={300} />
    );
  };
  

export default ImageResizingExample;