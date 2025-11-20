import { useForm } from "react-hook-form";
import Form from "../../../ui/Form";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import Textarea from "../../../ui/TextArea";
import Button from "../../../ui/Button";
import { useSendMessage } from "./useSendMessage";

// -----------------------------------------------------------------------------
// Component: ContactForm
// Description: Form to receive information from the user in the Contact section.
// Features:
//   - High-performance and controlled form with React Hook Form
//   - Field verification (required, pattern, min/max length)
//   - Sending messages with Supabase(useSendMessage hook)
//   - Button disable + loading text during submission
// -----------------------------------------------------------------------------

export default function ContactForm() {
  // Custom hook that controls the status of sending messages to Supabase and loading
  const { sendMessage, isPending } = useSendMessage();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // Form submit function
  const onSubmit = (data) => {
    sendMessage(data, {
      onSuccess: () => {
        reset(); // Clear form after successful submission
      },
    });
  };

  return (
    <Form className="md:w-[60%] w-full" onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        className="lg:flex-row md:flex-col sm:flex-row flex-col"
        columns={2}
      >
        <Input
          disabled={isPending}
          register={register}
          name="firstName"
          rules={{ required: "First name is required" }}
          errors={errors}
          placeholder="First Name"
        />
        <Input
          disabled={isPending}
          register={register}
          name="lastName"
          rules={{ required: "Last name is required" }}
          errors={errors}
          placeholder="Last Name"
        />
      </FormRow>

      <FormRow>
        <Input
          disabled={isPending}
          register={register}
          name="email"
          type="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          }}
          errors={errors}
          placeholder="Email Address"
        />
      </FormRow>

      <FormRow>
        <Textarea
          disabled={isPending}
          register={register}
          name="message"
          rules={{
            required: "Message is required",
            minLength: {
              value: 10,
              message: "Message must be at least 10 characters",
            },
            maxLength: {
              value: 100,
              message: "The message must contain no more than 100 characters.",
            },
          }}
          errors={errors}
          placeholder="Your Message"
        />
      </FormRow>

      {/* --- form submission button --- */}
      <Button disabled={isPending} type="submit" animated>
        {isPending ? "Sending..." : "Send Message"}
      </Button>
    </Form>
  );
}
