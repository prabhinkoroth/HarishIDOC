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
    public ISOStandardItems: string[] = ["ISO 9001", "ISO 14001", "ISO 50001", "ISO 45001"];
    public BusinessOptionsItems:string[]=["Rubber","Specialty"];
    public ISOStandardElementsItems:string[]=["DIN EN ISO 9001","DIN EN ISO 14001","DIN EN ISO 50001","DIN ISO 45001"];
    public Regions: string[] = ["EMEA", "Americas", "APAC"];
    public Departments: string[] = ["Sales","Marketing","Finance"];
    public RevisionIntervals: string[] = ["1 Month","2 Months","3 Months","4 Months" ,"5 Months"];
    public Plants: string[] = ["FRA"	,"KAL", "Inno",	"KAL", "Plant",	"BER",	"JAS",	"MAL"	,"RAV"	,"PLZ",	"BEL",	"BOR",	"IVA",	"ORA",	"PAA",	"QIN",	"YOS(Singapore)"];
    constructor() {

        this._listService = new ListOperationService();

    }
    public async GetAllMasterData(): Promise<void> {
        debugger;
        this.Processes = await this._listService.GetItemsFromList(ListNames.Process, "", [IDOCSProcessesFieldNames.Id, IDOCSProcessesFieldNames.ProcessName], [], "", true);
        this.DocumentTypes = await this._listService.GetItemsFromList(ListNames.DocumentTypes, "", [IDOCSDocumentTypeFieldNames.Id, IDOCSDocumentTypeFieldNames.DocumentType], [], "", true);
    }
    public async GenerateDocumentNumberPart(): Promise<number> {
        debugger;
        let documentNumberItemFromConfigurationList = await this.GetConfigurationListItem('DocumentNumber');
        let documentNumber = parseInt(documentNumberItemFromConfigurationList[0]["Value"]);
        documentNumber++;
        await this.UpdateConfigurationListItem(documentNumberItemFromConfigurationList[0]["Id"], documentNumber + "");
        return documentNumber;
    }
    
    public async GetConfigurationListItem(key: string): Promise<any> {
        return await this._listService.GetAllItemsFromList(ListNames.Configuration, `Title eq '${key}'`, ['Id', 'Title', 'Value'], []);

    }

    public async UpdateConfigurationListItem(itemId: number, value: string): Promise<void> {
        await this._listService.UpdateItemInList(ListNames.Configuration, itemId, { 'Value': value });
    }
}