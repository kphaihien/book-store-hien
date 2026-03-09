import { Tooltip } from "antd";
import CloseCircleOutlined from "@ant-design/icons/CloseCircleOutlined";
import CheckCircleOutlined from "@ant-design/icons/CheckCircleOutlined";
import CarOutlined from "@ant-design/icons/CarOutlined";
import ClockCircleOutlined from "@ant-design/icons/ClockCircleOutlined";

const ORDER_STATUS = {
    pending: { label: "Chờ xử lý", color: "orange", icon: <ClockCircleOutlined />, dot: "orange" },
    shipping: { label: "Đang giao", color: "cyan", icon: <CarOutlined />, dot: "cyan" },
    delivered: { label: "Đã giao", color: "green", icon: <CheckCircleOutlined />, dot: "green" },
    cancelled: { label: "Đã hủy", color: "red", icon: <CloseCircleOutlined />, dot: "red" },
};

const STATUS_STEPS = ["pending", "shipping", "delivered", "cancelled"];

const OrderStatusTrack = ({ status }) => {
    if (status === "cancelled") {
        return (
            <div className="flex items-center gap-2 mt-2">
                <CloseCircleOutlined className="text-red-500" />
                <span className="text-sm font-medium text-red-500">Đơn hàng đã bị hủy</span>
            </div>
        );
    }

    const currentIdx = STATUS_STEPS.indexOf(status);

    return (
        <div className="flex items-center w-full gap-1 mt-3">
            {STATUS_STEPS.map((step, i) => {
                const cfg = ORDER_STATUS[step];
                const isDone = i < currentIdx;
                const isActive = i === currentIdx;

                return (
                    <div key={step} className="flex items-center flex-1">
                        <Tooltip title={cfg.label}>
                            <div className={`flex flex-col items-center gap-1 flex-shrink-0`}>
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all
                    ${isDone ? "bg-yellow-500 text-white"
                                            : isActive ? "bg-white border-2 border-yellow-500 text-yellow-500"
                                                : "bg-gray-100 text-gray-300"}`}
                                >
                                    {cfg.icon}
                                </div>
                                <span
                                    className={`text-xs font-medium whitespace-nowrap hidden sm:block
                    ${isActive ? "text-black" : isDone ? "text-gray-600" : "text-gray-300"}`}
                                >
                                    {cfg.label}
                                </span>
                            </div>
                        </Tooltip>
                        {i < STATUS_STEPS.length - 1 && (
                            <div
                                className={`h-0.5 flex-1 mx-1 rounded transition-all
                  ${i < currentIdx ? "bg-blue-500" : "bg-gray-200"}`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};
export default OrderStatusTrack;