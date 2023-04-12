import styled from "styled-components/native";
import { useAppDispatch } from "../../Store/hooks/useAppDispatch";
import { useAppSelector } from "../../Store/hooks/useAppSelector";
import { changeTheme } from "../../Store/Slices/Themes/actions";
import LoginSlider from "../../Components/LoginSlider/LoginSlider";
import InputComponent from "../../Components/InputComponent/InputComponent";
import { ThemeModel } from "../../Store/Slices/Themes/IThemes";
import { View, TouchableOpacity } from "react-native";
import { changeLoginState } from "../../Store/Slices/Login/actions";

export const LoginTab = () => {
  const dispatch = useAppDispatch();
  const { color, fonts } = useAppSelector((store) => store.theme);
  const { isLogin, form } = useAppSelector((store) => store.login);

  const Container = styled.View`
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    background-color: ${color.white};
  `;

  const Banner = styled.ImageBackground`
    width: 100%;
    display: flex;
    align-items: center;
    /* borderRadius: 10px; */
  `;
  const Logo = styled.Image`
    margin: 15% 0;
  `;

  const Form = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 24px;
    width: 80%;
    border-radius: 20px;
    top: -5%;
    background-color: ${color.white};
    elevation: 40;
  `;

  const Title = styled.Text`
    font-size: 24px;
    font-weight: ${fonts.bold};
    color:${color.primary};
  `;

  const Text = styled.Text`
    font-size: 14px;
    font-weight: ${fonts.medium};
    color: ${color.fontGray};
  `;

  const FHead = styled.View`
    display:flex;
    align-items:center;
  `;

  const StyledButton = styled.TouchableOpacity`
    background-color: ${color.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    border-radius: 5px;
    width: 100%;
  `;

  const ButtonText = styled.Text`
    color: ${color.white};
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
    <Container>
      <Banner source={require("../../../assets/Login/LoginBanner.png")}>
        <Logo source={require("../../../assets/Logo.png")} />
      </Banner>
      <Form>
        <FHead>
          <Title>Com fome?!</Title>
          <Text>Faça login para saciar sua dieta!</Text>
        </FHead>
        <LoginSlider placeLeft={isLogin} />
        <InputComponent theme={{ color, fonts } as ThemeModel} label="Login" placeholder="@email.com" name={"email"} dispatch={dispatch} bindValue={form.email}/>
        <InputComponent theme={{ color, fonts } as ThemeModel} label="Senha" placeholder="senha" name={"password"} dispatch={dispatch} bindValue={form.password}/>
        <StyledButton
          onPress={() => {
            dispatch(changeTheme());
          }}
        >
          <ButtonText>Entrar</ButtonText>
        </StyledButton>
        <View style={{ alignItems: "center" }}>
          <Text>Ainda não possui conta?</Text>
          <TouchableOpacity onPress={() => dispatch(changeLoginState(false))}><Text style={{ color: color.primary }}>Criar Conta</Text></TouchableOpacity>
        </View>
      </Form>
      <BottomImage source={require("../../../assets/Login/BottomImage.png")} />
    </Container>
  );
};
