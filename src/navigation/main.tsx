import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import User from "../screens/User";
import Users from "../screens/Users";
import { User as UserType } from "../utils/types";

type UserPageType = {
  fetch: boolean,
  user: UserType
}

export type RootStackParamList = {
  Home: undefined;
  User: UserPageType;
  Users: { userId: string, type: 'followers' | 'following' };
};

const RootStack = createStackNavigator<RootStackParamList>();

const Main = () => {
  return <RootStack.Navigator initialRouteName="Home" screenOptions={{
    headerMode: 'screen'
  }}>
    <RootStack.Screen name="Home" options={{ headerShown: false }} component={Home}/>
    <RootStack.Screen name="User" component={User}/>
    <RootStack.Screen name="Users" component={Users} options={({ route }) => ({ title: route.params.type })}/>
  </RootStack.Navigator>
};

export default Main;