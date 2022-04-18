import React from 'react';
import { StyleSheet, Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useFirebase } from '../hooks/useFirebase';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});

export default function TabOneScreen({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    navigation,
}: RootTabScreenProps<'TabOne'>) {
    const { signOut } = useFirebase();
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab One</Text>
            <Button onPress={signOut} title="Logout">
                <Text>Logout</Text>
            </Button>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <EditScreenInfo path="/screens/TabOneScreen.tsx" />
        </View>
    );
}
