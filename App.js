import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import BottomNavigationBar from './src/components/molecules/BottomNavigationBar';
import { FirebaseContext, Firebase } from './src/services/Firebase';
import { default as theme } from './src/style/theme.json';

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <FirebaseContext.Provider value={new Firebase()}>
          <SafeAreaProvider>
            <BottomNavigationBar />
          </SafeAreaProvider>
        </FirebaseContext.Provider>
      </ApplicationProvider>
    </>
  );
}
