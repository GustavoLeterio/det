export enum Nutrients {
  PROTEIN = "Proteínas",
  CARBOHYDRATE = "Carboidratos",
  FIBER = "Fibras",
  FAT = "Gordura",
}

export enum NutrientsResponse {
  PROTEIN = "PROTEIN",
  CARBOHYDRATE = "CARBOHYDRATE",
  FIBER = "FIBER",
  FAT = "FAT",
}

export function valueToKey(value: Nutrients): string {
  //@ts-ignore
  return Object.keys(Nutrients)[Object.values(Nutrients).indexOf(value)];
}
