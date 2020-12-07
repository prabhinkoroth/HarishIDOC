import { IDropdownOption } from "office-ui-fabric-react/lib/components/Dropdown";

export default interface IFabricConversionService{
    convertToDropdownOptions(items:any[],key:string,text:string):IDropdownOption[];
}