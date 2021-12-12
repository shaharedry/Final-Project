import React from 'react'; 
import {View, Text, StyleSheet, Alert, Button, TextInput} from 'react-native';
import Colors from '../../constants/Colors';
import firebase ,{db} from '../../FireBase/fire'
import AsyncStorage from '@react-native-async-storage/async-storage';


class ClubInfo extends React.Component {
    constructor(){
        super()
        this.state={
            Edit:false,
            1:null,
            2:null,
            3:null,
            4:null,
            5:null,
            Address:null,
            Email:null,
            Fax:null,
            Phone:null,
            isLoaded:false,
            gotname:false,
        }
    }



    componentDidMount(){
        db.collection('Club').get().then( snapshot =>{
            // let first=null;
            // let second=null;
            // let third=null;
            // let fourth=null;
            // let fifth=null;
            // let add=null;
            // let emai=null;
            // let fax=null;
            // let phon=null;
            snapshot.forEach( doc =>{
            //     const KEY = Object.keys(doc.data());
            //     KEY.forEach( (key_id) => {
            //         if(key_id=='fullname'){
            //             if(doc.data().fullname == UserName){
            //                 Userame = doc.data().fullname
            //                 phone = doc.data().phone
            //                 temail = doc.data().email
            //                 Id = doc.data().id
            //             }
            //             this.setState({PhoneNum:phone})
            //             this.setState({Email:temail})
            //             this.setState({ID:Id})
            //             this.setState({Name:Userame})
            //         }
            //     })
                // first = doc.data().first
                // second = doc.data().second
                // third = doc.data().third
                // fourth = doc.data().fourth
                // fifth = doc.data().fifth
                // add = doc.data().Address
                // emai = doc.data().Email
                // fax = doc.data().Fax
                // phon = doc.data().Phone
                this.setState({1:doc.data().first})
                this.setState({2:doc.data().second})
                this.setState({3:doc.data().third})
                this.setState({4:doc.data().fourth})
                this.setState({5:doc.data().fifth})
                this.setState({Address:doc.data().Address})
                this.setState({Email:doc.data().Email})
                this.setState({Fax:doc.data().Fax})
                this.setState({Phone:doc.data().Phone})
            }
            )
        })
        this.setState({isLoaded:true})
        this.setState({gotname:true})
    }

    UpdateInfo(){
        const Info = {
          Address:this.state.Address ,
          Email:this.state.Email ,
          Fax:this.state.Fax ,
          Phone:this.state.Phone ,
          first:this.state[1] ,
          second:this.state[2] , 
          third:this.state[3] , 
          fourth:this.state[4] , 
          fifth:this.state[5] ,
        }

      // db.collection('Club').set
      // .doc('Info')
      // .set(Info)
      //Alert.alert("Checker","Fax value is: "+this.state.Fax)
      db.collection("Club").doc('Info').update({Address:this.state.Address ,
        Email:this.state.Email ,
        Fax:this.state.Fax ,
        Phone:this.state.Phone ,
        first:this.state[1] ,
        second:this.state[2] , 
        third:this.state[3] , 
        fourth:this.state[4] , 
        fifth:this.state[5] ,})
      //firebase.database().ref('Club/' + 'Info').update({Info, OnComplete:Alert.alert('Done!')})
    }

    render(){
        if(this.state.isLoaded==true && this.state.gotname==true){
          if(this.state.Edit==false){
        return (
            <View>
                <Text>Address: {(this.state.Address)}</Text> 
                <Text>PhoneNumber: {(this.state.Phone)}</Text>
                <Text>Email: {(this.state.Email)}</Text> 
                <Text>Fax: {(this.state.Fax)}</Text> 
                <Text>Working Hours: </Text>
                <Text>Sunday, Tuesday, Wednesday, Thursday: {(this.state[1])}</Text>  
                <Text>Monday: {(this.state[2])}</Text> 
                <Button title="Edit" onPress={() => {
                  this.setState({Edit:true})
                }} color={Colors.secondery} />
            </View>
        ); 
        }
        else if(this.state.Edit==true){
          return (
            <View>
              <Text>Adress:</Text>         
                <TextInput
                style={styles.inputField}
                blurOnSubmit
                autoCorrect={false}
                placeholder='Full Name'
                keyboardType="ascii-capable"
                onChangeText={(AddVal)=>this.setState({Address:AddVal})}
                value={this.state.Address}
              />
              <Text>PhoneNumber: </Text>
              <TextInput
                style={styles.inputField}
                blurOnSubmit
                autoCorrect={false}
                placeholder='Full Name'
                keyboardType="ascii-capable"
                onChangeText={(PhoneVal)=>this.setState({Phone:PhoneVal})}
                value={this.state.Phone}
              />
              <Text>Email: </Text>
              <TextInput
                style={styles.inputField}
                blurOnSubmit
                autoCorrect={false}
                placeholder='Full Name'
                keyboardType="ascii-capable"
                onChangeText={(EmailVal)=>this.setState({Email:EmailVal})}
                value={this.state.Email}
              />
              <Text>Fax: </Text>
              <TextInput
                style={styles.inputField}
                blurOnSubmit
                autoCorrect={false}
                placeholder='Full Name'
                keyboardType="ascii-capable"
                onChangeText={(FaxVal)=>this.setState({Fax:FaxVal})}
                value={this.state.Fax}
              />
              <Button title="Finish Editing" onPress={() => {
                  Alert.alert('Save Changes?','Are you sure u would like to save this changes?',
                  [
                    {
                      text: "Yes",
                      onPress: () => {
                        this.UpdateInfo();
                        this.setState({Edit:false})
                      },
                    },
                    {
                      text: "No",
                      onPress: () => {
                        this.setState({Edit:false})
                      }
                    },
                  ])
                }}color={Colors.secondery} />
            </View>
          )
        }
      }
        else{
            return(
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
                    marginTop:10,
                    height:45,
                    width:150,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius:30,
                    backgroundColor: "#00BFFF",
                  },
                UpdateButtonText:{
                    color: "#FFFFFF",
                    fontSize:18,
                  },
                  card:{
                    shadowColor: '#00000021',
                    shadowOffset: {
                      width: 0,
                      height: 6,
                    },
                    shadowOpacity: 0.37,
                    shadowRadius: 7.49,
                    elevation: 12,
                
                    marginVertical: 5,
                    backgroundColor:"white",
                    flexBasis: '46%',
                    marginHorizontal: 5,
                  },
                  cardFooter: {
                    paddingVertical: 17,
                    paddingHorizontal: 16,
                    borderTopLeftRadius: 1,
                    borderTopRightRadius: 1,
                    flexDirection: 'row',
                    alignItems:"center", 
                    justifyContent:"center"
                  },
                  list: {
                    paddingHorizontal: 5,
                    backgroundColor:"#E6E6E6",
                  },
                  listContainer:{
                   alignItems:'center'
                  },
                  name:{
                    fontSize:18,
                    flex:1,
                    alignSelf:'center',
                    color:"#008080",
                    fontWeight:'bold'
                  },
                  position:{
                    fontSize:14,
                    flex:1,
                    alignSelf:'center',
                    color:"#696969"
                  }
                  
            })
            
  
export default ClubInfo;