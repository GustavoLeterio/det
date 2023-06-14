import styled from "styled-components/native";
import { ThemeModel } from "../../Store/Slices/Themes/IThemes";
import { Icon } from "@rneui/base";
import { useAppSelector } from "../../Store/hooks/useAppSelector";
import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export const NavbarComponent = ({
  navigation,
  route,
  theme,
}: {
  navigation: any;
  route: any;
  theme: ThemeModel;
}) => {
  const [keyboardIsOpen, setKeyboardIsOpen] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardIsOpen(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardIsOpen(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  function isActualRoute(test: String) {
    if (route.name == test) return color.primary;
    else return color.fontGray;
  }
  const { color } = theme;
  const isSomeItemSelected =
    useAppSelector((store) => store.order.items).length > 0;

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
    background-color: ${color.white};
  `;

  const Touchable = styled.TouchableOpacity`
    display: flex;
    position: relative;
    gap: 2px;
  `;

  const Text = styled.Text<{ test: String }>`
    color: ${(p) => isActualRoute(p.test)};
  `;

  return !keyboardIsOpen ? (
    <Container style={{ borderTopWidth: 5, borderTopColor: color.primary }}>
      <Touchable onPress={() => navigation.navigate("Home")}>
        <Icon
          size={24}
          name={"home"}
          type="font-awesome-5"
          color={isActualRoute("Home")}
        ></Icon>
        <Text test="Home">Início</Text>
      </Touchable>
      <Touchable
        style={{ opacity: !isSomeItemSelected ? 0.3 : 1 }}
        disabled={!isSomeItemSelected}
        onPress={() => navigation.navigate("Plate")}
      >
        <Icon
          size={24}
          name={"utensils"}
          type="font-awesome-5"
          color={isActualRoute("Plate")}
        ></Icon>
        <Text test="Plate">Prato</Text>
      </Touchable>
      <Touchable onPress={() => navigation.navigate("Orders")}>
        <Icon
          size={24}
          name={"scroll"}
          type="font-awesome-5"
          color={isActualRoute("Orders")}
        ></Icon>
        <Text test="Orders">Pedidos</Text>
      </Touchable>
      <Touchable onPress={() => navigation.navigate("Houses")}>
        <Icon
          size={24}
          name={"map-marker-alt"}
          type="font-awesome-5"
          color={isActualRoute("Houses")}
        ></Icon>
        <Text test="Houses">Casas</Text>
      </Touchable>
    </Container>
  ) : (
    <></>
  );
};
