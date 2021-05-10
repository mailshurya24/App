import * as React from 'react';
import {Text, View, TouchableOpacity, Image, KeyboardAvoidingView, Stylesheet, Component, TextInput, Modal} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from './Home';
import Sell from "./Sell";
import Buy from './Buy';
import Feedback from "./Feedback";

export const Navigation = createBottomTabNavigator({
    Home: {screen: Home, navigationOptions: {
        tabBarIcon: <Image source = {{uri:"https://i.pinimg.com/originals/46/cb/a9/46cba9f93a3d437db6d42f4bcd1a5f5f.gif"}}/>,
        tabBarLabel: "HOME"
    }},

    Sell: {screen: Sell, navigationOptions: {
        tabBarIcon: <Image source = {{uri: "https://media.us1.twilio.com/MEf64135144c7234251f5a2029d219ec10?Expires=1620401865&Signature=QfrhGUezOmUsO6y5SKZRW6l-d2NnphEtXcdGf-y1nJXavsMm9u~M2WL3K5Y2rC3-oskhqlL37XQksdx84Iau-hm-3RnsCukEWwdB0WAdjR3UWVkq6KcIz1sQoQxNQ62tHTbkWxDVYLXe-bVQktdKoC11z6TNj1ufVNLxu~h91VJ0NDBl1sS1nwOaadDBiwdijp3QqM32S-4gNYkc3FsR5Gs2q7lXeFHjzxTxy-T7vs9Z8727xX9HvgheozVAEPC0EC0jPiNh-RufSAqQ1f~RZNuHV1bvM64lCtAITjf4oDfU-RKJZNOzp47R6Sl4Dkyzg~QGYpreYlNKgio1nDeSMg__&Key-Pair-Id=APKAJWF6YVTMIIYOF3AA"}}/>,
        tabBarLabel: "SELL"
    }},
    
    Buy: {screen: Buy, navigationOptions: {
        tabBarIcon: <Image source = {{uri: "https://media.us1.twilio.com/ME535deb84608c14a9e4abc18b8863f2cf?Expires=1620401245&Signature=BFMPyYbcQNhgowfKqmhanfFH3e1nGCSGTLDdZLTsyRt4SeK7T536kdudS~4HQrAV1rK66l5xbYU4~pKH2rl8K-B~4a0bORAiXsStRotW~hQbztiIqKnTxZB9SdNVaiW-U-CFQFxDZWHz5dGf0CtqtmoHAJ6kXrt4uyB5HJZy3dwmdVqzbcwEJKvkR6T2XAT5V4UryPSUBNouvc2dxHflOBCoXlqeBV8RpZC0T0ilsBjJNgUf5y53sA--acufK9byrub-meN3YK3xDCCH1nJ04rDSyrz-WS2fJPSa2zL9RwgHHgubQy6lKKfjYUt22SbpRHiG8pUOv9ILQBQfUw15fw__&Key-Pair-Id=APKAJWF6YVTMIIYOF3AA"}}/>,
        tabBarLabel: "BUY"
    }},
    
    Feedback: {screen: Feedback, navigationOptions: {
        tabBarIcon: <Image source = {{uri:"https://i.gifer.com/M12x.gif"}}/>
    }}
})