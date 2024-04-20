import { View, StyleSheet } from 'react-native';
import AuthProvider from './components/AuthProvider';
import Navigation from './components/Navigation';

export default function App() {

  return (
    <AuthProvider>
      <View style={styles.container}>
        <Navigation />
      </View>
    </AuthProvider>
  );
};
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ffe8e8',
  },
});