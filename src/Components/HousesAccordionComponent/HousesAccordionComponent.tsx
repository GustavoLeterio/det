import { Icon } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ThemeModel } from "../../Store/Slices/Themes/IThemes";
import { TouchableWithoutFeedback, View } from "react-native";
import { useDispatch } from "react-redux";
import {
  changePrimaryHouse,
  handleAccordions,
} from "../../Store/Slices/MyHouses/actions";
import { useAppSelector } from "../../Store/hooks/useAppSelector";
import { changeTempo } from "../../Store/Slices/House/actions";
import HouseFormsComponent from "../HouseFormsComponent/HouseFormsComponent";

interface Props {
  house?: House;
  theme: ThemeModel;
  index: number;
}
export default function HousesAccordionComponent({
  house,
  theme,
  index,
}: Props) {
  const dispatch = useDispatch();

  const houses = useAppSelector((store) => store.myHouses);

  //@ts-ignore
  const { color, fonts } = theme;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(changeTempo(house));
  }, [isOpen]);

  useEffect(() => {
    if (houses.opennedAccordionPos == index) setIsOpen(!isOpen);
  }, [houses.opennedAccordionPos]);

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

  const AccordionContent = styled.View`
    gap: 12px;
    display: flex;
    padding: 10px;
    width: 100%;
  `;

  return (
    <Accordion>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsOpen(!isOpen);
          dispatch(handleAccordions(index));
          console.log("secondary")
        }}
      >
        <AccordionHeader>
          {house ? (
            <>
              <AccordionHeaderBlock>
                <Icon
                  name={"home"}
                  type="font-awesome-5"
                  size={24}
                  color={color.fontColor}
                ></Icon>
                <Title>{house.name}</Title>
              </AccordionHeaderBlock>
              <AccordionHeaderBlock>
                <Icon
                  name={"star"}
                  onPress={() => {
                    console.log("primary")
                    dispatch(changePrimaryHouse(house));
                  }}
                  solid={house.isPrimary}
                  type="font-awesome-5"
                  size={20}
                  color={color.fontColor}
                ></Icon>
                <Icon
                  name={isOpen ? "times" : "edit"}
                  type="font-awesome-5"
                  size={isOpen ? 24 : 20}
                  solid
                  color={color.fontColor}
                ></Icon>
              </AccordionHeaderBlock>
            </>
          ) : !isOpen ? (
            <AccordionHeaderBlock
              style={{
                width: "100%",
                backgroundColor: "red",
                justifyContent: "center",
              }}
            >
              <Icon
                name={"plus"}
                type="font-awesome-5"
                size={24}
                solid
                color={color.fontColor}
              ></Icon>
            </AccordionHeaderBlock>
          ) : (
            <>
              <AccordionHeaderBlock>
                <Icon
                  name={"home"}
                  type="font-awesome-5"
                  size={24}
                  color={color.fontColor}
                ></Icon>
                <Title>Nova Localidade</Title>
              </AccordionHeaderBlock>
              <AccordionHeaderBlock>
                <Icon
                  name={"times"}
                  type="font-awesome-5"
                  size={24}
                  solid
                  color={color.fontColor}
                ></Icon>
              </AccordionHeaderBlock>
            </>
          )}
        </AccordionHeader>
      </TouchableWithoutFeedback>
      {isOpen ? (
        <AccordionContent>
          <HouseFormsComponent isNew={!house} theme={theme} index={index} />
        </AccordionContent>
      ) : (
        ""
      )}
    </Accordion>
  );
}
