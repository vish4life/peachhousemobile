import { useEffect, useRef } from "react";
import { Image, ImageBackground, Text, StyleSheet, ScrollView, Animated, Dimensions, View } from "react-native";

const bg_img = '../assets/images/parallax/pimg10.jpg';
const img1 = '../assets/images/deserts/d2.jpg';
const img2 = '../assets/images/meal/paneer.jpg';
const img3 = '../assets/images/salads/dish1.jpg';
// const carousel_array = [
//     {id:1,img:}
// ];
const { width, height } = Dimensions.get('window');
const devWidth = width;
const devHeight = height;
const Home = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);
    return (
        <ImageBackground source={require(bg_img)} style={styles.container}>
            <Animated.View style={[{ opacity: fadeAnim }]} >
                <ScrollView indicatorStyle='white' style={styles.innerContainer}>
                    <View style={styles.hero}>
                        <Text style={styles.heroTxt}>
                            Led by our talented chefs, the kitchen at Peach House is a playground for culinary creativity.
                            We source the finest, locally-sourced ingredients to craft dishes that not only tantalize the
                            taste buds but also reflect our commitment to sustainability.
                        </Text>
                    </View>
                    <View style={styles.sigView}>
                        <Text style={styles.sigHead}>Signature Dishes</Text>
                        <Text style={styles.sigTxt}>----------Top 3 Dishes of the Week----------</Text>
                    </View>
                    <ScrollView style={styles.imgGallery} showsHorizontalScrollIndicator horizontal indicatorStyle='white' >
                        <Image style={styles.img} source={require(img1)} />
                        <Text>{' '}</Text>
                        <Image style={styles.img} source={require(img2)} />
                        <Text>{' '}</Text>
                        <Image style={styles.img} source={require(img3)} />
                    </ScrollView>
                </ScrollView>
            </Animated.View>
        </ImageBackground>
    );
};
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        margin: '5%',
    },
    hero: {
        backgroundColor:'white',
        borderRadius:8,
    },
    heroTxt: {
        marginHorizontal:'4%',
        // color: '#ebebe0',
        color:'#fa5c66',
        fontSize: 24,
        fontFamily: 'Futura',
        lineHeight: 40,
    },
    sigView: {
        alignSelf: 'center',
        backgroundColor: '#ffff',
        width: '100%',
        margin: '3%',
        borderRadius: 5,
    },
    sigHead: {
        color: '#fa5c66',
        textAlign: 'center',
        fontFamily: 'Futura',
        fontSize: 40,
    },
    sigTxt: {
        color: '#fa5c66',
        textAlign: 'center',
        fontSize: 16,
    },
    imgGallery: {
        margin: '3%',
        borderRadius: 8,
        width: devWidth * .8,
        height: 300,
    },
    img: {
        width: devWidth * .8,
        height: 300,
        resizeMode: 'contain',
    },
});