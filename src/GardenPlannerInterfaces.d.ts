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

export interface PlantsType {
  id: number;
  plantName: string;
  bloomTime: DateSelectionObj;
  fruitTime: DateSelectionObj;
  bloomColor: string;
  bloomColorName: string;
  wildlifeAttracted: { [key: number]: boolean };
}
