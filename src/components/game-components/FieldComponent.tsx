import {FieldType} from "@/types/FieldType";
import toast from 'react-hot-toast';
import {seedField} from "@/api/fields.api";
import {FieldTypeEnum} from "@/enums/FieldTypesEnum";
import {useEffect, useState} from "react";
import {countDown, getDateProgress, startCountdown} from "@/helpers/dateHelper";
import {FieldStatusesEnum} from "@/enums/FieldStatusesEnum";

export const FieldComponent = ({field}: { field: FieldType }) => {

    // const notify = (text:string) => toast.success(text);
    const notify = (text: string) => toast.error(text);
    const notifySuccess = (text: string) => toast.success(text);

    const [countdownStr, setCountdownStr] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);
    const [wheatProgressImage, setWheatProgressImage] = useState<number>(0);

    const seedWheat = async (fieldId: number) => {


        const data = await seedField({
            fieldId: fieldId,
            seedType: FieldTypeEnum.WHEAT
        })

        if ("error" in data) {
            notify(data.error.toString());
        } else {
            notifySuccess("Successfully seed field");
        }
    }

    const wheatProgressImageHandle = () => {
        if (field.status == FieldStatusesEnum.IN_PROGRESS) {

            if (progress < 50) {
                return 'wheat-seeds.png'
            } else if (progress >= 50 && progress <= 99) {
                return 'wheat-sprouts.png'
            } else if (progress >= 100) {
                return 'wheat-final.png'
            }
        }

        return 'wheat-ground.png'
    }

    useEffect(() => {

        const interval = setInterval(() => {
            setCountdownStr(startCountdown(field.endProgressTime.toString()))
            setProgress(getDateProgress(field.startProgressTime.toString(), field.endProgressTime.toString()))
        }, 1000);

        return () => clearInterval(interval);
    }, [field]);

    return (
        <div className={"action-item-field-item " + field.type} onClick={() => seedWheat(field.id)}>
            {countdownStr} - {progress}%
            <div className={"action-item-field-item-img"}>
                <img src={"/public/images/icons/fields/wheat/" + wheatProgressImageHandle()} alt=""/>
            </div>
        </div>
    )
}