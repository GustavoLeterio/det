import styled from "styled-components/native";
import { useAppDispatch } from "../../Store/hooks/useAppDispatch";
import { useAppSelector } from "../../Store/hooks/useAppSelector";
import { NavbarComponent } from "../../Components/NavbarComponent/NavbarComponent";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import { ScrollView } from "react-native";
import HousesAccordionComponent from "../../Components/HousesAccordionComponent/HousesAccordionComponent";
import axios from "axios";
import { useEffect } from "react";
import {
  setCities,
  setStates,
} from "../../Store/Slices/AxiosGlobalRequests/actions";

export const HousesTab = ({ navigation, route }: any) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((store) => store.theme);
  const myHouses = useAppSelector((store) => store.myHouses);
  const { states } = useAppSelector(
    (store) => store.axiosGlobalRequests
  );
  useEffect(() => {
    if (states.length == 0)
      axios
        .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then((response) => {
          dispatch(
            setStates(
              response.data.map((state: any) => {
                return state.sigla;
              })
            )
          );
        });
  }, []);

  const Container = styled.View`
    position: relative;
    display: flex;
    padding: 48px 32px 8px 32px;
    height: 90%;
    background-color: ${theme.color.white};
    gap: 12px;
  `;

  const List = styled.View`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  `;

  const NewItem = styled.View`
    width: 100%;
    border: 1px solid ${theme.color.lightGray};
    border-radius: 4px;
    padding: 16px 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;
  return (
    <>
      <Container>
        <HeadingComponent
          theme={theme}
          title="Minhas Localidades"
          subtitle="Adicione e edite lugares que você bate seus macros!"
        />
        <ScrollView>
          <List>
            {myHouses.houses
              .slice(0)
              .sort((a: House, b: House) => (a.name > b.name ? 1 : -1))
              //@ts-ignore
              .sort((a: House, b: House) => b.isPrimary - a.isPrimary)
              .map((house, i) => (
                <HousesAccordionComponent
                  key={i}
                  index={i}
                  house={house}
                  theme={theme}
                />
              ))}
            <HousesAccordionComponent theme={theme} index={-1} />
          </List>
        </ScrollView>
      </Container>
      <NavbarComponent theme={theme} navigation={navigation} route={route} />
    </>
  );
};
