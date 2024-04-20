import { useEffect, useState } from "react";
import { TouchableOpacity, Alert } from "react-native";
import { TextInput, Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Image } from "react-native";
import { CheckBox } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

import UserAvatar from 'react-native-user-avatar';
const Profile = () => {
    const [firstName, onChangeFirstName] = useState('');
    const [lastName, onChangeLastName] = useState('');
    const [email, onChangeEmail] = useState('');
    const [phone, onChangePhone] = useState('');
    const [phoneCode, onChangePhoneCode] = useState('');
    const [password, onChangePassword] = useState('')
    const [orderStatus, onChangeOrderStatus] = useState(false);
    const [passwordChange, onChangePasswordChange] = useState(false);
    const [promo, onChangePromo] = useState(false);
    const [news, onChangeNews] = useState(false);
    const [image, setImage] = useState(null);
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        (async () => {
            const userInfo = await AsyncStorage.getItem('userData');
            if (userInfo !== null) {
                console.log('user data found ', userInfo);
                const parsedUserInfo = JSON.parse(userInfo);
                console.log('parsed data: ', parsedUserInfo);
                onChangeEmail(parsedUserInfo[0].email);
                onChangeFirstName(parsedUserInfo[0].firstName);
                onChangePassword(parsedUserInfo[0].pwd);

                if (parsedUserInfo[0].passwordChange !== undefined) {
                    console.log('password Change preferrence has value ', parsedUserInfo[0].passwordChange);
                    onChangePasswordChange(parsedUserInfo[0].passwordChange);
                } else {
                    console.log('password change preferrence is undefined');
                    onChangePasswordChange(false);

                }
                if (parsedUserInfo[0].lastName !== undefined) {
                    console.log('lastName has value ', parsedUserInfo[0].lastName);
                    onChangeLastName(parsedUserInfo[0].lastName);
                } else {
                    console.log('lastName is undefined');
                    onChangeLastName('');

                }
                if (parsedUserInfo[0].phone !== undefined) {
                    console.log('phone has value ', parsedUserInfo[0].phone);
                    onChangePhone(parsedUserInfo[0].phone);
                } else {
                    console.log('phone is undefined');
                    onChangePhone('');

                }
                if (parsedUserInfo[0].phoneCode !== undefined) {
                    console.log('phoneCode has value ', parsedUserInfo[0].phoneCode);
                    onChangePhoneCode(parsedUserInfo[0].phoneCode);
                } else {
                    console.log('phoneCode is undefined');
                    onChangePhoneCode('');

                }
                if (parsedUserInfo[0].orderStatus !== undefined) {
                    console.log('orderStatus has value ', parsedUserInfo[0].orderStatus);
                    onChangeOrderStatus(parsedUserInfo[0].orderStatus);
                } else {
                    console.log('orderStatus is undefined');
                    onChangeOrderStatus(false);

                }
                if (parsedUserInfo[0].promo !== undefined) {
                    console.log('promo has value ', parsedUserInfo[0].promo);
                    onChangePromo(parsedUserInfo[0].promo);
                } else {
                    console.log('promo is undefined');
                    onChangePromo(false);

                }
                if (parsedUserInfo[0].news !== undefined) {
                    console.log('news has value ', parsedUserInfo[0].news);
                    onChangeNews(parsedUserInfo[0].news);
                } else {
                    console.log('news is undefined');
                    onChangeNews(false);
                }
                if (parsedUserInfo[0].profileImg !== undefined) {
                    console.log('Profile Image is ', parsedUserInfo[0].profileImg);
                    setImage(parsedUserInfo[0].profileImg);
                } else {
                    console.log('profileImg is undefined');
                    setImage(null);
                }
                let tempName = parsedUserInfo[0].lastName=== undefined?parsedUserInfo[0].firstName:parsedUserInfo[0].firstName + ' ' + parsedUserInfo[0].lastName;
                console.log('temp name ', tempName.trim());
                setFullName(tempName.trim());
            }
        })();
    }, []);

    const saveProfile = async () => {
        console.log('came inside the saveProfile');
        onChangeEmail(email);
        onChangeFirstName(firstName);
        onChangePassword(password);
        onChangeLastName(lastName);
        onChangePhone(phone);
        onChangePhoneCode(phoneCode);
        onChangePasswordChange(passwordChange);
        onChangeOrderStatus(orderStatus);
        onChangePromo(promo);
        onChangeNews(news);
        setFullName(firstName+' '+lastName);
        const personalInfo = [{
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'pwd': password,
            'phone': phone,
            'phoneCode': phoneCode,
            'passwordChange': passwordChange,
            'orderStatus': orderStatus,
            'promo': promo,
            'news': news,
            'profileImg': image,
        }];
        console.log('final values: ', personalInfo);
        const stringifiedValues = JSON.stringify(personalInfo);
        console.log('Srtingified : ', stringifiedValues);
        await AsyncStorage.setItem('userData', stringifiedValues);
    };

    const addImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        console.log(result);
        !result.canceled?setImage(result.assets[0].uri):'';
    };
    const removeImage = () => {
        Alert.alert('Confirm','are you sure to delete profile pic, peach?',[
            {
                text:'Yep',
                onPress:()=>setImage(null)
            },
            {
                text:'Nope',
                onPress:()=>console.log('Deletion canclled')
            }
        ])
        
    }
    const DisplayHeader = () => {
        console.log(image);
        return (
            <View>
                {image ? <Image style={styles.avatar} source={{ uri: image }} /> :
                    <UserAvatar style={styles.avatar} size={100} name={fullName} textColor='white' />
                }
            </View>
        );
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} keyboardVerticalOffset={200}>
            <ScrollView scrollEnabled indicatorStyle='black' keyboardDismissMode='on-drag'>
                <View style={styles.innerContainer}>
                    <View style={styles.headView}>
                        <DisplayHeader />
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => addImage()}
                        >
                            <Text style={styles.btnTxt}>Change</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => removeImage()}
                        >
                            <Text style={styles.btnTxt}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.personalData}>
                        <View>
                            <Text style={styles.label}>First Name</Text>
                            <TextInput
                                onChangeText={onChangeFirstName}
                                value={firstName}
                                placeholder="Enter First Name"
                                style={styles.input}
                                keyboardType='default'
                            />
                        </View>
                        <View >
                            <Text style={styles.label}>Last Name</Text>
                            <TextInput
                                onChangeText={onChangeLastName}
                                value={lastName}
                                placeholder="Enter Last Name"
                                style={styles.input}
                                keyboardType='default'
                            />
                        </View>
                        <View >
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                onChangeText={onChangeEmail}
                                value={email}
                                placeholder="Enter Email"
                                style={styles.input}
                                keyboardType='email-address'
                            />
                        </View>

                        <View>
                            <Text style={styles.label}>Phone</Text>
                            <View style={styles.phoneView}>
                                <TextInput
                                    onChangeText={onChangePhoneCode}
                                    value={phoneCode}
                                    placeholder="Code"
                                    style={styles.inputSmall}
                                    keyboardType='number-pad'
                                />
                                <TextInput
                                    onChangeText={onChangePhone}
                                    value={phone}
                                    placeholder="Enter Phone Number"
                                    style={styles.inputPhone}
                                    keyboardType='number-pad'
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
                        </View>
                    </View>
                    <View style={styles.checkBoxView}>
                        <Text style={styles.checkBoxHead}>Email Notifications</Text>
                        <CheckBox
                            title={'Password Updates'}
                            checked={passwordChange}
                            onPress={() => onChangePasswordChange(!passwordChange)}
                            containerStyle={styles.checkBox}
                            checkedColor='#fa5c66'
                            textStyle={styles.checkBoxTxt}
                        />
                        <CheckBox
                            title={'Order Updates'}
                            checked={orderStatus}
                            onPress={() => onChangeOrderStatus(!orderStatus)}
                            containerStyle={styles.checkBox}
                            checkedColor='#fa5c66'
                            textStyle={styles.checkBoxTxt}
                        />
                        <CheckBox
                            title={'Special Offers'}
                            checked={promo}
                            onPress={() => onChangePromo(!promo)}
                            containerStyle={styles.checkBox}
                            checkedColor='#fa5c66'
                            textStyle={styles.checkBoxTxt}
                        />
                        <CheckBox
                            title={'PH News'}
                            checked={news}
                            onPress={() => onChangeNews(!news)}
                            containerStyle={styles.checkBox}
                            checkedColor='#fa5c66'
                            textStyle={styles.checkBoxTxt}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.btnSave}
                        onPress={() => saveProfile()}
                    >
                        <Text style={styles.btnTxt}>Save</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </KeyboardAvoidingView >
    );
};
export default Profile;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffe8e8',
    },
    innerContainer: {
        margin: '3%',
    },
    headView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#fa5c66',
    },
    btn: {
        backgroundColor: '#ffff',
        borderWidth: 2,
        borderColor: '#fa5c66',
        width: 100,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 12,
        height: 50,
        marginLeft: '4%',
    },
    btnTxt: {
        color: '#fa5c66',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Futura',
    },
    personalData: {
        alignSelf: 'center',
    },
    phoneView: {
        flexDirection: 'row',
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
    checkBoxView: {
        justifyContent: 'center',
        backgroundColor: '#fa5c66',
        margin: '5%',
    },
    checkBoxHead: {
        fontFamily: 'Futura',
        fontSize: 25,
        letterSpacing: 1.3,
        color: '#ffff',
        marginTop: '2%',
        marginLeft: '2%',
        height: 30,
    },
    checkBox: {
        backgroundColor: '#ffe8e8',
        marginBottom: '4%',
    },
    checkBoxTxt: {
        fontSize: 18,
        color: '#fa5c66',
    },
    btnSave: {
        backgroundColor: '#ffff',
        borderWidth: 2,
        borderColor: '#fa5c66',
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 12,
        height: 50,
        marginTop: '2%',
    },
});