
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyCollection from './MyCollection';
import { NavigationContainer } from '@react-navigation/native';
import TemMap from './TemMap';
import TemInfo from './TemInfo';
import TemtemList from './TemtemList'


const Drawer = createDrawerNavigator();

  
//Tem Info page is accessible only through other pages from which it gets correct information to show
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{
        drawerStyle: {
          backgroundColor: '#f5deb3',
          width: 200,
        },
      }}>
        <Drawer.Screen name="My Collection" component={MyCollection}/>
        <Drawer.Screen name="Temtem Map" component={TemMap}/>
        <Drawer.Screen name="Temtem List" component={TemtemList}/>
        <Drawer.Screen options={{headerShown: true, drawerItemStyle: {height: 0}}} name="Tem Info" component={TemInfo} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5deb3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
