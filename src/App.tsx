/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
 import 'react-native-gesture-handler';
 import { GestureHandlerRootView } from 'react-native-gesture-handler'
 import {
   SafeAreaView,
   StatusBar,
   useColorScheme
 } from 'react-native';
 import { Provider } from 'react-redux';
 import { NavigationContainer } from '@react-navigation/native';
 import store from "./utils/store";
 import Main from "./navigation/main"
 
 function App(): React.JSX.Element {
   const isDarkMode = useColorScheme() === 'dark';
 
   return (
     <GestureHandlerRootView style={{ flex: 1 }}>
       <SafeAreaView style={{ flex: 1 }}>
         <StatusBar
           barStyle={isDarkMode ? 'light-content' : 'dark-content'}
         />
         <Provider store={store}>
           <NavigationContainer>
             <Main />
           </NavigationContainer>
         </Provider>
       </SafeAreaView>
     </GestureHandlerRootView>
   );
 }
 
 export default App;