import styled from "styled-components/native";
import { useAppDispatch } from "../../Store/hooks/useAppDispatch";
import { useAppSelector } from "../../Store/hooks/useAppSelector";
import { NavbarComponent } from "../../Components/NavbarComponent/NavbarComponent";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import PlateAndCupComponent from "../../Components/PlateAndCupComponent/PlateAndCupComponent";
import { Modal, ScrollView, View } from "react-native";
import MacroNutrientsComponent from "../../Components/MacroNutrientsComponent/MacroNutrientsComponent";
import { useEffect, useState } from "react";
import { openAccordion } from "../../Store/Slices/Accordion/actions";
import NutrientAccordionComponent from "../../Components/NutrientAccordionComponent/NutrientAccordionComponent";
import { Nutrients } from "../../Utils/Nutrients.enum";
import HousesAccordionComponent from "../../Components/HousesAccordionComponent/HousesAccordionComponent";
import { newOrder } from "../../Store/Slices/MyOrders/actions";
import { resetOrder, setAdress } from "../../Store/Slices/Order/actions";

export const PlateTab = ({ navigation, route }: any) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((store) => store.theme);
  const { nutrient } = useAppSelector((store) => store.home);
  const { items, endereco } = useAppSelector((store) => store.order);
  const [modalVisible, setModalVisible] = useState(false);
  const myHouses = useAppSelector((store) => store.myHouses);
  const myOrders = useAppSelector((store) => store.myOrders);

  useEffect(() => {
    setModalVisible(false);
    if (endereco) {
      console.log(endereco)
      dispatch(
        newOrder({
          id: myOrders.length + 1,
          items: items,
          date: new Date().toLocaleDateString(),
          endereco,
        })
      );
      dispatch(resetOrder());
      navigation.navigate("Orders");
    }
    dispatch(setAdress(undefined));
  }, [endereco]);

  useEffect(() => {
    if (items.length == 0) {
      setErrorState({
        isError: true,
        error: "Opa, você não escolheu nenhum item!",
      });
      return;
    }
    const itemIndex = items
      .map((itemSet) => {
        return itemSet.weight == 0;
      })
      .indexOf(true);
    if (itemIndex >= 0) {
      setErrorState({
        isError: true,
        error: "O item " + items[itemIndex].item.name + " não contém peso!",
      });
      dispatch(openAccordion(items[itemIndex].item.nutrient));
      return;
    }
    setErrorState({ isError: false, error: "" });
  }, [items]);

  const [errorState, setErrorState] = useState({ isError: false, error: "" });

  const sumItemPrices = () => {
    let value: number = 0;
    items.forEach((itemSet) => {
      value += +itemSet.item.price * (itemSet.weight / 100);
    });
    return value.toFixed(2) + "R$";
  };

  const Container = styled.View`
    position: relative;
    display: flex;
    padding: 48px 32px 8px 32px;
    height: 90%;
    background-color: ${theme.color.white};
    gap: 12px;
  `;

  const TextRow = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `;

  const Error = styled.Text`
    color: ${theme.color.error};
    font-size: 12px;
    font-weight: bold;
  `;

  const Price = styled.Text`
    color: ${theme.color.primary};
    font-size: 18px;
    font-weight: bold;
  `;

  const StyledButton = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px;
    border-radius: 5px;
    width: 100%;
  `;

  const ButtonText = styled.Text`
    color: ${theme.color.white};
    font-size: 24px;
    font-weight: bold;
  `;

  const ModalContent = styled.View`
    width: 100%;
    height: 80%;
    position: absolute;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    bottom: 0;
    elevation: 10;
    background-color: ${theme.color.offWhite};
    padding: 16px 32px;
    gap: 12px;
  `;
  const List = styled.View`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  `;

  return (
    <>
      <Container>
        <HeadingComponent
          theme={theme}
          title="Escolha as Quantidades!"
          subtitle="Revise seu prato, e adicione uma bebida"
        />
        <PlateAndCupComponent
          navigation={navigation}
          theme={theme}
          items={items}
          nutrient={nutrient}
        />
        <ScrollView contentContainerStyle={{ gap: 8 }}>
          {Object.keys(Nutrients).map((nutrient, i) => {
            //@ts-ignore
            return (
              <NutrientAccordionComponent
                key={i}
                navigation={navigation}
                items={items}
                theme={theme}
                //@ts-ignore
                nutrient={Nutrients[nutrient]}
              />
            );
            return <></>;
          })}
          <MacroNutrientsComponent items={items} />
        </ScrollView>
        {errorState.isError ? (
          <TextRow>
            <Error>{errorState.error}</Error>
          </TextRow>
        ) : (
          ""
        )}
        <TextRow>
          <Price>Valor a pagar:</Price>
          <Price>{sumItemPrices()}</Price>
        </TextRow>
        <StyledButton
          disabled={errorState.isError}
          style={{
            backgroundColor: errorState.isError
              ? theme.color.fieldset
              : theme.color.primary,
          }}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <ButtonText>Realizar Pedido</ButtonText>
        </StyledButton>
      </Container>
      <NavbarComponent theme={theme} navigation={navigation} route={route} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalContent>
          <HeadingComponent
            theme={theme}
            title="Selecione uma Localização"
            subtitle="Escolha um lugarzinho aconchegante para carbar!"
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
                    toSelect
                  />
                ))}
              <HousesAccordionComponent theme={theme} index={-1} />
            </List>
          </ScrollView>
        </ModalContent>
      </Modal>
    </>
  );
};
