import { ContactItem } from "components/ContactItem/ContactItem";
import { List, Item } from "./ContactList.styled";

//import  contacts  from "../../contacts.json";
import { useDispatch, useSelector } from "react-redux";
import { getContacts, getError, getFilter, getIsLoading } from "redux/selectors";
import { useEffect, useState } from "react";
import {  fetchContacts } from "redux/operations";
import { Loader } from "components/Loader/Loader";


const ContactList = () => {

  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const [visibleContacts, setVisibleContacts] = useState(contacts);

  /* const handleDeleteContact = () => {
    dispatch(deleteContact(contact.id));
  } */

  useEffect(() => {
    setVisibleContacts(
      contacts.filter(contact =>
        contact.name.toUpperCase().trim().includes(filter.toUpperCase().trim())
      )
    );
  }, [contacts, filter]);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {isLoading && !error && <Loader />} 
      {error && <p>Sorry, something went wrong.</p>}
      {visibleContacts && (
        <List>
          {visibleContacts.map(contact => (
            <Item key={contact.id}>
              
              <ContactItem 
                contact={contact}             
              />

            </Item>
          ))}
        </List>
      )}
    </>
  );
}

export { ContactList }