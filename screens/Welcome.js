import { useEffect, useRef } from "react";
import { Text, Animated, StyleSheet, ScrollView, View, TouchableOpacity, ImageBackground, Dimensions } from "react-native";

const url_carousel_img3 = '../assets/images/deserts/trns_d1.jpg';
const {height,width} = Dimensions.get('window');
const img_width = width;
const img_height = height;

const Welcome = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);
    const testFunc = () => {
        alert('test function');
    }
    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <ImageBackground style={styles.innerContainer} source={require(url_carousel_img3)}>
            <ScrollView>
                <Text style={styles.head}>Hola Peach !!!</Text>
                <View>
                    <Text style={styles.infoTxt}>
                        Established in 1950, The Peach House was born out of a shared love for exceptional
                        food and a desire to create a welcoming space where guests can savor unforgettable moments.
                        From our humble beginnings to becoming a beloved dining destination, our journey has been
                        one of dedication to quality, innovation, and the joy of bringing people together over
                        delicious meals.
                    </Text>
                </View>
                <View style={styles.btnView}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => navigation.navigate('Signup')}
                        // onPress={()=>testFunc()}
                    >
                        <Text style={styles.btnTxt}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.btnTxt}>Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            </ImageBackground>
            <View style={styles.footer}>
                    <Text style={styles.footerText}>2024 &copy; Lakshmi Shashank</Text>
                </View>
        </Animated.View>
    );
};
export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex:1,
        height:img_height,
        width:img_width,
    },
    head: {
        fontFamily: 'Futura',
        fontSize: 30,
        textAlign: 'center',
        marginTop: '5%',
        color:'#fa5c66',
    },
    infoTxt: {
        fontSize: 22,
        marginVertical: '10%',
        marginHorizontal: '8%',
        lineHeight:35,
    },
    btnView: {
        flex: 1,
        // flexDirection:'row',
        alignItems:'center',
        // marginHorizontal:'5%',
        marginVertical:'3%',
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
        marginVertical:'2%',
    },
    btnTxt: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Futura',
    },
    footer:{
        backgroundColor:'#fa5c66',
        height:40,
        justifyContent:'center',
    },
    footerText:{
        fontSize:15,
        fontFamily:'Helvetica',
        textAlign:'center',
        color:'white',
    },

});