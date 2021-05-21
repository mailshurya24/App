import * as React from 'react';
import {Text, Card, View, FlatList, ListItem, TouchableOpacity, KeyboardAvoidingView, Stylesheet, Component, TextInput, Modal} from 'react-native';
import firebase from 'firebase';
import db from './Config';
import AppHeader from './AppHeader';

export default class SellerDetails extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            userID: firebase.auth().currentUser.email,
            sellerID: this.props.navigation.getParam('details')['User'],
            saleID: this.props.navigation.getParam('details')['saleID'],
            item: this.props.navigation.getParam('details')['Item'],
            description: this.props.navigation.getParam('details')['Description'],
            username: '',
            sellerName: '',
            contactSeller: '',
            sellerAddress: '',
            sellerDocID: ''
        }
    }

    getSellerDetails = () =>
    {
        var seller = this.state.sellerID;
        db.collection("Users").where("Email", "==", seller).get()
        .then((Snapshot)=>{
            Snapshot.forEach((doc)=>{
                this.setState({
                    sellerName: doc.data().FirstName + " " + doc.data().LastName,
                    contactSeller: doc.data().ContactDetails,
                    sellerAddress: doc.data().Address 
                })
            })
        })
    }

    render()
    {
        return(
            <View>
                <View>
                    <AppHeader title = "Your Item" color = "#2372AA"/>
                </View>

                <View>
                    <Text>{this.state.item}</Text>
                    <Text>{this.state.description}</Text>
                </View>

                <View style = {{marginTop: 15}}>
                    <Text>Name: {this.state.sellerName}</Text>
                    <Text>Contact Details: {this.state.contactSeller}</Text>
                    <Text>Address: {this.state.sellerAddress}</Text>
                </View>

                <TouchableOpacity onPress = {()=>{this.props.navigation.navigate("MyItem")}}>
                    <Text>BUY</Text>
                </TouchableOpacity>
            </View>
        )
    }
}