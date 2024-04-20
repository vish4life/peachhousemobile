import { useContext, useState } from "react";
import { Text, StyleSheet, KeyboardAvoidingView, ScrollView, TextInput, TouchableOpacity, Platform, View } from "react-native";
import useValidateInput from "../customhook/useValidateInput";
import { AuthContext } from "../components/AuthProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const { login } = useContext(AuthContext);
    const loginFunc = () => {
        const val = useValidateInput({ email, password });
        console.log(val.msg);
        console.log(val.status);
        if (val.status === 'FAIL') {
            alert(val.msg);
        };
        if (val.status === 'SUCCESS') {
            checkEmail();
            // login();
        };

    };
    const checkEmail = async () => {
        const existingProfile = await AsyncStorage.getItem('userData');
        console.log('existing profile: ', existingProfile);
        const parsedProfile = JSON.parse(existingProfile);
        console.log('parsed profile: ', parsedProfile);
        const existingEmail = parsedProfile[0].email;
        const existingPwd = parsedProfile[0].pwd;
        console.log(existingEmail);
        if (existingEmail === email) {
            if (existingPwd === password) {
                login();
            }
            else {
                alert('Password did not match');
            }
        } else {
            alert('Email not found, please validate email or signup');
        };

    };
    const resetPwd = () => {
        navigation.navigate('ResetPassword');
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
                    <Text style={styles.label}>Password</Text>
                    <TextInput style={styles.input}
                        placeholder="Enter Password"
                        keyboardType='default'
                        secureTextEntry
                        onChangeText={onChangePassword}
                        value={password}
                    />
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => loginFunc()}
                    >
                        <Text style={styles.btnTxt}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.resetBtn}
                        onPress={() => resetPwd()}
                    >
                        <Text style={styles.resetBtnTxt}>Reset Password?</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
export default Login;

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