import React, { useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Fontisto,
  Ionicons,
  SimpleLineIcons
} from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { 
  useFonts,
  Raleway_700Bold,
  Raleway_600SemiBold
} from '@expo-google-fonts/raleway';
import { commonStyles } from '@/styles/common/common.styles';
import { router } from 'expo-router';

const SignUpScreen = () => {
  const [required, setRequired] = useState("");
  const [error, setError] = useState({
    password: ""
  });
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    name: ""
  });

  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Raleway_600SemiBold
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handlePasswordValidation = (value: string) => {
    const password = value;
    const passwordSpecialCharacter = /(?=.*[!@#$%*])/;
    const passwordOneNumber = /(?=.*[0-9])/;
    const passwordSixValue = /(?=.{6,})/;

    if (!passwordSpecialCharacter.test(password)){
      setError({
        ...error,
        password: "Пароль должен содержать минимум 1 специальный символ"
      });
      setUserInfo({...userInfo, password: ""});
    } else if(!passwordOneNumber.test(password)){
      setError({
        ...error,
        password: "Пароль должен содержать минимум одну цифру"
      });
    } else if(!passwordSixValue.test(password)){
      setError({
        ...error,
        password: "Пароль должен содержать не менее 6 символов"
      });
    } else {
      setError({
        ...error,
        password: ""
      });
      setUserInfo({
        ...userInfo,
        password: value
      });
    }
  };

  const handleSignIn = () => {
    router.push("/(routes)/verify-account");
  };
  
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <Image 
            style={styles.signImage}
            source={require("@/assets/sign-in/signup.png")}
          />
          <Text style={[styles.welcomeText, {fontFamily: "Raleway_700Bold"}]}>
            Создание аккаунта
          </Text>
          <Text style={[styles.learningText, {fontFamily: "Raleway_600SemiBold"}]}>
            Создайте свой аккаунт Dummy Learn
          </Text>
          <View style={styles.inputContainer}>
          <View>
            <TextInput
              style={[styles.input, { paddingLeft: 40, marginBottom: -12 }]}
              keyboardType="default"
              value={userInfo.name}
              placeholder="Классное Имя"
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, name: value })
              }
            />
            <AntDesign
              style={{ position: "absolute", left: 26, top: 14 }}
              name="user"
              size={20}
              color={"#A1A1A1"}
            />
          </View>
            <View>
              <TextInput
                style={[styles.input, {paddingLeft: 40}]}
                keyboardType='email-address'
                value={userInfo.email}
                placeholder='example@email.com'
                onChangeText={(value) => setUserInfo({...userInfo, email: value})}
              />
              <Fontisto
                style={{position: "absolute", left: 26, top: 17.8}}
                name='email'
                size={20}
                color={"#A1A1A1"}
              />
              {required && (
                <View style={commonStyles.errorContainer}>
                  <Entypo name='cross' size={18} color={"red"}/>
                </View>
              )}
              <View style={{marginTop: 15}}>
                <TextInput
                  style={commonStyles.input}
                  keyboardType='default'
                  secureTextEntry={!isPasswordVisible}
                  defaultValue=''
                  placeholder='qwerty123'
                  onChangeText={handlePasswordValidation}
                />
                <TouchableOpacity 
                  style={styles.visibleIcon}
                  onPress={() => setPasswordVisible(!isPasswordVisible)}  
                >
                  {isPasswordVisible ? (
                    <Ionicons name='eye-off-outline' size={23} color={"#747474"}/>
                  ) : (
                    <Ionicons name='eye-outline' size={23} color={"#747474"}/>
                  )}
                </TouchableOpacity>
                <SimpleLineIcons 
                  style={styles.icon2}
                  name='lock'
                  size={20}
                  color={"#A1A1A1"}
                />

                {error.password && (
                  <View style={[commonStyles.errorContainer, {top: 145}]}>
                    <Entypo name='cross' size={18} color={"red"}/>
                    <Text style={{color: "red", fontSize: 11, marginTop: -1}}>
                      {error.password}
                    </Text>
                  </View>
                )}
              </View>
            </View>
            
            <TouchableOpacity
              style={{padding: 16, borderRadius: 8, marginHorizontal: 16, backgroundColor: "#2467EC", marginTop: 20}}
              onPress={handleSignIn}
            >
              {
                buttonSpinner ? (
                  <ActivityIndicator size={"small"} color={"white"}/>
                ) : (
                  <Text style={{color: "white", textAlign: "center", fontSize: 16, fontFamily: "Raleway_700Bold"}}>
                    Регистрация
                  </Text>
                )
              }
            </TouchableOpacity>

            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10}}>
              <TouchableOpacity>
                <FontAwesome name='google' size={30}/>
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name='github' size={30}/>
              </TouchableOpacity>
            </View>

            <View style={styles.signUpRedirect}>
              <Text style={{fontSize: 16, fontFamily: "Raleway_700Bold"}}>
                Уже есть аккаунт Dummy Learn?
              </Text>
              <TouchableOpacity onPress={() => router.push("/(routes)/login")}>
                <Text style={{
                  fontFamily: "Raleway_600SemiBold", 
                  fontSize: 16, 
                  color: "#2467EC",
                  marginLeft: 5
                }}>
                  Вход
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  signImage: {
    width: "40%",
    height: 187,
    alignSelf: "center",
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 24
  },
  learningText: {
    textAlign: "center",
    fontSize: 15,
    color: "#575757",
    marginTop: 5,
  },
  inputContainer: {
    marginHorizontal: 16,
    marginTop: 30,
    rowGap: 30
  },
  input: {
    height: 55,
    marginHorizontal: 16,
    borderRadius: 8,
    paddingLeft: 35,
    fontSize: 16,
    backgroundColor: "white",
    color: "#A1A1A1"
  },
  visibleIcon: {
    position: "absolute",
    top: 15,
    right: 30
  },
  icon2: {
    position: "absolute",
    left: 24,
    top: 17.8,
    marginTop: -2
  },
  signUpRedirect: {
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "center",
    marginBottom: 10
  }
});

export default SignUpScreen;
