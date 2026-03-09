import OrderStatusTrack from "./OrderStatusTrack";
import { CarOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined, CreditCardOutlined, DollarOutlined } from "@ant-design/icons";
import { ShoppingOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import getBaseUrl from "../utils/baseUrl";
import beautyVND from "../utils/beautyVND";

const ORDER_STATUS = {
    pending: { label: "Chờ xử lý", color: "orange", icon: <ClockCircleOutlined />, dot: "orange" },
    shipping: { label: "Đang giao", color: "cyan", icon: <CarOutlined />, dot: "cyan" },
    delivered: { label: "Đã giao", color: "green", icon: <CheckCircleOutlined />, dot: "green" },
    cancelled: { label: "Đã hủy", color: "red", icon: <CloseCircleOutlined />, dot: "red" },
};

const PAYMENT_STATUS = {
    paid: { label: "Đã thanh toán", color: "green" },
    pending: { label: "Chưa thanh toán", color: "orange" },
};

const PAYMENT_TYPE = {
    cash: { label: "Thanh toán khi nhận hàng", icon: <DollarOutlined /> },
    vnpay: { label: "VNPay", icon: <CreditCardOutlined /> },
};
const OrderCardUser = ({ order, index }) => {
  const statusCfg = ORDER_STATUS[order.order_status] || ORDER_STATUS.pending;
  const payStatusCfg = PAYMENT_STATUS[order.payment_status] || PAYMENT_STATUS.pending;
  const payTypeCfg = PAYMENT_TYPE[order.payment_type] || PAYMENT_TYPE.cash;

  const formatDate = (d) =>
    d ? new Date(d).toLocaleString("vi-VN", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    })
      : null;

  return (
    <div className="overflow-hidden transition-shadow bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md">

      {/* Card Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-xl">
            <ShoppingOutlined className="text-sm text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight text-gray-800">
              Đơn hàng #{index + 1}
            </p>
            {order.createdAt && (
              <p className="text-xs text-gray-400">{formatDate(order.createdAt)}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Tag color={payStatusCfg.color} className="m-0 text-xs rounded-full">
            {payStatusCfg.label}
          </Tag>
          <Tag color={statusCfg.color} icon={statusCfg.icon} className="m-0 text-xs rounded-full">
            {statusCfg.label}
          </Tag>
        </div>
      </div>

      <div className="flex flex-col gap-5 p-5 lg:flex-row">

        <div className="flex-1 min-w-0">
          <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            Sản phẩm ({order.order_details?.length || 0})
          </p>
          <div className="flex flex-col gap-2 pr-1 overflow-y-auto max-h-44">
            {order.order_details?.map((product, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-2 transition-colors rounded-xl bg-gray-50 hover:bg-blue-50/40"
              >
                <img
                  src={`${getBaseUrl()}/public/${product.book_img}`}
                  alt={product.book_name}
                  className="flex-shrink-0 object-cover w-10 rounded-lg shadow-sm h-14"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{product.book_name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {product.quantity} cuốn
                    {product.unit_price && (
                      <span className="ml-2 font-semibold text-emerald-600">
                        {beautyVND(product.unit_price)} / cuốn
                      </span>
                    )}
                  </p>
                </div>
                <span className="flex-shrink-0 px-2 py-1 text-xs text-gray-400 bg-white border border-gray-100 rounded-lg">
                  x{product.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col flex-shrink-0 gap-4 lg:w-64">

          <div className="p-3 bg-emerald-50 rounded-xl">
            <p className="mb-1 text-xs text-gray-400">Tổng thanh toán</p>
            <p className="text-xl font-bold leading-tight text-emerald-600">
              {beautyVND(order.order_total_cost)}
            </p>
          </div>


          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-gray-400">{payTypeCfg.icon}</span>
            <span>{payTypeCfg.label}</span>
          </div>


          {order.order_buyer && (
            <div className="flex flex-col gap-1 text-xs text-gray-500">
              <p className="font-medium text-gray-700">{order.order_buyer.order_name}</p>
              <p>{order.order_buyer.order_phone}</p>
              <p className="line-clamp-2">{order.order_buyer.order_address}</p>
            </div>
          )}


          <OrderStatusTrack status={order.order_status} />
        </div>
      </div>
    </div>
  );
};
export default OrderCardUser;