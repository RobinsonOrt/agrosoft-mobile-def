import { View, Text, StyleSheet } from "react-native";
import tw from "twrnc";

export const Cart = ({ name, description, id, children }) => {
  return (
    <View style={[tw`m-5 rounded-xl max-w-239`, styles.safeArea]}>
      <View style={[tw`rounded-t-xl rounded-b-40px p-10`, styles.container]}>
        <Text style={[tw`text-center uppercase font-bold`, styles.title]}>
          {name}
        </Text>
        <Text style={[tw`text-center mt-1`, styles.description]}>
          {description}
        </Text>
      </View>
      <View style={tw`p-5`}>
        <Text style={[tw`text-center mb-3 pr-2`, styles.description]}>
          {id}
        </Text>
        <View style={tw`flex w-full justify-between flex-row`}>
          {children}

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(120, 113, 108, 0.5)",
  },
  title: {
    fontSize: 20,
  },
  description: {
    fontSize: 14,
  },
  safeArea: {
    backgroundColor: "rgba(32, 84, 0, 0.1)",
  },
});
