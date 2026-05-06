import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup"
import {useEffect, useState} from "react";
import {SignupFormType} from "@/types/SignupFormType";
import {AxiosError} from "axios";
import {AuthFormTypeEnum} from "@/enums/AuthFormTypeEnum";
import {GenderEnum} from "@/enums/GenderEnum";
import {registerRequest} from "@/api/auth.api";
import {capitalize} from "@/helpers/text.helper";
import {Alerts} from "@/components/Alerts";
import {AlertEnums} from "@/enums/AlertEnums";
import {CountryType, TimezoneType} from "@/types/country.type";
import {countriesRequest, timezonesRequest} from "@/api/main.api";

export const RegisterComponent = ({cb}: { cb: (type: AuthFormTypeEnum) => void }) => {

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [disableBtn, setDisableBtn] = useState(false);


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

        })();
    }, [setCountries,setTimezones]);

    const signupSchema = Yup.object({
        name: Yup.string().min(3, "Minimum 3 characters").required("Name is required"),
        nickname: Yup.string().min(3, "Minimum 3 characters").required("Nickname is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        gender: Yup.mixed<GenderEnum>()
            .oneOf(Object.values(GenderEnum), "Invalid gender")
            .required("Gender is required"),
        password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Required"),
        countryId: Yup.number().notOneOf([0], "Country is required").required("Country is required"),
        timezoneId: Yup.number().notOneOf([0], "Timezone is required").required("Timezone is required"),
    });

    const handleSubmit = async (values: SignupFormType) => {

        setError(null);
        setDisableBtn(true);


        const name = values.name;
        const nickname = values.nickname;
        const email = values.email;
        const gender = values.gender;
        const password = values.password;
        const countryId = values.countryId;
        const timezoneId = values.timezoneId;


        try {
            const data = await registerRequest({name, nickname, email, gender, password, countryId, timezoneId});

            if ("error" in data) {
                setError(data.error as string);
            } else {

                setSuccess("Successfully registered please check your email!");

                setTimeout(() => {
                    setSuccess(null);
                }, 5000)

                values.name = ''
                values.nickname = ''
                values.email = ''
                values.password = ''
                values.countryId = 0
                values.timezoneId = 0
            }
            setDisableBtn(false);
        } catch (err) {

            setDisableBtn(false);

            if (err instanceof AxiosError) {

                setError(err.response?.data?.message || "Login failed");

            }

        }
    };


    return (
        <div>
            <h2 className="title m-b-2">Sign Up</h2>

            {error && <Alerts text={error} type={AlertEnums.danger} cb={() => {
                setError(null)
            }}/>}
            {success && <Alerts text={success} type={AlertEnums.success} cb={() => {
                setSuccess(null)
            }}/>}

            <Formik
                initialValues={{
                    name: "",
                    nickname: "",
                    email: "",
                    gender: GenderEnum.MALE,
                    password: "",
                    confirmPassword: "",
                    countryId: 0,
                    timezoneId: 0,
                }}
                validationSchema={signupSchema}
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
                            <label htmlFor="name">Name</label>
                            <Field type="text" id="name" name="name" placeholder="Your Name"/>
                            <ErrorMessage name="name" component="div" className="error-msg"/>
                        </div>

                        <div className="input-row">
                            <label htmlFor="nickname">Name</label>
                            <Field type="text" id="nickname" name="nickname" placeholder="Your Nickname"/>
                            <ErrorMessage name="nickname" component="div" className="error-msg"/>
                        </div>


                        <div className="input-row">
                            <label htmlFor="email">Email</label>
                            <Field type="text" id="email" name="email" placeholder="Your Email"/>
                            <ErrorMessage name="email" component="div" className="error-msg"/>
                        </div>


                        <div className="input-row">
                            <label htmlFor="email">Email</label>
                            <Field as="select" name="gender" id="gender">

                                <option value={GenderEnum.MALE}
                                        key={GenderEnum.MALE}>{capitalize(GenderEnum.MALE)}</option>
                                <option value={GenderEnum.FEMALE}
                                        key={GenderEnum.FEMALE}>{capitalize(GenderEnum.FEMALE)}</option>
                                <option value={GenderEnum.UNKNOWN}
                                        key={GenderEnum.UNKNOWN}>{capitalize(GenderEnum.UNKNOWN)}</option>


                            </Field>
                            <ErrorMessage name="gender" component="div" className="error-msg"/>
                        </div>

                        <div className="input-row">
                            <label htmlFor="password">Password</label>
                            <Field type="password" id="password" name="password"/>
                            <ErrorMessage name="password" component="div" className="error-msg"/>
                        </div>

                        <div className="input-row">
                            <label htmlFor="confirmPassword">Password Confirmation</label>
                            <Field type="password" id="confirmPassword" name="confirmPassword"/>
                            <ErrorMessage name="confirmPassword" component="div" className="error-msg"/>
                        </div>


                        <div className="input-row">
                            <button type={"submit"} className={"btn btn-blue"} disabled={disableBtn}>Register</button>
                        </div>

                        <div className="input-row">
                   <span className="link bold"
                         onClick={() => cb(AuthFormTypeEnum.login)}>Login</span>
                        </div>

                    </Form>
                )}

            </Formik>

        </div>
    )
}