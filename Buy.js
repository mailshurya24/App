import * as React from 'react';
import {Text, Component, FlatList, ListItem, Image, Label, View, Stylesheet, KeyboardAvoidingView, TouchableOpacity, Modal} from 'react-native';
import {Input} from 'react-native-elements';
import AppHeader from './AppHeader';
import firebase from 'firebase';
import db from './Config';

export default class Buy extends React.Component
{
    constructor()
    {
        super();
        this.state = 
        {
            userID: firebase.auth().currentUser.email,
            items: []
        }
    }

    getLiveItems = async() =>
    {
        var user = this.state.userID;
        await db.collection('Users').where("Email", "==", user).get().
        then(()=>{
            this.requestRef = db.collection("Sales").onSnapshot((Snapshot)=>{
                var liveItems = Snapshot.docs.map((doc)=>{doc.data()});
                this.setState({items: liveItems})
            })
        })
    }

    renderItem = (item, index) =>
    {
        <ListItem
            key = {index}
            title = {item.Item}
            subTitle = {item.Price}
            leftElement = {<View>
                            <TouchableOpacity onPress = {alert("This item is live right now.")}>🔵</TouchableOpacity>
                           </View>}
            rightElement= {<View>
                            <TouchableOpacity onPress = 
                                                {this.props.navigation.navigate("SellerDetails", {"details": item})}>
                                <Text>View</Text>
                            </TouchableOpacity>
                           </View>}
        />
    }

    componentDidMount = () =>
    {
        this.getLiveItems();
    }

    render()
    {
        return(
            <View>
                <View>
                    <AppHeader title = "Buy an Item" color = "266AD1"/>
                </View>

                <View>
                    {this.state.items.length === 0 
                        ?(<View><Text>No items are live right now. Come back later!</Text></View>)
                        :(<FlatList
                            keyExtractor = {(index, item)=>index.toString()}
                            data = {this.state.items}
                            renderItem = {this.renderItem()}
                         />)
                    }
                </View>
            </View>
        )
    }


}