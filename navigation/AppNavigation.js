import React from 'react';
import { Platform, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../constants/Colors';
import IconSize from '../constants/IconSize';

import AuthScreen from '../screens/AuthScreen';
import ClockingScreen, { clockingScreenOptions } from '../screens/ClockingScreen';
import ReasonScreen, { reasonScreenOptions } from '../screens/ReasonScreen';
import AttendanceScreen, { attendanceScreenOptions } from '../screens/AttendanceScreen';
import ChangePasswordScreen, { changePasswordScreenOptions } from '../screens/ChangePasswordScreen';
import SettingsScreen, { settingsScreenOptions } from '../screens/SettingsScreen';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const ClockingNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={defaultNavOptions}
    >
      <Stack.Screen
        name='Clocking'
        component={ClockingScreen}
        options={clockingScreenOptions}
      />
      <Stack.Screen
        name='Reason'
        component={ReasonScreen}
        options={reasonScreenOptions}
      />
    </Stack.Navigator>
  )
}

const ChangePasswordNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={defaultNavOptions}
    >
      <Stack.Screen
        name='ChangePassword'
        component={ChangePasswordScreen}
        options={changePasswordScreenOptions}
      />
    </Stack.Navigator>
  )
}

const SettingsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={defaultNavOptions}
    >
      <Stack.Screen
        name='Settings'
        component={SettingsScreen}
        options={settingsScreenOptions}
      />
    </Stack.Navigator>
  )
}

const AttendanceNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={defaultNavOptions}
    >
      <Stack.Screen
        name='Attendance'
        component={AttendanceScreen}
        options={attendanceScreenOptions}
      />
    </Stack.Navigator>
  )
}

const HomeNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName='Clocking'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'ClockingTab') {
            iconName = focused ?
              (Platform.OS === 'android' ? 'md-time' : 'ios-time') :
              (Platform.OS === 'android' ? 'md-time-outline' : 'ios-time')
          } else {
            iconName = focused ?
              (Platform.OS === 'android' ? 'md-list-circle' : 'ios-list-circle') :
              (Platform.OS === 'android' ? 'md-list-circle-outline' : 'ios-list-circle')
          }

          return <Ionicons name={iconName} size={IconSize.default} color={Colors.primary} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: Colors.primary,
        inactiveTintColor: 'gray',
        style: {
          height: 74,
          paddingBottom: 10,
          paddingTop: 10,
          fontFamily: 'open-sans',
        },
      }}
    >
      <BottomTab.Screen
        name='ClockingTab'
        component={ClockingNavigator}
        options={{tabBarLabel: 'Clocking'}}
      />
      <BottomTab.Screen
        name='AttendanceTab'
        component={AttendanceNavigator}
        options={{tabBarLabel: 'Attendance'}}
      />
    </BottomTab.Navigator>
  );
}

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName='Home'
      drawerContentOptions={{
        activeTintColor: Colors.primary
      }}
    >
      <Drawer.Screen
        name='Home'
        component={HomeNavigator}
        options={{ drawerLabel: 'Home'}}
      />
      <Drawer.Screen
        name='ChangePassword'
        component={ChangePasswordNavigator}
        options={{ drawerLabel: 'Change Password'}}
      />
      <Drawer.Screen
        name='Settings'
        component={SettingsNavigator}
        options={{ drawerLabel: 'Settings'}}
      />
    </Drawer.Navigator>
  );
}

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
export default AppNavigation;