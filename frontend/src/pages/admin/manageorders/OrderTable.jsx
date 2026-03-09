import { useState, useEffect } from "react";
import {
    Table, Input, Tag, Button, Tooltip, Typography,
    Select, message, Popconfirm,
} from "antd";
import {
    SearchOutlined,
    FileTextOutlined,
    ShoppingCartOutlined,
    SyncOutlined,
} from "@ant-design/icons";

import {
    useSearchOrdersQuery,
    useUpdateOrderStatusMutation,
} from "../../../redux/features/orders/orderApi";
import Loading from "../../../components/Loading";
import OrderDetailModal from "../../../components/OrderDetailAdminModal";

const { Title } = Typography;
const { Option } = Select;

const typePaymentMap = {
    cash: "COD",
    vnpay: "VNPay",
};

const statusPaymentMap = {
    paid: { label: "Đã thanh toán", color: "green" },
    unpaid: { label: "Chưa thanh toán", color: "red" },
    pending: { label: "Đang chờ", color: "orange" },
};


const EDITABLE_STATUSES = [
    { value: "pending", label: "Chờ xử lý", color: "orange" },
    { value: "shipping", label: "Đang giao", color: "cyan" },
    { value: "delivered", label: "Đã giao", color: "green" },
    { value: "cancelled", label: "Đã hủy", color: "red" },
];

const orderStatusMap = Object.fromEntries(
    EDITABLE_STATUSES.map((s) => [s.value, s])
);

const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleString("vi-VN", {
        day: "2-digit", month: "2-digit", year: "numeric",
        hour: "2-digit", minute: "2-digit",
    });
};

const StatusSelector = ({ orderId, currentStatus }) => {
    const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();
    const [pendingStatus, setPendingStatus] = useState(null);
    const [open, setOpen] = useState(false);

    const current = orderStatusMap[currentStatus];

    const handleConfirm = async () => {
        try {
            await updateOrderStatus({ orderId: orderId, newStatus: pendingStatus }).unwrap();
            message.success("Cập nhật trạng thái thành công!");
        } catch (err) {
            message.error(err?.data?.message || "Cập nhật thất bại!");
        } finally {
            setPendingStatus(null);
            setOpen(false);
        }
    };

    return (
        <Popconfirm
            title="Thay đổi trạng thái"
            description={
                pendingStatus ? (
                    <span>
                        Chuyển sang{" "}
                        <Tag color={orderStatusMap[pendingStatus]?.color}>
                            {orderStatusMap[pendingStatus]?.label}
                        </Tag>
                        ?
                    </span>
                ) : null
            }
            open={open}
            onConfirm={handleConfirm}
            onCancel={() => { setPendingStatus(null); setOpen(false); }}
            okText="Xác nhận"
            cancelText="Hủy"
            okButtonProps={{ loading: isLoading }}
        >
            <Select
            className="w-full"
                value={currentStatus}
                size="small"
                loading={isLoading}
                suffixIcon={<SyncOutlined className={isLoading ? "animate-spin" : ""} />}
                onChange={(val) => {
                    setPendingStatus(val);
                    setOpen(true);
                }}

                optionLabelProp="label"
            >
                {EDITABLE_STATUSES.map((s) => (
                    <Option
                        key={s.value}
                        value={s.value}
                        label={
                            <Tag color={s.color} className="w-full m-0 ">
                                {s.label}
                            </Tag>
                        }
                        disabled={s.value === currentStatus}
                    >
                        <Tag className="w-full " color={s.color}>
                            {s.label}
                        </Tag>
                    </Option>
                ))}
            </Select>
        </Popconfirm>
    );
};

const OrderTable = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedQuery(searchQuery), 800);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    const { data, } = useSearchOrdersQuery({ q: debouncedQuery });
    const orders = data?.orders || [];

    const columns = [
        {
            title: "ID đơn hàng",
            dataIndex: "_id",
            key: "_id",
            width: 165,
            render: (id) => (
                <span className="font-mono text-xs text-gray-400 truncate block max-w-[148px]">
                    {id}
                </span>
            ),
        },

        {
            title: "Chi tiết",
            key: "detail",
            width: 90,
            align: "center",
            render: (_, record) => (
                <Tooltip title="Xem chi tiết đơn hàng">
                    <Button
                        type="link"
                        size="small"
                        icon={<FileTextOutlined />}
                        onClick={() => setSelectedOrder(record)}
                    >
                        Xem
                    </Button>
                </Tooltip>
            ),
        },
        {
            title: "Trạng thái đơn",
            dataIndex: "order_status",
            key: "order_status",
            width: 160,
            align: "center",
            render: (status, record) => (
                <StatusSelector orderId={record._id} currentStatus={status} />
            ),
        },
        {
            title: "Thành tiền",
            dataIndex: "order_total_cost",
            key: "order_total_cost",
            width: 130,
            align: "right",
            render: (cost) => (
                <span className="text-sm font-semibold text-emerald-600">
                    {cost ? Number(cost).toLocaleString("vi-VN") + "₫" : "—"}
                </span>
            ),
        },
        {
            title: "Thanh toán",
            dataIndex: "payment_type",
            key: "payment_type",
            width: 110,
            align: "center",
            render: (type) => (
                <Tag color={type === "vnpay" ? "purple" : "geekblue"}>
                    {typePaymentMap[type] || "Không rõ"}
                </Tag>
            ),
        },
        {
            title: "Tình trạng TT",
            dataIndex: "payment_status",
            key: "payment_status",
            width: 145,
            align: "center",
            render: (status) => {
                const s = statusPaymentMap[status];
                return s ? <Tag color={s.color}>{s.label}</Tag> : <Tag>Không rõ</Tag>;
            },
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            width: 140,
            render: (d) => <span className="text-xs text-gray-400">{formatDate(d)}</span>,
        },
        {
            title: "Cập nhật",
            dataIndex: "updatedAt",
            key: "updatedAt",
            width: 140,
            render: (d) => <span className="text-xs text-gray-400">{formatDate(d)}</span>,
        },
    ];

    // if (isLoading) return <Loading />;

    return (
        <div className="flex flex-col gap-4 p-4">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <ShoppingCartOutlined className="text-xl text-blue-500" />
                    <Title level={4} className="!mb-0 !text-gray-800">
                        Quản lý đơn hàng
                    </Title>
                    <Tag color="blue" className="ml-1">
                        {orders.length} đơn
                    </Tag>
                </div>

                <Input
                    allowClear
                    prefix={<SearchOutlined className="text-gray-400" />}
                    placeholder="Tìm theo tên đăng nhập, ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-xs"
                />
            </div>

            {/* Table */}
            <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
                <Table
                    columns={columns}
                    dataSource={orders}
                    rowKey="_id"
                    // loading={isLoading}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Tổng ${total} đơn hàng`,
                        className: "px-4 pb-2",
                    }}
                    rowClassName="hover:bg-blue-50/40 transition-colors"
                    scroll={{ x: 1200 }}
                    size="middle"
                />
            </div>

            {/* Order Detail Modal */}
            <OrderDetailModal
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
            />
        </div>
    );
};

export default OrderTable;