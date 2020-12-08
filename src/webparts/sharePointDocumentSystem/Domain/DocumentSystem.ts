import { IDocumentType } from "../../../Models/IDocumentType";
import { IProcess } from "../../../Models/IProcess";
import { IListOperationService } from "../../../Services/ListOperationSerivices/IListOperationService";
import { ListOperationService } from "../../../Services/ListOperationSerivices/ListOperationService";
import { IDOCSProcessesFieldNames, IDOCSDocumentTypeFieldNames } from "./Constants/FieldNames";
import { ListNames } from "./Constants/ListNames";
import { IDocumentSystem } from "./IDocumentSystem";
export class DocumentSystem implements IDocumentSystem {
    private _listService: IListOperationService = null;
    public Processes: IProcess[] = [];
    public DocumentTypes: IDocumentType[] = [];
    public ISOStandardItems:string[]=["ISO 9001", "ISO 14001", "ISO 50001", "ISO 45001"];
    constructor() {

        this._listService = new ListOperationService();

    }
    public async GetAllMasterData(): Promise<void> {
        debugger;
        this.Processes = await this._listService.GetItemsFromList(ListNames.Process, "", [IDOCSProcessesFieldNames.Id, IDOCSProcessesFieldNames.ProcessName], [], "", true);
        this.DocumentTypes = await this._listService.GetItemsFromList(ListNames.DocumentTypes, "", [IDOCSDocumentTypeFieldNames.Id, IDOCSDocumentTypeFieldNames.DocumentType], [], "", true);
    }
}