export enum Nutrients {
  protein = "Proteínas",
  carbohidrate = "Carboidratos",
  fiber = "Fibras",
  fat = "Gordura",
}

export function valueToKey(value: string): string {
  //@ts-ignore
  return Object.keys(Nutrients)[Object.values(Nutrients).indexOf(value)];
}
