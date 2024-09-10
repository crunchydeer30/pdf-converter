export interface Theme {
  color: string;
  logo: string;
  data: ThemeData;
}

interface ThemeData {
  title: string;
  subheader: string;
  howTo: {
    title: string;
    steps: {
      1: string;
      2: string;
      3: string;
    };
  };
}
