import React from 'react'
import styled from 'styled-components/native'
import { ThemeModel } from '../../Store/Slices/Themes/IThemes';
import { Dispatcher } from '../../Store/types';

interface Props { theme: ThemeModel, dispatcher: Dispatcher, value: boolean, label: string, style?: any }
export default class CheckboxComponent extends React.Component<Props, { isChecked: boolean }> {
  // theme: ThemeModel;
  // dispatch: AppDispatch;

  toggle(props: Props) {
    const { dispatch, actionWithoutPayload } = props.dispatcher;
    if (actionWithoutPayload) {
      setTimeout(() => {
        // dispatch(actionWithoutPayload());
      })
    }
    else
      alert("ERROR: ACTION WITHOUT PAYLOAD NOT INFORMED")
  }

  render() {
    const Label = styled.TouchableOpacity`
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 4px;
    `;

    const CheckBox = styled.View`
      width: 20px;
      height: 20px;
      padding:2px;
      border: ${this.props.value ? "2px solid " + this.props.theme.color.primary :
        "1px solid " + this.props.theme.color.fontGray};
      border-radius: 5px;
    `;

    const Marker = styled.View`
      width: 100%;
      height: 100%;
      border-radius: 2px;
      background-color: ${this.props.value ? this.props.theme.color.primary : "transparent"};
    `;

    const Text = styled.Text`
      color: ${this.props.theme.color.fontGray};
      font-weight: 600;
      letter-spacing: -1px;
    `;

    //  border-color: ${this.state.isChecked ? this.theme.color.primary : this.theme.color.lightGray};
    //  background-color: ${this.state.isChecked ? this.theme.color.primary : this.theme.color.lightGray};
    return (
      <Label style={this.props.style} onPress={() => { this.toggle(this.props); }}>
        <CheckBox>
          <Marker />
        </CheckBox>
        <Text>{this.props.label ?? "Faltou um label aqui danado!"}</Text>
      </Label>
    )
  }
}
