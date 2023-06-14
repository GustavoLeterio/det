import React, { useState } from "react";
import styled from "styled-components/native";
import { ThemeModel } from "../../Store/Slices/Themes/IThemes";
import { Dispatcher } from "../../Store/types";

interface Props {
  theme: ThemeModel;
  dispatcher: Dispatcher;
  value: boolean;
  label: string;
  style?: any;
}
export default function CheckboxComponent(props: Props) {
  // theme: ThemeModel;
  // dispatch: AppDispatch;


  const [isActive,setIsActive] = useState(false);

  const Label = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  `;

  const CheckBox = styled.View`
    width: 20px;
    height: 20px;
    padding: 2px;
    border: ${isActive
      ? "2px solid " + props.theme.color.primary
      : "1px solid " + props.theme.color.fontGray};
    border-radius: 5px;
  `;

  const Marker = styled.View`
    width: 100%;
    height: 100%;
    border-radius: 2px;
    background-color: ${isActive
      ? props.theme.color.primary
      : "transparent"};
  `;

  const Text = styled.Text`
    color: ${props.theme.color.fontGray};
    font-weight: 600;
    letter-spacing: -1px;
  `;

  return (
    <Label
      style={props.style}
      onPress={() => {
        setIsActive(!isActive);
      }}
    >
      <CheckBox>
        <Marker />
      </CheckBox>
      <Text>{props.label ?? "Faltou um label aqui danado!"}</Text>
    </Label>
  );
}
