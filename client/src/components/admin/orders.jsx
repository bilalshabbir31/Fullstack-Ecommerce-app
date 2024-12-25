import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Dialog } from "../ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import AdminOrderDetailsDailog from "./OrderDetailsDailog"
import { fetchAllOrders, getOrder, resetOrderDetails } from "@/store/admin/order-slice"
import { useDispatch, useSelector } from "react-redux"
import { Badge } from "../ui/badge"

const Orders = () => {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { orders, order } = useSelector(state => state.adminOrder);

  function handleOrderDetails(orderId) {
    dispatch(getOrder(orderId))
  }

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch])

  useEffect(() => {
    if (order !== null) setOpenDetailsDialog(true);
  }, [order])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              orders && orders.length > 0 ?
                orders.map(item => <TableRow key={item?._id}>
                  <TableCell>{item?._id}</TableCell>
                  <TableCell>{item?.orderDate.split('T')[0]}</TableCell>
                  <TableCell>
                    <Badge className={`py-1 px-3 ${item?.orderStatus === 'confirmed' ? 'bg-green-500' : item?.orderStatus === 'rejected' ? 'bg-red-600' : 'bg-black'}`}>{item?.orderStatus}</Badge>
                  </TableCell>
                  <TableCell>${item?.totalAmount}</TableCell>
                  <TableCell>
                    <Dialog open={openDetailsDialog} onOpenChange={() => {
                      setOpenDetailsDialog(false);
                      dispatch(resetOrderDetails());
                    }}>
                      <Button onClick={() => handleOrderDetails(item?._id)}>View Details</Button>
                      <AdminOrderDetailsDailog order={order} />
                    </Dialog>
                  </TableCell>
                </TableRow>) : null
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default Orders