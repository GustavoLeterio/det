import {
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components/native";
import { Icon } from "@rneui/themed";
import { useAppSelector } from "../../Store/hooks/useAppSelector";

interface Props {
  items: string[];
  itemState: [string, Dispatch<SetStateAction<string>>];
}
export default function FilterComponent({
  items,
  itemState,
}: Props) {
  const { color } = useAppSelector((store) => store.theme);
  const [isOpen, setIsOpen] = useState(false);
  const Content = styled.View`
    display: flex;
  `;

  const TouchableContent = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
  `;

  const List = styled.FlatList`
    position: absolute;
    background-color: ${color.white};
    elevation: 4;
    width: 120%;
    left: -8px;
    border-radius: 4px;
    padding: 8px;
  `;

  const renderItem = ({ item }: any) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            itemState[1](item);
            setIsOpen(false);
          }}
        >
          <Text numberOfLines={1} ellipsizeMode="tail">
            {item}
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <Content>
      <TouchableWithoutFeedback onPress={() => setIsOpen(!isOpen)}>
        <TouchableContent>
          <Text
            style={{ fontSize: 20, color: color.fontColor, fontWeight: "600" }}
          >
            {itemState[0] ?? "Selecionar"}
          </Text>
          <Icon
            name={isOpen ? "angle-up" : "angle-down"}
            type="font-awesome-5"
            size={28}
            color={color.fontColor}
          ></Icon>
        </TouchableContent>
      </TouchableWithoutFeedback>
      <View style={{ position: "relative" }}>
        <List
          style={{ display: isOpen ? "flex" : "none" }}
          data={items}
          ItemSeparatorComponent={() => {
            return <View style={{ marginVertical: 4 }} />;
          }}
          numColumns={1}
          renderItem={renderItem}
        />
      </View>
    </Content>
  );
}
