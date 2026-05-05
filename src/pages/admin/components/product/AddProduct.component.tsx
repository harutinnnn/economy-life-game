import {useEffect, useState} from "react";
import {ProductCategoryType, ProductFileType, ProductType} from "@/types/product.type";
import {
    productRequest,
    saveProductRequest
} from "@/api/product.api";
import * as Yup from "yup";
import {AxiosError} from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Loader} from "lucide-react";

export const AddProductComponent = (
    {id, cb, categories}: { id: number, cb: () => void, categories: ProductCategoryType[] },
) => {

    const [product, setProduct] = useState<ProductType | undefined>(undefined);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        (async () => {

            if (id > 0) {
                const product = await productRequest(id);
                console.log('product',product);
                setProduct(product);
            }
            setLoading(false);
        })()


    }, [id, setProduct, categories]);


    /**/


    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [disableBtn, setDisableBtn] = useState(false);

    const validateSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        price: Yup.number().required("Number is required"),
        categoryId: Yup.number().required("Category is required"),
    });

    const handleSubmit = async (values: ProductFileType) => {

        setError(null);
        setDisableBtn(true);


        const name = values.name;
        const price = values.price;
        const categoryId = values.categoryId;

        const formData = new FormData();
        formData.append('id', id.toString())
        formData.append("name", name);
        formData.append("price", price.toString());
        formData.append("categoryId", categoryId.toString());
        if (values.icon) {
            formData.append("icon", values.icon);
        }

        try {

            const data = await saveProductRequest(formData);

            if ("error" in data) {
                setError(data.error as string);
            } else {

                values.name = ""
            }
            cb()
            setDisableBtn(false);

            const product = await productRequest(id);
            setProduct(product);
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
                    name: product?.name || "",
                    categoryId: product?.categoryId || 0,
                    price: product?.price || 0,
                    icon: null
                }}
                validationSchema={validateSchema}
                onSubmit={handleSubmit}
            >
                {({setFieldValue}) => (
                    <Form>


                        <div className="input-row">
                            <label htmlFor="name">Category</label>
                            <Field as="select" name="categoryId" id="categoryId">
                                <option value="0" key="0">-- Select category --</option>
                                {categories.map(category =>
                                    <option value={category.id}
                                            key={category.id}>{category.name}</option>
                                )}
                            </Field>
                            <ErrorMessage name="categoryId" component="div" className="error-msg"/>
                        </div>

                        <div className="input-row">
                            <label htmlFor="name">Name</label>
                            <Field type="text" id="name" name="name" placeholder="Name"/>
                            <ErrorMessage name="name" component="div" className="error-msg"/>
                        </div>

                        <div className="input-row">
                            <label htmlFor="price">Price</label>
                            <Field type="number" id="price" name="price" placeholder="Price"/>
                            <ErrorMessage name="price" component="div" className="error-msg"/>
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

                        {product?.icon &&
                            <div className={'data-image thumbnail m-b-2'}>
                                <img src={import.meta.env.VITE_API_URL + product?.icon} alt=""
                                     style={{width: '100px'}}/>
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
