import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IAreaOfValidity } from "../../../../Models/IAreaOfValidity";
import { IBusinessLine } from "../../../../Models/IBusinessLine";
import { IDocumentType } from "../../../../Models/IDocumentType";
import { IISOStandard } from "../../../../Models/IISOStandard";
import { IProcess } from "../../../../Models/IProcess";
import { IRevisionInterval } from "../../../../Models/IRevisionInterval";
import { IISOStandardElementChapter } from "../../../../Models/ISOStandardElementChapter";

export interface IFormProps{
    context:WebPartContext;
    Processes:IProcess[];
    DocumentTypes:IDocumentType[];
    AreaOfValidities:IAreaOfValidity[];
    ISOStandards:IISOStandard[];
    ISOStandardElementChapters:IISOStandardElementChapter[];
    BusinessLines:IBusinessLine[];
    RevisionIntervals:IRevisionInterval[];
    
    
    Regions:string[];
    Plants:string[];
    Departments:string[];
    RefreshForm:boolean;
    generateDocumentNumberPart(): Promise<number>;
}