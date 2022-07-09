import React from 'react';
import { View, TextInput } from 'react-native';
import { Controller } from 'react-hook-form';
import tw  from 'twrnc';

const InputForm = ({control, name, placeholder, secureTextEntry, keyboardType, pattern, autoCapitalize, minLength}) => {
    return (
     <Controller
        control={control}
        name={name}
        rules={{
          required: true,
          pattern: pattern,
          minLength: minLength,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={tw`bg-white px-5 py-3 rounded-7px h-40px mb-5 border`}
            value={value || ''}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
          />
        )}
        
      />
    )

}

export default InputForm;