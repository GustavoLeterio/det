import styled from "styled-components/native";
import { useAppDispatch } from "../../Store/hooks/useAppDispatch";
import { useAppSelector } from "../../Store/hooks/useAppSelector";
import { NavbarComponent } from "../../Components/NavbarComponent/NavbarComponent";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import PlateAndCupComponent from "../../Components/PlateAndCupComponent/PlateAndCupComponent";
import { changeNutrient } from "../../Store/Slices/Home/actions";

export const PlateTab = ({ navigation }: any) => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((store) => store.theme);
    const { nutrient, items } = useAppSelector((store) => store.home);

    const Container = styled.View`
        position: relative;
        display: flex;
        padding: 48px 32px 8px 32px;
        height: 90%;
        background-color: ${theme.color.white};
        gap:12px;
    `;

    return (
        <>
            <Container>
                <HeadingComponent theme={theme} title="Escolha as Quantidades!" subtitle="Revise seu prato, e adicione uma bebida" />
                <PlateAndCupComponent theme={theme} items={items} nutrient={nutrient} dispatcher={{ dispatch, actionWithPayload:changeNutrient }} />
            </Container>
            <NavbarComponent theme={theme} navigation={navigation} />
        </>
    );
};
