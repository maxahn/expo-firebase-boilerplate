import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import AppNavigator from './src/components/molecules/AppNavigator';
import { FirebaseContext, Firebase } from './src/services/Firebase';

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <FirebaseContext.Provider value={new Firebase()}>
        <AppNavigator />
      </FirebaseContext.Provider>
    </ApplicationProvider>
  );
}
