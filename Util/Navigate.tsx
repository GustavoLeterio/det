import { useAppSelector } from "../src/Store/hooks/useAppSelector";

export default function navigate(navigation: any, route: string) {
  const token = useAppSelector((store) => store.login.token);
  if (token) navigation.navigate(route);
  else navigation.navigate("Login");
  return <></>;
}
