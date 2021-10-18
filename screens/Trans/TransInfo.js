import React from 'react'; 
import {View, Text, StyleSheet, Alert} from 'react-native';
import firebase ,{db} from '../../FireBase/fire'
import AsyncStorage from '@react-native-async-storage/async-storage';


class TransInfo extends React.Component {
    constructor(){
        super()
        this.state={
            Name:'null',
            PhoneNum:null,
            Email:null,
            ID:null,
            isLoaded:false,
            gotname:false
        }
    }



    componentDidMount(){
        let UserName = null    
        try{
            AsyncStorage.getItem('TranslatorName')
                .then(value => {
                    if(value!= null) {
                        UserName=value;
                        this.setState({gotname:true})
                    }
                })
            } catch (error){
                console.warn(error)
        }
        console.log("UserName is : "+UserName)
        db.collection('Interpreter').get().then( snapshot =>{
            let Userame=null;
            let phone=null;
            let temail=null;
            let Id=null;
            snapshot.forEach( doc =>{
                const KEY = Object.keys(doc.data());
                KEY.forEach( (key_id) => {
                    if(key_id=='fullname'){
                        if(doc.data().fullname == UserName){
                            Userame = doc.data().fullname
                            phone = doc.data().phone
                            temail = doc.data().email
                            Id = doc.data().id
                        }
                        this.setState({PhoneNum:phone})
                        this.setState({Email:temail})
                        this.setState({ID:Id})
                        this.setState({Name:Userame})
                    }
                })
            })
        })
        this.setState({isLoaded:true})
    }


    render(){
        if(this.state.isLoaded==true && this.state.gotname==true){
        return (
            <View>
                <Text>Name: {(this.state.Name)}</Text> 
                <Text>PhoneNumber: {(this.state.PhoneNum)}</Text>
                <Text>Email: {(this.state.Email)}</Text> 
                <Text>ID: {(this.state.ID)}</Text> 
            </View>
        ); 
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
            
  
export default TransInfo;