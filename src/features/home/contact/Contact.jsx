import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import SectionTitle from "../../../ui/SectionTitle";

// -----------------------------------------------------------------------------
// Component: Contact
// Açıklama: Contact Section.
// Özellikler:
//   - ContactForm component (form fields)
//   - ContactInfo component (address, phone, email, etc.)
// -----------------------------------------------------------------------------

export default function Contact() {
  return (
    <section id="contact" className="py-12 md:py-20 text-white customContainer">
      <SectionTitle className="mb-4" size="hero">
        Contact
      </SectionTitle>

      <p className="text-center text-lg px-8 text-gray-200 mb-6 md:mb-14">
        Share your <span className="text-gold font-semibold">requests</span> and
        <span className="text-gold font-semibold"> complaints</span> with us
      </p>

      <div>
        <div className="flex items-start md:items-center md:flex-row flex-col gap-12">
          <ContactForm />

          <ContactInfo />
        </div>
      </div>
    </section>
  );
}

// contact section title
// menu categories section title
