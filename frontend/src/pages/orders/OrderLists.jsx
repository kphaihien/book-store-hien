import { Tag, Timeline, Empty, Divider, Tooltip } from "antd";
import { PiPackageDuotone } from "react-icons/pi";

import { useFetchOrdersByUserIdQuery } from "../../redux/features/orders/orderApi";
import { useAuth } from "../../context/AuthContext";
import Loading from "../../components/Loading";

import OrderCardUser from "../../components/OrderCardUser";

const OrderLists = () => {
  const { currentUser } = useAuth();
  const { data, isLoading } = useFetchOrdersByUserIdQuery(currentUser.id);
  const orders = data?.orders;

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col max-w-4xl gap-5 px-4 py-6 mx-auto">


      <div className="flex items-center gap-3">
        <PiPackageDuotone className="flex-shrink-0 w-8 h-8 text-yellow-500" />
        <div>
          <h1 className="text-2xl font-bold leading-tight text-gray-800">Đơn hàng của tôi</h1>
          {orders?.length > 0 && (
            <p className="text-sm text-gray-400">{orders.length} đơn hàng</p>
          )}
        </div>
      </div>


      {orders?.length > 0 ? (
        <div className="flex flex-col gap-4">
          {orders.map((order, index) => (
            <OrderCardUser key={order._id || index} order={order} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-white border border-gray-100 rounded-2xl">
          <Empty
            image={
              <PiPackageDuotone className="w-20 h-20 mx-auto text-gray-200" />
            }
            imageStyle={{ height: "auto" }}
            description={
              <span className="text-base text-gray-400">Bạn chưa có đơn hàng nào</span>
            }
          />
        </div>
      )}
    </div>
  );
};

export default OrderLists;