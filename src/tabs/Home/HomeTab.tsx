import styled from "styled-components/native";
import { useAppDispatch } from "../../Store/hooks/useAppDispatch";
import { useAppSelector } from "../../Store/hooks/useAppSelector";
import { Avatar, Text } from '@rneui/themed';
import { View } from "react-native";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import NutrientButtonComponent from "../../Components/NutrientButtonComponent/NutrientButtonComponent";
import { changeNutrient } from "../../Store/Slices/Home/actions";
import GridCardComponent from "../../Components/GridCardComponent/GridCardComponent";
import { NavbarComponent } from "../../Components/NavbarComponent/NavbarComponent";
import { changeListOfItems } from "../../Store/Slices/Order/actions";
import { Nutrients } from "../../Utils/Nutrients.enum";
import { Icon } from "@rneui/base";

export const HomeTab = ({ navigation,route}: any) => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((store) => store.theme);
    const { nutrient } = useAppSelector((store) => store.home);
    const { form } = useAppSelector((store) => store.login);
    const { items } = useAppSelector((store) => store.order);
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
                        <Text style={{ fontSize: 18 }}>Olá, {form.userName}!!👋</Text>
                        <Text>O que vai pedir hoje?</Text>
                    </View>
                    <HeadingComponent theme={theme} title="Escolha os Alimentos!" subtitle="Monte seu prato com as categorias abaixo" />
                </Texts>
                <Icon onPress={()=>{
                    navigation.navigate("Login");
                }} size={32} name={"sign-out-alt"} type='font-awesome-5' color={theme.color.fontColor}></Icon>
            </Header>
            <Buttons>
                <NutrientButtonComponent theme={theme} dispatcher={{ dispatch, actionWithPayload: changeNutrient }} value={nutrient} nutrient={Nutrients.PROTEIN} icon="drumstick-bite"></NutrientButtonComponent>
                <NutrientButtonComponent theme={theme} dispatcher={{ dispatch, actionWithPayload: changeNutrient }} value={nutrient} nutrient={Nutrients.CARBOHYDRATE} icon="bread-slice"></NutrientButtonComponent>
                <NutrientButtonComponent theme={theme} dispatcher={{ dispatch, actionWithPayload: changeNutrient }} value={nutrient} nutrient={Nutrients.FIBER} icon="carrot"></NutrientButtonComponent>
                <NutrientButtonComponent theme={theme} dispatcher={{ dispatch, actionWithPayload: changeNutrient }} value={nutrient} nutrient={Nutrients.FAT} icon="pizza-slice"></NutrientButtonComponent>
            </Buttons>
            <GridCardComponent theme={theme} dispatcher={{ dispatch, actionWithPayload: changeListOfItems }} items={items} nutrient={nutrient} />
        </Container >
        <NavbarComponent theme={theme} navigation={navigation} route={route}></NavbarComponent>
    </>

    );
};

