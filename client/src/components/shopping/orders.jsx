import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Dialog } from "../ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import ShoppingOrderDetailsDailog from "./OrderDetailsDailog"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllOrdersByUserId, getOrder, resetOrderDetails } from "@/store/shop/order-slice"
import { Badge } from "../ui/badge"

const ShoppingOrders = () => {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { orders, order } = useSelector(state => state.shopOrder);

  function handleOrderDetails(orderId) {
    dispatch(getOrder(orderId))
  }

  useEffect(() => {
    dispatch(fetchAllOrdersByUserId(user?.id));
  }, [dispatch])

  useEffect(() => {
    if (order !== null) {
      setOpenDetailsDialog(true);
    }
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
                      <ShoppingOrderDetailsDailog order={order} />
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

export default ShoppingOrders