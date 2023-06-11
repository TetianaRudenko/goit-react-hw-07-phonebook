import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectContacts, selectIsLoading, selectError, selectFilter } from "redux/selectors";
import {  fetchContacts } from "redux/operations";
import { Loader } from "components/Loader/Loader";
import { ContactItem } from "components/ContactItem/ContactItem";
import { List, Item } from "./ContactList.styled";


const ContactList = () => {

  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [visibleContacts, setVisibleContacts] = useState(contacts);

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