import styled from "styled-components/native";
import { Dispatcher } from "../../Store/types";
import { ThemeModel } from "../../Store/Slices/Themes/IThemes";
import React from "react";
import {
  EmitterSubscription,
  Keyboard,
  KeyboardTypeOptions,
  TextInput,
} from "react-native";

interface Props {
  type?: KeyboardTypeOptions;
  id?: number;
  style?: { width?: number; vPadding?: number };
  theme: ThemeModel;
  label?: string;
  name: string;
  placeholder?: string;
  dispatcher: Dispatcher;
  value?: string;
  mask?: (text: string) => string;
  isPassword?: boolean;
}
class InputComponent extends React.Component<Props, { value: string }> {
  value: string = this.props.value ?? "";
  isNumber: boolean =
    this.props.type == "numeric" || this.props.type == "number-pad";
  ref: React.RefObject<TextInput>;

  constructor(props: Props) {
    super(props);
    this.ref = React.createRef();
  }

  keyboardDidHideSubscription?: EmitterSubscription;
  componentDidMount(): void {
    this.keyboardDidHideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        const { dispatch, actionWithPayload } = this.props.dispatcher;
        var payload: any = this.value;

        if (this.props.id) payload = { value: payload, id: this.props.id };
        if (actionWithPayload && !Array.isArray(actionWithPayload)) {
          dispatch(actionWithPayload(payload));
          this.ref.current?.setNativeProps({ text: this.value });
        } else alert("ERROR: 'ActionWithPayload' NOT INFORMED");
      }
    );
  }

  componentWillUnmount() {
    this.keyboardDidHideSubscription?.remove();
  }

  setValue(text: string) {
    if (this.isNumber) {
      text = text.replace(/[^0-9]/g, "");
      this.ref.current?.setNativeProps({ text: text });
    }
    if (this.props.mask) {
      text = this.props.mask(text);
      this.ref.current?.setNativeProps({ text: text });
    }
    this.value = text;
  }

  render() {
    const { color, fonts } = this.props.theme;
    const TextInput = styled.TextInput`
      padding: ${(this.props.style?.vPadding ?? "10") + "px"};
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
      width: ${(this.props.style?.width ?? "100") + "%"};
    `;

    const Text = styled.Text`
      color: ${color.fontGray};
      font-weight: ${fonts.medium};
      width: 100%;
      font-size: 14px;
    `;

    return (
      <View>
        {this.props.label ? <Text>{this.props.label}</Text> : ""}
        <TextInput
          ref={this.ref}
          secureTextEntry={this.props.isPassword}
          placeholder={this.props.placeholder ?? ""}
          onChangeText={(text) => this.setValue(text)}
          defaultValue={this.value}
          keyboardType={this.props.type ?? "default"}
        />
      </View>
    );
  }
}

export default InputComponent;
