import { ThemeModel } from "../../Store/Slices/Themes/IThemes";
import { Dispatcher } from "../../Store/types";
import styled from "styled-components/native";
import { Icon, Text } from "@rneui/themed";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { Item, ItemAndWeight } from "../../Store/Slices/Order/IOrder";
import { Nutrients } from "../../Utils/Nutrients.enum";
import { useAppSelector } from "../../Store/hooks/useAppSelector";
import { mockup } from "../../Mocks/cardapio";

interface Props {
  theme: ThemeModel;
  nutrient: Nutrients;
  dispatcher: Dispatcher;
  items: ItemAndWeight[];
}
export default function GridCardComponent(props: Props) {
  const { token } = useAppSelector((store) => store.login);

  const [data, setData] = useState<Item[]>();

  function getList(): Item[] {
    if (props.nutrient == Nutrients.PROTEIN) return mockup.protein;
    if (props.nutrient == Nutrients.CARBOHYDRATE) return mockup.carbohidrate;
    if (props.nutrient == Nutrients.FIBER) return mockup.fiber;
    if (props.nutrient == Nutrients.FAT) return mockup.fat;
    return [];
  }

  // setData(
  //   ["PROTEIN", "CARBOHYDRATE", "FIBER", "FAT"].map((nut, i) => {
  //     return {
  //       id: ((i+1) * props.nutrient.length),
  //       name: props.nutrient,
  //       nutrient: Nutrients[valueToKey(props.nutrient) as "PROTEIN"| "CARBOHYDRATE"| "FIBER"| "FAT"],
  //       price: 4.5,
  //       weightPerGrams: 100,
  //       image: require("../../../assets/Items/steak.png"),
  //       macroNutrients: {
  //         kcal: 100,
  //         carbohydrates: 20,
  //         protein: 20,
  //         fiber: 4,
  //         fat: 4,
  //       },
  //     } as Item;
  //   })
  // );

  function indexOfItem(item: Item): number {
    return props.items.map((i) => i.item.id).indexOf(item.id);
  }

  function isItemPresent(item: Item): boolean {
    return props.items.filter((i) => i.item.id === item.id).length > 0;
  }

  function toggleItemOnList(item: Item) {
    let items: ItemAndWeight[] = [...props.items];
    isItemPresent(item)
      ? items.splice(indexOfItem(item), 1)
      : items.push({ item, weight: 0 });
    console.log(items);
    const { dispatch, actionWithPayload } = props.dispatcher;
    if (actionWithPayload && !Array.isArray(actionWithPayload))
      dispatch(actionWithPayload(items));
    else alert("ERROR: 'ActionWithPayload' NOT INFORMED");
  }

  const { color } = props.theme;

  const Card = styled.View`
    display: flex;
    width: 48%;
    margin: 5% 1%;
    gap: -8px;
    position: relative;
    padding: 0 16px 16px 16px;
    border: 1px solid ${color.lightGray};
    border-radius: 10px;
  `;

  const Image = styled.Image`
    top: -10%;
    width: 128px;
    height: 128px;
    object-fit: fill;
    align-self: center;
    transform: rotate(10deg);
  `;

  const IconView = styled.TouchableOpacity`
    position: absolute;
    width: 25%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    right: 8px;
    bottom: 8px;
  `;

  return (
    <FlatList
      data={getList()}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      renderItem={({ item }) => {
        return (
          <Card>
            <Image source={item.image} />
            <View>
              <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
              <Text style={{ color: color.primary, fontWeight: "bold" }}>
                {String(item.price).replace(".", ",")}R$
              </Text>
              <Text style={{ width: 100, fontSize: 12 }}>
                Por {item.weightPerGrams}g
              </Text>
            </View>

            <IconView
              onPress={() => toggleItemOnList(item)}
              style={{
                backgroundColor: isItemPresent(item)
                  ? color.primary
                  : "transparent",
              }}
            >
              <Icon
                name={isItemPresent(item) ? "check" : "plus"}
                type="font-awesome-5"
                size={18}
                color={isItemPresent(item) ? color.white : color.black}
              />
            </IconView>
          </Card>
        );
      }}
    />
  );
}
