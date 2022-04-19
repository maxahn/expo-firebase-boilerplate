import React from 'react';
import { StyleSheet, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Text, View } from '../components/Themed';
import { useFirebase } from '../hooks/useFirebase';
import { RootStackScreenProps } from '../types';

interface SignUpProps {
    email: string;
    password: string;
}

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
    input: {
        width: 300,
        margin: 20,
    },
});

export default function SignInScreen({
    navigation,
}: RootStackScreenProps<'SignIn'>) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: { email: '', password: '' },
    });
    const { signUpEmailPassword, signInGoogle, isGoogleOauthAvailable } =
        useFirebase();

    const onSubmit = ({ email, password }: SignUpProps) =>
        signUpEmailPassword(email, password);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <Button
                disabled={!isGoogleOauthAvailable}
                title="Login with Google"
                onPress={() => signInGoogle()}
            />
            <Controller
                control={control}
                rules={{ required: true }}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Email"
                    />
                )}
            />
            {errors.email && <Text>This is required.</Text>}
            <Controller
                control={control}
                rules={{ required: true, minLength: 6 }}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry
                        placeholder="Password"
                    />
                )}
            />
            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
            <Button
                title="No account? Sign Up here"
                onPress={() => navigation.navigate('SignUp')}
            />
        </View>
    );
}
