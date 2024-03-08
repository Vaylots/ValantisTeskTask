export interface getIdsInterface {
  offset?: number | undefined;
  limits?: number;
}
export interface getIdsResponseInterface {
  result: string[];
}
export interface getItemsInterface {
  ids: string[];
}

export interface getItemsResponseInterface {
  result: [
    {
      brand: string | null;
      id: string;
      price: number;
      product: string;
    }
  ];
}

export interface getFilteredIdsInterface {
  brand?: string;
  product?: string;
  price?: number;
}
