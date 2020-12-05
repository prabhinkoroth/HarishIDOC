import * as React from 'react';
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import Form from "./Form/Form";
import styles from './SharePointDocumentSystem.module.scss';
import { ISharePointDocumentSystemProps } from './ISharePointDocumentSystemProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class SharePointDocumentSystem extends React.Component<ISharePointDocumentSystemProps, {}> {
  public render(): React.ReactElement<ISharePointDocumentSystemProps> {
    return (
      <div>
        <Form></Form>
      </div>
    );
  }
}
