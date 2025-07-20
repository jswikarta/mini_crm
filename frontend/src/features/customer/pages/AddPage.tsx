import { useState, type ChangeEvent, type FormEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { Customer } from "../interfaces/customer";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { Save, Undo2 } from "lucide-react";
import { AddCustomer } from "../api";

export default function AddPage() {
  const navigate = useNavigate();
  const [customerForm, setCustomerForm] = useState<Customer>({
    id: 0,
    name: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    let newValue: string;

    switch (id) {
      case "name":
        newValue = value
          .slice(0, 50)
          .toLowerCase()
          .replace(/\b\w/g, (char) => char.toUpperCase());
        break;
      case "email":
        newValue = value.slice(0, 50);
        break;
      case "phone":
        newValue = value.startsWith("62")
          ? value
          : value.startsWith("0")
            ? "62" + value.slice(1)
            : "62" + value;
    }

    setCustomerForm((prevData) => ({
      ...prevData,
      [id]: newValue,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!customerForm.name.trim()) return toast.error("Customer Name is required");
    if (!customerForm.email.trim()) return toast.error("Customer E-mail is required");
    if (!customerForm.phone.trim()) return toast.error("Customer Phone is required");

    const response = await AddCustomer(customerForm);
    if (response.success === true) {
      return toast.success("New Customer Added Successfully");
    } else {
      return toast.error(response.message);
    }
  };

  return (
    <>
      <div className="text-xs">
        <Toaster />
      </div>
      <div className="flex flex-col font-normal">
        <div className="text-md text-gray-600">Add New Customer</div>
        <div className="mt-4 w-full rounded-sm border border-gray-100 bg-white px-2 shadow-sm md:w-128">
          <div className="flex items-center border-b border-gray-300 py-2">
            <Button color="red" onClick={() => navigate(-1)}>
              <Undo2 className="h-4 w-4" /> Back
            </Button>
          </div>

          <div className="my-2 text-xs">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="flex w-full flex-col gap-1 pt-2">
                <label htmlFor="name">Customer Name</label>
                <Input
                  id="name"
                  value={customerForm.name}
                  onChange={handleInputChange}
                  placeholder="Awal Ludin"
                />
              </div>

              <div className="flex gap-1">
                <div className="flex w-1/2 flex-col gap-1 pt-2">
                  <label htmlFor="email">Customer E-mail</label>
                  <Input
                    id="email"
                    type="email"
                    value={customerForm.email}
                    onChange={handleInputChange}
                    placeholder="example@gmail.com"
                  />
                </div>

                <div className="flex w-1/2 flex-col gap-1 pt-2">
                  <label htmlFor="phone">Customer Phone</label>
                  <Input
                    id="phone"
                    value={customerForm.phone}
                    onChange={handleInputChange}
                    placeholder="628XXXXXXXXXX"
                  />
                </div>
              </div>

              <Button type="submit" color="green" className="mt-2">
                <Save className="h-4 w-4" />
                Save
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
