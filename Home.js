import * as React from 'react';
import {Text, Component, FlatList, ListItem, Image, Label, View, Stylesheet, KeyboardAvoidingView, TouchableOpacity, Modal} from 'react-native';
import {Input} from 'react-native-elements';
import AppHeader from './AppHeader';
import firebase from 'firebase';
import db from './Config';

export default class Home extends React.Component
{
    render()
    {
        return(
            <View>
                <Text>Home</Text>
            </View>
        )
    } 
}