import { AuthContext } from './AuthProvider';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Logout from '../screens/Logout';
import Menu from '../screens/Menu';
// import Order from '../screens/Order';
import ResetPassword from '../screens/ResetPassword';
import Header from '../components/Header';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthScreens = () => {
    return (
        <Stack.Navigator initialRouteName='Welcome' >
            <Stack.Screen options={{ headerShown: false, headerLeft: null, title:'' }} name="Welcome" component={Welcome} />
            <Stack.Screen options={{ headerTintColor: '#fa5c66', title: 'Login', headerLeft: null }} name="Login" component={Login} />
            <Stack.Screen options={{ headerTintColor: '#fa5c66', title: 'Signup', headerLeft: null }} name="Signup" component={Signup} />
            <Stack.Screen options={{ headerTintColor: '#fa5c66', title: 'Reset', headerLeft: null }} name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
    );
};
const MainScreens = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                    { iconName = focused ? 'home-account' : 'home' }
                } else if (route.name === 'Menu') {
                    { iconName = focused ? 'food' : 'food-fork-drink' }
                } else if (route.name === 'Profile') {
                    { iconName = focused ? 'account-settings' : 'account-settings-outline' }
                } else if (route.name === 'Logout') {
                    { iconName = focused ? 'logout' : 'logout' }
                }else if (route.name === 'Order') {
                    { iconName = focused ? 'cart' : 'cart-outline' }
                };
                return <MaterialCommunityIcons name={iconName} size={size} color={color} />
            },
            tabBarActiveTintColor: '#fa5c66',
            tabBarInactiveTintColor: 'gray',
        })}>
            <Tab.Screen options={{ headerTintColor: '#fa5c66', title: 'Home', headerLeft: null }} name="Home" component={Home} />
            <Tab.Screen options={{ headerTintColor: '#fa5c66', title: 'Menu', headerLeft: null, }} name="Menu" component={Menu} />
            {/* <Tab.Screen options={{ headerTintColor: '#fa5c66', title: 'Order', headerLeft: null }} name="Order" component={Order} /> */}
            <Tab.Screen options={{ headerTintColor: '#fa5c66', title: 'Profile', headerLeft: null, headerTitle:'Personal Information' }} name="Profile" component={Profile} />
            <Tab.Screen options={{ headerShown: false, headerLeft: null, }} name="Logout" component={Logout} />
        </Tab.Navigator>
    );
};


const Navigation = () => {
    const { auth } = useContext(AuthContext);
    return (
        <NavigationContainer>
            <View style={styles.container}>
                <Header />
                {auth ? <MainScreens /> : <AuthScreens />}
            </View>
        </NavigationContainer>
    )
};

export default Navigation;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // margin:'10%',
        backgroundColor: '#fa5c66',
    },
});
