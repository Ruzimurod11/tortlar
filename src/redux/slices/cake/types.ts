export type Cake = {
   id: string;
   title: string;
   price: number[];
   imageUrl: string;
   sizes: number[];
   types: number[];
   rating: number;
};

export enum Status {
   LOADING = "loading",
   SUCCESS = "success",
   ERROR = "error",
}

export interface CakeSliceState {
   items: Cake[];
   status: Status;
}

export type SearchCakeParams = {
   sortBy: string;
   order: string;
   category: string;
   search: string;
   currentPage: string;
};
