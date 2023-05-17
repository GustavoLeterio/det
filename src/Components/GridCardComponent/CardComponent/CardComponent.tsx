import React from "react";
import { ThemeModel } from "../../../Store/Slices/Themes/IThemes";
import { Nutrients } from "../../../Store/Slices/Home/IHome";
import { Dispatcher } from "../../../Store/types";

interface Props { theme: ThemeModel, nutrient: Nutrients, icon: string, dispatcher: Dispatcher, value: Nutrients }
class CardComponent extends React.Component<Props, {}> {

}
export default CardComponent; 
