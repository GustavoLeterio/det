import React, { useState } from 'react'
import { useAppSelector } from '../../Store/hooks/useAppSelector'
import styled from 'styled-components/native';
import { ItemAndWeight, MacroNutrients } from '../../Store/Slices/Order/IOrder';



export default function MacroNutrientsComponent(props: { items: ItemAndWeight[] }) {
    const { color, fonts } = useAppSelector(store => store.theme);

    const [values, setValues] = useState<MacroNutrients>(() => {
        let macros: MacroNutrients = {
            kcal: 0,
            carbohidrates: 0,
            protein: 0,
            fiber: 0,
            fat: 0,
        };
        props.items.forEach((itemSet: ItemAndWeight) => {
            macros = {
                kcal: macros.kcal + (itemSet.weight * itemSet.item.macroNutrients.kcal) / 100,
                carbohidrates: macros.carbohidrates + (itemSet.weight * itemSet.item.macroNutrients.carbohidrates) / 100,
                protein: macros.protein + (itemSet.weight * itemSet.item.macroNutrients.protein) / 100,
                fiber: macros.fiber + (itemSet.weight * itemSet.item.macroNutrients.fiber) / 100,
                fat: macros.fat + (itemSet.weight * itemSet.item.macroNutrients.fat) / 100
            }
        });
        return macros;
    });

    const Grid = styled.View`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap:4px;
    `;
    const Row = styled.View`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    `;

    const Text = styled.Text`
        font-weight: ${fonts.bold};
        font-size: 16px;
        color:${color.secondary};
        max-width: 48%;
    `;
    
    return (
        <Grid>
            <Text style={{ fontSize: 20, marginBottom: 8,maxWidth:"100%" }}>Calorias {values.kcal}Kcal</Text>
            <Row>
                <Text>Carboidratos: {values.carbohidrates}g</Text>
                <Text>Proteínas: {values.protein}g</Text>
            </Row>

            <Row>
                <Text>Fibras: {values.fiber}g</Text>
                <Text>Gordura: {values.fat}g</Text>
            </Row>
        </Grid>
    )
}
