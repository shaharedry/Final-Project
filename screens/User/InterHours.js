import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Button, Dimensions } from 'react-native';
import firebase, { db } from '../../FireBase/fire'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../constants/Colors';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import Legend from '../../components/Legend';
import CustomPieChart from '../../components/CustomPieChart';

var width = Dimensions.get('window').width
class InterHours extends React.Component {
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
            TranslatorHours: null,
            data: [],
            data2: []
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
                        console.log('username is: '+UserName)
                    }
                })
                db.collection('User').get().then(snapshot => {
                    let BasketMoneyz = null;
                    let TranslatorHoursz = null
                    snapshot.forEach(doc => {
                        const KEY = Object.keys(doc.data());
                        KEY.forEach((key_id) => {
                            if (key_id == 'fullname') {
                                if (doc.data().fullname == UserName) {
                                    TranslatorHoursz = doc.data().TranslatorHours
                                }
                                this.setState({ TranslatorHours: TranslatorHoursz })
                                this.callMe(TranslatorHoursz);
                            }
                        })
                    })
                })
                this.setState({ isLoaded: true })
        } catch (error) {
            console.warn(error)
        }
        //console.log("UserName is : " + UserName)
    }

    callMe(TransHours) {
        const data = [
            {
                name: "Hours Left: "+TransHours,
                Hours: TransHours,
                color: "blue",
                legendFontColor: "#7F7F7F",
                legendFontSize: 18
            },
            {
                name: "Hours used: "+(45 - TransHours),
                Hours: 45 - TransHours,
                color: "lightblue",
                legendFontColor: "#7F7F7F",
                legendFontSize: 18
            }
        ];
        this.setState({ data: data })
    }
    render() {
        if (this.state.isLoaded == true && this.state.gotname == true) {
            return (
                <View>

                    <View>
                        <Text style={styles.setFontSizeOne}>Interpretation Hours</Text>
                    </View>

                    <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text>"Hours"</Text>
            </View>

            <View style={styles.bodyContainer}>
                <View style={styles.chartContainer}>
                {/* <PieChart
                        data={this.state.data}
                        width={width}
                        height={200}
                        chartConfig={{
                            backgroundGradientFrom: "#1E2923",
                            backgroundGradientFromOpacity: 0,
                            backgroundGradientTo: "#08130D",
                            backgroundGradientToOpacity: 1,
                            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                            strokeWidth: 2, // optional, default 3
                            barPercentage: 1,
                            useShadowColorFromDataset: false,
                            barRadius:30
                        }}
                        accessor={"Hours"}
                        backgroundColor={"transparent"}
                        paddingLeft={"58"}
                        center={[40, 50]}
                        absolute
                    /> */}
                    <Text></Text>
                    <PieChart
                        data={this.state.data}
                        width={width}
                        height={400}
                        chartConfig={{
                            backgroundGradientFrom: '#1E2923',
                            backgroundGradientFromOpacity: 0,
                            backgroundGradientTo: '#08130D',
                            backgroundGradientToOpacity: 0.5,
                            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                            strokeWidth: 2,
                            useShadowColorFromDataset: false,
                        }}
                        accessor={'Hours'}
                        backgroundColor={'transparent'}
                        center={[90, 20]}
                        hasLegend={false}
                    /> 
                </View>

                <View style={styles.legendContainer}>
                    {this.state.data.map(({ name, color }) => {
                        return <Legend key={name} name={name} color={color} />;
                    })}
                </View>
            </View>
        </View>

                    {/* {(<CustomPieChart
                        title="Hours"
                        data={this.state.data}
                    />)} */}
                    {/* <PieChart
                        data={this.state.data}
                        width={width}
                        height={480}
                        chartConfig={{
                            backgroundGradientFrom: "#1E2923",
                            backgroundGradientFromOpacity: 0,
                            backgroundGradientTo: "#08130D",
                            backgroundGradientToOpacity: 1,
                            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                            strokeWidth: 2, // optional, default 3
                            barPercentage: 1,
                            useShadowColorFromDataset: false,
                            barRadius:30
                        }}
                        accessor={"Hours"}
                        backgroundColor={"transparent"}
                        paddingLeft={"58"}
                        center={[40, 50]}
                        absolute
                    /> */}




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
        marginTop: 10,
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    bodyContainer: {
        flexDirection: 'row',
    },
    chartContainer: {
        flex: 1,
    },
    legendContainer: {
        flex: 1,
        marginTop: 80,
        paddingLeft:150
    },
});


export default InterHours;