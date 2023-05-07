import { ThemeModel } from "../../Store/Slices/Themes/IThemes";
import { Item, Nutrients } from "../../Store/Slices/Home/IHome";
import { Dispatcher } from "../../Store/types";
import styled from "styled-components/native";
import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";

interface Props { theme: ThemeModel, nutrient: Nutrients, dispatcher: Dispatcher, items: Item[] }
class PlateAndCupComponent extends React.Component<Props> {
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
                    <Button move={{ x: 20, y: 33 }} style={{ transform: [{ rotate: '-5deg' }] }} zIndex={2} opacity={.5} onPress={a => console.log("Arroz")}>
                        <Image source={require("../../../assets/PlateButtons/rice.png")}></Image>
                    </Button>
                    <Button move={{ x: 71, y: 31 }} zIndex={0} opacity={.5} onPress={a => console.log("Salada")}>
                        <Image source={require("../../../assets/PlateButtons/lettuce.png")}></Image>
                    </Button>
                    <Button move={{ x: 22, y: 90 }} zIndex={1} opacity={.5} onPress={a => console.log("Abacte")}>
                        <Image source={require("../../../assets/PlateButtons/avocado.png")}></Image>
                    </Button>
                    <Button move={{ x: 71, y: 97 }} zIndex={3} opacity={.5} onPress={a => console.log("Carne")}>
                        <Image source={require("../../../assets/PlateButtons/meat.png")}></Image>
                    </Button>
                </Plate>
                <TouchableOpacity onPress={() => console.log("suquinho")}>
                    <Cup source={require("../../../assets/PlateButtons/cup.png")}>
                        <IconView style={{ backgroundColor: true ? color.primary : "transparent" }}>
                            <Icon name={true ? "check" : "plus"} type='font-awesome-5' size={18} color={true ? color.white : color.black}></Icon>
                        </IconView>
                    </Cup>
                </TouchableOpacity>
            </Content>
        );
    }
}
export default PlateAndCupComponent; 
