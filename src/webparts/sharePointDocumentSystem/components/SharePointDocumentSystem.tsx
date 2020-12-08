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
  public render(): React.ReactElement<ISharePointDocumentSystemProps> {
    
    return (
      <div>
        <Form  key="InputForm"
        RefreshForm={true}
        BusinessLines={[]}
        DocumentTypes={this._appManager.DocumentTypes}
        ISOStandards={this._appManager.ISOStandardItems}
        RevisionIntervals={[]}
        ISOStandardElementChapters={[]}
        AreaOfValidities={[]}
        Processes={this._appManager.Processes  }  
        context={this.props.context}>

        </Form>
      </div>
    );
  }
}
