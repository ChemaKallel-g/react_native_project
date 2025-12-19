import { NewAppScreen } from '@react-native/new-app-screen';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import MainTabNavigator from './src/components/MainTabNavigator';
import CoffeeDetailsScreen from './src/screens/CoffeeDetailsScreen';
import LoginScreen from './src/screens/Login';
import SignupScreen from './src/screens/SignupScreen';
import { ThemeProvider } from './src/context/ThemeContext';

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Main" component={MainTabNavigator} />
          <Stack.Screen name="CoffeeDetails" component={CoffeeDetailsScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}


function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
