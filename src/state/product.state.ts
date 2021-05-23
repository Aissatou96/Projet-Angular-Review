export enum DataStateEnum{
  LOADING,
  LOADED,
  ERROR
}
//<T> veut dire type générique
export interface AppDataState <T>{
  dataState?: DataStateEnum,
  data?:T,
  errorMessage?: string

}
