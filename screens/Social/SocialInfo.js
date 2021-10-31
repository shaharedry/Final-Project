import React from 'react'; 
import {View, Text, StyleSheet, Alert, Button, TextInput} from 'react-native';
import Colors from '../../constants/Colors';
import firebase ,{db} from '../../FireBase/fire'
import AsyncStorage from '@react-native-async-storage/async-storage';


class SocialInfo extends React.Component {
    constructor(){
        super()
        this.state={
            address:null,
            email:null,
            fax:null,
            Language:null,
            phone:null,
            workingHours:null,
            isLoaded:false,
            Edit:false
        }
    }



    componentDidMount(){
        db.collection('Social').get().then( snapshot =>{
            snapshot.forEach( doc =>{
                this.setState({address:doc.data().Address})
                this.setState({email:doc.data().Email})
                this.setState({fax:doc.data().Fax})
                this.setState({Language:doc.data().Languages})
                this.setState({phone:doc.data().Phone})
                this.setState({workingHours:doc.data().WorkingHours})
            }
            )
        })
        this.setState({isLoaded:true})
    }


    UpdateInfo(){
        const Info = {
            Address:this.state.address ,
            Email:this.state.email ,
            Fax:this.state.fax ,
            Languages:this.state.Language,
            Phone:this.state.phone ,
            WorkingHours:this.state.workingHours
        }
      firebase.database().ref('Social/' + 'Info').update(Info)
    }

    render(){
        if(this.state.isLoaded==true){
            if(this.state.Edit==false){
                return (
                    <View>
                        <Text>Address: {(this.state.address)}</Text> 
                        <Text>Email: {(this.state.email)}</Text>
                        <Text>Phone: {(this.state.phone)}</Text> 
                        <Text>Fax: {(this.state.fax)}</Text> 
                        <Text>Languages: {(this.state.Language)}</Text> 
                        <Text>Working Hours: {(this.state.workingHours)}</Text> 


                        
                        <Button title="Edit" onPress={() => {
                            this.setState({Edit:true})
                        }} color={Colors.secondery} />
                    </View>
                ); 
            }
            else{
                return (
                  <View>
                    <Text>Adress:</Text>         
                    <TextInput
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='Full Name'
                    keyboardType="ascii-capable"
                    onChangeText={(AddVal)=>this.setState({address:AddVal})}
                    value={this.state.address}
                    />
                    <Text>Email: </Text>
                    <TextInput
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='Full Name'
                    keyboardType="ascii-capable"
                    onChangeText={(EmailVal)=>this.setState({email:EmailVal})}
                    value={this.state.email}
                    />
                    <Text>PhoneNumber: </Text>
                    <TextInput
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='Full Name'
                    keyboardType="ascii-capable"
                    onChangeText={(PhoneVal)=>this.setState({phone:PhoneVal})}
                    value={this.state.phone}
                    />
                    <Text>Fax: </Text>
                    <TextInput
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='Full Name'
                    keyboardType="ascii-capable"
                    onChangeText={(FaxVal)=>this.setState({fax:FaxVal})}
                    value={this.state.fax}
                    />
                    <Text>Languages: </Text>
                    <TextInput
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='Full Name'
                    keyboardType="ascii-capable"
                    onChangeText={(LangVal)=>this.setState({Language:LangVal})}
                    value={this.state.Language}
                    />
                    <Text>Working Hours: </Text>
                    <TextInput
                    style={styles.inputField}
                    blurOnSubmit
                    autoCorrect={false}
                    placeholder='Full Name'
                    keyboardType="ascii-capable"
                    onChangeText={(WHVal)=>this.setState({workingHours:WHVal})}
                    value={this.state.workingHours}
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
            
  
export default SocialInfo;