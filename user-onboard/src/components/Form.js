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
        <div className='form-wrapper'>
            <h1>Please Enter Your Information</h1>
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
                <Field component="select" className="dropdown-input" name="role">
                    <option>Please Choose an Option</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="ux">U/X</option>
                    
                </Field>
                {touched.role && errors.role && (
                    <p className="error">{errors.role}</p>
                )}
                <label className="checkbox-container">
                Accept Terms of Service
                <Field type="checkbox" name="tos" checked={values.tos} />
                <span className="checkmark" />
                </label>
                {touched.tos && errors.tos && (
                    <p className="error">{errors.tos}</p>
                )}
                <button className='btn' type='submit'>Submit</button>
            </Form>
        </div>
 
    )
}
const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, role, tos}) {
       return {
        name: name || '',
        email: email || '',
        password: password || '',
        role: role || '',
        tos: tos || false
       }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('You must enter a name').max(50, "Our database can't handle such an amazing name"),
        email: Yup.string().required('You must enter an email').email('You must enter a vaild email'),
        password: Yup.string().required('You must enter a password').min(5, 'You must enter a password at least 5 characters long'),
        role: Yup.mixed().oneOf(['frontend', 'backend', 'ux'], 'You must select a role' ).required('You must select a role'),
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
