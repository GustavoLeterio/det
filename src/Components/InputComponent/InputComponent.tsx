import React from 'react'
import { Keyboard } from 'react-native';
import styled from "styled-components/native";
import { AppDispatch } from '../../Store/types';
import { changeLoginValueByKey } from '../../Store/Slices/Login/actions';
import { ThemeModel } from '../../Store/Slices/Themes/IThemes';
import type { EmitterSubscription } from 'react-native';

interface Props { theme: ThemeModel, label: string, name: string, placeholder?: string, dispatch: AppDispatch, bindValue: string }
// ({ label, name, placeholder, dispatch, bindValue }: Props) =>
class InputComponent extends React.Component<Props, { value: string }> {

  state = { value: this.props.bindValue }

  TextInput = styled.TextInput`
    padding: 10px;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid ${this.props.theme.color.lightGray};
    border-radius: 4px;
    background-color: ${this.props.theme.color.offWhite};
  `;

  View = styled.View`
    position: relative;
    display: flex;
    gap: 6px;
    width: 100%;
  `;

  Text = styled.Text`
    color:${this.props.theme.color.fontGray};
    font-weight: ${this.props.theme.fonts.medium};
    width: 100%;
    font-size: 14px;
  `;

  keyboardDidHideSubscription?: EmitterSubscription;
  componentDidMount(): void {
    this.keyboardDidHideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      this.props.dispatch(changeLoginValueByKey({ key: this.props.name, value: this.state.value }));
    });
  }

  componentWillUnmount() {
    this.keyboardDidHideSubscription?.remove();
  }

  render() {
    return (
      <this.View >
        <this.Text>{this.props.label}</this.Text>
        <this.TextInput
          secureTextEntry={this.props.name == "password"}
          placeholder={this.props.placeholder ?? 'Digite aqui'}
          onChangeText={text => { this.setState({ value: text }) }}
          value={this.state.value}
        />
      </this.View >
    )
  }
}

export default InputComponent;