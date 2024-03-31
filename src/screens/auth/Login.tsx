import { Colors } from "@/constants"; // isko thik kar lena ye sab typescript ka import hai.
import { Link, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Entypo } from '@expo/vector-icons';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { gql } from "graphql-request";
import { gql_client } from "@/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const navigation = useNavigation();
  const [passwordState, setpasswordState] = useState(false);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("")


  const handleLogin = async()=>{
    console.log("LOgin function started.");
     const query = gql`
     query Login($data: UserInput) {
      login(data: $data) {
        message
        token
        user {
          _id 
          name
        }
      }
    }
     `;

     const variables ={
      "data":{
        "email":email,
        "password":password
      }
     }

     await gql_client.request(query, variables).then((res:any)=>{ console.log("Login function responce", res);
     const token = res.login.token;
     AsyncStorage.setItem("token", token).then(res=> console.log("token set")).catch(e=> console.log("token set error", e))
     navigation.replace("main" as never)
    }).catch((e:any)=> {console.log("Login function error", e);
  ToastAndroid.show(`${"Invalid Email or Password."}`,2500)
  })
  }

   const fetchProfile = ()=>{
    AsyncStorage.getItem("token").then(  async(res)=>{
      console.log("token", res)
      if (res !== null) {
        const query = gql `
        query FetchProfile {
          profile{
            message,
          user{
            _id,
            email,
            name, avatar{
              url
            },
            isAdmin,
            isShopOwner,
            createdAt
            shops{
              _id
            },
            updatedAt
          }
          }
        }
        
        `;
        await gql_client.setHeader("token", res).request(query).then((res:any)=>{
          console.log(res);
          if (res.profile.user) {
            navigation.replace("main" as never )
            
          }
        }).catch(e=> {
          console.log("FetchProfile error" ,e)
        })
      }
    })

   }

  useEffect(()=>{
    fetchProfile()

  },[])
  return (
    
    <SafeAreaView style={styles.container}>
      <StatusBar style={"dark"}/>
      {/* upper section  */}

      <View style={styles.section}>
      <View style={{alignItems: "flex-end",marginRight: -5, marginTop: -15}}> 
        <TouchableOpacity style={{marginVertical:10}}>
          <Text>Skip</Text>
        </TouchableOpacity>
</View>
        <Text style={styles.heading}>Sign In </Text>
        <View style={{ alignItems: "center", paddingVertical: 10,}}>
          <Image
            style={styles.icon}
            source={require("../../../assets/icons/icon.png")} // aur is image path ko bhi 
          />
        </View>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Welcome</Text>
        <KeyboardAvoidingView style={{ marginVertical: 20 }}>
       
          {/* Email Input  */}
          <TextInput onChangeText={setemail} style={styles.input} placeholder="Email address" />
          {/* Password Input  */}
          <View style={{ flexDirection: "row",  width: "100%",
          
    justifyContent: "space-between",
    backgroundColor: Colors.LightBg,
    borderRadius: 8,
    marginBottom: 15, alignItems:"center"}}>
          <TextInput
            style={{width: "80%", padding: 8,
            fontSize: 18,
            fontWeight: "700",
           
           
            borderRadius: 8,
           }}
           onChangeText={setPassword}
            secureTextEntry={passwordState}
            placeholder="Password"
          />
          <Entypo onPress={()=> setpasswordState(!passwordState)} style={{width: 40, height: 40, }} name={passwordState ? "eye-with-line":"eye"} size={28} color="black"/>
          </View>
          {/* Forgot password Field  */}
          <TouchableOpacity
            onPress={handleLogin} // ye as never mat linkhna tum ye sirf typescript ke liye hai.
          >
            <Text style={styles.link}>Forgot Password</Text>
          </TouchableOpacity>
          {/* Sign In button  */}

          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.btnText}>Sign In</Text>
          </TouchableOpacity>
          {/* seperator  */}
          <View style={styles.seperator}>
            <View style={styles.hr}></View>
            <View>
              <Text style={{ fontSize: 16 }}>OR</Text>
            </View>
            <View style={styles.hr}></View>
          </View>

          <View style={styles.linkbtnBox}>
            <Text style={styles.text}>Don't have an account? </Text>
            <TouchableOpacity onPress={()=> navigation.navigate("register" as never)}>
              <Text style={{...styles.text ,color:Colors.Link}}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 34,
    fontWeight: "600",
    marginTop: 10,
    color: Colors.Primary,
  },
  icon: {
    width: 150,
    height: 150,
    borderRadius: 39,
    borderColor: "#de28c9",
    borderWidth: 4,
   
    shadowColor:Colors.Primary,
    resizeMode: "contain",
    backgroundColor: "#53edaa",
    marginHorizontal: "auto",
  },
  section: {
    padding: 20,
    backgroundColor: Colors.LightBg,
  },
  formContainer: {
    backgroundColor: Colors.White,
    marginTop: -12,
    paddingHorizontal: 20,

    borderRadius: 22,
    flex: 1,
  },
  input: {
    width: "100%",
    padding: 8,
    fontSize: 18,
    fontWeight: "700",
   
    backgroundColor: Colors.LightBg,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: "center",
    backgroundColor: Colors.Primary,
    borderRadius: 8,
  },
  btnText: {
    fontSize: 24,
    fontWeight: "800",
    color: Colors.White,
  },
  link: {
    color: Colors.Link,
    fontSize: 18,
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  seperator: {
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  hr: {
    width: "40%",
    alignItems: "center",
    backgroundColor: Colors.LightBg,
    height: 2,
  },
  text:{
    fontSize:20
  },
  linkbtnBox: {
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center"
  },
});
