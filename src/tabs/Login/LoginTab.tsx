import styled from "styled-components/native";
import { useAppDispatch } from "../../Store/hooks/useAppDispatch";
import { useAppSelector } from "../../Store/hooks/useAppSelector";
import LoginSlider from "../../Components/LoginSliderComponent/LoginSlider";
import InputComponent from "../../Components/InputComponent/InputComponent";
import { View, TouchableOpacity } from "react-native";
import { changeLoginEmail, changeLoginPassword, changeLoginState, toggleRememberMe } from "../../Store/Slices/Login/actions";
import CheckboxComponent from "../../Components/CheckboxComponent/CheckboxComponent";
import TitleComponent from "../../Components/TitleComponent/TitleComponent";

export const LoginTab = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((store) => store.theme);
  const { isLogin, form } = useAppSelector((store) => store.login);
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

  const Form = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 18px;
    width: 80%;
    border-radius: 20px;
    top: -5%;
    background-color: ${theme.color.white};
    elevation: 40;
  `;

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
      <Form>
        <FHead>
          <TitleComponent theme={theme} text={"Com fome?!"}></TitleComponent>
          <Text>{isLogin ? "Faça login para saciar sua dieta!" : "Cadastre-se e mate sua fome!"}</Text>
        </FHead>
        <LoginSlider theme={theme} placeLeft={isLogin} dispatcher={{ dispatch, actionWithPayload: changeLoginState }} />
        <InputComponent theme={theme} label="Login" placeholder="@email.com" name={"email"} dispatcher={{ dispatch, actionWithPayload: changeLoginEmail }} value={form.email} />
        <InputComponent theme={theme} label="Senha" placeholder="senha" name={"password"} dispatcher={{ dispatch, actionWithPayload: changeLoginPassword }} value={form.password} />
        {!isLogin ?
          <InputComponent theme={theme} label="Repetir Senha" placeholder="Repetir Senha" name={"repeatedPassword"} dispatcher={{ dispatch, actionWithPayload: changeLoginPassword }} value={form.password} />
          : ""}
        {isLogin ?
          <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
            <CheckboxComponent theme={theme} dispatcher={{ dispatch, actionWithoutPayload: toggleRememberMe }} value={form.rememberMe} label="Lembrar senha" />
            <Text style={{ letterSpacing: -.5, color: theme.color.primary, alignSelf: "flex-end" }}>Esqueceu a senha?</Text>
          </View>
          : ""}
        <StyledButton
          onPress={() => {
            navigation.navigate("Home")
          }}
        >
          <ButtonText>{isLogin ? "Entrar" : "Cadastrar-se"}</ButtonText>
        </StyledButton>
        <View style={{ alignItems: "center" }}>
          <Text>{isLogin ? "Ainda não possui conta?" : "Você já tem uma conta?"}</Text>
          <TouchableOpacity onPress={() => dispatch(changeLoginState(!isLogin))}><Text style={{ color: theme.color.primary }}>{isLogin ? "Criar Conta" : "Fazer Login"}</Text></TouchableOpacity>
        </View>
      </Form>
      <BottomImage source={require("../../../assets/Login/BottomImage.png")} />
    </Container>
  );
};
