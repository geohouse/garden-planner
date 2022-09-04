export interface BloomTime {
  monthNumAsStringArray: string[];
  monthNameArray: string[];
}

// interfaces are only used for object types. `type` can be used to alias the type
// for other features e.g. functions.
//type BloomColorChange = (hexColor: string, colorName: string) => void;

// This accommodates the keys being 1-12 (or any number) without any hardcoding.
// Could make more specific to only allow 1-12 and that would also be OK.
export interface DateSelectionObj {
  [key: number]: string;
}

export interface BloomFruitTimeObj {
  monthNumAsStringArray: string[];
  monthNameArray: string[];
}

// Not currently used and has some problems in trying to generalize the wildlife updates
// export interface OnWildlifeChangeObj {
//   // this function call signature definition is needed
//   (
//     event: React.ChangeEvent<HTMLInputElement>,
//     stateUpdateFxn: (
//       value: React.SetStateAction<{ [key: string]: boolean }>
//     ) => void,
//     currState: { [key: string]: boolean }
//   ): void;
// }

export interface PlantsType {
  id: number;
  plantName: string;
  bloomTime: BloomFruitTimeObj;
  fruitTime: BloomFruitTimeObj;
  bloomColor: string;
  bloomColorName: string;
  wildlifeAttractedBloom: { [key: number]: boolean };
  wildlifeAttractedFruit: { [key: number]: boolean };
  wildlifeAttractedOther: { [key: number]: boolean };
}
