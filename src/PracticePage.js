import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

let sample = [1, 2, 3, 4, 5];

const PlusBinaryTag = ({item}) =>{
  const [isChangable, setIsChangable] = useState(true);

  return(
    <View flexDirection={'row'}>
      <Text>{item} is { isChangable === true? ('True'):('False')}</Text>
      <TouchableOpacity onPress={()=>setIsChangable(!isChangable)}>
        <Text>                                        change</Text>
      </TouchableOpacity>
    </View>
  );

}

const PracticePage = () => {
  const [sampleState, setSampleState] = useState(sample);

  return (
    <View style={{ flex: 1, alignItems:'center', justifyContent:'center' }}>
      {sampleState.map((item, index) => (
        <View key={index} style={{flexDirection:'row'}}>
          <PlusBinaryTag item={item}/>
        </View>
      ))}
    </View>
  );
};

export default PracticePage;
