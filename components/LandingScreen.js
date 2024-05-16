import { View, Text ,StyleSheet,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'



const LandingScreen = (props) => {

  const [amount,setAmount] = useState([])
  useEffect(()=>{getData()},[])

  
  const getData = async()=>{
    try {
      const response = await axios.get('http://192.168.1.39:3001/totalamount')
      setAmount(response.data.amount)
    } catch (error) {
     console.log(error);
    }
 }

  return (
    <View style = {Styles.headMainWrapper}>
    <StatusBar barStyle="light-content" backgroundColor="#6495ED"/>
    <View style = {Styles.topTextWrapper}>
       <Text>User 1 </Text>
       <Text>Remaining Balance</Text>
       </View>
       <View style={Styles.Balancecontainer}>
      <Text style={Styles.text}>{amount}</Text>
    </View>
<View style={{alignItems:'center',justifyContent:'center'}}>
    <TouchableOpacity style={Styles.servicesbtn} onPress={()=>props.navigation.navigate('servicespage')}>
        <Text style={{color:'white', fontSize:17,fontWeight:'bold'}}>View Available Services</Text> 
        <Icon style={Styles.rightIcon}name="arrow-right" size={20} color="white"/>
    </TouchableOpacity>
</View>
     </View> 
     
     
  )
}

export default LandingScreen

const Styles = StyleSheet.create({

    headMainWrapper:{
       marginTop:60,
       flex:1
    },
    topTextWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        
    },
    Balancecontainer: {
        justifyContent: 'flex-end', 
        alignItems: 'flex-end', 
      },
      text: {
        fontSize: 15,
        padding:10
      },
      servicesbtn:{
        marginTop:100,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#6495ED',
        borderWidth:2,
        width:'70%',
        height:50,
        borderRadius:15,
        backgroundColor:'#6495ED',
        flexDirection:'row'
      },
      rightIcon:{
        marginLeft:15
      }
})