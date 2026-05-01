import {AuthFormTypeEnum} from "@/enums/AuthFormTypeEnum";
import {useState} from "react";
import {AxiosError} from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup"
import {getMeRequest, loginRequest} from "@/api/auth.api";
import {setAuthTokens} from "@/helpers/authStorage";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/hooks/useAuth";

export const LoginComponent = ({cb}: { cb: (type: AuthFormTypeEnum) => void }) => {

    const {login} = useAuth();

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const loginSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
    });


    type LoginFormValues = {
        email: string;
        password: string;
    };


    const handleLoginSubmit = async (values: LoginFormValues) => {

        setError("");

        const email = values.email;
        const password = values.password;

        try {
            const data = await loginRequest({email, password});

            if ("error" in data) {
                setError(data.error)
            } else {
                setAuthTokens({
                    accessToken: data.token,
                    refreshToken: data.refreshToken,
                });

                let userToSet = data.user;
                try {
                    const userFromApi = await getMeRequest();
                    if (userFromApi) {
                        userToSet = userFromApi;
                    }
                } catch (apiErr) {
                    console.error("Failed to fetch full user profile", apiErr);
                }

                login(data.token, userToSet);

                navigate("/");

            }


        } catch (err) {

            console.error(err);

            if (err instanceof AxiosError) {

                setError(err.response?.data?.message || "Login failed");
            }

        }
    };

    return (
        <div>
            <h2 className="title m-b-2">Sign In</h2>

            <Formik
                initialValues={{email: "", password: ""}}
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
                        <div className="flex flex-row">
                            <label htmlFor="email">Password</label>
                            <span className="m-l-auto link bold"
                                  onClick={() => cb(AuthFormTypeEnum.forgot_password)}>Forgot</span>
                        </div>
                        <Field type="password" id="password" name="password"/>
                        <ErrorMessage name="password" component="div" className="error-msg"/>
                    </div>

                    <div className="input-row">
                        <button type={"submit"} className={"btn btn-blue"}>Login</button>
                    </div>

                    <div className="input-row">
                   <span className="link bold"
                         onClick={() => cb(AuthFormTypeEnum.registration)}>Register</span>
                    </div>

                </Form>
            </Formik>

        </div>
    )
}
