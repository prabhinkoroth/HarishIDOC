import * as React from "react";
import { IFormProps } from "./IFormProps";
import { IFormStats } from "./IFormStats";
import { Stack, IStackTokens, IStackItemStyles } from "office-ui-fabric-react/lib/Stack";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { DefaultPalette } from "office-ui-fabric-react/lib/Styling";
import styles from "../SharePointDocumentSystem.module.scss";
import { Dropdown } from "office-ui-fabric-react/lib/components/Dropdown/Dropdown";
import { Toggle } from "office-ui-fabric-react/lib/components/Toggle/Toggle";
export default class Form extends React.Component<IFormProps, IFormStats>{



    constructor(props: IFormProps) {
        super(props);

    }
    public render(): React.ReactElement<IFormProps> {
        return (
            <div className={styles.sharePointDocumentSystem}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <TextField label="Document Title" id="txtDocumentTitle" name="txtDocumentTitle"></TextField>
                        </div>
                        <div className={styles.column}>
                            <TextField label="Document Number" id="txtDocumentNumber" disabled name="txtDocumentNumber"></TextField>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <Dropdown options={[]} placeholder="Select a Document type" label="Document Type"></Dropdown>

                        </div>
                        <div className={styles.column}>
                            <Dropdown options={[]} placeholder="Select a Process" label="Process"></Dropdown>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <Dropdown options={[]} placeholder="Select an Area of validity" label="Area of validity"></Dropdown>
                        </div>
                        <div className={styles.column}>
                            <TextField label="Version Number" id="txtVersionNumber" disabled name="txtVersionNumber"></TextField>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <Dropdown options={[]} placeholder="Select an ISO Standard" label="ISO Standard" id="ddlISOStandard" ></Dropdown>
                        </div>
                        <div className={styles.column}>
                            <Dropdown options={[]} placeholder="Select an ISO Standard Element / Chapter" label="ISO Standard Element / Chapter"
                                id="ddlISOStandardElementChapter" ></Dropdown>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                        <TextField multiline label="Keywords" id="tbxKeywords"  name="tbxKeywords"></TextField>
                        </div>
                        <div className={styles.column}>
                        <TextField label="Region" id="txtRegion"  name="txtRegion" disabled></TextField>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                        <TextField label="Plant"  placeholder="Enter Plant" id="txtPlant"  name="txtPlant" disabled></TextField>
                        </div>
                        <div className={styles.column}>
                        <Dropdown options={[]} placeholder="Select an Business Line" label="Business Line"
id="ddlBusinessLine" ></Dropdown>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                        <TextField label="Duration of archiving" id="txtDurationOfArchiving"  name="txtDurationOfArchiving" disabled></TextField>
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
                        Business Process Owner (BPO)
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                       
                        Author
                        </div>
                        <div className={styles.column}>
                        
                        Verifier

                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                        Releaser

                        </div>
                        <div className={styles.column}>

                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                        <TextField multiline label="Remarks for workflow mails" id="txtRemarksForWorkflowMails"  name="txtRemarksForWorkflowMails" ></TextField>
                        </div>
                        <div className={styles.column}>

                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>

                        </div>
                        <div className={styles.column}>

                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>

                        </div>
                        <div className={styles.column}>

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
