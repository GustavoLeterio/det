import styled from "styled-components/native";
import { useAppSelector } from "../../Store/hooks/useAppSelector";
import React from "react";
import { ThemeModel } from "../../Store/Slices/Themes/IThemes";

interface Props { theme: ThemeModel, text: string, fontSize?: number }
class TitleComponent extends React.Component<Props, {}> {
    render() {
        const { color } = this.props.theme;

        const Text = styled.Text`
            font-weight: 600;
            color: ${color.primary};
            font-size:${this.props.fontSize ?? 24}px;
        `;

        return (
            <Text>{this.props.text}</Text>
        );
    }
};

export default TitleComponent;