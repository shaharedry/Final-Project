import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Button } from 'react-native';
import firebase, { db } from '../../FireBase/fire'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../constants/Colors';


class ViewBasket extends React.Component {
    constructor() {
        super()
        this.state = {
            Name: 'null',
            PhoneNum: null,
            Email: null,
            ID: null,
            isLoaded: false,
            gotname: false,
            Edit: false,
            validPhone: true,
            validEmail: true,
            BasketMoney: null,
            TranslatorHours: null
        }
    }



    componentDidMount() {
        let UserName = null
        try {
            AsyncStorage.getItem('UserName')
                .then(value => {
                    if (value != null) {
                        UserName = value;
                        this.setState({ gotname: true })
                    }
                })
        } catch (error) {
            console.warn(error)
        }
        console.log("UserName is : " + UserName)
        db.collection('User').get().then(snapshot => {
            let BasketMoneyz = null;
            let TranslatorHoursz = null
            snapshot.forEach(doc => {
                const KEY = Object.keys(doc.data());
                KEY.forEach((key_id) => {
                    if (key_id == 'fullname') {
                        if (doc.data().fullname == UserName) {
                            BasketMoneyz = doc.data().BasketMoney
                            TranslatorHoursz = doc.data().TranslatorHours
                        }
                        this.setState({ BasketMoney: BasketMoneyz })
                        this.setState({ TranslatorHours: TranslatorHoursz })
                    }
                })
            })
        })
        this.setState({ isLoaded: true })
    }


    render() {
        if (this.state.isLoaded == true && this.state.gotname == true) {
            return (
                <View>
                   
                        <View style={styles.title}>
                            <Text style={styles.setFontSizeOne}>Basket Info</Text>
                        </View>
                        <Text>Interpreter hours left: {(this.state.TranslatorHours)}</Text>
                        <Text>Interpreter hours used: {45 - (this.state.TranslatorHours)}</Text>
                        <Text>Money left: {(this.state.BasketMoney)}</Text>
                        <Text>Money used: {3500 - (this.state.BasketMoney)}</Text>


                    </View>
                

            )

        }
        else {
            return (
                <Text>Nothing Loaded,Please wait!</Text>
            )
        }
    }
}

const styles = StyleSheet.create({
    screen: {
        marginTop: 5,
        marginBottom: 10,
        width: '100%',
        //height: windowHeight /15,
        borderColor: '#acc',
        borderRadius: 3,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    InputContainer: {
        padding: 10,
        flex: 1,
        fontSize: 16,
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center'
    },
    setFontSizeOne: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: "bold",
        paddingBottom: 10
    },
    inputField: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1
    },
    container: {
        flex: 1,
        paddingBottom: 22
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    UpdateButton: {
        marginTop: 10,
        height: 45,
        width: 150,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
    UpdateButtonText: {
        color: "#FFFFFF",
        fontSize: 18,
    },
    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,

        marginVertical: 5,
        backgroundColor: "white",
        flexBasis: '46%',
        marginHorizontal: 5,
    },
    cardFooter: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    list: {
        paddingHorizontal: 5,
        backgroundColor: "#E6E6E6",
    },
    listContainer: {
        alignItems: 'center'
    },
    name: {
        fontSize: 18,
        flex: 1,
        alignSelf: 'center',
        color: "#008080",
        fontWeight: 'bold'
    },
    position: {
        fontSize: 14,
        flex: 1,
        alignSelf: 'center',
        color: "#696969"
    }

})


export default ViewBasket;