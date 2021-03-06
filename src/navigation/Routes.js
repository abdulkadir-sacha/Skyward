import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { store } from '../App';
import { navigationRef } from './Navigator';

/////Skyward
import Splash from '../components/Splash/ChildComponent/Splash';
import SignIn from '../components/Login/ChildComponent/SignIn';
import MyBottomTab from '../components/Home/ChildComponent/MyBottomTab';
import HelpDesk from '../components/HelpDesk/List/HelpDesk';
import Appointments from '../components/Appointments/List/Appointments';
import Contacts from '../components/Contacts/List/Contacts';
import Customer from '../components/Customer/List/Customer';
import AddAppointments from '../components/Appointments/AddAppointments';
import AddContacts from '../components/Contacts/AddContacts';
import AddHelpDesk from '../components/HelpDesk/AddHelpDesk';
import UpdateHelpDesk from '../components/HelpDesk/UpdateHelpDesk';
import SyncData from '../components/Login/ChildComponent/SyncData';
import AddOpportunity from '../components/Opportunity/AddOpportunity/AddOpportunity';
import OppAttachment from '../components/Opportunity/AddOpportunity/attachment/OppAttachment';
import AddOppContact from '../components/Opportunity/AddOpportunity/customer/AddOppContact/AddOppContact';
import Opportunity from '../components/Opportunity/list/Opportunity';
import TaskList from '../components/Task/List/TaskList';

const Stack = createStackNavigator();

export default () => {
  const [loaded, setLoaded] = useState(false);
  const [initialRoue, setInitialRoute] = useState('SignIn');

  useEffect(() => {
    // openSQLiteDB();

    const session = store.getState().session;

    console.log('session.is_logged_in', session.is_logged_in);
    setInitialRoute(session.is_logged_in ? 'Home' : 'SignIn');
    SplashScreen.hide();

    setLoaded(true);
  }, []);

  return (
    loaded && (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator headerMode="none" initialRouteName={initialRoue}>
          {/* Skyward  */}
          <Stack.Screen component={MyBottomTab} name="Home" />
          <Stack.Screen component={Splash} name="Splash" />
          <Stack.Screen component={SignIn} name="SignIn" />
          <Stack.Screen component={HelpDesk} name="HelpDesk" />
          <Stack.Screen component={AddHelpDesk} name="AddHelpDesk" />
          <Stack.Screen component={UpdateHelpDesk} name="UpdateHelpDesk" />
          <Stack.Screen component={Opportunity} name="Opportunity" />
          <Stack.Screen component={AddOpportunity} name="AddOpportunity" />
          <Stack.Screen component={AddOppContact} name="AddOppContact" />
          <Stack.Screen component={Appointments} name="Appointments" />
          <Stack.Screen component={AddAppointments} name="AddAppointments" />
          <Stack.Screen component={OppAttachment} name="OppAttachment" />

          <Stack.Screen component={Customer} name="Customer" />
          <Stack.Screen component={Contacts} name="Contacts" />
          <Stack.Screen component={AddContacts} name="AddContacts" />
          <Stack.Screen component={SyncData} name="SyncData" />
          <Stack.Screen component={TaskList} name="Tasks" />
        </Stack.Navigator>
      </NavigationContainer>


    )
  );
};
