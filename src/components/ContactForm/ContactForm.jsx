import { Formik, ErrorMessage } from "formik";
import * as yup from 'yup';
import { nanoid } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { selectContacts } from "redux/selectors";
import { addContact } from "redux/operations";
import { FormStyled, Label, Input, Button, ErrorText } from "./ContactForm.styled";   


const ContactForm = () => {
  
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const patternName =
    /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
  const patternNumber =
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

  const schema = yup.object().shape({
    name: yup.string()
      .min(3, "Too short!")
      .max(18, "Name too long!")
      .matches(
        patternName,
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      )
      .required("Required"),
    number: yup.string()
      .matches(
        patternNumber,
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
      )
      .required("Required"),
  });

  const FormError = ({ name }) => {
    return (
      <ErrorMessage
        name={name}
        render={msg => <ErrorText>{msg}</ErrorText>}
      />
    )
  }

  const handleSubmitForm = (values, { resetForm }) => {
    const newContact = {
      createdAt: Date.now(),
      name: values.name,
      phone: values.number,
    };
    if (contacts.find(contact => contact.name.toUpperCase() === values.name.toUpperCase())) {
      alert(`${values.name} is already in contacts`)
    } else {
      try {
        dispatch(addContact(newContact));
        resetForm();
      } catch (error) {
        console.log(error);
      }
    }
    
  }

  return (
    <Formik
      initialValues={{name: '', number: ''}}
      onSubmit={handleSubmitForm}
      validationSchema={schema}
    >
      <FormStyled autoComplete="off">
        <Label htmlFor={nameInputId}>
          Name
        </Label>
        <Input
          id={nameInputId}
          type="text"
          name="name"
        />
        <FormError
          name="name"
          render={msg => <ErrorText>{msg}</ErrorText>}
        />
        
        <Label htmlFor={numberInputId}>
          Number
        </Label>
        <Input
          id={numberInputId}
          type="tel"
          name="number"
        />
        <FormError
          name="number"
          render={msg => <ErrorText >{msg}</ErrorText>}
        />

        <Button type="submit">
          Add contact
        </Button>
      </FormStyled>
    </Formik>
  )
}

export { ContactForm };