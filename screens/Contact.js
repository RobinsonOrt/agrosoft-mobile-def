import {
  View,
  Text,
  ScrollView,
} from "react-native";

import tw from "twrnc";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SubHeader from "../components/SubHeader";
import { styles } from "./Farms";
import { ContactCard } from "../components/ContactCard";
import { useBackHandler } from "@react-native-community/hooks";

const Contact = ({ navigation })=>{
    useBackHandler(() => {
        navigation.navigate("MyFarms");
        return true;
    });
    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
            <SubHeader title={"Contactenos"} />
            <ScrollView>
                <View style={[tw`items-center`,styles.container]}>
                    <View style={[tw`justify-center items-center w-97% my-3 p-3 rounded-xl`, {backgroundColor: "rgba(214,221,209,255)"}]}>
                        <Text style={tw`text-center grow text-black text-20px font-bold uppercase mt-1 mb-5`}>Desarrolladores</Text>
                        <ContactCard name={"Wilmar Eduardo Yucumá"} email={"w7c10js14@gmail.com"} phoneNumber={"3216929612"} />
                        <ContactCard name={"Robinson Zambrano Ortiz"} email={"ortix01y@gmail.com"} phoneNumber={"3144805679"} />
                        <ContactCard name={"Simon Jimenez Tamayo"} email={"u20191176294@usco.edu.co"} phoneNumber={"3193139280"} />
                        <ContactCard name={"Alexander Pastrana Serrato"} email={"mail@mail.com"} phoneNumber={"3177644289"} />
                        <ContactCard name={"Alejandro Cabarcas"} email={"alejocabarcas04@gmail.com"} phoneNumber={"3224655402"} />
                    </View>
                </View>
            </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
export default Contact;