import * as React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import EquipeScreen from '../screens/EquipeScreen';
import ListCompScreen from '../screens/ListCompScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TopScreen from '../screens/TopScreen';
import Logout from '../screens/Logout';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Accueil" drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Accueil"
        component={HomeScreen}
        options={{
          drawerLabel: 'Accueil',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Competitions"
        component={ListCompScreen}
        options={{
          drawerLabel: 'Competitions',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="trophy" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Equipes"
        component={EquipeScreen}
        options={{
          drawerLabel: 'Equipes',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="groups" size={24} color="#5f6368" />
          ),
        }}
      />
      <Drawer.Screen
        name="Top"
        component={TopScreen}
        options={{
          drawerLabel: 'Top',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="podium" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profil"
        component={ProfileScreen}
        options={{
          drawerLabel: 'Profil',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          drawerLabel: 'Déconnexion',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="exit-to-app" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
