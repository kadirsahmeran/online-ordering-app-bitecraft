// -----------------------------------------------------------------------------
// Function: apiMessage
// Description: supabase also adds the message data to the relevant table.
// Features:
//   - Adding a message with the Subbase insert method
//   - Throwing an exception on error

// -----------------------------------------------------------------------------
import { supabase } from "./supabase";

export async function apiMessage(formData) {
  const { firstName, lastName, email, message } = formData;

  const { error } = await supabase.from("contact_messages").insert([
    {
      first_name: firstName,
      last_name: lastName,
      email: email,
      message: message,
    },
  ]);

  if (error) {
    throw new Error("Message could not be sent");
  }
}
