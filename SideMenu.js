import * as React from 'react';
import {Text, View, TouchableOpacity, KeyboardAvoidingView, Stylesheet, Component, TextInput, Modal, Image} from 'react-native';
import firebase from 'firebase';
import db from './Config';
import {Avatar} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import {useColorScheme} from 'react-native';

export default class SideMenu extends React.Component
{
    constructor()
    {
        super();
        this.state = 
        {
            userID: firebase.auth().currentUser.email,
            name: "",
            image: "#",
            docID: ""
        }
    }

    selectPicture = async() =>
    {
        const {cancelled, uri} = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        })

        if(!cancelled)
        {
            this.uploadImage(uri, this.state.userID);
            this.setState({image: uri})
        }
    }

    uploadImage = (source, user) => 
    {
        var response = await fetch(source);
        var blob = await response.blob();
        var reference = firebase.storage().ref().child("User_Profile/" + user);

        return(
            reference.put(blob).then((doc)=>{
                this.fetchImage(user)
            })
        )
    }

    fetchImage = (user) =>
    {
        var reference = firebase.storage().ref().child("User_Profile/" + user);
        reference.getDownloadURL().then((url)=>{
            this.setState({image: url})
        })
        .catch(error)
        {
            var code = error.code;
            console.log(code);
            this.setState({image: "#"})
        }
    }

    getUser = () =>
    {
        db.collection("Users").where("Email", "==", this.state.userID).get()
        .then((Snapshot)=>{
            Snapshot.forEach((doc)=>{
                this.setState({name: doc.data().FirstName + " " + doc.data().LastName})
            })
        })
    }

    componentDidMount = () =>
    {
        this.fetchImage(this.state.userID);
        this.getUser();
    }

    render()
    {
        return(
            <View>
                <View>
                    <Avatar
                        rounded
                        source = {{uri: this.state.image}}
                        size = 'medium'
                        onPress = {()=>{this.selectPicture()}}
                    />

                    <Text>
                        {this.state.name}
                    </Text>
                </View>
            </View>
        )
    }
}