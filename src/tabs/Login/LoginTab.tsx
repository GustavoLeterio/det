import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import styled from "styled-components/native";
import { useAppDispatch } from "../../Store/hooks/useAppDispatch";
import { useAppSelector } from "../../Store/hooks/useAppSelector";
import LoginSlider from "../../Components/LoginSliderComponent/LoginSlider";
import InputComponent from "../../Components/InputComponent/InputComponent";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { changeLoginEmail, changeLoginPassword, changeLoginState, setToken, setUserId, toggleRememberMe } from "../../Store/Slices/Login/actions";
import CheckboxComponent from "../../Components/CheckboxComponent/CheckboxComponent";
import TitleComponent from "../../Components/TitleComponent/TitleComponent";
import { baseURL } from "../../Utils";
import axios from "axios";
import { useState } from 'react';

export const LoginTab = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((store) => store.theme);
  const { isLogin, form, token } = useAppSelector((store) => store.login);
  const [state, setState] = useState("");
  const Container = styled.View`
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    background-color: ${theme.color.white};
  `;

  const Banner = styled.ImageBackground`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const Logo = styled.Image`
    margin: 15% 0;
  `;

  const Form = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      padding: 18,
      width: '80%',
      borderRadius: 20,
      top: '-5%',
      backgroundColor: theme.color.white, // ou use uma variável para a cor, se estiver disponível
      elevation: 40,
    },
  });

  const Text = styled.Text`
    font-size: 14px;
    font-weight: ${theme.fonts.medium};
    color: ${theme.color.fontGray};
  `;

  const FHead = styled.View`
    display:flex;
    align-items:center;
  `;

  const StyledButton = styled.TouchableOpacity`
    background-color: ${theme.color.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px;
    border-radius: 5px;
    width: 100%;
  `;

  const ButtonText = styled.Text`
    color: ${theme.color.white};
    font-size: 24px;
    font-weight: bold;
  `;

  const BottomImage = styled.Image`
    position: absolute;
    width: 100%;
    bottom: 0;
    z-index: -1;
  `;

  return (
    <Container >
      <Banner source={require("../../../assets/Login/LoginBanner.png")}>
        <Logo source={require("../../../assets/Logo.png")} />
      </Banner>
      <KeyboardAwareScrollView
        style={Form.container}
        contentContainerStyle={{ alignItems: "center", gap: 24 }}
      >
        <FHead>
          <TitleComponent theme={theme} text={"Com fome?!"}></TitleComponent>
          <Text>{isLogin ? "Faça login para saciar sua dieta!" : "Cadastre-se e mate sua fome!"}</Text>
        </FHead>
        <LoginSlider theme={theme} placeLeft={isLogin} />
        <InputComponent theme={theme} label="Login" placeholder="@email.com" name={"email"} dispatcher={{ dispatch, actionWithPayload: changeLoginEmail }} value={form.email} />
        <InputComponent theme={theme} label="Senha" placeholder="senha" name={"password"} dispatcher={{ dispatch, actionWithPayload: changeLoginPassword }} value={form.password} />
        {isLogin ?
          <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
            <CheckboxComponent theme={theme} dispatcher={{ dispatch, actionWithoutPayload: toggleRememberMe }} value={form.rememberMe} label="Lembrar senha" />
            <Text style={{ letterSpacing: -.5, color: theme.color.primary, alignSelf: "flex-end" }}>Esqueceu a senha?</Text>
          </View>
          :
          <InputComponent theme={theme} label="Repetir Senha" placeholder="Repetir Senha" name={"repeatedPassword"} dispatcher={{ dispatch, actionWithPayload: changeLoginPassword }} value={form.password} />
        }
        <StyledButton
          onPress={() => {
            axios.post(baseURL + "/authenticate", { username: 'string', password: 'string'}).then(res => {
             dispatch(setToken(res.data.token))
             dispatch(setUserId(res.data.userId))
             navigation.navigate('Home')
            }).catch(err => console.log(JSON.stringify(err)));
          }}
        >
          <ButtonText>{isLogin ? "Entrar" : "Cadastrar-se"}</ButtonText>
        </StyledButton>
        <View style={{ alignItems: "center" }}>
          <Text>{isLogin ? "Ainda não possui conta?" : "Você já tem uma conta?"}</Text>
          <TouchableOpacity onPress={() => dispatch(changeLoginState(!isLogin))}><Text style={{ color: theme.color.primary }}>{isLogin ? "Criar Conta" : "Fazer Login"}</Text></TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      <BottomImage source={require("../../../assets/Login/BottomImage.png")} />
    </Container>
  );
};
