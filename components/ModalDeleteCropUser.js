import global from "../global";
import ModalModel from "./ModalModel";
import ModalButton from "./ModalButton";
import tw from "twrnc";
import {
    View,
    Text,
} from "react-native";

export default function ModalDelete({ isModalOpenDeleteCropUser, setIsModalOpenDeleteCropUser, DeleteFunction}) {
    const deleteSubmit = () => {
        const data = {}
        data.idFarm = global.idFarm;
        data.idUser = global.idEmployee
        data.idCrop = global.idCrop;

        DeleteFunction(data);
        setIsModalOpenDeleteCropUser(false);
    }
    return(
        <ModalModel isModalOpen={isModalOpenDeleteCropUser} setIsModalOpen={setIsModalOpenDeleteCropUser}>
            <Text style={tw` text-black mb-10 w-283px  text-center`}>
                ¿Está seguro que quiere eliminar el registro?
            </Text>
            <View style={tw`w-full px-6`}>
                <ModalButton text={"Confirmar"} onPress={() => { deleteSubmit() }} color={"#22C55E"} />
                <ModalButton text={"Cancelar"} onPress={() => { setIsModalOpenDeleteCropUser(!isModalOpenDeleteCropUser) }} color={"rgba(220, 38, 38, 0.86)"} />
            </View>
        </ModalModel>
    )
}