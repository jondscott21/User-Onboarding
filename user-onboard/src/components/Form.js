import React, {useEffect} from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from "formik";
import * as Yup from 'yup';


function UserForm({errors, touched, values, setUsers, status}) {
   useEffect( () => {
    if(status !== undefined) {
        setUsers(u => [...u, status])
    }
   }, [status, setUsers])
    return(
            <Form className='user-form'>
                <Field className='user-input' type='text' name='name' placeholder='Please enter your name' />
                {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                )}
                <Field className='user-input' type='email' name='email' placeholder='Email' />
                {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                )}
                <Field className='user-input' type='password' name='password' placeholder='Password' />
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}
                <label className="checkbox-container">
                Accept Terms of Service
                <Field type="checkbox" name="tos" checked={values.tos} />
                <span className="checkmark" />
                </label>
                {touched.tos && errors.tos && (
                    <p className="error">{errors.tos}</p>
                )}
                <button type='submit'>Submit</button>
            </Form>
 
    )
}
const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, tos}) {
       return {
        name: name || '',
        email: email || '',
        password: password || '',
        tos: tos || false
       }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('You must enter a name').max(256, "Our database can't handle such an amazing name"),
        email: Yup.string().required('You must enter an email').email('You must enter a vaild email'),
        password: Yup.string().required('You must enter a password').min(5, 'You must enter a password at least 5 characters long'),
        tos: Yup.boolean().oneOf([true], 'You must Accept Terms of Service')
      }),

    handleSubmit(values, {setStatus, resetForm}) {
        console.log("form submitted", values);
        axios.post(`https://reqres.in/api/users`, values)
        .then(res => {
            console.log('response', res)
            setStatus(res.data)
            resetForm();
        })
        .catch(error => {
            console.log('Error', error)
        })
    }
})(UserForm)

export default FormikUserForm;
