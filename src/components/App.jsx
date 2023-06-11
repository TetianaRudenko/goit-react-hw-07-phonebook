import { Layout } from "./Layout/Layout";
import { GlobalStyle } from "./GlobalStyle";
import { Section } from "./Section/Section";
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactFilter } from "./ContactFilter/ContactFilter";
import { ContactList } from "./ContactList/ContactList";


const App = () =>  (
    <Layout> 
      <GlobalStyle />
      <Section title="Phonebook">
        <ContactForm />
      </Section>

      <Section>
        <ContactFilter />
        <ContactList/>
      </Section>

    </Layout>
  );

export  { App }
