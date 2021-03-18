import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
// import NavigationBar from './src/components/molecules/Navigators/AppNavigator';
import BottomNavigationBar from './src/components/molecules/BottomNavigationBar';
import { FirebaseContext, Firebase } from './src/services/Firebase';

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <FirebaseContext.Provider value={new Firebase()}>
        <BottomNavigationBar />
      </FirebaseContext.Provider>
    </ApplicationProvider>
  );
}
