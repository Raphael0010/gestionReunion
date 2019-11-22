import { ICollabo } from "./ICollabo";
import { IProjet } from "./IProjet";

export interface IReunion {
  id: number;
  date: number;
  projet: IProjet;
  lieu: string;
  objectif: string;
  compteRendu: string;
  participant: ICollabo[];
  createur: ICollabo;
}
