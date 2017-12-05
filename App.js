import React, { Component } from 'react';
import { AppRegistry, Text, View, StyleSheet, TextInput, TouchableHighlight, AsyncStorage, Alert, SectionList} from 'react-native';


export default class TreciaUzduotis extends Component {
 
  constructor(){
    super();
    //AsyncStorage.setItem('skaicius', '0');
   //AsyncStorage.setItem('visiPriminimai', ' ');
    this.state = {
      pavadinimoTekstas: "",
      priminimoTekstas:"",
      count: 0,
      antrasLangas: false,
      treciasLangas:false,
      duomenys: []
    }
    this.displayAllData();
  }

  displayAllData = async () => {
    while (true){
     try{
     let txt = await AsyncStorage.getItem('visiPriminimai');
     let res = txt.split(",");
     
     var i;
     var array = [];
     var arrItem="";

    for (i = 0; i < res.length-1; i++) {
         let prim = await AsyncStorage.getItem(res[i]);
         let parsePrim = JSON.parse(prim);
         arrItem = '{"title":"'+parsePrim.pavadinimas+'",'+'"data":[{"key":"' + parsePrim.priminimas+'"}]}';
         array.push(JSON.parse(arrItem));
     }
     
     this.setState({duomenys: array});
     }
     catch(error)
     {
       //alert(error);
     } 
    }
}

  onPressAdd()
  {
    if(this.state.pavadinimoTekstas == "" || this.state.priminimoTekstas == "") return;
    
    for (i = 0; i < this.state.duomenys.length; i++) 
    {
     if(this.state.duomenys[i].title == this.state.pavadinimoTekstas)
      {
        Alert.alert("Pranesimas","Toks pavadinimas jau naudojamas");
       return;
      }
    }
  
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

    let arr = [];
    this.setState({duomenys: arr});
    
    Alert.alert("Pranesimas","Priminimas issaugotas");
  }

  onPressVisi()
  {
    this.setState({treciasLangas: false});
    if(this.state.antrasLangas) this.setState({antrasLangas: false});
    else this.setState({antrasLangas: true});
  }

  onPressTrintiVisus()
  {
    AsyncStorage.setItem('skaicius', '0');
    AsyncStorage.setItem('visiPriminimai', ' ');
    
    var i;
  
    for(i=0; i<25;i++)
    {
      AsyncStorage.removeItem("Priminimas"+i);
    }
  
    Alert.alert("Pranesimas","Visi priminimai istrinti");
  }

  onPressPriminimas(raktas)
  {
    this.setState({antrasLangas: false});
    this.setState({treciasLangas: true});
    this.setState({pav: raktas});
    
    let i;
  
    for (i = 0; i < this.state.duomenys.length; i++) 
    {
     if(this.state.duomenys[i].title == raktas)
     {
      this.setState({prim: this.state.duomenys[i].data[0].key});
     }
    }
  }

  onPressIstrinti()
  {
    if(this.state.duomenys.length <2)
    {
     this.onPressTrintiVisus();
     return;
    }
   let rez=0;
   let i;
   
     for (i = 0; i < this.state.duomenys.length; i++) 
     {
      if(this.state.duomenys[i].title == this.state.pav)
      {
        rez = i;
        break;
      }
     }
 
     istrinti  = async () => {
       try{
       let txt = await AsyncStorage.getItem('visiPriminimai');
       let removedTxt = "";
       let prim = [];
       prim = txt.split(',');
       prim.splice(rez, 1);
 
       for (i = 0; i < prim.length-1; i++) 
        {
          removedTxt += prim[i] + ",";
        }
 
        AsyncStorage.setItem('visiPriminimai', removedTxt);
       }  
       catch(error)
       {
         alert(error);
       }
     }    
     istrinti();
     
     Alert.alert("Pranesimas", "Priminimas istrintas");
  }

  onPressSaugoti()
  {
    let rez=0;
    let i;
    
      for (i = 0; i < this.state.duomenys.length; i++) 
      {
       if(this.state.duomenys[i].title == this.state.pav)
       {
         rez = i+1;
         break;
       }
      }
    
      let ob = {
        pavadinimas: this.state.pav,
        priminimas: this.state.prim,
        }
  
     AsyncStorage.setItem("Priminimas" + rez, JSON.stringify(ob));
     Alert.alert("Pranesimas","Pakeitimai issaugoti");
  }

  render() {

    if(this.state.antrasLangas)
    {
      return (
        <View style={stilius.containeris}>       
         
         <TouchableHighlight onPress={this.onPressVisi.bind(this)}>
          <View style={stilius.mygtukas}>
            <Text style={stilius.mygtukasTekstas}>Kurti nauja priminima</Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.onPressTrintiVisus.bind(this)}>
          <View style={stilius.mygtukas}>
            <Text style={stilius.mygtukasTekstas}>Istrinti visus priminimus</Text>
          </View>
        </TouchableHighlight>
        
        <SectionList
        sections={this.state.duomenys}
        renderItem={ ({item}) => <Text style={stilius.tekstasPriminimo}>{item.key}</Text> }
        renderSectionHeader={ ({section}) => <TouchableHighlight onPress={this.onPressPriminimas.bind(this, section.title)}>
                                 <View >
                                 <Text style={stilius.tekstasPavadinimo}>{section.title}</Text>
                                 </View>
                                 </TouchableHighlight> }
        >
        </SectionList>

       </View>
            );
    }
    else if(this.state.treciasLangas)
    {
      return (

        <View>

              <TouchableHighlight onPress={this.onPressVisi.bind(this)}>
                <View style={stilius.mygtukas}>
                  <Text style={stilius.mygtukasTekstas}>Grizti atgal</Text>
               </View>
              </TouchableHighlight>

              <TouchableHighlight onPress={this.onPressIstrinti.bind(this)}>
                <View style={stilius.mygtukas}>
                  <Text style={stilius.mygtukasTekstas}>Istrinti priminima</Text>
               </View>
              </TouchableHighlight>
              
              <TouchableHighlight onPress={this.onPressSaugoti.bind(this)}>
                <View style={stilius.mygtukas}>
                  <Text style={stilius.mygtukasTekstas}>Issaugoti pakeitimus</Text>
               </View>
              </TouchableHighlight>
              
              <Text style={stilius.tekstasPavadinimo}>{this.state.pav}</Text>          
               <TextInput
               style={{height: 40, textAlign:'center', marginTop: 25}}
               onChangeText={(tekstas) => this.setState({prim: tekstas})}
               >{this.state.prim}</TextInput>
       </View>
      )
    }
    else
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
    },
    tekstasPavadinimo: {
      marginTop: 10,
      fontWeight: 'bold',
      fontSize:20,
      textAlign:"left",  
      borderColor:"#7FFFD4", 
      color:"black"
    },
    tekstasPriminimo: {
     textAlign:"left",  
     borderColor:"#7FFFD4", 
     color:"black"
    }
})


