import {
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import type { Item, Order } from "../intarfaces/Order";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { Plus, Save } from "lucide-react";
import toast from "react-hot-toast";
import { AddOrder } from "../api";

interface FormCustomerProps {
  orderForm: Order;
  setOrderForm: Dispatch<SetStateAction<Order>>;
}

export default function FormOrder({ orderForm, setOrderForm }: FormCustomerProps) {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "", qty: 0 },
    { id: 2, name: "", qty: 0 },
  ]);

  useEffect(() => {
    const filtered = items.filter((item) => item.id && item.name.trim() !== "" && item.qty > 0);
    setOrderForm((prev) => ({
      ...prev,
      items: filtered,
    }));
  }, [items, setOrderForm]);

  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(orderForm));
  }, [orderForm]);

  useEffect(() => {
    const existData = localStorage.getItem("order");
    if (existData) {
      const parsed = JSON.parse(existData) as Order;
      setOrderForm(parsed);
      if (parsed.items.length) setItems(parsed.items);
    }
  }, [setOrderForm]);

  const handleAddOrder = () => {
    setItems((prevItems) => [...prevItems, { id: prevItems.length + 1, name: "", qty: 0 }]);
  };

  const handleItemChange = (index: number, field: keyof Item, value: string | number) => {
    setItems((prev) => {
      const updated = prev.map((item, i) =>
        i === index ? { ...item, [field]: field === "qty" ? Number(value) : value } : item,
      );

      return updated;
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    setOrderForm((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!orderForm.customer_id) return toast.error("Customer data required");
    if (!orderForm.total) return toast.error("Total Price required");

    const response = await AddOrder(orderForm);
    if (response.success === true) {
      localStorage.clear();

      setOrderForm({
        id: 0,
        date: "",
        total: 0,
        items: [],
        customer_id: 0,
      });

      setItems([
        { id: 1, name: "", qty: 0 },
        { id: 2, name: "", qty: 0 },
      ]);

      return toast.success("New Order Added Successfully");
    } else {
      return toast.error(response.message);
    }
  };

  return (
    <>
      <div className="mb-4 text-xs">
        <form onSubmit={handleSubmit}>
          <Button color="green" onClick={handleAddOrder}>
            <Plus className="h-4 w-4" />
            Add Order
          </Button>

          {items.map((item: Item, index: number) => (
            <div key={item.id} className="flex gap-1">
              <div className="flex flex-1 flex-col gap-1 pt-2">
                <label htmlFor={`name-${index}`}>Item Name</label>
                <Input
                  id={`name-${index}`}
                  value={item.name}
                  onChange={(e) => handleItemChange(index, "name", e.target.value)}
                />
              </div>

              <div className="flex w-24 flex-col gap-1 pt-2">
                <label htmlFor={`qty-${index}`}>Item Qty</label>
                <Input
                  id={`qty-${index}`}
                  type="number"
                  value={item.qty.toString()}
                  onChange={(e) => handleItemChange(index, "qty", e.target.value)}
                />
              </div>
            </div>
          ))}

          <div className="flex flex-1 flex-col gap-1 pt-2">
            <label htmlFor={`total`}>Total Price</label>
            <Input
              id={`total`}
              type="number"
              value={orderForm.total.toString()}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-end">
            <Button color="green" type="submit" className="mt-2">
              <Save className="h-4 w-4" /> Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
