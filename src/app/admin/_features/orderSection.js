"use client";
import { OrderHeader } from "../_components/orderHeader";
import { OrderTableHeader } from "../_components/orderTableHeader";
import { Profile } from "../_components/profile";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { OrderList } from "../_components/orderList";
import { useEffect, useState } from "react";
import { Pagination } from "../_components/pagination";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDA0NjFlZTJkYjUyMTk3ODM1ZDlmZiIsImVtYWlsIjoiem9sYjY0NkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NjE2MjU2NTUsImV4cCI6MTc2MjIzMDQ1NX0.lMosgQwpXzQlke1v_mWbVwE0R0vhMExXz-pZ0bLA4kE",
  },
};

export const OrderSection = ({ setIsOpen }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [page, setPage] = useState(1);
  const ordersPerPage = 12;

  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/food-order", options);
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setData(json.orders || []);
      console.log("Fetched orders:", json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const totalPages = Math.ceil(data.length / ordersPerPage);
  const startIndex = (page - 1) * ordersPerPage;
  const paginatedData = data.slice(startIndex, startIndex + ordersPerPage);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, 5);
      } else if (page >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(page - 2, page - 1, page, page + 1, page + 2);
      }
    }
    return pages;
  };

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    setSelectedCount(checked ? paginatedData.length : 0);
  };

  const handleCheckboxChange = (checked) => {
    setSelectedCount((prev) => prev + (checked ? 1 : -1));
  };

  return (
    <div className="w-[80%] mt-6 flex flex-col items-end mb-15 justify-between">
      <Profile />
      <div className="w-full h-[892px] bg-white rounded-lg border-2 border-[#e4e4e7]">
        <OrderHeader
          setIsOpen={setIsOpen}
          selectedCount={selectedCount}
          orders={data.length}
        />
        <OrderTableHeader
          selectAll={selectAll}
          setSelectAll={handleSelectAll}
        />

        {loading ? (
          <div className="w-full h-[600px] flex items-center justify-center text-gray-500 text-lg">
            Loading orders...
          </div>
        ) : data?.length === 0 ? (
          <div className="w-full h-[600px] flex items-center justify-center text-gray-500 text-lg">
            No orders found.
          </div>
        ) : (
          paginatedData.map((order, index) => (
            <OrderList
              key={index}
              foodnums={order.foodOrderItems.length}
              Total={order.totalPrice}
              Customer={order.user.email}
              Address={"null"}
              date={order.createdAt}
              className={
                index === paginatedData.length - 1 ? "rounded-b-sm" : ""
              }
              isChecked={selectAll}
              handleCheckboxChange={handleCheckboxChange}
              num={index + 1 + (page - 1) * ordersPerPage}
              status={order.status}
              orderId={order._id}
              foods={order.foodOrderItems}
            />
          ))
        )}
      </div>

      <Pagination
        getPageNumbers={getPageNumbers}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
};
