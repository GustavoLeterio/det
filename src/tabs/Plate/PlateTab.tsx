import styled from "styled-components/native";
import { useAppDispatch } from "../../Store/hooks/useAppDispatch";
import { useAppSelector } from "../../Store/hooks/useAppSelector";
import { NavbarComponent } from "../../Components/NavbarComponent/NavbarComponent";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import PlateAndCupComponent from "../../Components/PlateAndCupComponent/PlateAndCupComponent";
import { ScrollView } from "react-native";
import MacroNutrientsComponent from "../../Components/MacroNutrientsComponent/MacroNutrientsComponent";
import { useEffect, useState } from "react";
import { openAccordion } from "../../Store/Slices/Accordion/actions";
import NutrientAccordionComponent from "../../Components/NutrientAccordionComponent/NutrientAccordionComponent";
import { Nutrients } from "../../Utils/Nutrients.enum";

export const PlateTab = ({ navigation, route }: any) => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((store) => store.theme);
    const { nutrient } = useAppSelector((store) => store.home);
    const { items } = useAppSelector((store) => store.order);

    useEffect(() => {
        if (items.length == 0) {
            setErrorState({ isError: true, error: "Opa, você não escolheu nenhum item!" });
            return;
        }
        const itemIndex = items.map((itemSet) => {
            return itemSet.weight == 0
        }).indexOf(true)
        if (itemIndex >= 0) {
            setErrorState({ isError: true, error: "O item " + items[itemIndex].item.name + " não contém peso!" });
            dispatch(openAccordion(items[itemIndex].item.nutrient));
            return;
        }
        setErrorState({ isError: false, error: "" });
    }, [items])

    const [errorState, setErrorState] = useState({ isError: false, error: "" });

    const sumItemPrices = () => {
        let value: number = 0;
        items.forEach((itemSet) => {
            value += +itemSet.item.price * (itemSet.weight / 100);
        });
        return value.toFixed(2) + "R$";
    }

    const Container = styled.View`
        position: relative;
        display: flex;
        padding: 48px 32px 8px 32px;
        height: 90%;
        background-color: ${theme.color.white};
        gap:12px;
    `;

    const TextRow = styled.View`
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    `;

    const Error = styled.Text`
        color: ${theme.color.error};
        font-size: 12px;
        font-weight: bold;
    `;


    const Price = styled.Text`
        color: ${theme.color.primary};
        font-size: 18px;
        font-weight: bold;
    `;

    const StyledButton = styled.TouchableOpacity`
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
                <PlateAndCupComponent navigation={navigation} theme={theme} items={items} nutrient={nutrient} />
                <ScrollView contentContainerStyle={{ gap: 8 }}>
                    {Object.keys(Nutrients).map((nutrient, i) => {
                        //@ts-ignore
                        return <NutrientAccordionComponent key={i} navigation={navigation} items={items} theme={theme} nutrient={Nutrients[nutrient]} />
                        return <></>
                    }
                    )}
                    <MacroNutrientsComponent items={items} />
                </ScrollView>
                {errorState.isError ? <TextRow><Error>{errorState.error}</Error></TextRow> : ""}
                <TextRow>
                    <Price>Valor a pagar:</Price>
                    <Price>{sumItemPrices()}</Price>
                </TextRow>
                <StyledButton disabled={errorState.isError} style={{ backgroundColor: errorState.isError ? theme.color.fieldset : theme.color.primary }}
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
