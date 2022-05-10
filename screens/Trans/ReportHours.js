import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Button } from 'react-native';
import firebase, { db } from '../../FireBase/fire'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../constants/Colors';


class ReportHours extends React.Component {
    constructor() {
        super()
        this.state = {
            Name: null,
            ID: null,
            Hours:0,
            GHours:0,
            isLoaded: false,
            gotname: false,
            InterpreterName: null
        }
    }



    componentDidMount() {
        let IpName = null
        try {
            AsyncStorage.getItem('TranslatorName')
                .then(value => {
                    if (value != null) {
                        IpName = value;
                        this.setState({ InterpreterName: IpName })
                        this.setState({ gotname: true })
                    }
                })
        } catch (error) {
            console.warn(error)
        }
        //console.log("UserName is : " + UserName)
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
        let InterpreterName = this.state.InterpreterName
        db.collection("Interpreter").where("fullname", "==", InterpreterName)
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
        var UserName= this.state.Name
        var report = 'T:'+this.state.InterpreterName+' U:'+UserName
        db.collection("Requests").doc(report).set({
            Interpreter: this.state.InterpreterName,
            User: UserName,
            Hours: Hour
        })
        Alert.alert(
            "Reported Succesfully",
            "Interpreter user " + this.state.InterpreterName + " has reported " + Hour + " Hours with user " + UserName + " succesfully!",
            [
                { text: "OK", onPress: () => this.props.navigation.navigate({ routeName: 'TransHomePage' }) } //fix later
            ]
        )
    }


    render() {
        if (this.state.isLoaded == true && this.state.gotname == true) {

            return (
                <View>
                    <Text>User Name:</Text>
                    
                    
                    <TextInput
                        style={styles.inputField}
                        blurOnSubmit
                        autoCorrect={false}
                        placeholder='User Name'
                        keyboardType="ascii-capable"
                        onChangeText={(EmailVal) => this.setState({ Name: EmailVal })}
                        value={this.state.Name}
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
                                        <Text>Hours: </Text>
                    <TextInput
                        style={styles.inputField}
                        blurOnSubmit
                        autoCorrect={false}
                        placeholder='Phone Number'
                        keyboardType="phone-pad"
                        pattern="[0-9]*"
                        onChangeText={(PhoneVal) => this.setState({ Hours: PhoneVal })}
                        value={this.state.Hours}
                    />
                    <Button title="Finish Editing" onPress={() => {
                        Alert.alert('Save Changes?', 'Are you sure u would like to save this changes?',
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
                                        this.props.navigation.navigate({routeName: 'TransHomePage'})
                                    }
                                },
                            ])
                    }} color={Colors.secondery} />
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


export default ReportHours;