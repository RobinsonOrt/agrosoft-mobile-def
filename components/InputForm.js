import React from 'react';
import { View, TextInput, StyleSheet} from 'react-native';
import { Controller } from 'react-hook-form';
import tw  from 'twrnc';

const InputForm = ({control, name, placeholder, secureTextEntry, keyboardType, pattern, autoCapitalize, minLength, maxLength, min, max, autoFocus, height, multiline, editable}) => {
  
  const styles = StyleSheet.create({
    button: {
      borderColor: '#205400',
      height: height,
    }})
  
  return (
     <Controller
        control={control}
        name={name}
        rules={{
          required: true,
          pattern: pattern,
          minLength: minLength,
          maxLength: maxLength,
          min: min,
          max: max,
        }}
        render={({ field: { onChange, onBlur, value} }) => (
          <TextInput
            style={[tw`bg-white px-3 py-3 rounded-7px w-full mb-5 border`, styles.button]}
            value={ value || ''}
            onChangeText={(text)=>{
              
              let texto = text.replace(/\s+/g, ' ');
              onChange(texto);
            }
            }
            onBlur={onBlur}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            autoFocus={autoFocus}
            multiline={multiline}
            maxLength={maxLength}
            editable={editable}
          />
        )}
        
      />
    )

}

export default InputForm;

