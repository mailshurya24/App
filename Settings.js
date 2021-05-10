import * as React from 'react';
import {Text, View, TouchableOpacity, KeyboardAvoidingView, Stylesheet, Component, TextInput, Modal} from 'react-native';
import firebase from 'firebase';
import {Input} from 'react-native-elements';
import {AppHeader} from './Header';
import db from './Config';

export default class Settings extends React.Component
{
    constructor()
    {
        super();
        this.state = 
        {
            emailID: '',
            firstNameChanged: '',
            lastNameChanged: '',
            contactDetailsChanged: '',
            addressChanged: '',
            docID: ''
        }
    }

    getUserDetails = () =>
    {
        var user = firebase.auth().currentUser;
        var email = user.email;
        db.collection("Users").where("Email", "==", email).get()
        .then((Snapshot)=>{
            Snapshot.forEach((doc)=>{
                var data = doc.data();
                this.setState({
                    emailID: data.Email,
                    firstNameChanged: data.FirstName,
                    lastNameChanged: data.LastName,
                    contactDetailsChanged: data.ContactDetails,
                    addressChanged: data.Address,
                    docID: doc.id
                })
            })
        })
    }

    updateUserDetails = () =>
    {
        db.collection("users").doc(this.state.docID).update({
            FirstName: this.state.firstNameChanged,
            LastName: this.state.LastNameChanged,
            ContactDetails: this.state.contactDetailsChanged,
            Address: this.state.addressChanged
        });
        alert("Profile updated successfully");
    }

    componentDidMount = () =>
    {
        this.getUserDetails();
    }

    render()
    {
        return(
            <View style = {{alignItems: 'center'}}>
                <View>
                <AppHeader title = 'Settings'/>
                </View>

                <View>
                    <Input
                        placeholder = "First Name"
                        value = {this.state.firstNameChanged}
                        onChangeText = {(text)=>{this.setState({firstNameChanged: text})}}
                    />

                    <Input
                        placeholder = "Last Name"
                        value = {this.state.LastNameChanged}
                        onChangeText = {(text)=>{this.setState({LastNameChanged: text})}}
                    />

                    <Input
                        placeholder = "Contact Details"
                        value = {this.state.contactDetailsChanged}
                        keyboardType = 'numeric'
                        onChangeText = {(text)=>{this.setState({contactDetailsChanged: text})}}
                    />

                    <Input
                        placeholder = "Address"
                        value = {this.state.addressChanged}
                        multiline = {true}
                        onChangeText = {(text)=>{this.setState({addressChanged: text})}}
                    />
                </View>

                <View>
                    <TouchableOpacity onPress = {()=>{this.updateUserDetails()}}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}