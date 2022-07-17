import global from "../global";
import ModalModel from "./ModalModel";
import ModalButton from "./ModalButton";
import tw from "twrnc";
import {
    View,
    Text,
  } from "react-native";

export default function ModalDelete({ isModalOpenDelete, setIsModalOpenDelete, DeleteFunction}) {
    return (

        <ModalModel isModalOpen={isModalOpenDelete} setIsModalOpen={setIsModalOpenDelete}>
            <Text style={tw` text-black mb-10 w-283px  text-center`}>
                ¿Está seguro que quiere eliminar el registro?
            </Text>
            <View style={tw`w-full px-6`}>
                <ModalButton text={"Confirmar"} onPress={() => { DeleteFunction(global.idToDelete), setIsModalOpenDelete(false) }} color={"#22C55E"} />
                <ModalButton text={"Cancelar"} onPress={() => { setIsModalOpenDelete(!setIsModalOpenDelete) }} color={"rgba(220, 38, 38, 0.86)"} />
            </View>
        </ModalModel>
    );
}