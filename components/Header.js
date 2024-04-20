import { Text, StyleSheet, Image, View, SafeAreaView } from "react-native";

const logo_img_url = '../assets/images/logos/logo4.png';
const Header = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Image source={require(logo_img_url)} style={styles.img} tintColor='#ffff' />
                <Text style={styles.head}>Peach House</Text>
            </View>
        </SafeAreaView>
    );
};

export default Header;
const styles = StyleSheet.create({
    container: {
        flex: 0.15,
        justifyContent: 'center',
        alignContent: 'center',
        // marginTop:'13%',
        // backgroundColor:'#fa5c66',
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    img: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    head: {
        fontSize: 50,
        fontFamily: 'Bradley Hand',
        marginLeft: '5%',
        color: '#ffff',
    },
});