import { Colors } from "@/constants"; // isko thik kar lena ye sab typescript ka import hai.
import { Link, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";
import {Entypo} from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context";
import { gql } from "graphql-request";
import { gql_client } from "@/utils";

import ImagePicker from "expo-image-picker";
import {Ionicons} from "@expo/vector-icons"

export default function Register() {
  const navigation = useNavigation();
  const [hide, sethide] = useState(true);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [confPassword, setconfPassword] = useState("");
  const [img, setimg] = useState("")

  const handleRegister = async()=>{
    if (name === "" || phone === "" || email === "" || password === "" || confPassword === "") {
      return Alert.alert("Input Error", "Please fill all fields.")
    }
    if (password === confPassword) {
      
    }else{
      return Alert.alert("Input Error", "Password didn't match.")
    }

    const query = gql`
    mutation Register ($data:UserInput){
      createUser(data:$data){
        message,
        user{
          _id
        }
        token
      }
    }
    `
    const variables ={
          "data":{
            "name":name,
            "email":email,
            "password":password          }
    }
    await gql_client.request(query, variables).then((res:any)=>{
      if (res.register) {
        navigation.navigate("login" as never)
      }else{
        Alert.alert("Network Error", res     )
      }
    }).catch((e:any)=>{
      Alert.alert("Network Error", ""+e)
    })



  }

  const handleImagePicker = async()=>{
    const result = await  ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setimg(result.assets[0].uri)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* upper section  */}

      <View style={styles.section}>
        <Text style={styles.heading}>Register</Text>
        <View style={{ alignItems: "center", paddingVertical: 10 }}>
        
        </View>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Welcome</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{width:150, height:150, borderWidth:2, alignSelf:"center"}}>
          <Ionicons onPress={handleImagePicker} size={32} name="cloud-upload-outline"/>
          {
            img && (
              <Image source={{uri:img}} style={{width:"100%", height:"100", resizeMode:"contain"}}/>
            )
          }
          </View>

        <KeyboardAvoidingView style={{ marginVertical: 20 }}>
          {/* Name Input  */}
          <TextInput style={styles.input} onChangeText={setname} placeholder="Full name" />
          {/* Number Input  */}
          <TextInput style={styles.input} onChangeText={setphone} keyboardType="numeric" placeholder="+91 91261 26***" />
          {/* Email Input  */}
          <TextInput style={styles.input} onChangeText={setemail} placeholder="Email address" />
          {/* Password Input  */}
          <View style={{width:"100%", flexDirection:"row", alignItems:"center", backgroundColor:Colors.LightBg, borderRadius:8}}>
          <TextInput
            style={{...styles.input, width:"90%"}}
            secureTextEntry={hide}
            placeholder="Password"
            onChangeText={setpassword}
          />
          <Entypo onPress={()=> sethide(!hide)} name={hide ? "eye-with-line": "eye"} size={20}/>
          </View>
          {/* Password Input  */}
          <View style={{width:"100%", flexDirection:"row", alignItems:"center", backgroundColor:Colors.LightBg, marginTop:10, borderRadius:8}}>
          <TextInput
            style={{...styles.input, width:"90%"}}
            secureTextEntry={hide}
            placeholder=" Conferm Password"
            onChangeText={setconfPassword}
          />
          <Entypo onPress={()=> sethide(!hide)} name={hide ? "eye-with-line": "eye"} size={20}/>
          </View>
          {/* Forgot password Field  */}
          <TouchableOpacity
            onPress={() => navigation.navigate("main" as never)} // ye as never mat linkhna tum ye sirf typescript ke liye hai.
          >
            <Text style={styles.link}>Forgot Password</Text>
          </TouchableOpacity>
          {/* Sign In button  */}

          <TouchableOpacity onPress={handleRegister} style={styles.button}>
            <Text style={styles.btnText}>Register</Text>
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
            <Text style={styles.text}>Already have an account? </Text>
            <TouchableOpacity onPress={()=> navigation.navigate("login" as never)}>
              <Text style={{...styles.text ,color:Colors.Link}}>Login</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        </ScrollView>
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
    borderRadius: 99,
    shadowColor:Colors.Primary,
    resizeMode: "contain",
    backgroundColor: "#fff",
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
    color: Colors.DarkBg,
    backgroundColor: Colors.LightBg,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 15,
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
