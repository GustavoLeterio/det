import { ThemeModel } from "../../Store/Slices/Themes/IThemes";
import { Item, Nutrients } from "../../Store/Slices/Home/IHome";
import { Dispatcher } from "../../Store/types";
import styled from "styled-components/native";
import { Icon, Text } from "@rneui/themed";
import React from "react";
import { FlatList, View } from "react-native";
import { mockup } from "./mockup";

interface Props { theme: ThemeModel, nutrient: Nutrients, dispatcher: Dispatcher, items: Item[], navigation?: any }
interface State { items: Item[] }
class GridCardComponent extends React.Component<Props, State> {
    state = { items: this.props.items };

    getList(): Item[] {
        if (this.props.nutrient == Nutrients.protein) return mockup.protein;
        if (this.props.nutrient == Nutrients.carbohidrate) return mockup.carbohidrate;
        if (this.props.nutrient == Nutrients.fiber) return mockup.fiber;
        if (this.props.nutrient == Nutrients.fat) return mockup.fat;
        return [];
    }

    indexOfItem(item: Item): number {
        return this.state.items.map(i => i.id).indexOf(item.id);
    }

    isItemPresent(item: Item): boolean {
        return this.state.items.filter(i => i.id === item.id).length > 0;
    }

    toggleItemOnList(item: Item) {
        let items: Item[] = [...this.state.items];
        this.isItemPresent(item) ? items.splice(this.indexOfItem(item), 1) : items.push(item);
        this.setState({ items });
    }


    navigateAndSave() {
        const { dispatch, actionWithPayload } = this.props.dispatcher;
        if (actionWithPayload && !Array.isArray(actionWithPayload)) {
            dispatch(actionWithPayload(this.state.items));
            this.props.navigation.navigate("Home")
        }
        else
            alert("ERROR: 'ActionWithPayload' NOT INFORMED")
    }

    render() {
        const { color } = this.props.theme;

        const Card = styled.View`
            display: flex;
            width: 48%;
            margin:5% 1%;
            gap:-8px;
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
            border-radius:100px;
            right: 8px;
            bottom: 8px;    
        `;

        return (
            <FlatList data={this.getList()} keyExtractor={item => item.id.toString()} numColumns={2} renderItem={
                ({ item }) => {
                    return (
                        <Card>
                            <Image source={item.image} />
                            <View>
                                <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                                <Text style={{ color: color.primary, fontWeight: "bold" }}>{String(item.price).replace(".", ",")}R$</Text>
                                <Text style={{ width: 100, fontSize: 12 }}>Por {item.weightPerGrams}g</Text>
                            </View>

                            <IconView onPress={() => this.toggleItemOnList(item)} style={{ backgroundColor: this.isItemPresent(item) ? color.primary : "transparent" }}>
                                <Icon name={this.isItemPresent(item) ? "check" : "plus"} type='font-awesome-5' size={18} color={this.isItemPresent(item) ? color.white : color.black}></Icon>
                            </IconView>
                        </Card>)
                }
            } />
            // <Grid>
            //     {this.getList().map((item: Item) => {
            //         return (
            //             <Card>
            //                 <Image source={item.image} />
            //                 <Content>
            //                     <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
            //                     <Text style={{ color: color.primary, fontWeight: "bold" }}>{String(item.price).replace(".", ",")}R$</Text>
            //                     <Text>A cada {item.weightPerGrams}g</Text>
            //                 </Content>
            //             </Card>
            //         )
            //     })}
            // </Grid>
        );
    }
}
export default GridCardComponent; 
