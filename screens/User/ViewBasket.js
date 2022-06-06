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
class ViewBasket extends React.Component {
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
                        console.log('username is: ' + UserName)
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
                                BasketMoneyz = doc.data().BasketMoney
                                TranslatorHoursz = doc.data().TranslatorHours
                                console.log('m:' + BasketMoneyz)
                                console.log('h:' + TranslatorHoursz)
                            }
                            this.setState({ BasketMoney: BasketMoneyz })
                            this.setState({ TranslatorHours: TranslatorHoursz })
                            this.callMe(TranslatorHoursz, BasketMoneyz);
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

    callMe(TransHours, Moneyz) {
        const data = [
            {
                name: "Hours Left: " + TransHours,
                Hours: TransHours,
                color: "blue",
                legendFontColor: "#7F7F7F",
                legendFontSize: 18
            },
            {
                name: "Hours used: " + (45 - TransHours),
                Hours: 45 - TransHours,
                color: "lightblue",
                legendFontColor: "#7F7F7F",
                legendFontSize: 18
            }
        ];
        const data2 = [
            {
                name: "Money Left:"+Moneyz,
                Hours: Moneyz,
                color: "blue",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "Money used: "+(3500 - Moneyz),
                Hours: 3500 - Moneyz,
                color: "lightblue",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            }
        ];
        this.setState({ data: data })
        this.setState({ data2: data2 })
    }
    render() {
        if (this.state.isLoaded == true && this.state.gotname == true) {
            return (
                <View>

                    <View>
                        <Text style={styles.setFontSizeOne}>Basket Info</Text>
                    </View>
                    <Text>Interpreter hours left: {(this.state.TranslatorHours)}</Text>
                    <Text>Interpreter hours used: {45 - (this.state.TranslatorHours)}</Text>
                    <Text>Money left: {(this.state.BasketMoney)}</Text>
                    <Text>Money used: {3500 - (this.state.BasketMoney)}</Text>


                    <View style={styles.box2}>
                        <View>
                            <Button title="Communication's Money" onPress={() => {
                                this.props.navigation.navigate({ routeName: 'ComMoney' })
                            }} color={Colors.secondery} />
                        </View>
                    </View>
                    <View style={styles.box}>
                        <View>
                            <Button title="Interpretation Hours" onPress={() => {
                                this.props.navigation.navigate({ routeName: 'InterHours' })
                            }} color={Colors.secondery} />
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.titleContainer}>
                            <Text>"Hours"</Text>
                        </View>

                        <View style={styles.bodyContainer}>
                            <View style={styles.chartContainer}>
                                <Text></Text>
                                <PieChart
                                    data={this.state.data}
                                    width={width}
                                    height={200}
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
                    <View style={styles.container}>
                        <View style={styles.titleContainer}>
                            <Text>"Money"</Text>
                        </View>

                        <View style={styles.bodyContainer}>
                            <View style={styles.chartContainer}>
                                <Text></Text>
                                <PieChart
                                    data={this.state.data2}
                                    width={width}
                                    height={200}
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
                                {this.state.data2.map(({ name, color }) => {
                                    return <Legend key={name} name={name} color={color} />;
                                })}
                            </View>
                        </View>
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
    box: {
        borderRadius: 16,
        backgroundColor: Colors.background,
        height: 40,
        width: width / 2 - 10,
        margin: 5,
        marginBottom: 30,
        alignSelf:'center'
    },
    box2: {
        borderRadius: 16,
        backgroundColor: Colors.background,
        height: 40,
        width: width / 2 + 30,
        margin: 5,
        marginBottom: 30,
        alignSelf:'center'
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
        paddingLeft: 150
    },
});


export default ViewBasket;