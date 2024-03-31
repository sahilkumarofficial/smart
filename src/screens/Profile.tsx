import { StyleSheet, Text, View ,Image, TouchableOpacity,} from "react-native";
import React from "react";

import { Colors } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ProductList from "@/components/home/ProductList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView
      style={{ flex: 1,}}
    >
    <ScrollView style={{flex:1}}> 
    <View style={{flexDirection:"row", justifyContent: 'space-between',marginTop: 10,backgroundColor: "#c8cfce",marginHorizontal:5, borderRadius:8}}>
     <View style={{flexDirection: "row",}}>
      <Image
         width={40}
         style={styles.headsub}
         height={40}
         source={require("../../assets/icons/icon.png")}     />
     <View style={{}}>
     <Text style={{fontSize: 16, fontWeight: "600", marginLeft:20, textAlign: "center", paddingTop: 12 }}>Rakesh kirana store</Text>
     <View style={{flexDirection:"row", justifyContent: "center"}}>
     <Entypo name="location-pin" size={20} color="black" />
     <Text>Bihar sharif</Text>
     <Text>  India</Text></View></View></View>
      <Ionicons onPress={()=> AsyncStorage.removeItem("token").then(res=> navigation.replace("login"))}  name="settings-outline" size={24} color="black" style={{marginRight:20,paddingTop: 12 }}/>
     </View>
     <View style={{flex:1, borderRadius:8,width:360,}}>
      <Image 
       height={300}
       width={400}
         source={require("../../assets/icons/icon.png")}
         style={{ resizeMode: "cover",height:200,width: 360, borderRadius:10,
          }}
         
      />
<View style={{marginTop: -55, flexDirection: "row", justifyContent: "space-between"}}>
<Image
         width={100}
         style={styles.headsubs}
         height={100}
         source={require("../../assets/icons/icon.png")}     />
         <Text style={{marginTop:29}}> <AntDesign name="camerao" size={29} color={Colors.Primary} /></Text>
</View>
      

      
     </View>
     <View style={{marginTop: -40,}}>
        <View style={{flexDirection: "row",justifyContent: "space-around",marginLeft: 110}}>
        <View><Text style={styles.number}>134</Text>
        <Text style={styles.follow}>Product</Text>
        </View>
        
        <View><Text style={styles.number}>11M</Text>
        <Text style={styles.follow}>costumer</Text>
        </View>
        <View><Text style={styles.number}>63</Text>
        <Text style={styles.follow}>Smart shop</Text>
        </View>
        </View>
      </View>
     {/* bio is here */}
<View style={{flex:1, marginHorizontal:5, borderTopColor:Colors.Bg, borderTopWidth:2}}>
  <Text style={{paddingTop:9, fontWeight: "500"}}>Whether you're seeking a statement piece for a special event or elevating your everyday wardrobe, [Clothing Shop Name] is your ultimate style companion. Experience the magic of fashion redefined, where every visit is not just a shopping trip but a journey of self-discovery."</Text>
</View>

        <View style={{ gap:30, justifyContent: "space-between", alignItems:"center",marginTop: 10, flexDirection: "row", marginHorizontal:10}}>
          <TouchableOpacity style={styles.preview}>
            <Text style={styles.text}>Location</Text>
            <Entypo name="location-pin" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.preview}>
            <Text style={styles.text}>Share profile</Text>
            <MaterialCommunityIcons name="face-man-profile" size={24} color="white" />
          </TouchableOpacity>
          
        </View>
        <ProductList />
        </ScrollView>
     
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  headsub: { 
    borderRadius: 55,
     resizeMode: "cover",
      height: 50,
       width: 50,
       borderWidth: 2,
        borderColor: Colors.Primary ,
        marginLeft: 10
  },
  headsubs: { 
    borderRadius: 55,
     resizeMode: "cover",
      height: 110,
       width: 110,
       borderWidth: 2,
        borderColor: Colors.Primary ,
        marginLeft: 10
  },
  number:
  {color: Colors.Bg, fontSize: 20, fontWeight: "600",textAlign: "center"},
  follow: {color: Colors.Bg, fontSize: 15,textAlign: "center",fontWeight: "400"},

  add:{
    backgroundColor: "#fc03a5",
     paddingHorizontal:15,
    borderRadius:10,
        },
        textadd: {textAlign:"center", color:"#fff" , fontSize:15},
  preview: {
    backgroundColor:Colors.Primary,
     paddingHorizontal:15,
      paddingVertical:5, 
    flexDirection: "row",
       borderRadius:10
       },
    
    text: {textAlign:"center", color:"#fff" , fontSize:18},
});
