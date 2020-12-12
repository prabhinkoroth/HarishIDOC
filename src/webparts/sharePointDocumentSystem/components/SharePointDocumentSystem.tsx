import * as React from 'react';
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import Form from "./Form/Form";
import styles from './SharePointDocumentSystem.module.scss';
import { ISharePointDocumentSystemProps } from './ISharePointDocumentSystemProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as pnp from "@pnp/sp";
import { IDocumentSystem } from '../Domain/IDocumentSystem';
import { DocumentSystem } from '../Domain/DocumentSystem';
import { ISharePointDocumentSystemStats } from './ISharePointDocumentSystemStats';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { ActionButton, autobind } from 'office-ui-fabric-react';

export default class SharePointDocumentSystem extends React.Component<ISharePointDocumentSystemProps, ISharePointDocumentSystemStats> {
  private _appManager:IDocumentSystem;
  constructor(props:ISharePointDocumentSystemProps) {
    super(props);
    this._appManager=new DocumentSystem();
  }
  public async componentDidMount(){
    pnp.sp.setup({
      spfxContext:this.props.context
    });
    await this._appManager.GetAllMasterData();
    this.setState({RefreshForm:true});
  }
  @autobind
  public async generateNewDocumentNumberPart():Promise<number>{
    return this._appManager.GenerateDocumentNumberPart();
  }
  public render(): React.ReactElement<ISharePointDocumentSystemProps> {
    
    return (
      <div>

         <div>
         <PrimaryButton text="Revision">Revision</PrimaryButton>
         <PrimaryButton text="Archive">Archive</PrimaryButton>
         <PrimaryButton text="Reactivate">Reactivate</PrimaryButton>
         <PrimaryButton text="Submit for Review">Submit for Review</PrimaryButton>
         <PrimaryButton text="Submit for Approval">Submit for Approval</PrimaryButton>
         <PrimaryButton text="Approve">Approve</PrimaryButton>
         <PrimaryButton text="Reject">Reject</PrimaryButton>
         <PrimaryButton text="Edit">Reject</PrimaryButton>
         <PrimaryButton text="Save">Reject</PrimaryButton>
         <ActionButton text="cancel">
           </ActionButton>

           
        </div>

        <Form 
        generateDocumentNumberPart={this.generateNewDocumentNumberPart}
         key="InputForm"
        RefreshForm={true}
        BusinessLines={this._appManager.BusinessOptionsItems}
        DocumentTypes={this._appManager.DocumentTypes}
        ISOStandards={this._appManager.ISOStandardItems}
        Regions={this._appManager.Regions}
        Plants={this._appManager.Plants}
        Departments={this._appManager.Departments}

        RevisionIntervals={this._appManager.RevisionIntervals}
        ISOStandardElementChapters={this._appManager.ISOStandardElementsItems}
        AreaOfValidities={[]}
        Processes={this._appManager.Processes  }  
        context={this.props.context}>

        </Form>
      </div>
    );
  }
}
