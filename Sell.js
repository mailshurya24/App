import * as React from 'react';
import {Text, Component, Image, Label, View, Stylesheet, KeyboardAvoidingView, TouchableOpacity, Modal} from 'react-native';
import {Input} from 'react-native-elements';
import AppHeader from './AppHeader';
import firebase from 'firebase';
import db from './Config';

export default class Sell extends React.Component
{
    constructor()
    {
        super();
        this.state = 
        {
            userID: firebase.auth().currentUser.email,
            item: '',
            description: '',
            price: "",

        }
    }

    sellItem = () => 
    {
        var saleID = this.createUniqueID;
        console.log(saleID);
        db.collection("Users").where("Email", "==", this.state.userID).get()
        .then((Snapshot)=>{
            Snapshot.forEach((doc)=>{
                db.collection("Sales").add({
                    User: this.state.userID,
                    Item: this.state.item,
                    Description: this.state.description,
                    Price: "$ " + this.state.price,
                    itemID: saleID
                })
            })
        })
    }

    createUniqueID = () =>
    {
        Math.random().toString(36).substring(7);
    }

    render()
    {
        return(
            <View>
                <KeyboardAvoidingView>
                    <View>
                        <AppHeader title = "Sell Your Item" color = "#5F75EE"/>
                    </View>

                    <View>
                        <Input
                            placeholder = "What's Your Item?"
                            onChangeText = {(text)=>{
                                this.setState({item: text})
                            }}
                        />

                        <Input 
                            placeholder = "Describe Your Item"
                            onChangeText = {(text)=>{
                                this.setState({description: text})
                            }}
                            multiline = {true}
                        />

                        <Input
                            
                            placeholder = "What's Your Price?"
                            keyboardType = "number-pad"
                            onChangeText = {(text)=>{
                                this.setState({price: text})
                            }}
                        />
                    </View>

                    <View>
                            <TouchableOpacity onPress = {()=>this.sellItem()}>
                                <Text>Sell</Text>
                            </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                </View>
        )
    }
}