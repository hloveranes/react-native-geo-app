import React from 'react';
import {Text, Pressable} from 'react-native';

const StyledButton = props => {
  const {onPress, title = 'Click', buttonStyle, textStyle} = props;
  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
};

export default StyledButton;
