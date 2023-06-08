import styled from "styled-components/native";
import { NavbarComponent } from "../../Components/NavbarComponent/NavbarComponent";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import PlateAndCupComponent from "../../Components/PlateAndCupComponent/PlateAndCupComponent";
import { ScrollView, View } from "react-native";
import MacroNutrientsComponent from "../../Components/MacroNutrientsComponent/MacroNutrientsComponent";
import NutrientAccordionComponent from "../../Components/NutrientAccordionComponent/NutrientAccordionComponent";
import { Nutrients } from "../../Utils/Nutrients.enum";
import { useAppSelector } from "../../Store/hooks/useAppSelector";
import { Text } from "@rneui/base";

export const RankingTab = ({ navigation, route }: any) => {
  const theme = useAppSelector((store) => store.theme);
  const Container = styled.View`
    position: relative;
    display: flex;
    padding: 48px 32px 8px 32px;
    height: 90%;
    background-color: ${theme.color.white};
    gap: 12px;
  `;

  const TextRow = styled.View`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `;

  const Error = styled.Text`
    color: ${theme.color.error};
    font-size: 12px;
    font-weight: bold;
  `;

  const Price = styled.Text`
    color: ${theme.color.primary};
    font-size: 18px;
    font-weight: bold;
  `;

  const StyledButton = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px;
    border-radius: 5px;
    width: 100%;
  `;

  const ButtonText = styled.Text`
    color: ${theme.color.white};
    font-size: 24px;
    font-weight: bold;
  `;

  return (
    <>
      <Container>
        <HeadingComponent
          theme={theme}
          title="Ranking de Entregadores"
          subtitle="Colocação dos mais rápidos!"
        />
        <View
          style={{
            display: "flex",
            alignItems: "flex-end",
            width: "100%",
            backgroundColor: "red",
          }}
        >
          <Text>asdsd</Text>
        </View>
      </Container>
      <NavbarComponent theme={theme} navigation={navigation} route={route} />
    </>
  );
};
