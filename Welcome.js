import * as React from 'react';
import {Text, Component, Image, View, Stylesheet, KeyboardAvoidingView, TouchableOpacity, Modal} from 'react-native';
import {Input} from 'react-native-elements';
import AppHeader from './AppHeader';
import firebase from 'firebase';
import db from './Config';

export default class Welcome extends React.Component
{
    constructor()
    {
        super();
        this.state = 
        {
            emailID : '',
            password : '',
            isModalVisible : false,
            firstName : '',
            lastName : '',
            confirmPassword : '',
            address : '',
            contactDetails : '',
            age : ''   
        }
    }

    userLogin = async(EmailID, Password) =>
    {
        await firebase.auth().signInWithEmailAndPassword(EmailID, Password)
        .then((doc)=>{
            return(
                alert("User Logged In Successfully!"),
                this.props.navigation.navigate("Hone")
            )
        })
        .catch((error)=>{
            var code = error.code;
            var message = error.message;
            alert(message);
        })
    }

    userSignUp = async(EmailID, Password, confirmPassword) =>
    {
        if(Password !== confirmPassword)
        {
            alert("Password doesn't match!")
        }
        else
        {
            firebase.auth().createUserWithEmailAndPassword(EmailID, Password)
            .then((doc)=>{
                db.collection("Users").add({
                    FirstName: this.state.firstName,
                    LastName: this.state.lastName,
                    Age: this.state.age,
                    Address: this.state.address,
                    ContactDetails: this.state.contactDetails,
                    Email: this.state.emailID,
                    Password: this.state.password
                })

                return(
                    alert("Welcome to CA!", "User Added Successfully",
                         [{text: "Continue", onPress: ()=>{
                             this.setState({isModalVisible: false})
                         }}])
                )
            })
            .catch((error)=>{
                var code = error.code;
                var message = error.message;
                alert(message);
                console.log(code);
            })
        }
    }

    showModal = () =>
    {
        return(
            <Modal
                animationType = 'fade'
                transparent = {true}
                visible = {this.state.isModalVisible}
            >
                <View>
                    <KeyboardAvoidingView>
                        <AppHeader title = "Registration" color = "#FD3434"/>

                        <Input
                            placeholder = "First Name"
                            maxLength = {15}
                            onChangeText = {(text)=>
                            {
                                this.setState({firstName:text})
                            }}
                            value = {this.state.firstName}
                        />

                        <Input
                            placeholder = "Last Name"
                            maxLength = {15}
                            onChangeText = {(text)=>
                            {
                                this.setState({lastName:text})
                            }}
                            value = {this.state.lastName}
                        />

                        <Input
                            style = {}
                            placeholder = "Email Address e.g., abc@gmail.com"
                            keyboardType = "email-address"
                            value = {this.state.emailID}
                            onChangeText = {(text)=>{
                                this.setState({emailID : text})
                            }}
                        />
                    
                        <Input
                            style = {}
                            placeholder = "Enter your Password here"
                            secureTextEntry = {true}
                            value = {this.state.password}
                            onChangeText = {(text)=>{
                                this.setState({password : text})
                            }}
                        />

                        <Input
                            placeholder = {"Confirm Password"}
                            onChangeText = {(text)=>
                            {
                                this.setState({confirmPassword:text})
                            }}
                            value = {this.state.confirmPassword}
                        />
                        
                        <Input
                            placeholder = 'Address'
                            onChangeText = {(text)=>
                            {
                                this.setState({address:text})
                            }}
                            value = {this.state.address}
                            multiline = {true}
                        />

                        <Input
                            placeholder = 'Age'
                            keyboardType = 'number-pad'
                            onChangeText = {(num)=>
                            {
                                this.setState({age:num})
                            }}
                            value = {this.state.age}
                        />

                        <Input
                            placeholder = 'Contact Number'
                            keyboardType = 'number-pad'
                            onChangeText = {(num)=>
                            {
                                this.setState({contactDetails:num})
                            }}
                            value = {this.state.contactDetails}
                        />
                    </KeyboardAvoidingView>

                    <View>
                        <TouchableOpacity onPress = {()=>{
                            this.userSignUp(this.state.emailID, this.state.password, this.state.confirmPassword);
                        }}>
                            <Text>REGISTER</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress = {()=>{
                            this.setState({isModalVisible: false})
                        }}>
                            <Text>CANCEL</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    render()
    {
        return(
            <View>
                <View>
                    {this.showModal()}
                </View>

                <View>
                    <Text>Car App</Text>
                </View>

                <View>
                    <KeyboardAvoidingView>
                        <Input 
                            placeholder = "Email Address e.g., abc@gmail.com"
                            keyboardType = "email-address"
                            value = {this.state.emailID}
                            onChangeText = {(text)=>{
                                this.setState({emailID : text})
                            }}
                        />

                        <Input
                            placeholder = "Enter your Password here"
                            secureTextEntry = {true}
                            value = {this.state.password}
                            onChangeText = {(text)=>{
                                this.setState({password : text})
                            }}
                        />
                    </KeyboardAvoidingView>
                </View>

                <View>
                    <TouchableOpacity 
                    onPress = {()=>{this.userLogin(this.state.emailID, this.state.password)}}
                    >
                        <Text>LOGIN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress = {()=>{this.userSignUp(this.state.emailID, this.state.password)
                                    this.setState({isModalVisible:true})}}
                    >
                        <Text>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}