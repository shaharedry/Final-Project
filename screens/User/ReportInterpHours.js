import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Button, Dimensions } from 'react-native';
import firebase, { db } from '../../FireBase/fire'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../constants/Colors';

var width = Dimensions.get('window').width
class ReportInterpHours extends React.Component {
    constructor() {
        super()
        this.state = {
            Name: 'null',
            ID: null,
            Hours: 0,
            GHours: 0,
            isLoaded: false,
            gotname: false,
            InterpreterName: null
        }
    }



    componentDidMount() {
        let UserName = null
        try {
            AsyncStorage.getItem('UserName')
                .then(value => {
                    if (value != null) {
                        UserName = value;
                        this.setState({ Name: UserName })
                        this.setState({ gotname: true })
                    }
                })
        } catch (error) {
            console.warn(error)
        }
        console.log("UserName is : " + UserName)
        // db.collection('User').get().then( snapshot =>{
        //     let Userame=null;
        //     let phone=null;
        //     let temail=null;
        //     let Id=null;
        //     snapshot.forEach( doc =>{
        //         const KEY = Object.keys(doc.data());
        //         KEY.forEach( (key_id) => {
        //             if(key_id=='fullname'){
        //                 if(doc.data().fullname == UserName){
        //                     Userame = doc.data().fullname
        //                     phone = doc.data().phone
        //                     temail = doc.data().email
        //                     Id = doc.data().id
        //                 }
        //                 this.setState({PhoneNum:phone})
        //                 this.setState({Email:temail})
        //                 this.setState({ID:Id})
        //                 this.setState({Name:Userame})
        //             }
        //         })
        //     })
        // })
        this.setState({ isLoaded: true })
    }

    Report() {
        let UserName = this.state.Name
        db.collection("Users").where("fullname", "==", UserName)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    var Thours = doc.data().TranslatorHours
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
        var report = "U:" + UserName + ' T:' + this.state.InterpreterName
        db.collection("Requests").doc(report).set({
            Interpreter: this.state.InterpreterName,
            User: UserName,
            Hours: Hour
        })
        Alert.alert(
            "Reported Succesfully",
            "Deaf user " + UserName + " has reported " + Hour + " Hours with " + this.state.InterpreterName + " succesfully!",
            [
                { text: "OK", onPress: () => this.props.navigation.navigate({ routeName: 'UserHomePage' }) } //fix later
            ]
        )
    }


    render() {
        if (this.state.isLoaded == true && this.state.gotname == true) {

            return (
                <View>
                    <Text style={styles.setFontSizeOne}>Report Interpreter Hours</Text>
                    <Text>      Interpreter Name:</Text>


                    <TextInput
                        style={styles.inputField}
                        blurOnSubmit
                        autoCorrect={false}
                        keyboardType="ascii-capable"
                        onChangeText={(EmailVal) => this.setState({ InterpreterName: EmailVal })}
                        value={this.state.InterpreterName}
                    />
                    {/* <Text>Interpreter ID: </Text>
                    <TextInput
                        style={styles.inputField}
                        blurOnSubmit
                        autoCorrect={false}
                        placeholder='Phone Number'
                        keyboardType="phone-pad"
                        pattern="[0-9]*"
                        onChangeText={(PhoneVal) => this.setState({ ID: PhoneVal })}
                        value={this.state.ID}
                    /> */}
                    <Text>      Hours: </Text>
                    <TextInput
                        style={styles.inputField}
                        blurOnSubmit
                        autoCorrect={false}
                        keyboardType="phone-pad"
                        pattern="[0-9]*"
                        onChangeText={(PhoneVal) => this.setState({ Hours: PhoneVal })}
                        value={this.state.Hours}
                    />
                    <View style={styles.box}>
                        <Button title="Report" onPress={() => {
                            Alert.alert('Report Hours?', 'Are you sure you?',
                                [
                                    {
                                        text: "Yes",
                                        onPress: () => {
                                            this.Report()
                                        },
                                    },
                                    {
                                        text: "No",
                                        onPress: () => {
                                            this.props.navigation.navigate({ routeName: 'UserHomePage' })
                                        }
                                    },
                                ])
                        }} color={Colors.secondery} />
                    </View>
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
    setFontSizeOne: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: "bold",
        paddingBottom: 10
    },
    box: {
        backgroundColor: Colors.background,
        height: 40,
        width: width / 2 - 10,
        margin: 5,
        marginBottom: 35,
        borderRadius: 16,
        alignSelf: 'center'
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
        borderWidth: 1,
        width:350,
        alignSelf:'center'
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


export default ReportInterpHours;