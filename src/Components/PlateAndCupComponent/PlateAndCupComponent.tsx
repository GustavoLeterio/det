import { ThemeModel } from "../../Store/Slices/Themes/IThemes";
import { Item, Nutrients } from "../../Store/Slices/Home/IHome";
import { Dispatcher } from "../../Store/types";
import styled from "styled-components/native";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";

interface Props { theme: ThemeModel, nutrient: Nutrients, dispatcher: Dispatcher, items: Item[], navigation: any }
interface State { carbohidrateIsPresent: boolean, fatIsPresent: boolean, proteinIsPresent: boolean, fiberIsPresent: boolean, drinkIsPresent: boolean }
class PlateAndCupComponent extends React.Component<Props, State> {

    isItemPresentByNutrient(nutrient: Nutrients): boolean {
        return this.props.items.filter(i => i.nutrient == nutrient).length > 0;
    }

    state = {
        carbohidrateIsPresent: this.isItemPresentByNutrient(Nutrients.carbohidrate),
        proteinIsPresent: this.isItemPresentByNutrient(Nutrients.protein),
        fatIsPresent: this.isItemPresentByNutrient(Nutrients.fat),
        fiberIsPresent: this.isItemPresentByNutrient(Nutrients.fiber),
        drinkIsPresent: false
    }

    handleClick(nutrientPresence: boolean, nutrient: Nutrients) {
        if (nutrientPresence) {
            console.log("Abre o DropDown");
        } else {
            const { dispatch, actionWithPayload } = this.props.dispatcher;
            if (actionWithPayload && !Array.isArray(actionWithPayload)) {
                setTimeout(() => {
                    dispatch(actionWithPayload(nutrient));
                    this.props.navigation.navigate("Home")
                })
            }
            else
                alert("ERROR: 'ActionWithPayload' NOT INFORMED")
        }
    }

    render() {
        const { color } = this.props.theme;

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
                    <Button move={{ x: 19, y: 31 }} zIndex={2} opacity={this.state.carbohidrateIsPresent ? 1 : .5} onPress={() => this.handleClick(this.state.carbohidrateIsPresent, Nutrients.carbohidrate)}>
                        <Image source={require("../../../assets/PlateButtons/rice.png")}></Image>
                    </Button>
                    <Button move={{ x: 71, y: 31 }} zIndex={0} opacity={this.state.fiberIsPresent ? 1 : .5} onPress={() => this.handleClick(this.state.fiberIsPresent, Nutrients.fiber)}>
                        <Image source={require("../../../assets/PlateButtons/lettuce.png")}></Image>
                    </Button>
                    <Button move={{ x: 22, y: 90 }} zIndex={1} opacity={this.state.fatIsPresent ? 1 : .5} onPress={() => this.handleClick(this.state.fatIsPresent, Nutrients.fat)}>
                        <Image source={require("../../../assets/PlateButtons/avocado.png")}></Image>
                    </Button>
                    <Button move={{ x: 74, y: 97 }} zIndex={3} opacity={this.state.proteinIsPresent ? 1 : .5} onPress={() => this.handleClick(this.state.proteinIsPresent, Nutrients.protein)}>
                        <Image source={require("../../../assets/PlateButtons/meat.png")}></Image>
                    </Button>
                </Plate>
                <TouchableOpacity onPress={() => this.setState({ ...this.state, drinkIsPresent: !this.state.drinkIsPresent })}>
                    <Cup source={require("../../../assets/PlateButtons/cup.png")}>
                        <IconView style={{ backgroundColor: this.state.drinkIsPresent ? color.primary : "transparent" }}>
                            <Icon name={this.state.drinkIsPresent ? "check" : "plus"} type='font-awesome-5' size={18} color={this.state.drinkIsPresent ? color.white : color.black}></Icon>
                        </IconView>
                    </Cup>
                </TouchableOpacity>
            </Content>
        );
    }
}
export default PlateAndCupComponent; 
