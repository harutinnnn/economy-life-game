import {useEffect, useState} from "react";
import * as Yup from "yup";
import {AxiosError} from "axios";
import {useAuth} from "@/hooks/useAuth";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {countriesRequest, timezonesRequest} from "@/api/main.api";
import {CountryType, TimezoneType} from "@/types/country.type";
import {UserInfo} from "@/types/user.info.type";
import {updateUserInfoRequest} from "@/api/user.api";
import {Alerts} from "@/components/Alerts";
import {AlertEnums} from "@/enums/AlertEnums";
import {getAccessToken} from "@/helpers/authStorage";
import {User} from "@/types/User";

type UserInfoFormValues = Pick<UserInfo, "countryId" | "timezoneId">;

export const UserInfoComponent = () => {

    const {user, login} = useAuth();

    const [countries, setCountries] = useState<CountryType[]>([]);
    const [timezones, setTimezones] = useState<TimezoneType[]>([]);

    const getTimezonesHandle = async (countryId: number) => {
        const timezones = await timezonesRequest(countryId);
        setTimezones(timezones);
    };

    useEffect(() => {
        (async () => {
            const countries = await countriesRequest();
            setCountries(countries);

            if (user?.userInfo?.countryId) {
                void getTimezonesHandle(user?.userInfo.countryId);
            }

        })();
    }, [user]);


    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [disableBtn, setDisableBtn] = useState(false);

    const userInfoSchema = Yup.object({
        countryId: Yup.number().notOneOf([0], "Country is required").required("Country is required"),
        timezoneId: Yup.number().notOneOf([0], "Timezone is required").required("Timezone is required"),
    });

    const handleSubmit = async (values: UserInfoFormValues) => {

        setError(null);
        setDisableBtn(true);

        const country = values.countryId;
        const timezone = values.timezoneId;


        try {
            const data = await updateUserInfoRequest({
                countryId: country,
                timezoneId: timezone,
            });

            if ("error" in data) {
                setError(data.error as string);
            } else {
                const token = getAccessToken();
                if (token && user) {
                    const nextUser: User = {
                        ...user,
                        userInfo: {
                            id: user.userInfo?.id ?? 0,
                            userId: user.userInfo?.userId ?? user.user.id,
                            countryId: country,
                            timezoneId: timezone,
                        },
                    };
                    login(token, nextUser);
                }

                setSuccess("User info updated successfully!");

                setTimeout(() => {
                    setSuccess(null);
                }, 5000);

            }
            setDisableBtn(false);
        } catch (err) {

            setDisableBtn(false);

            if (err instanceof AxiosError) {

                setError(err.response?.data?.message || "Update failed");

            }

        }
    };


    return (
        <div className={""}>

            <h2 className={"m-b-2"}>Country and Timezone</h2>

            {error && <Alerts text={error} type={AlertEnums.danger} cb={() => {
                setError(null);
            }}/>}
            {success && <Alerts text={success} type={AlertEnums.success} cb={() => {
                setSuccess(null);
            }}/>}

            <Formik<UserInfoFormValues>
                initialValues={{
                    countryId: (user?.userInfo?.countryId || 0),
                    timezoneId: (user?.userInfo?.timezoneId || 0),
                }}
                validationSchema={userInfoSchema}
                onSubmit={handleSubmit}
            >
                {({setFieldValue}) => (
                    <Form>

                        <div className="input-row">
                            <label htmlFor="countryId">Country</label>
                            <Field as="select" name="countryId" id="countryId"
                                   onChange={async (e: React.ChangeEvent<HTMLSelectElement>) => {
                                       const value = e.target.value;

                                       await setFieldValue("countryId", value);
                                       await setFieldValue("timezoneId", 0);
                                       await getTimezonesHandle(Number(value));
                                   }}>

                                <option value="0">Select country</option>

                                {countries.map((country) =>
                                    <option value={country.id}
                                            key={country.id}>{country.name}</option>,
                                )}

                            </Field>
                            <ErrorMessage name="countryId" component="div" className="error-msg"/>
                        </div>

                        <div className="input-row">
                            <label htmlFor="timezoneId">Timezone</label>
                            <Field as="select" name="timezoneId" id="timezoneId">

                                <option value="0">Select timezone</option>

                                {timezones.map((timezone) =>
                                    <option value={timezone.id}
                                            key={timezone.id}>{`${timezone.timezoneName} ${timezone.utcOffset}`}</option>,
                                )}

                            </Field>
                            <ErrorMessage name="timezoneId" component="div" className="error-msg"/>
                        </div>

                        <div className="input-row">
                            <button type={"submit"} className={"btn btn-blue"} disabled={disableBtn}>
                                Update User Info
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>

        </div>
    );
};
