import React, { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
// import AddGroup from '../addGroup/AddGroup';
import { Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './home/Home';

const Stack = createStackNavigator();
const windowWidth = Dimensions.get('window').width;
const MainScreen = () => {
  const dimensions = useWindowDimensions();
  const [isInitialRender, setIsInitialRender] = useState(false);
  useEffect(() => {
    // WhatsAppNum().then((res) => {
    //   console.log('WE MOVE');
    //   console.log('Hel', res);
    // });

    // SplashScreen.hide();
    // RNAudiotransition.initAudioTransition();

    // backgroundTask();
    // BackgroundFetch.registerHeadlessTask(MyHeadlessTask);
    // internetChecker();
    // hideNavigationBar();
    if (!isInitialRender) {
      setIsInitialRender(true);
      // setTimeout(() => {
      //   // getTimeSinceStartup().then((time) => {
      //   //   console.log(`Time since startup: ${time} ms`);
      //   // });
      // }, 1);
      // return true;
    }
  }, [isInitialRender]);
  return (
    <Stack.Navigator initialRouteName="ProfileScreen" headerMode="none">
      <Stack.Screen name="ProfileScreen">
        {(props) => <Home {...props} />}
      </Stack.Screen>
      {/* <Stack.Screen name="EditProfile">
        {(props) => <EditProfile {...props} extraData={navigation} />}
      </Stack.Screen> */}
      {/* <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
};

export default MainScreen;
