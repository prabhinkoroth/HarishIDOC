import {IListOperationService} from "../../../Services/ListOperationSerivices/IListOperationService";
import {ListOperationService} from "../../../Services/ListOperationSerivices/ListOperationService";
import { ListNames } from "./Constants/ListNames";
import { IDocuemntSystem } from "./IDocumentSystem";
export class DocumentSystem implements IDocuemntSystem{
    private _listService:IListOperationService=null;
    
    constructor() {
       this._listService=new ListOperationService();
        
    }
    public async  GetAllMasterData():Promise<void>{
        await this._listService.GetItemsFromList(ListNames.Process,"",[],[],"",true);
    }
}