import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import { Controller, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import AddressInput from "../../ui/AddressInput";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router";
import useCreateOrder from "./useCreateOrder";
import CheckMinAmount from "../../ui/CheckMinAmount";
import toast from "react-hot-toast";
import Textarea from "../../ui/Textarea";

/**
 * OrderForm component
 * - Handles the order submission process
 * - Validates cart minimum, user info, phone, and delivery address
 * - Uses react-hook-form for form management
 * - Sends data via useCreateOrder hook
 */
export default function OrderForm() {
  const navigate = useNavigate();
  const { createOrderFn, isPending } = useCreateOrder();
  const {
    cartItems,
    totalFinalPrice,
    dispatch,
    totalOriginalPrice,
    hasDiscount,
    checkMinAmount,
    minimumAmount,
    totalItems,
    totalDiscount,
  } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  // Submit handler
  const onSubmit = (form) => {
    if (checkMinAmount) {
      toast.error(`Minimum order amount is ${minimumAmount}₺`);
      return;
    }

    const orderData = {
      ...form,
      orders: cartItems,
      totalFinalPrice,
      totalOriginalPrice,
      hasDiscount,
      totalDiscount,
      totalItems,
    };

    createOrderFn(orderData, {
      onSuccess: (data) => {
        reset();
        navigate(
          `/order-confirmation/${data.id}?token=${data.confirmation_token}`
        );
        dispatch({ type: "CLEAR_CART" });
      },
    });
  };

  // Address validation using OpenStreetMap API
  const validateAddress = async (val) => {
    if (!val || !val.trim()) return "Delivery address is required.";

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
          new URLSearchParams({
            q: val,
            format: "json",
            limit: "1",
            addressdetails: "1",
          })
      );

      const data = await res.json();
      if (data?.length > 0 && data[0].lat && data[0].lon) {
        return true;
      } else {
        return "This address was not found.";
      }
    } catch (err) {
      console.error("Address validation error:", err);
      return "Address verification failed. Please try again.";
    }
  };

  return (
    <Form
      className="lg:w-[65%] w-full"
      onSubmit={handleSubmit(onSubmit)}
      title="Delivery Information"
    >
      {/* Minimum amount warning */}
      <CheckMinAmount />

      {/* Delivery address */}
      <FormRow>
        <Controller
          name="address"
          control={control}
          rules={{ validate: validateAddress }}
          render={({ field, fieldState: { error } }) => (
            <AddressInput
              value={field.value || ""}
              onChange={field.onChange}
              error={error}
              disabled={isPending || checkMinAmount}
            />
          )}
        />
      </FormRow>

      {/* First and Last name */}
      <FormRow className="md:flex-row flex-col" columns={2}>
        <Input
          rules={{ required: "First name is required" }}
          register={register}
          errors={errors}
          name="firstName"
          placeholder="First Name"
          disabled={isPending || checkMinAmount}
        />
        <Input
          name="lastName"
          placeholder="Last Name"
          disabled={isPending || checkMinAmount}
          rules={{ required: "Last name is required" }}
          errors={errors}
          register={register}
        />
      </FormRow>

      {/* Phone */}
      <FormRow>
        <Input
          name="phone"
          placeholder="Phone Number"
          disabled={isPending || checkMinAmount}
          register={register}
          errors={errors}
          rules={{
            required: "Phone number is required",
            pattern: {
              value: /^(?:\+90|0)?5\d{9}$/,
              message: "Please enter a valid Turkish phone number",
            },
          }}
        />
      </FormRow>

      {/* Optional message */}
      <FormRow>
        <Textarea
          register={register}
          name="message"
          rows={5}
          placeholder="If you have a note, please write it down."
          disabled={isPending || checkMinAmount}
          rules={{
            maxLength: {
              value: 100,
              message: "The message must contain no more than 100 characters.",
            },
          }}
          errors={errors}
        />
      </FormRow>

      {/* Submit button */}
      <Button disabled={isPending || checkMinAmount} type="submit" animated>
        {isPending ? "Sending..." : "Send order"}
      </Button>
    </Form>
  );
}
