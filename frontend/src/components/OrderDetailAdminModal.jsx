import { Modal, Tag, Divider, Table } from "antd";
import {
    ShoppingOutlined,
    UserOutlined,
    EnvironmentOutlined,
    PhoneOutlined,
    CarOutlined,
} from "@ant-design/icons";
import  getBaseUrl  from "../utils/baseUrl";

const statusColorMap = {
    pending: "orange",
    processing: "blue",
    shipping: "cyan",
    delivered: "green",
    cancelled: "red",
};

const statusLabelMap = {
    pending: "Chờ xử lý",
    processing: "Đang xử lý",
    shipping: "Đang giao",
    delivered: "Đã giao",
    cancelled: "Đã hủy",
};


const OrderDetailAdminModal = ({ order, onClose }) => {
    if (!order) return null;
    console.log(order,"đây là order");
    
    const { order_details = [], order_buyer = {}, order_status } = order;

    const productColumns = [
        {
            title: "Ảnh",
            dataIndex: "book_img",
            key: "book_img",
            width: 64,
            render: (img) =>
                img ? (
                    <img
                        src={`${getBaseUrl()}/public/${img}`}
                        alt="product"
                        className="object-cover w-10 rounded shadow-sm h-14"
                    />
                ) : (
                    <div className="flex items-center justify-center w-10 text-gray-300 bg-gray-100 rounded h-14">
                        <ShoppingOutlined />
                    </div>
                ),
        },
        {
            title: "Tên sách",
            dataIndex: "book_name",
            key: "book_name",
            render: (name) => (
                <span className="text-sm font-medium text-gray-800">{name || "—"}</span>
            ),
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            width: 80,
            align: "center",
            render: (qty) => (
                <Tag color="blue" className="font-mono">
                    x{qty}
                </Tag>
            ),
        },
        {
            title: "Đơn giá",
            dataIndex: "unit_price",
            key: "unit_price",
            width: 120,
            align: "right",
            render: (price) => (
                <span className="text-sm font-semibold text-emerald-600">
                    {Number(price)?.toLocaleString("vi-VN")}₫
                </span>
            ),
        },
        {
            title: "Thành tiền",
            key: "subtotal",
            width: 130,
            align: "right",
            render: (_, record) => (
                <span className="text-sm font-semibold text-gray-700">
                    {(Number(record.unit_price) * Number(record.quantity))?.toLocaleString("vi-VN")}₫
                </span>
            ),
        },
    ];

    return (
        <Modal
            open={!!order}
            onCancel={onClose}
            footer={null}
            width={720}
            title={
                <div className="flex items-center gap-3">
                    <ShoppingOutlined className="text-lg text-blue-500" />
                    <span className="font-semibold text-gray-800">Chi tiết đơn hàng</span>
                    <span className="text-xs text-gray-400 font-mono truncate max-w-[180px]">
                        #{order._id}
                    </span>
                    {order_status && (
                        <Tag color={statusColorMap[order_status] || "default"}>
                            {statusLabelMap[order_status] || order_status}
                        </Tag>
                    )}
                </div>
            }
        >
            {/* Thông tin người mua */}
            <div className="p-4 mb-4 border border-gray-100 bg-gray-50 rounded-xl">
                <p className="flex items-center gap-1 mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    <UserOutlined /> Thông tin người mua
                </p>    
                <div className="grid grid-cols-2 text-sm gap-y-2 gap-x-6">
                    <div className="flex items-center gap-2 text-gray-700">
                        <UserOutlined className="text-gray-400" />
                        <span className="font-medium">{order_buyer?.order_name || order_buyer?.name || "—"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                        <PhoneOutlined className="text-gray-400" />
                        <span>{order_buyer?.order_phone || "Không có SĐT"}</span>
                    </div>
                    <div className="flex items-start col-span-2 gap-2 text-gray-700">
                        <EnvironmentOutlined className="text-gray-400 mt-0.5" />
                        <span>{order_buyer?.order_address || "Không có địa chỉ"}</span>
                    </div>
                    {order_buyer?.note && (
                        <div className="col-span-2 pl-5 text-xs italic text-gray-500">
                            Ghi chú: {order_buyer.note}
                        </div>
                    )}
                </div>
            </div>

            {/* Trạng thái vận chuyển */}
            <div className="flex items-center gap-3 px-1 mb-4">
                <CarOutlined className="text-blue-400" />
                <div className="flex flex-wrap gap-2">
                    {["pending", "processing", "shipping", "delivered"].map((step, i) => {
                        const steps = ["pending", "processing", "shipping", "delivered"];
                        const currentIdx = steps.indexOf(order_status);
                        const isActive = i <= currentIdx;
                        return (
                            <div key={step} className="flex items-center gap-1">
                                <span
                                    className={`text-xs px-2 py-0.5 rounded-full font-medium transition-all ${isActive
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-100 text-gray-400"
                                        }`}
                                >
                                    {statusLabelMap[step]}
                                </span>
                                {i < 3 && (
                                    <span className={`text-xs ${isActive && i < currentIdx ? "text-blue-400" : "text-gray-200"}`}>
                                        →
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <Divider className="my-3" />

            {/* Danh sách sản phẩm */}
            <p className="flex items-center gap-1 mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                <ShoppingOutlined /> Sản phẩm ({order_details.length})
            </p>
            <Table
                columns={productColumns}
                dataSource={order_details}
                rowKey={(r, i) => r._id || i}
                pagination={false}
                size="small"
                className="overflow-hidden rounded-lg"
            />

            {/* Tổng tiền */}
            <div className="flex justify-end pt-3 mt-4 border-t border-gray-100">
                <div className="text-right">
                    <p className="text-xs text-gray-400">Tổng thanh toán</p>
                    <p className="text-xl font-bold text-emerald-600">
                        {Number(order.order_total_cost)?.toLocaleString("vi-VN")}₫
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default OrderDetailAdminModal;