import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TextInput, TouchableHighlight, AsyncStorage, Alert} from 'react-native';


export default class TreciaUzduotis extends Component {
 
  constructor(){
    super();
    //AsyncStorage.setItem('skaicius', '0');
   //AsyncStorage.setItem('visiPriminimai', ' ');
    this.state = {
      pavadinimoTekstas: "",
      priminimoTekstas:"",
      count: 0
    }
 
  }

  onPressAdd()
  {
    if(this.state.pavadinimoTekstas == "" || this.state.priminimoTekstas == "") return;
    
  
     addData = async () => {
      try{
      let txt = await AsyncStorage.getItem('skaicius');
      let sk = parseInt(txt) + 1;
      this.setState({count: sk});
      AsyncStorage.setItem('skaicius', sk.toString());
  
     
      let ob = {
        pavadinimas: this.state.pavadinimoTekstas,
        priminimas: this.state.priminimoTekstas,
        }
     AsyncStorage.setItem("Priminimas" + this.state.count, JSON.stringify(ob));
  
     
     let visi = await AsyncStorage.getItem('visiPriminimai');
      if (visi == " ")
      {
        AsyncStorage.setItem("visiPriminimai", "Priminimas" + this.state.count + ",");
      }
      else
      {
        let visi2 = await AsyncStorage.getItem('visiPriminimai');
        let visiPat = visi2 + "Priminimas" + this.state.count + ",";
        AsyncStorage.setItem("visiPriminimai", visiPat);
        //alert(visiPat);
      } 
    }
      catch(error)
      {
        alert(error);
      }
    }
    addData();   
    
    Alert.alert("Pranesimas","Priminimas issaugotas");
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


