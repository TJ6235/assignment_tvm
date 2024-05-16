import { View, Text,StyleSheet, TouchableOpacity, ScrollView,Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'


 
const ServiceListpage = (props) => {

  const [service,setservice] = useState([])
  const [modalVisible, setModalVisible] = useState(false);
  const [variable,setvariable]=useState()
  const [variabletwo,setvariabletwo]=useState()
  const [variablethree,setvariablethree]=useState()

const setservicedetails = (item)=>{
            setvariable(item)
            setvariabletwo(item.serviceonetime)
            setvariablethree(item.servicetypeone)
            setModalVisible(true)
}

const getData = async()=>{
   try {
     const response = await axios.get('http://192.168.1.39:3001/data')
     setservice(response.data)
   } catch (error) {
    console.log(error);
   }
   
}


const [amount,setAmount] = useState()
const amountdec = async (amt) => {
  try {
    const response = await axios.get('http://192.168.1.39:3001/totalamount');
    const currentAmount = response.data.amount; 
    if(currentAmount>0){
      const newAmount = currentAmount - amt;
      console.log(newAmount, currentAmount, amt);
      const updateResponse = await axios.put('http://192.168.1.39:3001/totalamount', {amount: newAmount});
      console.log('Total amount updated successfully:', updateResponse.data);
    }else{
      alert('no enough balance')
    }   
  } catch (error) {
    console.error('Error occurred:', error);
  }
  
};



useEffect(()=>{getData()},[])

  return (
    <View style={{marginTop:60,}}>
        <StatusBar barStyle="light-content" backgroundColor="#6495ED"/>
        <View style={{}}>
        <Icon onPress={()=>props.navigation.navigate('landingscreen')}  style={Styles.lefticon}name="arrow-left" size={20} color="black"/>
        {/* <Text style={{fontSize:15,fontWeight:'bold',marginright:40}}>Available Services</Text> */}
      </View>
      <ScrollView>
       <View style = {Styles.servicelists}>
         {
          service && service.map((item)=>{
            return (
              <TouchableOpacity onPress={()=>setservicedetails(item)} key={item.id} style={Styles.servicelistitemsWrapper}>
              <View>
            <Text style={{color:'white', fontSize:15,fontWeight:'bold'}}>{item.serviceone}</Text> 
            <Text style={{color:'white', fontSize:15,fontWeight:'bold'}}>{item.serviceonetime}</Text> 
            <Text style={{color:'white', fontSize:15,fontWeight:'bold'}}>{item.servicetypeone}</Text> 
            </View>
            <View>
            <Icon style={Styles.rightIcon}name="arrow-right" size={20} color="white"/>
            </View>
            </TouchableOpacity>
            )
          })
        
           }
        
       </View>
       </ScrollView>
       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
           <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            <TouchableOpacity style={{marginLeft:150}} onPress={()=>setModalVisible(false)}>
            <Text style={{marginBottom:40,color:'red'}}>X</Text>
            </TouchableOpacity>
            <Text>{variable?.serviceone}</Text>
            <Text>{variable?.serviceonetime}</Text>
            <Text>{variable?.servicetypeone}</Text>
            <TouchableOpacity style={{marginTop:50,backgroundColor:'#6495ED',padding:10,borderRadius:10}} onPress={()=>amountdec(variable?.serviceamount)}>
              <Text style={{color:'white'}}>Apply Now $ {variable?.serviceamount}</Text>
            </TouchableOpacity>
            
          </View>
          </View>
        </Modal>
    </View>
  )
}

export default ServiceListpage 

const Styles = StyleSheet.create({
    servicelists:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:100
    },
    servicelistitemsWrapper:{
        alignItems:'center',
        justifyContent:'space-between',
        borderColor:'#6495ED',
        borderWidth:2,
        width:'90%',
        marginHorizontal:20,
        padding:15,
        borderRadius:15,
        backgroundColor:'#6495ED',
        flexDirection:'row',
        marginBottom:20
    },
    rightIcon:{
        marginRight:5
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        
      },
      lefticon:{
      
      }
})