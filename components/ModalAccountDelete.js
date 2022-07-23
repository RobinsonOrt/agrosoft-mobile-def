import global from "../global";
import React, { useContext } from "react";
import {
  Text,
} from "react-native";
import ModalModel from "./ModalModel";
import ModalButton from "./ModalButton";
import tw from "twrnc";
import MyUserContext from '../context/UserContext';
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-native";


export default function ModalAccountDelete({ isModalOpenAccountDelete, setIsModalOpenAccountDelete }) {
  let navigate = useNavigate();
  const { ChangeState, response } = useContext(MyUserContext);
  const { LogOut } = useContext(AuthContext);

  const onSubmit = async () => {
    const data = { idUser: global.idUser };
    const changestateResponse = await ChangeState(data);
    if (!changestateResponse.data.error) {
      LogOut();
      setIsModalOpenAccountDelete(false);
      navigate("/login");
      return false;
    }
  }

  return (
    
    <ModalModel isModalOpen={isModalOpenAccountDelete} setIsModalOpen={setIsModalOpenAccountDelete}>

                <Text style={tw` text-black mb-10 w-283px  text-center`}>
                  Recuerde que tiene la posibilidad de transferir la administración de sus fincas a otro usuario. ¿Está seguro que quiere eliminar su cuenta?
                </Text>


                {response.status ? (
                  <Text
                    style={tw`text-white bg-red-500 p-5 rounded-lg mb-10 font-bold text-center`}
                  >
                    {response.message}
                  </Text>
                ) : null}
                <ModalButton text={"Confirmar"} onPress={() => {onSubmit()}} color={"#22C55E"} />
                <ModalButton text={"Cancelar"} onPress={() => { setIsModalOpenAccountDelete(!isModalOpenAccountDelete) }} color={"rgba(220, 38, 38, 0.86)"} />
                </ModalModel>
  )
}