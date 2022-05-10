import React from 'react'; 
import {View, Text, StyleSheet, Alert, Button, TextInput} from 'react-native';
import Colors from '../../constants/Colors';
import firebase ,{db} from '../../FireBase/fire'
import AsyncStorage from '@react-native-async-storage/async-storage';


class Basket extends React.Component {
    constructor(){
        super()
        this.state={
            uid: null,
            email: null,
            fullname: null,
            phone: null,
            id: null,
            Role: '2',    
            checked: false,
            TranslatorHours: 45,
            Verified: false,
            BasketMoney:3000
        }
    }



    GetUserInfoAndUpdate(idnumb){
      let name = null;
        db.collection('User').get().then( snapshot =>{
            snapshot.forEach( doc =>{const KEY = Object.keys(doc.data());
              KEY.forEach( (key_id) => {
                  if(key_id=='id'){
                      if(doc.data().id == idnumb){
                this.setState({uid:doc.data().uid})
                this.setState({email:doc.data().email})
                this.setState({fullname:doc.data().fullname})
                this.setState({phone:doc.data().phone})
                this.setState({id:doc.data().id})
                this.setState({Role:doc.data().Role})
                this.setState({checked:doc.data().checked})
                this.setState({TranslatorHours:doc.data().TranslatorHours})
                this.setState({Verified:doc.data().Verified})  
                this.setState({BasketMoney:doc.data().BasketMoney})
                this.UpdateInfo(doc.data().fullname)
                      }
                    }
                  }
              )
            }
            )
        })

        
    }

    UpdateInfo(name){
      db.collection("User").doc(name).update({
        BasketMoney:3500,
        TranslatorHours:45})
        Alert.alert('Reset', 'User ' +this.state.fullname +' Basket Resetted',
        [
            {
                text: "Ok",
                onPress: () => {
                  this.props.navigation.navigate({routeName: 'ClubHomePage'})
                },
            },
        ])
    }

    render(){
        return (
            <View>
                <Text>Id to reset Communication Basket:</Text> 
              <TextInput
                style={styles.inputField}
                blurOnSubmit
                autoCorrect={false}
                placeholder='Persons ID'
                keyboardType="number-pad"
                onChangeText={(FaxVal)=>this.setState({Fax:FaxVal})}
                value={this.state.Fax}
              />
               <Button title="Reset" onPress={() => {
                 this.GetUserInfoAndUpdate(this.state.Fax)
                        }}color={Colors.secondery} />
            </View>
        ); 
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
            
  
export default Basket;