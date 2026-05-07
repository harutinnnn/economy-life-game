import {useEffect, useState} from "react";
import {ProductCategoryFileType, ProductCategoryType} from "@/types/product.type";
import {productsCategoryRequest, saveProductCategoryRequest} from "@/api/product.api";
import * as Yup from "yup";
import {AxiosError} from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Loader} from "lucide-react";

export const AddProductCategoryComponent = (
    {id, cb}: { id: number, cb: () => void },
) => {

    const [productCategory, setProductCategory] = useState<ProductCategoryType | undefined>(undefined);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadProductCategory = async () => {
            setLoading(true);
            const category = await productsCategoryRequest(id);
            setProductCategory(category);
            setLoading(false);
        };

        void loadProductCategory();

    }, [id, setProductCategory]);


    /**/


    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [disableBtn, setDisableBtn] = useState(false);

    const validateSchema = Yup.object({
        name: Yup.string().required("Name is required"),
    });

    const handleSubmit = async (values: ProductCategoryFileType) => {

        setError(null);
        setDisableBtn(true);


        const name = values.name;

        const formData = new FormData();
        formData.append('id', id.toString())
        formData.append("name", name);
        if (values.icon) {
            formData.append("icon", values.icon);
        }

        try {

            const data = await saveProductCategoryRequest(formData);

            if ("error" in data) {
                setError(data.error as string);
            } else {

                values.name = ""
            }
            cb()
            setDisableBtn(false);

            const category = await productsCategoryRequest(id);
            setProductCategory(category);
        } catch (err) {

            setDisableBtn(false);

            if (err instanceof AxiosError) {

                setError(err.response?.data?.message || "Login failed");

            }

        }
    };


    if (loading) {
        return <Loader/>;
    }
    return (
        <div className={"form-container"}>

            <Formik
                enableReinitialize
                initialValues={{
                    name: productCategory?.name || "",
                    icon: null
                }}
                validationSchema={validateSchema}
                onSubmit={handleSubmit}
            >
                {({setFieldValue}) => (
                    <Form>

                        <div className="input-row">
                            <label htmlFor="name">Name</label>
                            <Field type="text" id="name" name="name" placeholder="Name"/>
                            <ErrorMessage name="name" component="div" className="error-msg"/>
                        </div>

                        <div className="input-row">
                            <label htmlFor="icon">Icon</label>
                            <input
                                type="file"
                                id="icon"
                                name="icon"
                                onChange={(e) => {
                                    setFieldValue("icon", e.currentTarget.files?.[0]);
                                }}
                            />
                            <ErrorMessage name="icon" component="div" className="error-msg"/>
                        </div>
                        {productCategory?.icon &&
                            <div className={'data-image thumbnail m-b-2'} >
                                <img src={import.meta.env.VITE_API_URL + productCategory?.icon} alt="" style={{width: '200px'}} />
                            </div>
                        }

                        <div className="input-row">
                            <button type={'submit'} className={'btn btn-green'}>Save</button>
                        </div>


                    </Form>
                )}
            </Formik>

        </div>
    )
}
