import { IDocumentType } from "../../../Models/IDocumentType";
import { IProcess } from "../../../Models/IProcess";

export interface IDocumentSystem{
      GetAllMasterData():void;
      Processes:IProcess[];
      DocumentTypes: IDocumentType[] ;
      ISOStandardItems:string[];
      ISOStandardElementsItems:string[];
      BusinessOptionsItems:string[];
      Regions:string[];
      Plants:string[];
      Departments:string[];
      RevisionIntervals:string[];
      GenerateDocumentNumberPart(): Promise<number>;



}