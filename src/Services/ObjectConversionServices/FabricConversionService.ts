import { IDropdownOption } from "office-ui-fabric-react/lib/components/Dropdown";
import  IFabricConversionService  from "./IFabricConversionService";

export default class FabricConversionService implements IFabricConversionService {
    public convertToDropdownOptions(items: any[], key: string, text: string): IDropdownOption[] {
        return items.map((item): IDropdownOption => {
            if(key==""){
                return {
                    key:item,
                    text:item
                };
            }
            return {
                key: item[key],
                text: item[text]
            };
        });
    }

}