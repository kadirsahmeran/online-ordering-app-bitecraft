// -----------------------------------------------------------------------------
// Hook: useSendMessage
// Description: Sends messages from the Contact form to Supabase with the sendMessage function.
// Features:
//   - Mutation management using React Query
// -----------------------------------------------------------------------------
import { useMutation } from "@tanstack/react-query";
import { apiMessage } from "../../../services/apiMessage";
import toast from "react-hot-toast";

export function useSendMessage() {
  const {
    mutate: sendMessage, // mutation function
    isPending, // upload status
    error, // error status
  } = useMutation({
    mutationFn: apiMessage, // message sending function
    onSuccess: () => {
      toast.success("Message sent successfully!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { sendMessage, isPending, error };
}
