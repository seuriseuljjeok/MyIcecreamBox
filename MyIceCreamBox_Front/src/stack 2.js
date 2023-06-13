import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainPage from './mainpage/mainpage';
import Page404 from './etc/page404';
import Login from './login/login';
import SignUp from './login/signup';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Page404">
      <Stack.Screen
        name="Page404"
        component={Page404}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainPage"
        component={MainPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default StackNavigation;
