import { nanoid } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { selectFilter } from "redux/selectors";
import { changeFilter } from "redux/filterSlice";
import {  Wrap, Label, Input } from "./ContactFilter.styled";


const ContactFilter = () => {
  const nameInputValue = nanoid();

  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  
  const handleChangeFilter = e => {
    dispatch(changeFilter(e.target.value));
  }

  return (
    <Wrap>
      <Label  htmlFor={nameInputValue}>
        Find contacts by name
      </Label>
      <Input
        id={nameInputValue}
        type="text"
        value={filter}
        onChange={handleChangeFilter}
      />
    </Wrap>
  )
}

export { ContactFilter };