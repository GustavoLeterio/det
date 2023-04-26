import styled from "styled-components/native";
import { ThemeModel } from '../../Store/Slices/Themes/IThemes';
import React from 'react';

interface Props { theme: ThemeModel, title: string, subtitle: string }
// ({ label, name, placeholder, dispatch, bindValue }: Props) =>
class HeadingComponent extends React.Component<Props> {
    render() {
        const { color } = this.props.theme;

        const Container = styled.View`
            display: flex;
            width: 100%;
        `;

        const Title = styled.Text`
            font-weight: 600;
            color: ${color.primary};
            font-size:20px;
        `;


        const Subtitle = styled.Text`
            font-size: 12px;
        `;

        return (
            <Container >
                <Title>{this.props.title}</Title>
                <Subtitle>{this.props.subtitle}</Subtitle>
            </Container >
        )
    }
}

export default HeadingComponent;