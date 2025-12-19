import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CoffeeItem } from '../components/CoffeeCard';

export type RootStackParamList = {
  Welcome: undefined;
  Main: undefined;
  CoffeeDetails: { item: CoffeeItem };
  Login: undefined;
  Signup: undefined;
};

// Optional: a reusable type for screens
export type RootStackNavProp<Screen extends keyof RootStackParamList> =
  NativeStackNavigationProp<RootStackParamList, Screen>;
