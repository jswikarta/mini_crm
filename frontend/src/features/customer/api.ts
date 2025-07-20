import axios from "axios";
import type { Customer } from "./interfaces/customer";

export async function GetCustomers() {
  try {
    const response = await axios.get("http://localhost:3000/api/customer/");
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "An unexpected error occurred",
    };
  }
}

export async function GetOrderByCustomer(id: number) {
  try {
    const response = await axios.get(`http://localhost:3000/api/order/${id}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "An unexpected error occurred",
    };
  }
}

export async function AddCustomer(data: Customer) {
  try {
    const response = await axios.post("http://localhost:3000/api/customer/", {
      name: data.name,
      email: data.email,
      phone: data.phone,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: axios.isAxiosError(error)
        ? error.response?.data?.message || error.message
        : "An unexpected error occurred",
    };
  }
}
