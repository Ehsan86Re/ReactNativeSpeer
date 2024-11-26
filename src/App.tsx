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
 import store from "./utils/store";
 
 function App(): React.JSX.Element {
   const isDarkMode = useColorScheme() === 'dark';
 
   return (
     <GestureHandlerRootView style={{ flex: 1 }}>
       <SafeAreaView style={{ flex: 1 }}>
         <StatusBar
           barStyle={isDarkMode ? 'light-content' : 'dark-content'}
         />
         <Provider store={store}>
         </Provider>
       </SafeAreaView>
     </GestureHandlerRootView>
   );
 }
 
 export default App;