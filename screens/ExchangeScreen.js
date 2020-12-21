import React, {Component} from 'react';
import {Modal, View, StyleSheet, Text, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class ExchangeScreen extends Component{
  constructor(){
    super()
    this.state = {
      itemName : '',
      description : '',
      userName : ''
    }
  }

  createUniqueId(){
    return Math.random().toString(36).substring(5);
  }

  addItem = (itemName, description)=>{
    var userName = this.state.userName
    
    db.collection("exchange_requests").add({
      "username" : userName,
      "item_name" : itemName,
      "description" : description
    })
    
    this.setState({
      itemName : '',
      description : ''
    })

    return Alert.alert('Item ready to exchange','',[
      {text : 'OK', onPress : ()=>{
        this.props.navigation.navigate('HomeScreen')
      }}
    ]);
  }

  render(){
    return(
      <View style = {styles.container}>
        <TextInput
            style = {styles.formTextInput}
            placeholder = {"Item Name"}
            onChangeText = {(text)=>{
              this.setState({
                itemName : text
              })
            }}
            value = {this.state.itemName}
          />
          <TextInput
            style = {styles.formTextInput}
            placeholder = {"Item Description"}
            onChangeText = {(text)=>{
              this.setState({
                description : text
              })
            }}
            value = {this.state.description}
          />
          <TouchableOpacity
            style = {[styles.button, {marginTop : 10}]}
            onPress = {()=>{this.addItem(this.state.itemName, this.state.description)}}
          >
            <Text style = {{color : '#ffff', fontSize : 18, fontWeight : 'bold'}}>Add Item</Text>
          </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    alignItems : 'center',
    justifyContent : 'center',
    flex : 1,
    backgroundColor : '#F8BE85'
  },
  formTextInput:{
    width : "75%",
    height : 35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
  },
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ff9800",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
})