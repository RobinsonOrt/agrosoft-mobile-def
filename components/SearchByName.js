import React, { useState } from "react";
import tw from "twrnc";
import { TextInput, Image, View, StyleSheet } from "react-native";

const SearchByName = ({ data, valueKey, setData }) => {
  const { stateSearch, setStateSearch } = useState(false);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.nameFarm
          ? item.nameFarm.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
      console.log(newData);
    } else {
      setData(data);
      console.log(data);
    }
  };

  const styles = StyleSheet.create({
    colorButton: {
      borderWidth: 1,
      borderColor: "rgba(229, 231, 235, 1)",
      color: "rgba(156, 163, 175, 1)",
      fontSize: 14,
    },
  });

  return (
    <View style={tw`rounded-md`}>
      <TextInput
        onChangeText={(text) => {
          searchFilterFunction(text);
        }}
        placeholder="Buscar por nombre..."
        style={[
          tw`bg-white flex-row  items-center h-30px w-180px rounded-md px-2`,
          styles.colorButton,
        ]}
      />
    </View>
  );
};

export default SearchByName;
