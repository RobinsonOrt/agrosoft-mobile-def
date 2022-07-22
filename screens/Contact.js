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

const Contact = ()=>{
    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeArea}>
            <SubHeader title={"Contactenos"} />
            <ScrollView>
                <View style={[tw`items-center`,styles.container]}>
                    <View style={[tw`justify-center items-center w-90% my-3 rounded-xl`, {backgroundColor: "rgba(214,221,209,255)"}]}>
                        <Text style={tw`text-center grow text-black text-20px font-bold uppercase mt-1 mb-5`}>Desarrolladores</Text>
                        <ContactCard name={"Wilmar Eduardo Yucumá"} email={"w7c10js14@gmail.com"} phoneNumber={"3216929612"} />
                        <ContactCard name={"Robinson Zambrano Ortiz"} email={"ortix01y@gmail.com"} phoneNumber={"3144805679"} />
                        <ContactCard name={"Alexander Pastrana Serrato"} email={"email@gmail.com"} phoneNumber={"3177644289"} />
                        <ContactCard name={"Simon Jimenez Tamayo"} email={"email@gmail.com"} phoneNumber={"3144805679"} />
                        <ContactCard name={"Alejandro Cabarcas"} email={"alejocabarcas04@gmail.com"} phoneNumber={"3144805679"} />
                    </View>
                </View>
            </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
export default Contact;