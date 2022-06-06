import React from 'react';
import Colors from '../../constants/Colors';
import { View, Text, TextInput, StyleSheet, Alert, Button, Dimensions } from 'react-native';
import firebase, { db } from '../../FireBase/fire'
import AsyncStorage from '@react-native-async-storage/async-storage';

var width = Dimensions.get('window').width

class TransInfo extends React.Component {
  constructor() {
    super()
    this.state = {
      Name: 'null',
      PhoneNum: null,
      hoursDone: 0,
      Email: null,
      ID: null,
      isLoaded: false,
      gotname: false,
      Edit: false,
      Hoz: 0
    }
  }



  componentDidMount() {
    let UserName = null
    try {
      AsyncStorage.getItem('TranslatorName')
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
    db.collection('Interpreter').get().then(snapshot => {
      let Userame = null;
      let phone = null;
      let temail = null;
      let Id = null;
      let Hourz = 0;
      let hoz = 0;
      snapshot.forEach(doc => {
        const KEY = Object.keys(doc.data());
        KEY.forEach((key_id) => {
          if (key_id == 'fullname') {
            if (doc.data().fullname == UserName) {
              Userame = doc.data().fullname
              phone = doc.data().phone
              temail = doc.data().email
              Id = doc.data().id
              Hourz = doc.data().HoursDone
              hoz = doc.data().HoursApproved
            }
            this.setState({ PhoneNum: phone })
            this.setState({ Email: temail })
            this.setState({ ID: Id })
            this.setState({ Name: Userame })
            this.setState({ hoursDone: Hourz })
            this.setState({ Hoz: hoz })
          }
        })
      })
    })
    this.setState({ isLoaded: true })
  }

  UpdateInfo() {
    const Info_Name = this.state.Name
    const Info_Email = this.state.Email
    const Info_Phone = this.state.PhoneNum
    const Info_ID = this.state.ID
    const Info_HZ = this.state.hoursDone
    const Info_Hz = this.state.Hoz

    db.collection("Interpreter").doc(Info_Name).update({
      email: Info_Email,
      id: Info_ID,
      fullname: Info_Name,
      phone: Info_Phone,
      HoursDone: Info_HZ,
      HoursApproved: Info_Hz
    })
  }

  CheckValidPhone() {
    var x = this.state.PhoneNum
    if ((!isNaN(x)) && ((x.length) == 10) == false) {
      Alert.alert('Error!', 'Invalid Phone Number!')
      return false
    }
    return true
  }

  CheckValidEmail() {
    var x = this.state.Email
    for (var i = 0; i < (x.length); i++) {
      if (x[i] == '@')
        return true;
    }
    Alert.alert('Error!', 'Invalid Email address!')
    return false
  }

  render() {
    if (this.state.isLoaded == true && this.state.gotname == true) {
      if (this.state.Edit == false) {
        return (
          <View>
            <View>
              <Text style={styles.setFontSizeOne}>{this.state.Name} Info</Text>
            </View>

            <Text>Name: {(this.state.Name)}</Text>
            <Text>Email: {(this.state.Email)}</Text>
            <Text>Hours Done: {(this.state.hoursDone)}</Text>
            <Text>Hours Approved: {(this.state.Hoz)}</Text>
            <Text>Phone: {(this.state.PhoneNum)}</Text>
            <Text>ID: {(this.state.ID)}</Text>
            <View style={styles.box}>
              <Button title="Edit" onPress={() => {
                this.setState({ Edit: true })
              }} color={Colors.secondery} />
            </View>
          </View>
        );
      }
      else {
        return (
          <View>
            <Text>Name: {(this.state.Name)}</Text>
            <Text>ID: {(this.state.ID)}</Text>
            <Text>Email: </Text>
            <TextInput
              style={styles.inputField}
              blurOnSubmit
              autoCorrect={false}
              placeholder='email address'
              keyboardType="email-address"
              onChangeText={(EmailVal) => this.setState({ Email: EmailVal })}
              value={this.state.Email}
            />
            <Text>PhoneNumber: </Text>
            <TextInput
              style={styles.inputField}
              blurOnSubmit
              autoCorrect={false}
              placeholder='Phone Number'
              keyboardType="phone-pad"
              onChangeText={(PhoneVal) => this.setState({ PhoneNum: PhoneVal })}
              value={this.state.PhoneNum}
            />
            <View style={styles.box2}>
              <Button title="Finish Editing" onPress={() => {
                Alert.alert('Save Changes?', 'Are you sure u would like to save this changes?',
                  [
                    {
                      text: "Yes",
                      onPress: () => {
                        if (this.CheckValidPhone() && this.CheckValidEmail()) {
                          this.UpdateInfo();
                          this.setState({ Edit: false })
                        }
                      },
                    },
                    {
                      text: "No",
                      onPress: () => {
                        this.setState({ Edit: false })
                      }
                    },
                  ])
              }} color={Colors.secondery} />
            </View>
          </View>
        )
      }
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
  }, box: {
    backgroundColor: Colors.background,
    height: 40,
    width: width / 2 - 100,
    margin: 5,
    marginBottom: 35,
    borderRadius: 16,
    alignSelf: 'center'
  },
  box2: {
    backgroundColor: Colors.background,
    height: 40,
    width: width / 2 - 30,
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


export default TransInfo;