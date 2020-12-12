import * as React from "react";
import { IFormProps } from "./IFormProps";
import { IFormStats } from "./IFormStats";
import { Stack, IStackTokens, IStackItemStyles } from "office-ui-fabric-react/lib/Stack";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { DefaultPalette } from "office-ui-fabric-react/lib/Styling";
import styles from "../SharePointDocumentSystem.module.scss";
import { Dropdown } from "office-ui-fabric-react/lib/components/Dropdown/Dropdown";
import { Toggle } from "office-ui-fabric-react/lib/components/Toggle/Toggle";
import { DatePicker } from "office-ui-fabric-react/lib/components/DatePicker/DatePicker";
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { IDropdownOption, IDropdownProps } from "office-ui-fabric-react/lib/components/Dropdown/Dropdown.types";
import IFabricConversionService from "../../../../Services/ObjectConversionServices/IFabricConversionService";
import FabricConversionService from "../../../../Services/ObjectConversionServices/FabricConversionService";
import { Separator } from "office-ui-fabric-react/lib/components/Separator/Separator";
import { autobind, Icon, PrimaryButton } from "office-ui-fabric-react";
import * as moment from "moment";
import * as strings from "SharePointDocumentSystemWebPartStrings";
export default class Form extends React.Component<IFormProps, IFormStats>{

    private _processOptions: IDropdownOption[] = [];
    private _documentTypeOptions: IDropdownOption[] = [];
    private _areaOfValidityOptions: IDropdownOption[] = [];
    private _iSOStandardOptions: IDropdownOption[] = [];
    private _iSOStandardElementChapterOptions: IDropdownOption[] = [];
    private _Plants: IDropdownOption[] = [];
    private _Regions:IDropdownOption[]=[];
    private _Departments: IDropdownOption[] = [];
    private _businessLineOptions: IDropdownOption[] = [];
    private _revisionIntervalOptions: IDropdownOption[] = [];
    private _fabricConversionService: IFabricConversionService;
    private _durationOfArchivingMinDate:Date=null;
    constructor(props: IFormProps) {
        super(props);
        this.state={ durationOfArchivingMinDate:new Date(), values:{heritageNumber:"00",versionNumber:"00", documentNumber:"",departmentName:"", departmentId:"", documentNumberNumberPart:"", documentTitle:"",documentTypeName:"",documentTypeId:"",process:0,region:0}};
        this._fabricConversionService = new FabricConversionService();
        // this._durationOfArchivingMinDate=moment(new Date()).add('years', 10).toDate();
    }
    public componentDidMount(): void {
        debugger;

    }
    public shouldComponentUpdate(newProps: IFormProps): boolean {
        return newProps.RefreshForm;
    }
    @autobind
    public dateOfArchivingChanged(date:Date){
        debugger;
        let durationOfArchiving=moment(date).add('years', 10).toDate();
        this.setState({durationOfArchivingMinDate:durationOfArchiving});
      
    }
    
    public generateDocumentNumber(documentNumberNumberPart:string="",documentTypePart:string="",departmentPart:string=""):string{
      if(documentNumberNumberPart==""){
           documentNumberNumberPart=this.state.values.documentNumberNumberPart;
      }
      if(documentTypePart==""){
          
       documentTypePart=this.state.values.documentTypeName;
      }
      let   typeParts:string[]= documentTypePart.split(' ').map((item)=>{
        return item[0];
    });
    documentTypePart=typeParts.join('');
      if(departmentPart==""){
        departmentPart=this.state.values.departmentName;
      }
      while(documentNumberNumberPart.length<5){
        documentNumberNumberPart="0"+documentNumberNumberPart;
      }
     
      return `${documentTypePart}-${departmentPart}-${documentNumberNumberPart}-00`
     
    }
    @autobind
    public async generateDocumentNumberButtonClicked(){
        // let documentNumberNumberPart:string=String(Math.floor(Math.random() * 10000) );
        if(this.state.values.documentNumberNumberPart==""){
            let documentNumberNumberPart=await this.props.generateDocumentNumberPart();
            let documentNuber:string=  this.generateDocumentNumber(documentNumberNumberPart+"");
              this.setState({
                  values:{...this.state.values,...{documentNumber:documentNuber,documentNumberNumberPart:documentNumberNumberPart+""}}
              });
        }
        

    }
    @autobind 
    public dropdownChangedEventHandler(event:React.FormEvent<HTMLInputElement>,option:IDropdownOption,index:number):void{
        debugger;
        let newValueState={...this.state.values};
            switch(event.target["id"]){
                
                case "ddlDocumentType":
                    newValueState.documentTypeId=option.key.toString();
                    newValueState.documentTypeName=option.text.toString();
                    newValueState.documentNumber=this.generateDocumentNumber("",newValueState.documentTypeName);
                    break;
                    case "ddlDepartment":
                        newValueState.departmentId=option.key.toString();
                        newValueState.departmentName=option.text.toString();
                        newValueState.documentNumber=this.generateDocumentNumber("","",newValueState.departmentName);
                        break;
            }
            this.setState({values:newValueState});
        
        
    }
    public render(): React.ReactElement<IFormProps> {
        debugger;
        this._processOptions = this._fabricConversionService.convertToDropdownOptions(this.props.Processes, "Id", "ProcessName");
        this._documentTypeOptions = this._fabricConversionService.convertToDropdownOptions(this.props.DocumentTypes, "Id", "DocumentType");
        this._iSOStandardOptions = this._fabricConversionService.convertToDropdownOptions(this.props.ISOStandards, "", "");
        this._Plants = this._fabricConversionService.convertToDropdownOptions(this.props.Plants, "", "");
        this._Departments = this._fabricConversionService.convertToDropdownOptions(this.props.Departments, "", "");
       this._Regions=this._fabricConversionService.convertToDropdownOptions(this.props.Regions,"","");
       this._revisionIntervalOptions=this._fabricConversionService.convertToDropdownOptions(this.props.RevisionIntervals,"","");
        // this.props.Processes.map((item): IDropdownOption => {
        //     return {
        //         key: item.Id,
        //         text: item.ProcessName
        //     };
        // }); 
        return (
            <div className={styles.sharePointDocumentSystem}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <TextField value={this.state.values.documentTitle} required label={strings.FormLabelDocumentTitle} id="txtDocumentTitle" name="txtDocumentTitle"></TextField>
                        </div>
                        <div className={styles.column}>
                            <TextField value={this.state.values.documentNumber} required label={strings.FormLabelDocumentNumber} id="txtDocumentNumber" disabled name="txtDocumentNumber"></TextField>
                            <PrimaryButton text="Generate" onClick={this.generateDocumentNumberButtonClicked}></PrimaryButton>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <Dropdown onChange={this.dropdownChangedEventHandler} id="ddlDocumentType" required options={this._documentTypeOptions} placeholder="Select a Document type" label={strings.FormLabelDocumentType}></Dropdown>

                        </div>
                        <div className={styles.column}>
                            <Dropdown required options={this._processOptions} placeholder="Select a Process" label={strings.FormLabelProcessOptions}></Dropdown>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <Separator alignContent="start">  <Icon iconName="FavoriteStar" color="red" />  Area of validity      </Separator>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <Dropdown options={this._Regions}  required label={strings.FormLabelRegion} id="ddlRegion" ></Dropdown>
                        </div>
                        <div className={styles.column}>
                            <Dropdown options={this._Plants} multiSelect required label={strings.FormLabelPlant} id="ddlPlant" placeholder="Enter Plant"  ></Dropdown>

                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <Dropdown id="ddlDepartment" onChange={this.dropdownChangedEventHandler} options={this._Departments} multiSelect required label={strings.FormLabelDepartment}  ></Dropdown>
                        </div>
                       
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                        <Dropdown required 
                        options={this._iSOStandardOptions} 
                        placeholder="Select an ISO Standard " 
                        label={strings.FormLabelISOStandardOptions}
                                id="ddlISOStandard" >
                                    
                                </Dropdown>
                        </div>
                        <div className={styles.column}>
                        <Dropdown required 
                        options={this._iSOStandardElementChapterOptions} 
                        placeholder="Select an ISO Standard Element / Chapter" 
                        label={strings.FormLabelISOStandardElementChapterOptions}
                                id="ddlISOStandardElementChapter" >
                                    
                                </Dropdown>
                        </div>
                    </div>
                    <div className={styles.row}>
                    <div className={styles.column}>
                            <TextField value={this.state.values.versionNumber}  required label={strings.FormLabelVersionNumber} id="txtVersionNumber" disabled name="txtVersionNumber"></TextField>
                    </div>
                    <div className={styles.column}>
                        <TextField value={this.state.values.heritageNumber} required label={strings.FormLabelHeritageNumber} id="txtHeritageNumber" disabled name="txtHeritageNumber"></TextField>
                         </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <TextField required multiline label={strings.FormLabelKeywords} id="tbxKeywords" name="tbxKeywords"></TextField>
                        </div>
                        <div className={styles.column}>
                            <Dropdown required multiSelect options={this._businessLineOptions} placeholder="Select an Business Line" label={strings.FormLabelBusinessLineOptions}
                                id="ddlBusinessLine" ></Dropdown>
                        </div>
                    </div>
                   
                    <div className={styles.row}>
                        <div className={styles.column}>
                            
                            <DatePicker isRequired placeholder="Select a date..." minDate={this.state.durationOfArchivingMinDate}  label={strings.FormLabelDurationOfArchiving} id="txtDurationOfArchiving" />
                        </div>
                        <div className={styles.column}>
                            <Toggle label={strings.FormLabelEHSRelevant} defaultChecked onText="Yes" offText="No" id="chkbxEHSRelevant" />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <Toggle label={strings.FormLabelReadingConfirmation} defaultChecked onText="Yes" offText="No" id="chkbxReadingConfirmation" />
                        </div>
                        <div className={styles.column}>

                            <PeoplePicker

                                context={this.props.context}
                                titleText={strings.FormLabelBusinessProcessOwner}
                                personSelectionLimit={1}
                                groupName={""} // Leave this blank in case you want to filter from all users
                                showtooltip={true}
                                required={true}
                                onChange={() => { }}
                                showHiddenInUI={false}
                                principalTypes={[PrincipalType.User]}
                                resolveDelay={1000} />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <PeoplePicker
                                context={this.props.context}
                                titleText={strings.FormLabelAuthor}
                                personSelectionLimit={1}
                                groupName={""} // Leave this blank in case you want to filter from all users
                                showtooltip={true}
                                required={true}
                                onChange={() => { }}
                                showHiddenInUI={false}
                                principalTypes={[PrincipalType.User]}
                                resolveDelay={1000} />
                        </div>
                        <div className={styles.column}>


                            <PeoplePicker
                                context={this.props.context}
                                titleText={strings.FormLabelVerifier}
                                personSelectionLimit={1}
                                groupName={""} // Leave this blank in case you want to filter from all users
                                showtooltip={true}
                                required={true}
                                onChange={() => { }}
                                showHiddenInUI={false}
                                principalTypes={[PrincipalType.User]}
                                resolveDelay={1000} />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>

                            <PeoplePicker
                                context={this.props.context}
                                titleText={strings.FormLabelReleaser}
                                personSelectionLimit={1}
                                groupName={""} // Leave this blank in case you want to filter from all users
                                showtooltip={true}
                                required={true}
                                onChange={() => { }}
                                showHiddenInUI={false}
                                principalTypes={[PrincipalType.User]}
                                resolveDelay={1000} />
                        </div>
                        
                        
                        <div className={styles.column}>
                            <TextField required label={strings.FormLabelReminderWorkflowSteps} id="txtReminderWorkflowSteps" name="txtReminderWorkflowSteps" ></TextField>
                        </div>

                       
                    </div>
                    
                    
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <Dropdown required options={this._revisionIntervalOptions} id="ddlRevisionInterval" placeholder="Select an Revision Interval" label={strings.FormLabelRevisionInterval}></Dropdown>
                        </div>
                        <div className={styles.column}>
                            <TextField type="number" min="0" required label={strings.FormLabelReminderRevisionInterval} id="txtReminderRevisionInterval" name="txtReminderRevisionInterval" ></TextField>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <DatePicker isRequired placeholder="Select a date..." label={strings.FormLabelValidFrom} ariaLabel="Valid from" id="txtValidFrom" />
                        </div>
                        <div className={styles.column}>
                            <DatePicker isRequired placeholder="Select a date..." label={strings.FormLabelValidUntil} ariaLabel="Valid until" id="txtValidUntil" />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <TextField required multiline label={strings.FormLabelPrintInformationValidityOnDayOfPrintingOnly} id="txtPrintInformationValidity" name="txtPrintInformationValidity" ></TextField>
                        </div>
                        <div className={styles.column}>

                            <PeoplePicker
                                context={this.props.context}
                                titleText={strings.FormLabelDistributionList}
                                personSelectionLimit={10}
                                groupName={""} // Leave this blank in case you want to filter from all users
                                showtooltip={true}
                                required={true}
                                onChange={() => { }}
                                showHiddenInUI={false}
                                principalTypes={[PrincipalType.User]}
                                resolveDelay={1000} />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <TextField required multiline label={strings.FormLabelPendingReaderConfirmation} id="txtPendingReaderConfirmation" name="txtPendingReaderConfirmation" ></TextField>
                        </div>
                        <div className={styles.column}>
                            <TextField required multiline label={strings.FormLabelContent} id="txtContent" name="txtContent" ></TextField>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <TextField required multiline label={strings.FormLabelAdditionalApplicableDocuments} id="txtAdditionalApplicableDocuments" name="txtAdditionalApplicableDocuments" ></TextField>
                        </div>
                        <div className={styles.column}>
                            <TextField required multiline label={strings.FormLabelProofOfTraining} id="txtProofOfTraining" name="txtProofOfTraining" ></TextField>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            Status of document
                            

                        </div>
                        <div className={styles.column}>
                            <TextField required multiline label={strings.FormLabelMarkOfChangeText} id="txtMarkOfChangeText" name="txtMarkOfChangeText" ></TextField>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <TextField required multiline label={strings.FormLabelCommentsOfReadersToTheDocument} id="txtReferStandardTestProcedures" name="txtReferStandardTestProcedures" ></TextField>
                        </div>
                        <div className={styles.column}>
                            <TextField required multiline label={strings.FormLabelCommentsOfReadersToTheDocument} id="txtCommentsReadersDocument" name="txtCommentsReadersDocument" ></TextField>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <DatePicker onSelectDate =  {(event)=>{this.dateOfArchivingChanged(event);}}  isRequired placeholder="Select a date..." label={strings.FormLabelDateOfArchive} ariaLabel="Date of archive" id="txtDateOfArchive" />
                        </div>
                        <div className={styles.column}>
                            <DatePicker isRequired placeholder="Select a date..." label={strings.FormLabelDateOfRelease} ariaLabel="Date of release" id="txtDateOfRelease" />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <DatePicker isRequired placeholder="Select a date..." label={strings.FormLabelDateOfNextRevision} ariaLabel="Date of next revision" id="txtDateOfNextRevision" />
                        </div>
                        <div className={styles.column}>
                            <TextField required multiline label={strings.FormLabelCommentHistory} id="txtCommentHistory" name="txtCommentHistory" ></TextField>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6">
                                    <div className="form-group mb-4">
                                        <label className="control-label" >Attachments</label>
                                        <div className="form-control">
                                        <input type="file" id="attach" multiple={true}  className="" placeholder="File" aria-label="Tag Name" ></input>
                                    
                                        </div>           
                        </div>
                        
                        <div className={styles.column}>

                        </div>
                    </div>

                </div>
            </div>
    
        
        );
    }
}
