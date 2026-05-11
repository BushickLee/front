import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  AlertDetail: {
    eventId: string;
  };
};

export type MainTabParamList = {
  Home: undefined;
  History: undefined;
  Settings: undefined;
};
