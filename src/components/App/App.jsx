import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import css from './App.module.css';
import { Filter } from '../Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const formSubmitHandle = data => {
    const contactid = nanoid();
    data.id = contactid;
    setContacts([data, ...contacts]);
  };

  const chengeFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  const getVisibleContact = () => {
    const normalizedContact = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedContact)
    );
  };

  const visibleContact = getVisibleContact();

  return (
    <div className={css.div}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandle} userContacts={contacts} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={chengeFilter} />
      <ContactList contact={visibleContact} onDeleteContact={deleteContact} />
    </div>
  );
};
