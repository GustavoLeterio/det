import styled from "styled-components/native";
import { useAppDispatch } from "../../Store/hooks/useAppDispatch";
import { useAppSelector } from "../../Store/hooks/useAppSelector";
import { NavbarComponent } from "../../Components/NavbarComponent/NavbarComponent";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import PlateAndCupComponent from "../../Components/PlateAndCupComponent/PlateAndCupComponent";
import { changeNutrient } from "../../Store/Slices/Home/actions";
import AccordionComponent from "../../Components/AccordionComponent/AccordionComponent";
import { Nutrients } from "../../Store/Slices/Home/IHome";
import { ScrollView } from "react-native";

export const PlateTab = ({ navigation, route }: any) => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((store) => store.theme);
    const { nutrient } = useAppSelector((store) => store.home);
    const { items } = useAppSelector((store) => store.order);



    const Container = styled.View`
        position: relative;
        display: flex;
        padding: 48px 32px 8px 32px;
        height: 90%;
        background-color: ${theme.color.white};
        gap:12px;
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

    return (
        <>
            <Container>
                <HeadingComponent theme={theme} title="Escolha as Quantidades!" subtitle="Revise seu prato, e adicione uma bebida" />
                <PlateAndCupComponent navigation={navigation} theme={theme} items={items} nutrient={nutrient}/>
                <ScrollView contentContainerStyle={{gap:8}}>
                    {Object.keys(Nutrients).map((nutrient,i) => {
                        //@ts-ignore
                        return <AccordionComponent key={i} navigation={navigation} items={items} theme={theme} nutrient={Nutrients[nutrient]} />
                    }
                    )}
                </ScrollView>
                <StyledButton
                    onPress={() => {
                        console.log("pedido")
                    }}
                >
                    <ButtonText>Realizar Pedido</ButtonText>
                </StyledButton>
            </Container>
            <NavbarComponent theme={theme} navigation={navigation} route={route} />
        </>
    );
};
