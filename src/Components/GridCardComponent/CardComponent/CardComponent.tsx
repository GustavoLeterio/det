import React from "react";
import { ThemeModel } from "../../../Store/Slices/Themes/IThemes";
import { Dispatcher } from "../../../Store/types";
import { Nutrients } from "../../../Utils/Nutrients.enum";

interface Props { theme: ThemeModel, nutrient: Nutrients, icon: string, dispatcher: Dispatcher, value: Nutrients }
class CardComponent extends React.Component<Props, {}> {

}
export default CardComponent; 
