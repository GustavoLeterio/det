import { ImageSourcePropType } from "react-native";
import { Nutrients } from "../../../Utils/Nutrients.enum";

export interface Order {
  id?: number;
  items: ItemAndWeight[];
  date: string;
  endereço?:number;
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
  // description: string;
  weightPerGrams: number;
  image: ImageSourcePropType;
  macroNutrients: MacroNutrients;
}

export interface MacroNutrients {
  kcal: number;
  carbohydrates: number;
  protein: number;
  fiber: number;
  fat: number;
}
