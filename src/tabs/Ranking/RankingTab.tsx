import styled from "styled-components/native";
import { NavbarComponent } from "../../Components/NavbarComponent/NavbarComponent";
import HeadingComponent from "../../Components/HeadingComponent/HeadingComponent";
import { FlatList, View } from "react-native";
import { useAppSelector } from "../../Store/hooks/useAppSelector";
import { Text } from "@rneui/base";
import FilterComponent from "../../Components/FilterComponent/FilterComponent";
import { Entregador, entregadores as data } from "../../Mocks/entregadores";
import { useState } from "react";

export const RankingTab = ({ navigation, route }: any) => {
  const theme = useAppSelector((store) => store.theme);

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const [month, setMonth] = useState(months[new Date().getMonth()]);

  function renderItem({ item }: { item: Entregador }) {
    const Row = styled.View`
      display: flex;
      flex-direction: row;
    `;
    const Text = styled.Text`
      width: 25%;
    `;

    return (
      <>
        <Row>
          <Text style={{ width: "50%" }}>{item.name}</Text>
          <Text style={{ textAlign: "center" }}>{item.averageTime}</Text>
          <Text style={{ textAlign: "center" }}>{item.rank}#</Text>
        </Row>
      </>
    );
  }

  function separator() {
    const Line = styled.View`
      height: 1px;
      margin-bottom: 4px;
      width: 100%;
      background-color: ${theme.color.lightGray};
      margin: 3px 0;
    `;

    return <Line />;
  }

  const Container = styled.View`
    position: relative;
    display: flex;
    padding: 48px 32px 8px 32px;
    height: 90%;
    background-color: ${theme.color.white};
    gap: 12px;
    width: 100%;
  `;

  const List = styled.View`
    z-index: 0;
    max-height: 82%;
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 4px;
    background-color: ${theme.color.white};
    elevation: 4;
    border-radius: 6px;
  `;

  const ListRow = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
  `;

  const ListText = styled.Text`
    width: 100%;
    font-size: 12px;
    color: ${theme.color.fontColor};
    text-align: center;
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
            zIndex: 1,
          }}
        >
          <FilterComponent
            itemState={[month, setMonth]}
            items={months}
          />
        </View>
        <List style={{ zIndex: 0 }}>
          <ListRow>
            <ListText
              style={{
                width: "50%",
                color: theme.color.fontGray,
                fontWeight: "700",
              }}
            >
              Nome
            </ListText>
            <ListText
              style={{
                width: "25%",
                color: theme.color.fontGray,
                fontWeight: "700",
              }}
            >
              Tempo
            </ListText>
            <ListText
              style={{
                width: "25%",
                color: theme.color.fontGray,
                fontWeight: "700",
              }}
            >
              Ranking
            </ListText>
          </ListRow>
          <FlatList
            data={data.filter((item)=>item.month == month)}
            ItemSeparatorComponent={separator}
            renderItem={renderItem}
          />
        </List>
      </Container>
      <NavbarComponent theme={theme} navigation={navigation} route={route} />
    </>
  );
};
