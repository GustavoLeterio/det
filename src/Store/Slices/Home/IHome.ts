import { ImageSourcePropType } from "react-native";

export enum Nutrients {
  protein = "Proteínas",
  carbohidrate = "Carboidratos",
  fiber = "Fibras",
  fat = "Gordura",
}

export interface Home {
  nutrient: Nutrients;
  items: Item[];
}

export interface Item {
  id: number;
  name: string;
  nutrient:Nutrients;
  price: number;
  description: string;
  weightPerGrams: number;
  image: ImageSourcePropType;
}
