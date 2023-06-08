import { Order } from "../Store/Slices/Order/IOrder";
import { Nutrients } from "../Utils/Nutrients.enum";

export const mockup: Order[] = [
  {
    id: 1,
    items: [
      {
        item: {
          id: 1,
          name: "Carne Grelhada",
          price: 9.75,
          description: "Carne Gostosinha",
          weightPerGrams: 100,
          image: require("../../assets/Items/steak.png"),
          nutrient: Nutrients.protein,
          macroNutrients: {
            kcal: 100,
            carbohidrates: 20,
            protein: 20,
            fiber: 20,
            fat: 20,
          },
        },
        weight: 140,
      },
      {
        item: {
          id: 6,
          name: "Tacos Grelhada",
          price: 9.75,
          description: "Carne Gostosinha",
          weightPerGrams: 100,
          image: require("../../assets/Items/tacos.png"),
          nutrient: Nutrients.carbohidrate,
          macroNutrients: {
            kcal: 200,
            carbohidrates: 20,
            protein: 20,
            fiber: 20,
            fat: 20,
          },
        },
        weight: 100,
      },
      {
        item: {
          id: 11,
          name: "Saladinha Temperadinha",
          price: 9.75,
          description: "Saladinha Temperadinha",
          weightPerGrams: 100,
          image: require("../../assets/Items/lettuce.png"),
          nutrient: Nutrients.fiber,
          macroNutrients: {
            kcal: 200,
            carbohidrates: 20,
            protein: 20,
            fiber: 20,
            fat: 20,
          },
        },
        weight: 140,
      },
      {
        item: {
          id: 16,
          name: "Nozes Temperadinha",
          price: 9.75,
          description: "Saladinha Temperadinha",
          weightPerGrams: 100,
          image: require("../../assets/Items/nuts.png"),
          nutrient: Nutrients.fat,
          macroNutrients: {
            kcal: 200,
            carbohidrates: 20,
            protein: 20,
            fiber: 20,
            fat: 20,
          },
        },
        weight: 140,
      },
    ],
    date: "26/06/2003",
  },
  {
    id: 2,
    items: [
      {
        item: {
          id: 1,
          name: "Carne Deliciona",
          price: 15,
          description: "Carne Gostosinha",
          weightPerGrams: 100,
          image: require("../../assets/Items/steak.png"),
          nutrient: Nutrients.protein,
          macroNutrients: {
            kcal: 100,
            carbohidrates: 20,
            protein: 20,
            fiber: 20,
            fat: 20,
          },
        },
        weight: 140,
      },
      {
        item: {
          id: 6,
          name: "Tacos Grelhada",
          price: 9.75,
          description: "Carne Gostosinha",
          weightPerGrams: 100,
          image: require("../../assets/Items/tacos.png"),
          nutrient: Nutrients.carbohidrate,
          macroNutrients: {
            kcal: 200,
            carbohidrates: 20,
            protein: 20,
            fiber: 20,
            fat: 20,
          },
        },
        weight: 100,
      },
      {
        item: {
          id: 11,
          name: "Saladinha Temperadinha",
          price: 9.75,
          description: "Saladinha Temperadinha",
          weightPerGrams: 100,
          image: require("../../assets/Items/lettuce.png"),
          nutrient: Nutrients.fiber,
          macroNutrients: {
            kcal: 200,
            carbohidrates: 20,
            protein: 20,
            fiber: 20,
            fat: 20,
          },
        },
        weight: 140,
      },
      {
        item: {
          id: 16,
          name: "Nozes Temperadinha",
          price: 9.75,
          description: "Saladinha Temperadinha",
          weightPerGrams: 100,
          image: require("../../assets/Items/nuts.png"),
          nutrient: Nutrients.fat,
          macroNutrients: {
            kcal: 200,
            carbohidrates: 20,
            protein: 20,
            fiber: 20,
            fat: 20,
          },
        },
        weight: 140,
      },
    ],
    date: "26/06/2003",
  },
];
