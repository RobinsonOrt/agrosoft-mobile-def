import global from "../global";
import React, { useContext } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Picker,
  Modal
} from "react-native";
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

  const modalContainerStyle = {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.6)',

  }

  const modalStyle = {
    backgroundColor: 'white',
    alignItems: 'center',
    margin: 20,
    borderRadius: 16,
    paddingHorizontal: 30,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  };


  return (
    <>
      <Modal visible={isModalOpenAccountDelete} transparent={true} animationType={'fade'} onRequestClose={() => setIsModalOpenAccountDelete(false)}>
        <View style={modalContainerStyle}>
          <View style={modalStyle}>
            <View style={tw`h-full flex items-center mt-5 justify-center`}>

              <View style={tw`px-7 mb-10 flex items-center justify-center`}>
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
                <TouchableOpacity
                  style={tw`bg-yellow-500 text-lg text-white px-5 py-3 w-215px rounded-lg mb-7 text-center`}
                  onPress={onSubmit}
                >
                  <Text style={tw`text-lg text-white text-center`}>Aceptar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`bg-red-600 text-lg text-white px-5 py-3 w-215px rounded-lg mb-7 text-center`}
                  onPress={() => setIsModalOpenAccountDelete(!setIsModalOpenAccountDelete)}
                >
                  <Text style={tw`text-lg text-white text-center`}>Cancelar </Text>

                </TouchableOpacity>
              </View>
            </View>


          </View>
        </View>
      </Modal>
    </>
  )
}