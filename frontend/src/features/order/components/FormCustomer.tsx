import { useEffect, useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import type { Customer } from "../../customer/interfaces/customer";
import { GetCustomers } from "../../customer/api";
import Input from "../../../components/Input";
import type { Order } from "../intarfaces/Order";

interface FormCustomerProps {
  setOrderForm: Dispatch<SetStateAction<Order>>;
}

export default function FormCustomer({ setOrderForm }: FormCustomerProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customers2, setCustomers2] = useState<Customer[]>([]);
  const [customer, setCustomer] = useState<Customer>({
    id: 0,
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const getCustomers = await GetCustomers();
        setCustomers(getCustomers.data);
      } catch (err) {
        console.log(err);
      }
    };

    const existData = localStorage.getItem("customer");
    if (existData) setCustomer(JSON.parse(existData));

    fetchCustomers();
  }, []);

  useEffect(() => {
    if (customer.id !== 0) {
      localStorage.setItem("customer", JSON.stringify(customer));
    }
  }, [customer]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCustomer(() => ({
      id: 0,
      name: value,
      email: "",
      phone: "",
    }));

    setCustomers2(
      value
        ? customers.filter((customer: Customer) =>
            customer.name.toLowerCase().includes(value.toLowerCase()),
          )
        : [],
    );
  };

  const handleCustomerClick = (id: number) => {
    const selected = customers.find((customer: Customer) => customer.id === id);
    if (selected) {
      setCustomer(selected);
      setCustomers2([]);
      setOrderForm((prevData) => {
        const updated = { ...prevData, customer_id: selected.id };
        localStorage.setItem("order", JSON.stringify(updated));
        return updated;
      });
    }
  };

  return (
    <>
      <div className="my-4 text-xs">
        <div className="flex w-full flex-col gap-1">
          <label htmlFor="name">
            Customer Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input id="name" value={customer?.name} onChange={handleInputChange} />

            <ul className="absolute top-full left-0 z-10 w-full bg-white">
              {customers2 &&
                customers2.map((customer: Customer) => (
                  <li
                    key={customer.id}
                    onClick={() => handleCustomerClick(customer.id)}
                    className="border-r border-b border-l border-gray-200 px-2 py-1 hover:bg-gray-100"
                  >
                    {customer.name}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="flex w-full flex-col gap-1 pt-2">
          <label htmlFor="email">Customer E-mail</label>
          <Input id="email" value={customer.email} readOnly={true} />
        </div>

        <div className="flex w-full flex-col gap-1 pt-2">
          <label htmlFor="phone">Customer Whatsapp</label>
          <Input id="phone" value={customer.phone} readOnly={true} />
        </div>
      </div>
    </>
  );
}
