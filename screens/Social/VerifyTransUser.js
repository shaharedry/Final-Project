import React from 'react'; 
import {View, Text, StyleSheet, Alert,TouchableOpacity, FlatList, Button} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RNBounceable from "@freakycoder/react-native-bounceable";
import firebase ,{db} from '../../FireBase/fire'
import AsyncStorage from '@react-native-async-storage/async-storage';


class VerifyTransUser extends React.Component {
    constructor(){
        super()
        this.state={
            isLoaded:false,
            UnverifiedUsers:[],
            length:0
        }
    }



    componentDidMount(){
        db.collection('Interpreter').get().then( snapshot =>{
            //details here
            const Unverified = [];
            snapshot.forEach( doc =>{
                const KEY = Object.keys(doc.data());
                KEY.forEach( (key_id) => {
                    if(key_id=='Verified'){
                        if(doc.data().Verified == 'false'){
                            const data = doc.data()
                            let i=0;
                            Unverified.push({
                                fullname:doc.data().fullname,
                                Role:doc.data().Role,
                                Verified:doc.data().Verified,
                                email:doc.data().email,
                                phone:doc.data().phone,
                                id:doc.data().id,
                                checked:doc.data().checked,
                                uid:doc.data().uid
                            })
                            i+=1;
                            this.setState({length:i})
                        }
                    // list here
                    }
                })
            })
            this.setState({UnverifiedUsers:Unverified})
        })
        this.setState({isLoaded:true})
    }


    renderUnverifiedList(){
        if(this.state.isLoaded!=false)
        return this.state.UnverifiedUsers.map((item,key)=> {
            return(
                <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" , }} key={key} onPress={()=> 
                {this.UpdateList(item.fullname)}}>
                    {/* <CheckBox value={item.checked} onChange={()=> {this.checkBox_Test}}/> */}
                    <BouncyCheckbox value={item.checked} onChange={() => { this.checkBox_Test }} />
                    <Text style={{fontWeight:"bold"}}>{item.fullname}</Text>
                </TouchableOpacity>
            )
        })
    }

    onChecked(name){
    //     const data = this.state.UnverifiedUsers
    //     const index = data.findIndex( x => x.Data === Data)
    //     data[index].checked = !data[index].checked
    //     this.setState({ UnverifiedUsers: data})  
    // 
    //Alert.alert('Name is',''+name)
    this.UpdateList(name)
    }

    UpdateList(name){
        const Verified = true;
        for(let i=0;i<this.state.UnverifiedUsers.length;i++){
            //Alert.alert(''+i,''+this.state.UnverifiedUsers[i].fullname+' pressed on: '+name)
            let checkname = this.state.UnverifiedUsers[i].fullname
            //Alert.alert('checkname is:',''+checkname)
            if(checkname==name){
                // firebase.database().ref('User/'+name).update({
                //     fullname: this.state.UnverifiedUsers[i].fullname,
                //     Role:this.state.UnverifiedUsers[i].Role,
                //     TranslatorHours: '45 hours',
                //     email: this.state.UnverifiedUsers[i].email,
                //     phone:  this.state.UnverifiedUsers[i].phone,
                //     id: this.state.UnverifiedUsers[i].id,
                //     checked: this.state.UnverifiedUsers[i].checked,
                //     uid: this.state.UnverifiedUsers[i].uid,
                //     Verified:true
                // })
                db.collection("Interpreter").doc(checkname).update({Verified:'true'})
                //firebase.database().ref('User/' + checkname + '/Verified').set('true')
                //firebase.firestore().collection('User').doc(checkname).set(Verified,true)
        }    
        Alert.alert('Updated!','Refreshing page',[
            {
              text: "Ok",
              onPress: () => {
                this.props.navigation.navigate({routeName: 'VerifyTransUser'})
              },
            },
          ])
        //firebase.database().ref('Social/' + name ).update({Verified:true})
    }
}

    render(){
        if(this.state.isLoaded==true){
        return (
            <View style={styles.container}>
                {this.renderUnverifiedList()}   
            </View>
            // this.state.UnverifiedUsers.map((item,key)=> {
            //     return(
            //         <View style={styles.container}>
            //         {/* <TouchableOpacity style={{flexDirection: "row",alignItems: "center" }} key={key} onPress={()=> {this.value=!this.value}}>
            //             <CheckBox value={item.checked} onChange={()=> {!item.checked}}/>
            //             <Text style={{fontWeight:"bold"}}>{item.Data}</Text>
            //         </TouchableOpacity> */}
            //         {this.renderUnverifiedList()}
            //         </View>
            //     )
            // } 
            //)
            )
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
                    width: "100%",
                    //height: windowHeight /15,
                    borderColor: '#acc',
                    borderRadius: 3,
                    borderWidth: 1,
                    flexDirection: 'column-reverse',
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
                    flex: 0.5,
                    paddingBottom: 22,
                    paddingRight:30,
                    paddingLeft:150
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
            
  
export default VerifyTransUser;