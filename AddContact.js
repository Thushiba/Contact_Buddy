import { Button, TextInput, View, StyleSheet, SafeAreaView, Pressable, Text, Image, Alert } from "react-native";
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from "react";
const db = SQLite.openDatabase('contacts.db');

const AddContact = ({ navigation }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile1, setMobile1] = useState('');
    const [mobile2, setMobile2] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        createTable();
    }, []);

    const createTable = () => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, mobile1 TEXT, mobile2 TEXT, email TEXT)',
                    [],
                    () => console.log('Table created successfully'),
                    (error) => console.error('Error creating table: ', error)
                );
            },
            (error) => console.error('Transaction error: ', error)
        );
    };


    const addContact = () => {
        if (firstName && lastName && mobile1) {
            if (Number.isInteger(Number(mobile1)) && mobile1.length === 10) {
                if (!mobile2) {
                    db.transaction(
                        (tx) => {
                            tx.executeSql(
                                'INSERT INTO contacts (firstName, lastName, mobile1, mobile2, email) VALUES (?, ?, ?, ?, ?)',
                                [firstName, lastName, mobile1, mobile2, email],
                                () => {
                                    setFirstName('');
                                    setLastName('');
                                    setMobile1('');
                                    setMobile2('');
                                    setEmail('');
                                    navigation.navigate("Home");
                                },
                                (error) => console.error('Error adding contact: ', error)
                            );
                        },
                        (error) => console.error('Transaction error: ', error)
                    );
                } else {
                    if (Number.isInteger(Number(mobile2)) && mobile2.length === 10) {
                        db.transaction(
                            (tx) => {
                                tx.executeSql(
                                    'INSERT INTO contacts (firstName, lastName, mobile1, mobile2, email) VALUES (?, ?, ?, ?, ?)',
                                    [firstName, lastName, mobile1, mobile2, email],
                                    () => {
                                        setFirstName('');
                                        setLastName('');
                                        setMobile1('');
                                        setMobile2('');
                                        setEmail('');
                                        navigation.navigate("Home");
                                    },
                                    (error) => console.error('Error adding contact: ', error)
                                );
                            },
                            (error) => console.error('Transaction error: ', error)
                        );
                    } else {
                        Alert.alert('Warning', 'Invalid mobile number');
                    }
                }
            } else {
                Alert.alert('Warning', 'Invalid mobile number');
            }

        } else if (!firstName) {
            Alert.alert('Warning', 'Please set first name');
        } else if (!lastName) {
            Alert.alert('Warning', 'Please set last name');
        } else if (!mobile1) {
            Alert.alert('Warning', 'Please set mobile number');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Pressable style={styles.imgdiv} onPress={() => { navigation.navigate('Home') }}>
                <Image source={require('./arrowblue.png')} style={styles.img1} />
            </Pressable>
            <Image source={require('./add_contact.png')} style={styles.img} />
            <Text style={styles.title}>Add Contact</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mobile 1"
                    value={mobile1}
                    onChangeText={(text) => setMobile1(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mobile 2"
                    value={mobile2}
                    onChangeText={(text) => setMobile2(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Pressable style={styles.btn} onPress={addContact} >
                    <Text style={styles.txt}>Add Contact</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

export default AddContact;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6ECA9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginBottom: 30,
        width: '80%',
        marginTop: 40,
    },
    input: {
        height: 50,
        borderColor: '#B31312',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        fontSize: 16,
    },
    btn: {
        backgroundColor: '#B31312',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    img: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    img1: {
        width: 50,
        height: 50,
        resizeMode: 'contain',

    },
    imgdiv: {
        position: 'absolute',
        left: 10,
        top: 10,
    },
});
