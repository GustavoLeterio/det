import styled from "styled-components/native";
import { Nutrients } from "../../Store/Slices/Home/IHome";
import { Dispatcher } from "../../Store/types";
import React from "react";
import { ThemeModel } from "../../Store/Slices/Themes/IThemes";
import { Icon } from "@rneui/themed";

interface Props { theme: ThemeModel, nutrient: Nutrients, icon: string, dispatcher: Dispatcher, value: Nutrients }
class NutrientButtonComponent extends React.Component<Props, {}> {


    changeNutrient() {
        const { dispatch, actionWithPayload } = this.props.dispatcher;
        if (actionWithPayload && !Array.isArray(actionWithPayload)) {
            setTimeout(() => {
                dispatch(actionWithPayload(this.props.nutrient));
            })
        }
        else
            alert("ERROR: 'ActionWithPayload' NOT INFORMED")
    }

    render() {
        const { color, fonts } = this.props.theme;
        const { dispatch, actionWithPayload } = this.props.dispatcher;

        const Touchable = styled.TouchableOpacity`
            display: flex;
            align-items: center;
            gap:2px;
        `;

        const Text = styled.Text`
            color: ${this.props.value == this.props.nutrient ? color.primary : color.fontGray};
            font-weight: ${this.props.value == this.props.nutrient ? fonts.medium : fonts.regular};
            font-size: 12px;
        `;

        return (
            <Touchable onPress={()=>this.changeNutrient()}>
                <Icon style={{ backgroundColor: this.props.value == this.props.nutrient ? color.primary : color.offWhite, padding: 12, borderRadius: 16 }} containerStyle={{ width: 64 }} size={32} name={this.props.icon} type='font-awesome-5' color={color.black}></Icon>
                <Text>{this.props.nutrient}</Text>
            </Touchable >
        )
    }
}
export default NutrientButtonComponent;