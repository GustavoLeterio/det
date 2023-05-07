import styled from "styled-components/native";
import { useAppDispatch } from "../../Store/hooks/useAppDispatch";
import { useAppSelector } from "../../Store/hooks/useAppSelector";
import { Avatar, Text } from '@rneui/themed';
import { View } from "react-native";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import { Nutrients } from "../../Store/Slices/Home/IHome";
import NutrientButtonComponent from "../../Components/NutrientButtonComponent/NutrientButtonComponent";
import { changeListOfItems, changeNutrient } from "../../Store/Slices/Home/actions";
import GridCardComponent from "../../Components/GridCardComponent/GridCardComponent";
import { NavbarComponent } from "../../Components/NavbarComponent/NavbarComponent";

export const HomeTab = ({ navigation }: any) => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((store) => store.theme);
    const { nutrient, items } = useAppSelector((store) => store.home);

    const Container = styled.View`
        position: relative;
        display: flex;
        padding: 48px 32px 8px 32px;
        height: 90%;
        background-color: ${theme.color.white};
        gap:12px;
    `;

    const Header = styled.View`
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    `;

    const Texts = styled.View`
        width: 80%;
        position: relative;
        gap: 24px;
    `;

    const Buttons = styled.View`
        width: 100%;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
    `;

    return (<>
        <Container>
            <Header>
                <Texts>
                    <View>
                        <Text style={{ fontSize: 18 }}>Olá, usuario!!👋</Text>
                        <Text>O que vai pedir hoje?</Text>
                    </View>
                    <HeadingComponent theme={theme} title="Escolha os Alimentos!" subtitle="Monte seu prato com as categorias abaixo" />
                </Texts>
                <Avatar
                    size={48}
                    rounded
                    onPress={() => { alert("bora toma uma?") }}
                    source={require("../../../assets/favicon.png")}
                >
                </Avatar>
            </Header>
            <Buttons>
                <NutrientButtonComponent theme={theme} dispatcher={{ dispatch, actionWithPayload: changeNutrient }} value={nutrient} nutrient={Nutrients.protein} icon="drumstick-bite"></NutrientButtonComponent>
                <NutrientButtonComponent theme={theme} dispatcher={{ dispatch, actionWithPayload: changeNutrient }} value={nutrient} nutrient={Nutrients.carbohidrate} icon="bread-slice"></NutrientButtonComponent>
                <NutrientButtonComponent theme={theme} dispatcher={{ dispatch, actionWithPayload: changeNutrient }} value={nutrient} nutrient={Nutrients.fiber} icon="carrot"></NutrientButtonComponent>
                <NutrientButtonComponent theme={theme} dispatcher={{ dispatch, actionWithPayload: changeNutrient }} value={nutrient} nutrient={Nutrients.fat} icon="pizza-slice"></NutrientButtonComponent>
            </Buttons>
            <GridCardComponent theme={theme} dispatcher={{ dispatch, actionWithPayload: changeListOfItems }} items={items} nutrient={nutrient} />
        </Container >
        <NavbarComponent theme={theme} navigation={navigation}></NavbarComponent>
    </>

    );
};

