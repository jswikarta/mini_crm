import axios from "axios";
import type { Order } from "./intarfaces/Order";

export async function GetOrders() {
  try {
    const response = await axios.get("http://localhost:3000/api/order/");
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

export async function AddOrder(data: Order) {
  try {
    const response = await axios.post("http://localhost:3000/api/order/", {
      total: data.total,
      items: data.items,
      customer_id: data.customer_id,
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
