import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { ContactInfo, Button } from "./ContactItem.styled";
import { deleteContact } from "redux/operations";

const ContactItem = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDeleteContact = () => dispatch(deleteContact(contact.id));

  return (
    <>
      <ContactInfo> {contact.name} </ContactInfo>
      <ContactInfo>  {contact.phone} </ContactInfo>
      <Button
        type="button"
        onClick={handleDeleteContact}
      >
        Delete
      </Button>
    </>
  )
}

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  })
}

export { ContactItem };