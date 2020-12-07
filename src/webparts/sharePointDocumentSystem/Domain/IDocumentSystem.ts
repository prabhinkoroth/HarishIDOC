import { IDocumentType } from "../../../Models/IDocumentType";
import { IProcess } from "../../../Models/IProcess";

export interface IDocumentSystem{
      GetAllMasterData():void;
      Processes:IProcess[];
      DocumentTypes: IDocumentType[] ;
}