export type Country = {
  name: string;
  topLevelDomain: [string];
  alpha3Code: string;
  capital: string;
  subregion: string;
  region: string;
  population: number;
  borders?: [string];
  nativeName: string;
  flags: {
    svg: string;
    png: string;
  };
  currencies: {
    name: string;
  };
  languages: [
    {
      name: string;
    }
  ];
};
