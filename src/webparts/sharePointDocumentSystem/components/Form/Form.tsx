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
import { IDropdownOption } from "office-ui-fabric-react/lib/components/Dropdown/Dropdown.types";
import IFabricConversionService from "../../../../Services/ObjectConversionServices/IFabricConversionService";
import FabricConversionService from "../../../../Services/ObjectConversionServices/FabricConversionService";
export default class Form extends React.Component<IFormProps, IFormStats>{

    private _processOptions: IDropdownOption[] = [];
    private _documentTypeOptions: IDropdownOption[] = [];
    private _areaOfValidityOptions: IDropdownOption[] = [];
    private _iSOStandardOptions: IDropdownOption[] = [];
    private _iSOStandardElementChapterOptions: IDropdownOption[] = [];
    private _businessLineOptions: IDropdownOption[] = [];
    private _revisionIntervalOptions: IDropdownOption[] = [];
private _fabricConversionService:IFabricConversionService;
    constructor(props: IFormProps) {
        super(props);
        this._fabricConversionService=new FabricConversionService();
    }
    public componentDidMount(): void {
        debugger;
        
    }
    public shouldComponentUpdate(newProps: IFormProps): boolean {
        return newProps.RefreshForm;
    }
    public render(): React.ReactElement<IFormProps> {
        debugger;
        this._processOptions = this._fabricConversionService.convertToDropdownOptions(this.props.Processes,"Id","ProcessName");
        this._documentTypeOptions=this._fabricConversionService.convertToDropdownOptions(this.props.DocumentTypes,"Id","DocumentType");
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
                            <TextField required label="Document Title" id="txtDocumentTitle" name="txtDocumentTitle"></TextField>
                        </div>
                        <div className={styles.column}>
                            <TextField required label="Document Number" id="txtDocumentNumber" disabled name="txtDocumentNumber"></TextField>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <Dropdown required options={this._documentTypeOptions} placeholder="Select a Document type" label="Document Type"></Dropdown>

                        </div>
                        <div className={styles.column}>
                            <Dropdown required options={this._processOptions} placeholder="Select a Process" label="Process"></Dropdown>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <Dropdown required options={this._areaOfValidityOptions} placeholder="Select an Area of validity" label="Area of validity"></Dropdown>
                        </div>
                        <div className={styles.column}>
                            <TextField required label="Version Number" id="txtVersionNumber" disabled name="txtVersionNumber"></TextField>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <Dropdown required options={this._iSOStandardOptions} placeholder="Select an ISO Standard" label="ISO Standard" id="ddlISOStandard" ></Dropdown>
                        </div>
                        <div className={styles.column}>
                            <Dropdown required options={this._iSOStandardElementChapterOptions} placeholder="Select an ISO Standard Element / Chapter" label="ISO Standard Element / Chapter"
                                id="ddlISOStandardElementChapter" ></Dropdown>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <TextField required multiline label="Keywords" id="tbxKeywords" name="tbxKeywords"></TextField>
                        </div>
                        <div className={styles.column}>
                            <TextField required label="Region" id="txtRegion" name="txtRegion" disabled></TextField>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <TextField required label="Plant" placeholder="Enter Plant" id="txtPlant" name="txtPlant" disabled></TextField>
                        </div>
                        <div className={styles.column}>
                            <Dropdown required options={this._businessLineOptions} placeholder="Select an Business Line" label="Business Line"
                                id="ddlBusinessLine" ></Dropdown>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <TextField required label="Duration of archiving" id="txtDurationOfArchiving" name="txtDurationOfArchiving" disabled></TextField>
                        </div>
                        <div className={styles.column}>
                            <Toggle label="EHS relevant" defaultChecked onText="Yes" offText="No" id="chkbxEHSRelevant" />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <Toggle label="Reading confirmation" defaultChecked onText="Yes" offText="No" id="chkbxReadingConfirmation" />
                        </div>
                        <div className={styles.column}>

                            <PeoplePicker

                                context={this.props.context}
                                titleText="Business Process Owner (BPO)"
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
                                titleText="Author"
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
                                titleText="Verifier"
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
                                titleText="Releaser"
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

                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <TextField required multiline label="Remarks for workflow mails" id="txtRemarksForWorkflowMails" name="txtRemarksForWorkflowMails" ></TextField>
                        </div>
                        <div className={styles.column}>
                            <TextField required label="Reminder workflow steps (days)" id="txtReminderWorkflowSteps" name="txtReminderWorkflowSteps" ></TextField>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <Dropdown required options={this._revisionIntervalOptions} id="ddlRevisionInterval" placeholder="Select an Revision Interval" label="Revision Interval"></Dropdown>
                        </div>
                        <div className={styles.column}>
                            <TextField required label="Reminder revision interval (days)" id="txtReminderRevisionInterval" name="txtReminderRevisionInterval" ></TextField>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <DatePicker isRequired placeholder="Select a date..." label="Valid from" ariaLabel="Valid from" id="txtValidFrom" />
                        </div>
                        <div className={styles.column}>
                            <DatePicker isRequired placeholder="Select a date..." label="Valid until" ariaLabel="Valid until" id="txtValidUntil" />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <TextField required multiline label="Print information validity on day of printing only" id="txtPrintInformationValidity" name="txtPrintInformationValidity" ></TextField>
                        </div>
                        <div className={styles.column}>

                            <PeoplePicker
                                context={this.props.context}
                                titleText="Distribution list"
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
                            <TextField required multiline label="Pending reader confirmation" id="txtPendingReaderConfirmation" name="txtPendingReaderConfirmation" ></TextField>
                        </div>
                        <div className={styles.column}>
                            <TextField required multiline label="Content" id="txtContent" name="txtContent" ></TextField>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <TextField required multiline label="Additional applicable documents" id="txtAdditionalApplicableDocuments" name="txtAdditionalApplicableDocuments" ></TextField>
                        </div>
                        <div className={styles.column}>
                            <TextField required multiline label="Proof of training" id="txtProofOfTraining" name="txtProofOfTraining" ></TextField>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            Status of document

                        </div>
                        <div className={styles.column}>
                            <TextField required multiline label="Mark of change text" id="txtMarkOfChangeText" name="txtMarkOfChangeText" ></TextField>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <TextField required multiline label="Refer to standard in case of test procedures" id="txtReferStandardTestProcedures" name="txtReferStandardTestProcedures" ></TextField>
                        </div>
                        <div className={styles.column}>
                            <TextField required multiline label="Comments of readers to the document" id="txtCommentsReadersDocument" name="txtCommentsReadersDocument" ></TextField>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <DatePicker isRequired placeholder="Select a date..." label="Date of archive" ariaLabel="Date of archive" id="txtDateOfArchive" />
                        </div>
                        <div className={styles.column}>
                            <DatePicker isRequired placeholder="Select a date..." label="Date of release" ariaLabel="Date of release" id="txtDateOfRelease" />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <DatePicker isRequired placeholder="Select a date..." label="Date of next revision" ariaLabel="Date of next revision" id="txtDateOfNextRevision" />
                        </div>
                        <div className={styles.column}>
                            <TextField required multiline label="Comment history" id="txtCommentHistory" name="txtCommentHistory" ></TextField>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>

                        </div>
                        <div className={styles.column}>

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
