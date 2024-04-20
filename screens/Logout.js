import { useCallback, useContext } from "react";
import { AuthContext } from "../components/AuthProvider";
import { Text, StyleSheet, View, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const Logout = () => {
    const {logout} = useContext(AuthContext);
    const navigation = useNavigation();
    function logoutIIFE(){
        Alert.alert('Hey', 'Are you sure to Logout Peach?',[
            {
                text:'Yes',
                onPress:()=>logout(),
            },
            {
                text:'No',
                onPress:()=> navigation.goBack()
            }
           ]);
    };
    useFocusEffect(
        useCallback(()=>{
            logoutIIFE();
        })
    )
    return(
        <View style={styles.container}>
            <Text style={styles.txt}>Logout :)</Text>
        </View>
    );
   
    
};
export default Logout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fa5c66',
        justifyContent:'center',
        alignItems:'center',
    },
    txt:{
        fontSize:80,
        color:'white',
        fontFamily:'Futura',
    }
});