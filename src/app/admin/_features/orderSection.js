"use client";
import { OrderHeader } from "../_components/orderHeader";
import { OrderTableHeader } from "../_components/orderTableHeader";
import { Profile } from "../_components/profile";
import { OrderList } from "../_components/orderList";
import { useEffect, useState } from "react";
import { Pagination } from "../_components/pagination";
import { getOptions } from "../utils/getOptions";
import { patchOptions } from "../utils/patchOptions";

export const OrderSection = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [page, setPage] = useState(1);
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(),
  });
  const ordersPerPage = 12;

  const getData = async () => {
    try {
      const options = getOptions();
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
  const filteredData = paginatedData.filter((order) => {
    if (!dateRange || !dateRange.from || !dateRange.to) return true; // guard
    const orderDate = new Date(order.createdAt);
    return orderDate >= dateRange.from && orderDate <= dateRange.to;
  });

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
    if (checked) {
      const pageOrderIds = paginatedData.map((o) => o._id);
      setSelectedOrders(pageOrderIds);
    } else {
      setSelectedOrders([]);
    }
  };

  const handleCheckboxChange = (orderId, checked) => {
    setSelectedOrders((prev) =>
      checked ? [...prev, orderId] : prev.filter((id) => id !== orderId)
    );
  };

  const bulkUpdateStatus = async (newStatus) => {
    if (selectedOrders.length === 0) return;
    try {
      const options = patchOptions();
      const res = await fetch("http://localhost:8000/food-order/bulk-update", {
        ...options,
        body: JSON.stringify({
          orderIds: selectedOrders,
          status: newStatus,
        }),
      });
      console.log("Selected Orders IDs:", selectedOrders);

      if (!res.ok) throw new Error("Failed to update orders");
      await res.json();

      getData();
      setSelectedOrders([]);
      setSelectAll(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setSelectAll(false);
    setSelectedOrders([]);
  }, [page]);

  return (
    <div className="w-[80%] mt-6 flex flex-col items-end mb-15 justify-between">
      <Profile />
      <div className="w-full h-[892px] bg-white rounded-lg border-2 border-[#e4e4e7]">
        <OrderHeader
          selectedCount={selectedOrders.length}
          orders={data.length}
          setDateRange={setDateRange}
          bulkUpdateStatus={bulkUpdateStatus}
          dateRange={dateRange}
        />
        <OrderTableHeader
          selectAll={selectAll}
          setSelectAll={handleSelectAll}
        />

        {loading ? (
          <div className="w-full h-[600px] flex items-center justify-center text-gray-500 text-lg">
            Loading orders...
          </div>
        ) : filteredData?.length === 0 ? (
          <div className="w-full h-[600px] flex items-center justify-center text-gray-500 text-lg">
            No orders found.
          </div>
        ) : (
          filteredData.map((order, index) => (
            <OrderList
              key={index}
              foodnums={order.foodOrderItems.length}
              Total={order.totalPrice}
              Customer={order.user.email}
              Address={order.user.address || "N/A"}
              date={order.createdAt}
              className={
                index === filteredData.length - 1 ? "rounded-b-sm" : ""
              }
              isChecked={selectedOrders.includes(order._id)}
              handleCheckboxChange={(checked) =>
                handleCheckboxChange(order._id, checked)
              }
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
