import { Icon } from "@rneui/themed";
import React, { useState } from "react";
import styled from "styled-components/native";
import { ThemeModel } from "../../Store/Slices/Themes/IThemes";
import { TouchableWithoutFeedback } from "react-native";
import MacroNutrientsComponent from "../MacroNutrientsComponent/MacroNutrientsComponent";
import { View } from "react-native";
import { Order } from "../../Store/Slices/Order/IOrder";
import { useDispatch } from "react-redux";
import { changeListOfItems } from "../../Store/Slices/Order/actions";

interface Props {
  order: Order;
  theme: ThemeModel;
  navigation: any;
}
export default function OrderAccordionComponent({
  order,
  theme,
  navigation,
}: Props) {
  const dispatch = useDispatch();
  //@ts-ignore
  const { color, fonts } = theme;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const Accordion = styled.View`
    width: 100%;
    border: 1px solid ${color.lightGray};
    border-radius: 4px;
  `;
  const AccordionHeader = styled.View`
    padding: 16px 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `;
  const AccordionHeaderBlock = styled.View`
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
  `;

  const Title = styled.Text`
    font-size: 16px;
    color: ${color.fontColor};
    font-weight: ${fonts.medium};
  `;

  const Date = styled.Text`
    font-size: 12px;
    color: ${color.fontGray};
    font-weight: ${fonts.regular};
  `;

  const AccordionContent = styled.View`
    gap: 24px;
    display: flex;
    padding: 10px;
  `;

  const List = styled.View`
    width: 100%;
    display: flex;
    gap: 6px;
    flex-direction: column;
  `;

  const ListRow = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  `;

  const ListText = styled.Text`
    width: 100%;
    font-size: 12px;
    color: ${color.fontColor};
    text-align: center;
  `;

  const Value = styled.Text`
    width: 100%;
    font-size: 24px;
    color: ${color.fontColor};
    font-weight: ${fonts.black};
    text-align: center;
  `;

  const Line = styled.View`
    height: 1px;
    margin-bottom: 4px;
    width: 100%;
    background-color: ${color.lightGray};
  `;

  const StyledButton = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px;
    border-radius: 5px;
    width: 100%;
    background-color: ${color.primary};
  `;

  const ButtonText = styled.Text`
    color: ${theme.color.white};
    font-size: 24px;
    font-weight: bold;
  `;

  const getOrderFullPrice = () => {
    let value = 0;
    order.items.forEach((itemSet) => {
      value += (itemSet.item.price / 100) * itemSet.weight;
    });
    return value.toFixed(2);
  };

  return (
    <Accordion>
      <TouchableWithoutFeedback onPress={() => setIsOpen(!isOpen)}>
        <AccordionHeader>
          <AccordionHeaderBlock>
            <Icon
              name={"utensils"}
              type="font-awesome-5"
              size={24}
              color={color.fontColor}
            ></Icon>
            <Title>Pedido {order.id}#</Title>
          </AccordionHeaderBlock>
          <AccordionHeaderBlock>
            <Date>{order.date}</Date>
            <Icon
              name={isOpen ? "chevron-up" : "chevron-down"}
              type="font-awesome-5"
              size={20}
              color={color.fontColor}
            ></Icon>
          </AccordionHeaderBlock>
        </AccordionHeader>
      </TouchableWithoutFeedback>
      {isOpen ? (
        <AccordionContent>
          <List>
            <ListRow>
              <ListText
                style={{
                  width: "50%",
                  color: color.fontGray,
                  fontWeight: "700",
                }}
              >
                Itens
              </ListText>
              <ListText
                style={{
                  width: "25%",
                  color: color.fontGray,
                  fontWeight: "700",
                }}
              >
                Peso
              </ListText>
              <ListText
                style={{
                  width: "25%",
                  color: color.fontGray,
                  fontWeight: "700",
                }}
              >
                Valor
              </ListText>
            </ListRow>
            {order.items.map((itemSet, i) => (
              <View key={i}>
                <Line />
                <ListRow>
                  <ListText style={{ width: "50%" }}>
                    {itemSet.item.name}
                  </ListText>
                  <ListText style={{ width: "25%" }}>
                    {itemSet.weight}g
                  </ListText>
                  <ListText style={{ width: "25%" }}>
                    {(itemSet.item.price / 100) * itemSet.weight}R$
                  </ListText>
                </ListRow>
              </View>
            ))}
          </List>
          <Value>Total {getOrderFullPrice()}R$</Value>
          <MacroNutrientsComponent items={order.items} />
          <StyledButton
            onPress={() => {
              navigation.navigate("Plate");
              console.log(order.items)
              dispatch(changeListOfItems(order.items));
            }}
          >
            <ButtonText>Pedir Novamente</ButtonText>
          </StyledButton>
        </AccordionContent>
      ) : (
        ""
      )}
    </Accordion>
  );
}
