import { useEffect, useState } from "react";
import { GetCustomers } from "../api";
import Table from "../components/Table";
import type { Customer } from "../interfaces/customer";
import { Plus } from "lucide-react";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";

export default function ListPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const getCustomers = await GetCustomers();
        setCustomers(getCustomers.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <>
      {!loading && (
        <div className="flex flex-col font-normal">
          <div className="text-md text-gray-500">List Customer</div>

          <div className="mt-4 rounded-sm border border-gray-100 bg-white px-2 shadow-sm">
            <div className="border-b border-gray-200">
              <Link to={"/customer/add"} className="my-2 flex items-center">
                <Button color="green">
                  <Plus className="h-4 w-4" /> Add New Customer
                </Button>
              </Link>
            </div>
            <div className="my-4 text-xs">
              {!customers?.length || error ? "Failed to fetch" : <Table customers={customers} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
