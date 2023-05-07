import styled from "styled-components/native";
import { ThemeModel } from "../../Store/Slices/Themes/IThemes";
import { Icon } from "@rneui/base";

export const NavbarComponent = ({ navigation, theme }: { navigation: any, theme: ThemeModel }) => {
    function isActualRoute(test: String) {
        if (navigation.getState().routeNames[navigation.getState().index] == test) return color.primary
        else return color.fontGray;
    }
    const { color } = theme;

    const Container = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    border-top: 6px solid ${color.primary};
    height: 10%;
    padding: 0 32px;
    background-color:${color.white} ;
  `;

    const Touchable = styled.TouchableOpacity`
      display: flex;
      position: relative;
      gap:2px;
    `;

    const Text = styled.Text<{ test: String }>`
        color:${p => isActualRoute(p.test)};
    `;
    return (
        <Container style={{ borderTopWidth: 5, borderTopColor: color.primary }}>
            <Touchable onPress={() => navigation.navigate("Home")}>
                <Icon size={24} name={"home"} type='font-awesome-5' color={isActualRoute("Home")}></Icon>
                <Text test="Home">Início</Text>
            </Touchable >
            <Touchable onPress={() => navigation.navigate("Plate")}>
                <Icon size={24} name={"utensils"} type='font-awesome-5' color={isActualRoute("Plate")}></Icon>
                <Text test="Plate">Prato</Text>
            </Touchable >
            <Touchable onPress={() => navigation.navigate("")}>
                <Icon size={24} name={"scroll"} type='font-awesome-5' color={isActualRoute("")}></Icon>
                <Text test="">Pedidos</Text>
            </Touchable >
            <Touchable onPress={() => navigation.navigate("")}>
                <Icon size={24} name={"user-alt"} type='font-awesome-5' color={isActualRoute("")}></Icon>
                <Text test="">Perfil</Text>
            </Touchable >
        </Container>
    );
};
