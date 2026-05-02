import {AuthFormTypeEnum} from "@/enums/AuthFormTypeEnum";
import * as Yup from "yup"
import {useState} from "react";
import {AxiosError} from "axios";
import {forgotRequest} from "@/api/auth.api";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Alerts} from "@/components/Alerts";
import {AlertEnums} from "@/enums/AlertEnums";

export const ForgotComponent = ({cb}: { cb: (type: AuthFormTypeEnum) => void }) => {

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const loginSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Required"),
    });

    type LoginFormValues = {
        email: string;
    };

    const handleLoginSubmit = async (values: LoginFormValues) => {
        setError("");

        const email = values.email;

        try {
            const data = await forgotRequest({email});


            if ("error" in data) {
                setError(data.error)
            } else {
                setSuccess(data?.message)
            }

        } catch (err) {

            console.error(err);

            if (err instanceof AxiosError) {
                setError(err.response?.data?.message || "Forgot failed");
            }
        }
    };


    return (
        <div>
            <h2 className="title m-b-2">Forgot</h2>

            {error && <Alerts text={error} type={AlertEnums.danger} cb={() => {
                setError(null)
            }}/>}
            {success && <Alerts text={success} type={AlertEnums.success} cb={() => {
                setSuccess(null)
            }}/>}

            <Formik
                initialValues={{email: ""}}
                validationSchema={loginSchema}
                onSubmit={handleLoginSubmit}
            >
                <Form>

                    <div className="input-row">
                        <label htmlFor="email">Email</label>
                        <Field type="text" id="email" name="email" placeholder="Your Email"/>
                        <ErrorMessage name="email" component="div" className="error-msg"/>
                    </div>

                    <div className="input-row">
                        <button type={"submit"} className={"btn btn-blue"}>Forgot</button>
                    </div>

                    <div className="input-row">
                        <span className="link bold"
                              onClick={() => cb(AuthFormTypeEnum.login)}>Login</span>
                    </div>
                </Form>
            </Formik>

        </div>
    );
}
