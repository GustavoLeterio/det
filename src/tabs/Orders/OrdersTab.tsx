import styled from "styled-components/native";
import { useAppDispatch } from "../../Store/hooks/useAppDispatch";
import { useAppSelector } from "../../Store/hooks/useAppSelector";
import { NavbarComponent } from "../../Components/NavbarComponent/NavbarComponent";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import { ScrollView } from "react-native";
import OrderAccordionComponent from "../../Components/OrderAccordionComponent/OrderAccordionComponent";

export const OrdersTab = ({ navigation, route }: any) => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((store) => store.theme);
    const myOrders = useAppSelector((store) => store.myOrders);

    const Container = styled.View`
        position: relative;
        display: flex;
        padding: 48px 32px 8px 32px;
        height: 90%;
        background-color: ${theme.color.white};
        gap:12px;
    `;

    const List = styled.View`
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap:8px;
    `;
    return (
        <>
            <Container>
                <HeadingComponent theme={theme} title="Meus Pedidos" subtitle="Veja como sua dieta está indo com a gente!" />
                <ScrollView>
                    <List>
                        {myOrders.slice(0).reverse().map((order, i) =>
                            <OrderAccordionComponent key={i} navigation={navigation} order={order} theme={theme} />
                        )}
                    </List>
                </ScrollView>
            </Container>
            <NavbarComponent theme={theme} navigation={navigation} route={route} />
        </>
    );
};
