import { Icon, Text } from '@rneui/themed'
import React, { useState } from 'react'
import styled from 'styled-components/native'
import { ThemeModel } from '../../Store/Slices/Themes/IThemes';
import { TouchableHighlight, View } from 'react-native';
import InputComponent from '../InputComponent/InputComponent';
import { Nutrients } from '../../Store/Slices/Home/IHome';
import { ItemAndWeight } from '../../Store/Slices/Order/IOrder';
import { useDispatch } from 'react-redux';
import { changeNutrient } from '../../Store/Slices/Home/actions';
import { changeItemWeight, changeListOfItems, toggleAccordion } from '../../Store/Slices/Order/actions';
import { useAppSelector } from '../../Store/hooks/useAppSelector';


interface Props { items: ItemAndWeight[], theme: ThemeModel, nutrient: Nutrients, navigation: any }
export default function AccordionComponent(props: Props) {
    //@ts-ignore
    var isOpen = useAppSelector(store => store.order.openedAccordion)[Object.keys(Nutrients)[Object.values(Nutrients).indexOf(props.nutrient)]]
    const dispatch = useDispatch();
    const [orders, setOrders] = useState<ItemAndWeight[]>(props.items.filter(set => set.item.nutrient == props.nutrient));
    const { color, fonts } = props.theme;
    var title: string = "";
    if (Nutrients.carbohidrate == props.nutrient)
        title = "Carboidratos"
    if (Nutrients.fat == props.nutrient)
        title = "Gordura"
    if (Nutrients.fiber == props.nutrient)
        title = "Fibra"
    if (Nutrients.protein == props.nutrient)
        title = "Proteína"

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
    `

    const ItemView = styled.View`
        display: flex;
        width: 100%;
    `

    const Row = styled.View`
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        width: 100%;
        padding:10px;
        padding-top: 4px;
    `

    const SpecBlock = styled.View`
        gap:6px;
    `

    const Specifications = styled.View`
        display: flex;
        flex-direction: row;
        align-items: center;
    `



    return (
        <Accordion>
            <TouchableHighlight onPress={() => {
                if (orders.length > 0) {
                    dispatch(toggleAccordion(props.nutrient));
                    return;
                }
                dispatch(changeNutrient(props.nutrient));
                props.navigation.navigate("Home")
            }}>
                <AccordionHeader>
                    <Title>{title}</Title>
                    <Icon name={orders.length > 0 ? isOpen ? "chevron-up" : "chevron-down" : "plus"} type='font-awesome-5' size={18} color={color.white}></Icon>
                </AccordionHeader>
            </TouchableHighlight>
            {isOpen ?
                <AccordionContent>
                    {orders.map((set, i) =>
                        <ItemView key={i}>
                            <Row>
                                <InputComponent type="number-pad" style={{ width: 40, vPadding: 4 }} theme={props.theme} label="Carne Grelhada" name={props.nutrient} placeholder="Peso" dispatcher={{ dispatch, actionWithPayload: changeItemWeight }} value={`${set.weight}`} id={set.item.id} />
                                <SpecBlock>
                                    <Specifications>
                                        <Text style={{ color: color.fontGray}}> {set.item.price}R$ por 100g</Text>
                                    </Specifications>
                                    <Specifications style={{justifyContent:'space-between',paddingTop:6}}>
                                        <Text style={{ color: color.primary,fontWeight:"800",fontSize:18 }}>{(+set.item.price*(set.weight/100)).toFixed(2)} R$</Text>
                                        <Icon name={"backspace"} type='font-awesome-5' size={24} color={color.black} onPress={() => { removeItemFromList(set) }}></Icon>
                                    </Specifications>
                                </SpecBlock>
                            </Row>
                        </ItemView>)
                    }
                </AccordionContent> : ""}
        </Accordion >
    )
}
