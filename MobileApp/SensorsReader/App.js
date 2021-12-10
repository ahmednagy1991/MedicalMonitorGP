/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import HelloWorldApp from './components/HelloWorldApp';
import Register from './components/Register';

import SensorsConnectionValidator from './components/SensorsConnectionValidator';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar, 
  StyleSheet,
  Text,
  useColorScheme,
  View, 
  ActivityIndicator,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header, 
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={SensorsConnectionValidator}
          options={{ title: 'Sensor connection validator' }}
        />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default App;
