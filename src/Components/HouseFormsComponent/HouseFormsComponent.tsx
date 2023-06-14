import React, { useEffect } from "react";
import styled from "styled-components/native";
import { ThemeModel } from "../../Store/Slices/Themes/IThemes";
import { useDispatch } from "react-redux";
import {
  addHouse,
  changeHouse,
  deleteHouse,
  handleAccordions,
} from "../../Store/Slices/MyHouses/actions";
import InputComponent from "../InputComponent/InputComponent";
import { useAppSelector } from "../../Store/hooks/useAppSelector";
import {
  changeName,
  changeState,
  changeCity,
  changeStreet,
  changeNumber,
  changeCep,
  changeGarden,
  changeTempo,
} from "../../Store/Slices/House/actions";
import axios from "axios";

interface Props {
  theme: ThemeModel;
  isNew?: boolean;
  index: number;
}
export default function HouseFormsComponent({
  theme,
  isNew = false,
  index,
}: Props) {
  const dispatch = useDispatch();
  const temporaryHouse = useAppSelector((store) => store.house);
  const { cities, states } = useAppSelector(
    (store) => store.axiosGlobalRequests
  );

  useEffect(() => {
    if (isNew)
      dispatch(
        changeTempo({
          name: "",
          state: "",
          city: "",
          garden: "",
          street: "",
          number: "",
          cep: "",
          isPrimary: false,
        })
      );
  }, []);

  const handleForm = () => {
    console.log(temporaryHouse)
    const city = temporaryHouse.city
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(" ", "-")
      .toLowerCase();
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${city}`
      )
      .then((response) => {
        if (temporaryHouse.name.length === 0) {
          alert("Opa, adicione um nome para sua localização!");
          return;
        }
        if (
          temporaryHouse.state.length != 2 ||
          states.indexOf(temporaryHouse.state) < 0
        ) {
          alert("Opa, o estado está incorreto!");
          return;
        }

        if (temporaryHouse.city.length == 0 || response.data.length == 0) {
          alert("Opa, a cidade está incorreta!");
          return;
        }

        if (response.status != 200) {
          alert(
            "Ocorreu algum erro no servidor, tente novamente em 2 minutinhos!"
          );
          return;
        }
        if (
          response.data.microrregiao.mesorregiao.UF.sigla !=
          temporaryHouse.state
        ) {
          alert("Opa, essa cidade na verdade não é desse estado!");
          return;
        }
        if (temporaryHouse.garden.length == 0) {
          alert("Opa, você esqueceu o bairro!");
          return;
        }
        if (temporaryHouse.cep.length != 9) {
          alert("Opa, o CEP está incorreto!");
          return;
        }
        if (temporaryHouse.street.length == 0) {
          alert("Opa, você esqueceu da rua!");
          return;
        }

        if (
          !temporaryHouse.number ||
          temporaryHouse.number?.toString().length == 0
        ) {
          alert("Opa, você esqueceu o número!");
          return;
        }
        dispatch(addHouse(temporaryHouse));
        dispatch(handleAccordions(-2));
      });
  };

  const { color } = theme;

  const Row = styled.View`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  `;

  const StyledButton = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px;
    border-radius: 5px;
    background-color: ${color.primary};
  `;

  const ButtonText = styled.Text`
    color: ${theme.color.white};
    font-size: 20px;
    font-weight: bold;
  `;

  return (
    <>
      <Row>
        <InputComponent
          theme={theme}
          label="Nome"
          name="name"
          placeholder="Minha casinha bonitinha"
          dispatcher={{ dispatch, actionWithPayload: changeName }}
          value={temporaryHouse.name}
          style={{ vPadding: 4 }}
        ></InputComponent>
      </Row>
      <Row>
        <InputComponent
          theme={theme}
          label="Estado"
          name="state"
          mask={(text: string) => {
            return text.substring(0, 2).toUpperCase();
          }}
          placeholder="SP"
          dispatcher={{ dispatch, actionWithPayload: changeState }}
          value={temporaryHouse.state}
          style={{ width: 25, vPadding: 4 }}
        ></InputComponent>
        <InputComponent
          theme={theme}
          label="Cidade"
          name="city"
          placeholder="Proteinolândia"
          dispatcher={{ dispatch, actionWithPayload: changeCity }}
          value={temporaryHouse.city}
          style={{ width: 73, vPadding: 4 }}
        ></InputComponent>
      </Row>
      <Row>
        <InputComponent
          theme={theme}
          label="Bairro"
          name="garden"
          placeholder="Parque Da Calistenia"
          dispatcher={{ dispatch, actionWithPayload: changeGarden }}
          value={temporaryHouse.garden}
          style={{ width: 63, vPadding: 4 }}
        ></InputComponent>
        <InputComponent
          theme={theme}
          label="CEP"
          name="cep"
          placeholder="00000-000"
          type="numeric"
          mask={(text: string) => {
            return text
              .replace(/\D/g, "")
              .replace(/(\d{5})(\d)/, "$1-$2")
              .replace(/(-\d{3})\d+?$/, "$1");
          }}
          dispatcher={{ dispatch, actionWithPayload: changeCep }}
          value={temporaryHouse.cep}
          style={{ width: 35, vPadding: 4 }}
        ></InputComponent>
      </Row>
      <Row>
        <InputComponent
          theme={theme}
          label="Nome da Rua"
          name="street"
          placeholder="Grandão da Silva"
          dispatcher={{ dispatch, actionWithPayload: changeStreet }}
          value={temporaryHouse.street}
          style={{ width: 63, vPadding: 4 }}
        ></InputComponent>
        <InputComponent
          theme={theme}
          label="Número"
          name="number"
          type="numeric"
          placeholder="0000"
          dispatcher={{ dispatch, actionWithPayload: changeNumber }}
          value={`${temporaryHouse.number}`}
          style={{ width: 35, vPadding: 4 }}
        ></InputComponent>
      </Row>
      <Row>
        <StyledButton
          style={{ backgroundColor: color.error, width: "48.5%" }}
          onPress={() => {
            if (isNew) dispatch(handleAccordions(-2));
            else dispatch(deleteHouse(index));
          }}
        >
          <ButtonText>{isNew ? "Cancelar" : "Excluir"}</ButtonText>
        </StyledButton>
        <StyledButton
          style={{ backgroundColor: color.primary, width: "48.5%" }}
          onPress={() => {
            if (isNew) {
              handleForm();
            } else dispatch(changeHouse(temporaryHouse));
          }}
        >
          <ButtonText>Salvar</ButtonText>
        </StyledButton>
      </Row>
    </>
  );
}
