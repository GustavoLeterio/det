import styled from "styled-components/native";
import { useAppSelector } from "../../Store/hooks/useAppSelector";
import { NavbarComponent } from "../../Components/NavbarComponent/NavbarComponent";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import { ScrollView } from "react-native";
import OrderAccordionComponent from "../../Components/OrderAccordionComponent/OrderAccordionComponent";
import { Text } from "@rneui/base";
import navigate from "../../../Util/Navigate";

export const OrdersTab = ({ navigation, route }: any) => {
  const theme = useAppSelector((store) => store.theme);
  const myOrders = useAppSelector((store) => store.myOrders);

  const Container = styled.View`
    position: relative;
    display: flex;
    padding: 48px 32px 8px 32px;
    height: 90%;
    background-color: ${theme.color.white};
    gap: 12px;
  `;

  const List = styled.View`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  `;
  return (
    <>
      <Container>
        <HeadingComponent
          theme={theme}
          title="Meus Pedidos"
          subtitle="Veja como sua dieta está indo com a gente!"
        />
        <ScrollView>
          {myOrders.length > 0 ? (
            <List>
              {myOrders
                .slice(0)
                .reverse()
                .map((order, i) => (
                  <OrderAccordionComponent
                    key={i}
                    navigation={navigation}
                    order={order}
                    theme={theme}
                  />
                ))}
            </List>
          ) : (
            <Text
              style={{
                backgroundColor: theme.color.primary,
                padding: 12,
                fontSize: 24,
                fontWeight: 800,
                color: theme.color.white,
                textAlign: "center",
                borderRadius: 8,
              }}
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              Pede aí!
            </Text>
          )}
        </ScrollView>
      </Container>
      <NavbarComponent theme={theme} navigation={navigation} route={route} />
    </>
  );
};
