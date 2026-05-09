import {FieldType} from "@/types/FieldType";

export const FieldComponent = ({field}: { field: FieldType }) => {


    return (
        <div className={"action-item-field-item " + field.type}>
            <div className={"action-item-field-item-img"}>
                <img src="/public/images/icons/field-ground.png" alt=""/>
            </div>
        </div>
    )
}