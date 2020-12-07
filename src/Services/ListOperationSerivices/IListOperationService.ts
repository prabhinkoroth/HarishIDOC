import { IField } from "@pnp/sp/fields";
import { IFileAddResult } from "@pnp/sp/files";
import { IItemAddResult, IItemUpdateResult } from "@pnp/sp/items";

export interface IListOperationService{
    AddItemsToList:(listName:string,item:any)=>Promise<IItemAddResult>;
    UpdateItemInList:(listName:string,itemId:number,item:any)=>Promise<IItemUpdateResult>;
    DeleteItemFromList:(listName:string,itemId:number)=>Promise<void>;
    GetItemsFromList:(listName:string,filter:string,select:string[],expand:string[],orderBy:string,asynding:boolean)=>Promise<any>;
    GetAllItemsFromList:(listName:string,filter:string,select:string[],expand:string[])=>Promise<any>;
    GetListField:(listName:string,fieldName:string)=>Promise<IField>;
    AddItemsToDocumentLibrary(documentLibraryServerRelativeUrl: string, fileName: string, content: any,properties:any): Promise<IFileAddResult> ;
}