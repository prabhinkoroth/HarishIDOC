import * as React from 'react';
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import Form from "./Form/Form";
import styles from './SharePointDocumentSystem.module.scss';
import { ISharePointDocumentSystemProps } from './ISharePointDocumentSystemProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as pnp from "@pnp/sp";
import { DocumentSystem } from '../Domain/DocumentSystem';

export default class SharePointDocumentSystem extends React.Component<ISharePointDocumentSystemProps, {}> {
  private _appManager:DocumentSystem;
  constructor(props:ISharePointDocumentSystemProps) {
    super(props);
    
  }
  public componentDidMount(){
    pnp.sp.setup({
      spfxContext:this.props.context
    });
  }
  public render(): React.ReactElement<ISharePointDocumentSystemProps> {
    return (
      <div>
        <Form context={this.props.context}></Form>
      </div>
    );
  }
}
