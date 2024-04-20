import { useContext, useState } from "react";
import { AuthContext } from "../components/AuthProvider";
import useValidateInput from "../customhook/useValidateInput";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ScrollView, Text, StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, TextInput, Platform, Alert, } from "react-native";
const Signup = ({ navigation }) => {
    const [firstName, onChangeFirstName] = useState('');
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const authenticateFunc = () => {
        const val = useValidateInput({ firstName, email, password });
        console.log(val.msg);
        console.log(val.status);
        if (val.status === 'FAIL') {
            alert(val.msg);
        };
        if (val.status === 'SUCCESS') {
            storeData();
        };
    };
    const storeData = async () => {
        try {
            const userInfo = [{ 'firstName': firstName, 'email': email, 'pwd': password }];
            const userData = JSON.stringify(userInfo);
            console.log('non-stringified user data: ', userInfo);
            console.log('stringified user data: ', userData);
            await AsyncStorage.setItem('userData', userData);
            login();
        } catch (error) {
            console.log(error, ' error in storing data using AsyncStorage');
        }
    };

    const { login } = useContext(AuthContext);
    return (
        <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={0}
        >
            <View style={styles.innerContainer}>
                <ScrollView keyboardDismissMode='on-drag' >
                    <View >
                        <Text style={styles.label}>First Name</Text>
                        <TextInput
                            onChangeText={onChangeFirstName}
                            value={firstName}
                            placeholder="First Name min 3 characters"
                            style={styles.input}
                            keyboardType='default'
                        />
                    </View>
                    <View >
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            onChangeText={onChangeEmail}
                            value={email}
                            placeholder="Email format - xxx.xxx@xxx"
                            style={styles.input}
                            keyboardType='email-address'
                        />
                    </View>
                    <View>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            onChangeText={onChangePassword}
                            value={password}
                            placeholder="Password - 8 to 16 characters"
                            style={styles.input}
                            secureTextEntry
                        />
                    </View>
                    <View style={styles.btnView}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => authenticateFunc()}
                        >
                            <Text style={styles.btnTxt}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};
export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffe8e8',
    },
    innerContainer: {
        // marginVertical: '5%',
        flex: 1,

    },
    phoneView: {
        flexDirection: 'row',
        // flex: 1,
    },
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
    inputSmall: {
        backgroundColor: 'white',
        borderWidth: 1,
        marginTop: '5%',
        marginRight: 10,
        color: 'gray',
        borderColor: '#fa5c66',
        width: '100%',
        width: 50,
        height: 30,
        borderRadius: 3,
        fontSize: 20,
    },
    inputPhone: {
        backgroundColor: 'white',
        borderWidth: 1,
        marginTop: '5%',
        color: 'gray',
        width: '100%',
        borderColor: '#fa5c66',
        width: 200,
        height: 30,
        borderRadius: 3,
        fontSize: 20,
    },
    btnView: {
        flex: 1,
        // flexDirection:'row',
        alignItems: 'center',
        // marginHorizontal:'5%',
        marginVertical: '3%',
    },
    btn: {
        backgroundColor: '#fa5c66',
        borderWidth: 3,
        borderColor: '#ffff',
        width: '60%',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 12,
        height: 50,
        marginVertical: '2%',
    },
    btnTxt: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Futura',
    },
});