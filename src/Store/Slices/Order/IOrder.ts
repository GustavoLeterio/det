import { ImageSourcePropType } from "react-native";
import { Nutrients } from "../Home/IHome";


export interface Order {
  items: ItemAndWeight[];
  openedAccordion: {
    carbohidrate: boolean;
    protein: boolean;
    fat: boolean;
    fiber: boolean;
  };
}

export interface ItemAndWeight {
  item: Item;
  weight: number;
}

export interface Item {
  id: number;
  name: string;
  nutrient: Nutrients;
  price: number;
  description: string;
  weightPerGrams: number;
  image: ImageSourcePropType;
}
