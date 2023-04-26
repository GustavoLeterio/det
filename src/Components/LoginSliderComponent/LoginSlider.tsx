import styled from "styled-components/native";
import { useAppDispatch } from "../../Store/hooks/useAppDispatch";
import { useAppSelector } from "../../Store/hooks/useAppSelector";
import { changeLoginState } from "../../Store/Slices/Login/actions";
import { Dispatcher } from "../../Store/types";
import React from "react";
import { ThemeModel } from "../../Store/Slices/Themes/IThemes";

interface Props { theme: ThemeModel, placeLeft: boolean, dispatcher: Dispatcher }
class LoginSlider extends React.Component<Props, {}> {
  render() {
    const { color, fonts } = this.props.theme;
    const { dispatch, actionWithPayload } = this.props.dispatcher;

    const OptionSlider = styled.View`
    display:flex;
    flex-direction: row;
    align-items:center;
    width:100%;
    background-color: ${color.primary};
    border: 3px solid ${color.primary};
    border-radius: 4px;
    position: relative;
  `;

    const Slider = styled.View`
    position: absolute;
    width: 50%;
    height: 100%;
    border-radius: 3px;
    background-color: ${color.white};
    left:${this.props.placeLeft ? '0%' : '50%'};
  `;

    const Option = styled.TouchableOpacity`
    display:flex;
    width:50%;
    justify-content:center;
    align-items:center;
  `;

    const TextOption = styled.Text<{ highlighted: boolean }>`
    font-weight: ${(props) => { return props.highlighted ? fonts.medium : fonts.black }};
    color: ${(props) => { return props.highlighted ? color.fontGray : color.white }};
  `;

    const realizeDispatch = (value: Boolean) => {
      if (actionWithPayload) {
        dispatch(actionWithPayload(value))
      } else {
        alert("ERROR: 'ActionWithPayload' NOT INFORMED")
      }
    }

    return (
      <OptionSlider>
        <Slider></Slider>
        <Option onPress={() => { realizeDispatch(true) }}><TextOption highlighted={this.props.placeLeft}>Fazer Login</TextOption></Option>
        <Option onPress={() => { realizeDispatch(false) }}><TextOption highlighted={!this.props.placeLeft}>Cadastrar-se</TextOption></Option>
      </OptionSlider>
    );
  }
};

export default LoginSlider;