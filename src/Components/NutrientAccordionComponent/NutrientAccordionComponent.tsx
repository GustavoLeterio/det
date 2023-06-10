import { Icon, Text } from '@rneui/themed'
import React, { useState } from 'react'
import styled from 'styled-components/native'
import { ThemeModel } from '../../Store/Slices/Themes/IThemes';
import { TouchableHighlight, View } from 'react-native';
import InputComponent from '../InputComponent/InputComponent';
import { ItemAndWeight } from '../../Store/Slices/Order/IOrder';
import { useDispatch } from 'react-redux';
import { changeNutrient } from '../../Store/Slices/Home/actions';
import { changeItemWeight, changeListOfItems } from '../../Store/Slices/Order/actions';
import { useAppSelector } from '../../Store/hooks/useAppSelector';
import { Nutrients } from '../../Utils/Nutrients.enum';
import { toggleAccordion } from '../../Store/Slices/Accordion/actions';

interface Props { items: ItemAndWeight[], theme: ThemeModel, nutrient: Nutrients, navigation: any }
export default function NutrientAccordionComponent(props: Props) {
    //@ts-ignore
    var isOpen = useAppSelector(store => store.accordion)[Object.keys(Nutrients)[Object.values(Nutrients).indexOf(props.nutrient)]]
    const dispatch = useDispatch();
    const [items, setOrders] = useState<ItemAndWeight[]>(props.items.filter(set => set.item.nutrient == props.nutrient));
    const { color, fonts } = props.theme;

    function removeItemFromList(set: ItemAndWeight) {
        const items = [...props.items];
        items.splice(props.items.map(set => set.item.id).indexOf(set.item.id), 1);
        if (items.length == 0) props.navigation.navigate("Home");
        dispatch(changeListOfItems(items));
    }

    const Accordion = styled.View`
        width: 100%;
    `
    const AccordionHeader = styled.View`
        background-color: ${color.fontColor};
        border: 1px solid ${color.fontColor};
        padding: 3px 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    `
    const Title = styled.Text`
        font-size: 16px;
        color: ${color.white};
        font-weight: ${fonts.medium};
    `

    const AccordionContent = styled.View`
        border: 1px solid ${color.lightGray};
        gap:24px;
        display: flex;
        padding:10px;
    `

    const SpecBlock = styled.View`
        width: 100%;

    `

    const Specifications = styled.View`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        max-width: 100%;
    `

    return (
        <Accordion>
            <TouchableHighlight onPress={() => {
                if (items.length > 0) {
                    dispatch(toggleAccordion(props.nutrient));
                    return;
                }
                dispatch(changeNutrient(props.nutrient));
                props.navigation.navigate("Home")
            }}>
                <AccordionHeader>
                    <Title>{props.nutrient}</Title>
                    <Icon name={items.length > 0 ? isOpen ? "chevron-up" : "chevron-down" : "plus"} type='font-awesome-5' size={18} color={color.white}></Icon>
                </AccordionHeader>
            </TouchableHighlight>
            {isOpen ? items.map((set, i) =>
                <AccordionContent key={i}>
                    <SpecBlock>
                        <Specifications>
                            <Text style={{
                                color: color.fontGray,
                                fontWeight: "700",
                                fontSize: 14,
                                maxWidth: "50%",
                            }}>{set.item.name}</Text>
                            <Text style={{ color: color.fontGray, maxWidth: "50%" }}>{set.item.price}R$ por 100g</Text>
                        </Specifications>
                        <Specifications style={{ justifyContent: 'space-between', paddingTop: 6 }}>
                            <InputComponent type="numeric" style={{ width: 40, vPadding: 4 }} theme={props.theme} name={props.nutrient} placeholder="Peso" dispatcher={{ dispatch, actionWithPayload: changeItemWeight }} value={`${set.weight}`} id={set.item.id} />
                            <View style={{ display: "flex", flexDirection: 'row', gap: 12, alignItems: 'center', }}>
                                <Text style={{ color: color.primary, fontWeight: "800", fontSize: 18 }}>{(+set.item.price * (set.weight / 100)).toFixed(2)} R$</Text>
                                <Icon name={"backspace"} type='font-awesome-5' size={24} color={color.black} onPress={() => { removeItemFromList(set) }}></Icon>
                            </View>
                        </Specifications>
                    </SpecBlock>
                </AccordionContent>
            ) : null}
        </Accordion>
    )
}
