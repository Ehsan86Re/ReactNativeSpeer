import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";

export type RootStackParamList = {
  Home: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const Main = () => {
  return <RootStack.Navigator initialRouteName="Home" screenOptions={{
    headerMode: 'screen'
  }}>
    <RootStack.Screen name="Home" options={{ headerShown: false }} component={Home}/>
  </RootStack.Navigator>
};

export default Main;