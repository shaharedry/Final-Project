import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Pressable, Button, TouchableOpacity } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RNBounceable from "@freakycoder/react-native-bounceable";
import firebase, { db } from '../../FireBase/fire'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../constants/Colors';


class ApproveHours extends React.Component {
    constructor() {
        super()
        this.state = {
            Name: null,
            HoursLeft: 0,
            Hours: 0,
            HoursDone: 0,
            isLoaded: false,
            HoursApproved: 0,
            InterpreterName: null,
            UnverifiedUsers: [],
            length: 0
        }
    }



    componentDidMount() {
        db.collection('Requests').get().then(snapshot => {
            const Unverified = [];
            snapshot.forEach(doc => {
                const KEY = Object.keys(doc.data());

                    const data = doc.data()
                    let i = 0;
                    Unverified.push({
                        User: doc.data().User,
                        Hours: doc.data().Hours,
                        Interpreter: doc.data().Interpreter,
                        Checked: false
                    })
                    i += 1;
                    this.setState({ length: i })

               
            })
            this.setState({ UnverifiedUsers: Unverified })
        })
        this.setState({ isLoaded: true })
    }

    handleCheckboxPress = () => {
        this.setState({ Checked: !Checked })
    }

    renderUnverifiedList() {
        if (this.state.isLoaded != false)
            return this.state.UnverifiedUsers.map((item, key) => {
                return (
                    <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", }} key={key} onPress={() => {  }}>
                        <BouncyCheckbox value={item.checked} onChange={() => { this.checkBox_Test }} />
                        <Text>User:{item.User}, Interpreter:{item.Interpreter},Hours:{item.Hours}</Text>

                        {/* <RNBounceable
                            style={{
                                marginTop: 16,
                                height: 50,
                                width: "90%",
                                backgroundColor: "#ffc484",
                                borderRadius: 12,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={() => bouncyCheckboxRef?.onPress()}
                        >
                            <Text style={{ color: "#fff" }}>User:{item.User}, Interpreter:{item.Interpreter},Hours:{item.Hours}</Text>
                        </RNBounceable> */}

                        {/* <CheckBox value={item.checked} onChange={() => { this.checkBox_Test }} /> */}
                        <Text style={{ fontWeight: "bold" }}>{item.fullname}</Text>
                    </TouchableOpacity>
                )
            })
    }

    onChecked(name) {
        this.UpdateList(name)
    }

    UpdateList(name) {
        const Verified = true;
        for (let i = 0; i < this.state.UnverifiedUsers.length; i++) {

            let username = this.state.UnverifiedUsers[i].User
            let intername = this.state.UnverifiedUsers[i].Interpreter
            let hour = this.state.UnverifiedUsers[i].Hours
            if (username == name) {
                let Hourleft;
                let Hourdone;
                let Hoursapp;
                db.collection('User').where("fullname", "==", username).get().then(
                    snapshot => {
                        snapshot.forEach(
                            function (doc) {
                                Hourleft = doc.data().fullname
                            }
                        )
                        this.setState({ HoursLeft: Hourleft })
                    }
                )


                db.collection('Interpreter').where("fullname", "==", intername).get().then(
                    snapshot => {
                        snapshot.forEach(
                            function (doc) {
                                Hourdone = doc.data().HoursDone
                                Hoursapp = doc.data().HoursApproved
                            }
                        )
                        this.setState({ HoursDone: Hourdone })
                        this.setState({ HoursApproved: Hoursapp })
                    }
                )

                var Thours = this.state.HoursLeft - hour
                db.collection("User").doc(username).update({
                    TranslatorHours: Thours
                })

                db.collection("Interpreter").doc(intername).update({
                    HoursApproved: this.state.HoursApproved - hour,
                    HoursDone: this.state.HoursDone + hour
                })

            }
            Alert.alert('Updated!', 'Refreshing page', [
                {
                    text: "Ok",
                    onPress: () => {

                        this.props.navigation.navigate({ routeName: 'SocialHomePage' })
                    },
                },
            ])
            //firebase.database().ref('Social/' + name ).update({Verified:true})
        }
    }

    Report() {
        let UserName = this.state.Name
        db.collection("Interpreter").where("fullname", "==", UserName)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    var Thours = doc.data().HoursDone
                    this.setState({ GHours: Thours })
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        var Thours = this.state.GHours
        var Hour = this.state.Hours
        Thours = Thours - Hour
        // db.collection("User").doc(UserName).update({
        //     TranslatorHours: Thours
        // })
        var report = UserName + ' ' + this.state.InterpreterName
        db.collection("Requests").doc(report).set({
            Interpreter: this.state.InterpreterName,
            User: UserName,
            Hours: Hour
        })
        Alert.alert(
            "Reported Succesfully",
            "Interpreter user " + UserName + " has reported " + Hour + " Hours with user " + this.state.InterpreterName + " succesfully!",
            [
                { text: "OK", onPress: () => this.props.navigation.navigate({ routeName: 'TransHomePage' }) } //fix later
            ]
        )
    }


    render() {
        if (this.state.isLoaded) {

            return (
                <View style={styles.container}>
                    {this.renderUnverifiedList()}
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


export default ApproveHours;