import { Keyboard } from 'react-native';
import styled from "styled-components/native";
import { Dispatcher } from '../../Store/types';
import { ThemeModel } from '../../Store/Slices/Themes/IThemes';
import type { EmitterSubscription } from 'react-native';
import React from 'react';

interface Props { theme: ThemeModel, label: string, name: string, placeholder?: string, dispatcher: Dispatcher, value: string }
// ({ label, name, placeholder, dispatch, bindValue }: Props) =>
class InputComponent extends React.Component<Props, { value: string }> {

  state = { value: this.props.value }

  keyboardDidHideSubscription?: EmitterSubscription;
  componentDidMount(): void {
    this.keyboardDidHideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      const { dispatch, actionWithPayload } = this.props.dispatcher;
      if (actionWithPayload && !Array.isArray(actionWithPayload)) {
        setTimeout(() => {
          dispatch(actionWithPayload(this.state.value));
        })
      }
      else
        alert("ERROR: 'ActionWithPayload' NOT INFORMED")
    });
  }

  componentWillUnmount() {
    this.keyboardDidHideSubscription?.remove();
  }

  render() {
    const { color, fonts } = this.props.theme;

    const TextInput = styled.TextInput`
    padding: 10px;
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid ${color.lightGray};
    border-radius: 4px;
    background-color: ${color.offWhite};
  `;

    const View = styled.View`
    position: relative;
    display: flex;
    gap: 6px;
    width: 100%;
  `;

    const Text = styled.Text`
    color:${color.fontGray};
    font-weight: ${fonts.medium};
    width: 100%;
    font-size: 14px;
  `;
    return (
      <View >
        <Text>{this.props.label}</Text>
        <TextInput
          secureTextEntry={this.props.name == "password"}
          placeholder={this.props.placeholder ?? 'Digite aqui'}
          onChangeText={text => { this.setState({ value: text }) }}
          value={this.state.value}
        />
      </View >
    )
  }
}

export default InputComponent;