import { IDocumentFormValues } from "../../../../Models/IDocumentFormValues";
import { IProcess } from "../../../../Models/IProcess";

export interface IFormStats{
    values:IDocumentFormValues;
    durationOfArchivingMinDate:Date;
}