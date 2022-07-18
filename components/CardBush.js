import { View, Text, StyleSheet, Image } from "react-native";
import tw from "twrnc";
/* import { useBarcode } from "next-barcode"; */
import Svg from 'react-native-svg';
/* import Barcode from "./Barcode"; */

export const CardBush = ({qrCode, date, id, children}) => {
    /* const { inputRef } = useBarcode({
        value: "AAAAA11111",
        options: {
          background: "rgba(255,255,255,1)",
          displayValue: false,
        }
    }); */
    return (
        <View style={[tw`h-250px mx-2 w-45% mb-5 rounded-b-xl shadow-2xl`, styles.safeArea ]}>
            <View style={[tw`justify-center items-center w-full h-35%`, styles.container ]}>
                <View style={[tw`justify-center items-center w-90% h-90%`]}>
                    {/* <svg ref={inputRef} style={tw`w-screen`} /> */}
                    <Text style={[tw`text-center h-50% content-center w-full uppercase font-bold`, styles.title]}>{qrCode}</Text>
                    {/* <Barcode value={qrCode} options={{ format: 'CODE128', background: "rgba(255,255,255,0)", width: "2" }} /> */}
                </View>
                {/* <Text style={[tw`text-center h-50% content-center  pt-5 uppercase font-bold`, styles.title]}>{qrCode}</Text> */}
            </View>
            <View style={tw`p-3 pr-1`}>
                <Text style={[tw`text-center mb-3 pr-2`, styles.description]}>{"id: " + id}</Text>
                <Text style={[tw`text-center mb-3 pr-2`, styles.description]}>{date.split('T')[0]}</Text>
                <View style={tw`flex-row justify-center px-3 py-4`}>{children}</View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(167,167,159, 1)',
    },
    title: {
      fontSize: 20,

    },
    description: {
        fontSize: 14,
        
      },
    safeArea: {
        backgroundColor: 'rgba(219,225,215, 1)',
    },
  });