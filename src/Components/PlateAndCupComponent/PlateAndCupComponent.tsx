import { ThemeModel } from "../../Store/Slices/Themes/IThemes";
import { Nutrients } from "../../Store/Slices/Home/IHome";
import styled from "styled-components/native";
import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { ItemAndWeight } from "../../Store/Slices/Order/IOrder";
import { useDispatch } from "react-redux";
import { changeNutrient } from "../../Store/Slices/Home/actions";
import { openAccordion } from "../../Store/Slices/Order/actions";

interface Props { theme: ThemeModel, nutrient: Nutrients, items: ItemAndWeight[], navigation: any }
export default function PlateAndCupComponent(props: Props) {
    const dispatch = useDispatch();
    function isItemPresentByNutrient(nutrient: Nutrients): boolean {
        return props.items.filter(i => i.item.nutrient == nutrient).length > 0;
    }

    const [state,setState] = useState({
        carbohidrateIsPresent: isItemPresentByNutrient(Nutrients.carbohidrate),
        proteinIsPresent: isItemPresentByNutrient(Nutrients.protein),
        fatIsPresent: isItemPresentByNutrient(Nutrients.fat),
        fiberIsPresent: isItemPresentByNutrient(Nutrients.fiber),
        drinkIsPresent: false
    });

    function handleClick(nutrientPresence: boolean, nutrient: Nutrients) {
        if (nutrientPresence) {
            dispatch(openAccordion(nutrient))
        } else {
            dispatch(changeNutrient(nutrient));
            props.navigation.navigate("Home")
        }
    }


    const { color } = props.theme;

    const Content = styled.View`
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        width: 100%;
    `;

    const Plate = styled.ImageBackground`
        position: relative;
        width: 192px;
        height: 192px;
    `;
    const Cup = styled.ImageBackground`
        object-fit: cover;
        width: 128px;
        height: 176px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const Button = styled.TouchableOpacity<{ move: { x: number, y: number }, zIndex: number, opacity: number }>`
        position: absolute;
        top: ${p => p.move.y + "px"};
        left: ${p => p.move.x + "px"};
        z-index: ${p => p.zIndex};
        opacity: ${p => p.opacity};
    `;

    const IconView = styled.View`
        position: absolute;
        width: 25%;
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius:100px;
        transform: translateY(32px);
    `;

    return (
        <Content>
            <Plate source={require("../../../assets/PlateButtons/plate.png")}>
                <Button move={{ x: 19, y: 31 }} zIndex={2} opacity={state.carbohidrateIsPresent ? 1 : .5} onPress={() => handleClick(state.carbohidrateIsPresent, Nutrients.carbohidrate)}>
                    <Image source={require("../../../assets/PlateButtons/rice.png")}></Image>
                </Button>
                <Button move={{ x: 71, y: 31 }} zIndex={0} opacity={state.fiberIsPresent ? 1 : .5} onPress={() => handleClick(state.fiberIsPresent, Nutrients.fiber)}>
                    <Image source={require("../../../assets/PlateButtons/lettuce.png")}></Image>
                </Button>
                <Button move={{ x: 22, y: 90 }} zIndex={1} opacity={state.fatIsPresent ? 1 : .5} onPress={() => handleClick(state.fatIsPresent, Nutrients.fat)}>
                    <Image source={require("../../../assets/PlateButtons/avocado.png")}></Image>
                </Button>
                <Button move={{ x: 74, y: 97 }} zIndex={3} opacity={state.proteinIsPresent ? 1 : .5} onPress={() => handleClick(state.proteinIsPresent, Nutrients.protein)}>
                    <Image source={require("../../../assets/PlateButtons/meat.png")}></Image>
                </Button>
            </Plate>
            <TouchableOpacity onPress={() => setState({ ...state, drinkIsPresent: !state.drinkIsPresent })}>
                <Cup source={require("../../../assets/PlateButtons/cup.png")}>
                    <IconView style={{ backgroundColor: color.primary }}>
                        <Icon name={state.drinkIsPresent ? "check" : "plus"} type='font-awesome-5' size={18} color={color.white}></Icon>
                    </IconView>
                </Cup>
            </TouchableOpacity>
        </Content>
    );
}