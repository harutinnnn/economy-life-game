import {ChevronDown, ChevronUp, CirclePlus, Wheat} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {FieldType} from "@/types/FieldType";
import {FieldComponent} from "@/components/game-components/FieldComponent";
import {FieldTypeEnum} from "@/enums/FieldTypesEnum";
import {updateUserInfoRequest} from "@/api/fields.api";

export const WheatComponent = () => {

    const [toggleFields, setToggleFields] = useState<boolean>(false);
    const [height, setHeight] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    const [fields, setFields] = useState<FieldType[]>([]);

    const getFields = async () => {
        const fieldsList = await updateUserInfoRequest()
        setFields(fieldsList.fields)
    }

    useEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        }

        (async () => {
            await getFields()
        })()

    }, [toggleFields, setFields])


    const handleAddField = (type: FieldTypeEnum) => {

        //TODO add adding field api request

        setTimeout(() => {
            if (contentRef.current) {
                setHeight(contentRef.current.scrollHeight);
            }
        }, 0)
    }

    return (
        <div className={"action-item shadow-lg color-blue wheat"}>
            <div className={"action-item-inner"}>
                <div className={'action-item-icon'}>
                    <Wheat size={28}/>
                </div>
                <div className={'action-item-text-info'}>
                    <h3>
                        Wheat germination
                    </h3>
                </div>
                <div className={'earnings'}>
                    Earnings <span>🪙5</span>
                </div>

            </div>
            <div className={"action-item-graph-info"}>
                <div className={"graph-info-graph"}>
                    <div className="graph-info-graph-progress" style={{width: '55%'}}></div>
                </div>
                <div className={"graph-info-text"}>55% Completed</div>
            </div>

            <div className={"action-item-fields"}
                 style={{
                     overflow: "hidden",
                     transition: "all 0.3s ease",
                     maxHeight: toggleFields ? `${height}px` : "0px",
                     opacity: toggleFields ? 1 : 0,
                     transform: toggleFields ? "translateY(0)" : "translateY(-10px)",
                 }}>

                <div className={"action-item-fields-inner"} ref={contentRef}>
                    {fields.map((field: FieldType) =>
                        <FieldComponent field={field} key={field.id} cb={() => getFields()}/>
                    )}
                    <div className="add-new-field">
                        <div onClick={() => {
                            handleAddField(FieldTypeEnum.WHEAT)
                        }}>
                            <CirclePlus size={42}/>
                            <span>Add new field</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'fields-toggle ' + (toggleFields ? "toggled" : "")} onClick={() => {
                setToggleFields(!toggleFields)
            }}>
                <ChevronDown size={28}/>
            </div>
        </div>
    )
};