import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TextInput, TouchableHighlight} from 'react-native';


export default class TreciaUzduotis extends Component {
 
  constructor(){
    super();
    this.state = {
      pavadinimoTekstas: "",
      priminimoTekstas:""
    }
 
  }

  onPressAdd()
  {

  }

  onPressVisi()
  {

  }

  render() {

    return (
    <View >
          
       <View >

       <TextInput
          style={{height: 40, textAlign:'center'}}
          placeholder="Iveskite priminimo pavadinima"
          onChangeText={(tekstas) => this.setState({pavadinimoTekstas: tekstas})}
        /> 
        <TextInput
          style={{ textAlign:'center'}}
          placeholder="Iveskite norima priminima"
          onChangeText={(tekstas) => this.setState({priminimoTekstas: tekstas})}
        />

        <TouchableHighlight onPress={this.onPressAdd.bind(this)}>
          <View style={stilius.mygtukas}>
            <Text style={stilius.mygtukasTekstas}>Issaugoti priminima</Text>
          </View>
        </TouchableHighlight>
       
        <TouchableHighlight onPress={this.onPressVisi.bind(this)}>
          <View style={stilius.mygtukas}>
            <Text style={stilius.mygtukasTekstas}>Visi priminimai</Text>
          </View>
        </TouchableHighlight>

       </View>
       
   </View>  
    );
  }
}


const stilius = StyleSheet.create({
  containeris: {
    flex: 1
  },
    mygtukas: {
      marginTop: 20,
      alignItems: 'center',
      backgroundColor: "#7FFFD4"
    },
    mygtukasTekstas: {
      padding: 10,
      color: 'black'
    }
})


