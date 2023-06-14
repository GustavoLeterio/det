import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";
import { useAppDispatch } from "../../Store/hooks/useAppDispatch";
import { useAppSelector } from "../../Store/hooks/useAppSelector";
import LoginSlider from "../../Components/LoginSliderComponent/LoginSlider";
import InputComponent from "../../Components/InputComponent/InputComponent";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";
import {
  changeLoginEmail,
  changeLoginPassword,
  changeLoginRepeatedPassword,
  changeLoginState,
  changeUserName,
  resetState,
  toggleRememberMe,
} from "../../Store/Slices/Login/actions";
import CheckboxComponent from "../../Components/CheckboxComponent/CheckboxComponent";
import TitleComponent from "../../Components/TitleComponent/TitleComponent";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import { useState } from "react";

export const LoginTab = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((store) => store.theme);
  const { isLogin, form } = useAppSelector((store) => store.login);
  const [modalVisible, setModalVisible] = useState(false);

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
      display: "flex",
      flexDirection: "column",
      padding: 18,
      width: "80%",
      borderRadius: 20,
      top: "-5%",
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
    display: flex;
    align-items: center;
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

  const ModalContent = styled.View`
    width: 100%;
    height: 35%;
    position: absolute;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    bottom: 0;
    elevation: 10;
    background-color: ${theme.color.offWhite};
    padding: 16px 32px;
    gap: 12px;
  `;

  return (
    <Container>
      <Banner source={require("../../../assets/Login/LoginBanner.png")}>
        <Logo source={require("../../../assets/Logo.png")} />
      </Banner>
      <KeyboardAwareScrollView
        style={Form.container}
        contentContainerStyle={{ alignItems: "center", gap: 24 }}
      >
        <FHead>
          <TitleComponent theme={theme} text={"Com fome?!"}></TitleComponent>
          <Text>
            {isLogin
              ? "Faça login para saciar sua dieta!"
              : "Cadastre-se e mate sua fome!"}
          </Text>
        </FHead>
        <LoginSlider theme={theme} placeLeft={isLogin} />
        <InputComponent
          theme={theme}
          label="Login"
          placeholder="@email.com"
          name={"email"}
          dispatcher={{ dispatch, actionWithPayload: changeLoginEmail }}
          value={form.email}
        />
        <InputComponent
          theme={theme}
          label="Senha"
          placeholder="senha"
          name={"password"}
          isPassword
          dispatcher={{ dispatch, actionWithPayload: changeLoginPassword }}
          value={form.password}
        />
        {isLogin ? (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <CheckboxComponent
              theme={theme}
              dispatcher={{ dispatch, actionWithoutPayload: toggleRememberMe }}
              value={form.rememberMe}
              label="Lembrar senha"
            />
            <Text
              style={{
                letterSpacing: -0.5,
                color: theme.color.primary,
                alignSelf: "flex-end",
              }}
            >
              Esqueceu a senha?
            </Text>
          </View>
        ) : (
          <InputComponent
            theme={theme}
            label="Repetir Senha"
            placeholder="Repetir Senha"
            name={"repeatedPassword"}
            isPassword
            dispatcher={{
              dispatch,
              actionWithPayload: changeLoginRepeatedPassword,
            }}
            value={form.repeatedPassword}
          />
        )}
        <StyledButton
          onPress={() => {
            // axios.post(baseURL + "/authenticate", { username: 'string', password: 'string'}).then(res => {
            //  dispatch(setToken(res.data.token))
            //  dispatch(setUserId(res.data.userId))
            if (isLogin) {
              if (
                ((form.email = "antonioaclb00@gmail.com"),
                (form.password = "12345"))
              )
                navigation.navigate("Home");
              else alert("Opa, login incorreto, tente novamente!");
            } else {
              setModalVisible(true);
            }
            // }).catch(err => console.log(JSON.stringify(err)));
          }}
        >
          <ButtonText>{isLogin ? "Entrar" : "Cadastrar-se"}</ButtonText>
        </StyledButton>
        <View style={{ alignItems: "center" }}>
          <Text>
            {isLogin ? "Ainda não possui conta?" : "Você já tem uma conta?"}
          </Text>
          <TouchableOpacity
            onPress={() => dispatch(changeLoginState(!isLogin))}
          >
            <Text style={{ color: theme.color.primary }}>
              {isLogin ? "Criar Conta" : "Fazer Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      <BottomImage source={require("../../../assets/Login/BottomImage.png")} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalContent>
          <HeadingComponent
            theme={theme}
            title="Diga me seu nome!"
            subtitle="Como eu posso te chamar amigo(a)!"
          />
          <ScrollView>
            <View style={{ display: "flex", gap: 20 }}>
              <InputComponent
                theme={theme}
                label="Meu nome"
                placeholder="Digite seu nome!"
                name={"name"}
                dispatcher={{
                  dispatch,
                  actionWithPayload: changeUserName,
                }}
                value={form.userName}
              />
              <StyledButton
                onPress={() => {
                  setModalVisible(false);
                  dispatch(resetState());
                }}
              >
                <ButtonText>{"Sou eu mesmo!"}</ButtonText>
              </StyledButton>
            </View>
          </ScrollView>
        </ModalContent>
      </Modal>
    </Container>
  );
};
