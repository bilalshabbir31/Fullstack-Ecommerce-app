import { useState } from "react"
import CommonForm from "../common/Form"
import { DialogContent } from "../ui/dialog"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { Badge } from "../ui/badge"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllOrders, getOrder, updateOrderStatus } from "@/store/admin/order-slice"
import { useToast } from "@/hooks/use-toast"

const initialFormData = {
  status: ''
}

const AdminOrderDetailsDailog = ({ order }) => {

  const [formData, setFormData] = useState(initialFormData);
  const { user } = useSelector(state => state.auth);
  const { toast } = useToast();
  const dispatch = useDispatch();

  function handleUpdateStatus(event) {
    event.preventDefault();
    const { status } = formData;
    dispatch(updateOrderStatus({ id: order?._id, orderStatus: status })).then(data => {
      if (data?.payload?.success) {
        dispatch(getOrder(order?._id));
        dispatch(fetchAllOrders());
        setFormData(initialFormData);
        toast({
          title: data?.payload?.message
        })
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{order?._id}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{order?.orderDate.split('T')[0]}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${order?.totalAmount}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Payment Method</p>
            <Label>{order?.paymentMethod}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{order?.paymentStatus}</Label>
          </div>
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge className={`py-1 px-3 ${order?.orderStatus === 'confirmed' ? 'bg-green-500' : order?.orderStatus === 'rejected' ? 'bg-red-600' : 'bg-black'}`}>{order?.orderStatus}</Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {
                order?.cartItems && order?.cartItems.length > 0 ? order?.cartItems.map(item => <li key={item.productId} className="flex items-center justify-between">
                  <span>Title: {item?.title}</span>
                  <span>Quantity: {item?.quantity}</span>
                  <span>Price: ${item?.price}</span>
                </li>) : null
              }
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user?.userName}</span>
              <span>{order?.addressInfo?.address}</span>
              <span>{order?.addressInfo?.city}</span>
              <span>{order?.addressInfo?.pincode}</span>
              <span>{order?.addressInfo?.phone}</span>
              <span>{order?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  )
}

export default AdminOrderDetailsDailog