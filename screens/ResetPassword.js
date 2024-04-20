import { useState } from "react";
import { Text, StyleSheet, KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity, Platform, View, Alert } from "react-native";
import useValidateInput from "../customhook/useValidateInput";

const ResetPassword = ({ navigation }) => {
    const [email, onChangeEmail] = useState('');

    const loginFunc = () => {
        const val = useValidateInput({ email });
        console.log(val.msg);
        console.log(val.status);
        if (val.status === 'FAIL') {
            alert(val.msg);
        };
        if (val.status === 'SUCCESS') {
            Alert.alert('Message','Please check the email for password reset link, Peach!');
            navigation.navigate('Login');
        };
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <ScrollView keyboardDismissMode='on-drag'>
                <View style={styles.innerContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Registered Email"
                        keyboardType='email-address'
                        onChangeText={onChangeEmail}
                        value={email}
                    />
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => loginFunc()}
                    >
                        <Text style={styles.btnTxt}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
export default ResetPassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffe8e8',
    },
    innerContainer: {},
    label: {
        fontFamily: 'Futura',
        fontSize: 25,
        letterSpacing: 1.3,
        color: '#fa5c66',
        marginTop: '5%',
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        marginTop: '5%',
        color: 'gray',
        width: '100%',
        borderColor: '#fa5c66',
        width: 250,
        height: 30,
        borderRadius: 3,
        fontSize: 20,
    },
    btn: {
        backgroundColor: '#fa5c66',
        borderWidth: 3,
        borderColor: '#ffff',
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 12,
        height: 50,
        marginTop: '5%',
    },
    btnTxt: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Futura',
    },
    resetBtn: {
        marginTop: '5%',
    },
    resetBtnTxt: {
        color: '#b3b3b3',
        textAlign: 'right',
        fontSize: 22,
        fontFamily: 'Futura',
        textDecorationLine: 'underline',
    },
}); 