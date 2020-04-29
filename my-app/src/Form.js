import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

const Form = () => {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        terms: "",

    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    });

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const formSchema = yup.object().shape({
        name: yup.string().required("Name is a required field!"),
        email: yup.string().email("Must be a valid email address").required("Must include email address to submit!"),
        password: yup.string().required("Password required upon signup").min(8, "Password is too short, needs at least 8 characters"),
        terms: yup.boolean().oneOf([true], "Please agree to Terms & Conditions")
        });

    useEffect(() => {
        console.log("form state change")
        formSchema.isValid(formState).then(valid => {
            setIsButtonDisabled(!valid);
        });
    }, [formState]);
    
    const inputChange = event => {
        event.persist();
        const newFormData = {
            ...formState, [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value
        };
        validateChange(event);
        setFormState(newFormData);
    };

    const validateChange = event => {
        yup.reach(formSchema, event.target.name).validate(event.target.value).then(valid => {
            setErrors({...errors, [event.target.name]: "" });
        })
        .catch(err => {
            setErrors({...errors, [event.target.name]: err.errors[0]});
        })
    };

    const [post, setPost] = useState([])

    const formSubmit = event => {
        event.preventDefault();
        axios.post("https://reqres.in/api/users", formState)
        .then(response => {
            setPost(response.data);
            setFormState({
                name: "",
                email: "",
                password: "",
                terms: ""
            });
        })
        .catch(error=> console.log(error.response));
    }


return (
    <form onSubmit={formSubmit}>
        <label htmlFor="name">
            Name:
            <input id="name" type="text" name="name" value={formState.name} onChange={inputChange}/>
            {errors.name.length > 0 ? (<p className="error">{errors.name}</p>) : null}
        </label>
        <label htmlFor="email">
            Email:
            <input id="email" type="text" name="email" value={formState.email} onChange={inputChange}/>
            {errors.email.length > 0 ? (<p className="error">{errors.email}</p>) : null}

        </label>
        <label htmlFor="password">
            Password:
            <input id="password" type="text" name="password" value={formState.password} onChange={inputChange}/>
            {errors.password.length > 0 ? (<p className="error">{errors.password}</p>) : null}

        </label>
        <label htmlFor="terms">
            Terms & Conditions
            <input id="terms" type="checkbox" name="terms" onChange={inputChange}checked={formState.terms} />
        </label>
        <pre>{JSON.stringify(post, null, 2)}</pre>
        <button disabled={isButtonDisabled}>Submit!</button>

    </form>
)
}
export default Form;