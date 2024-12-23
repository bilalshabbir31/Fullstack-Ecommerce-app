import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom";

const StripeReturnPage = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const sessionId = params.get('session_id');

  useEffect(() => {
    if (sessionId) {
      const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'));
      dispatch(capturePayment({ sessionId, orderId })).then(data => {
        if (data?.payload?.success) {
          sessionStorage.removeItem('currentOrderId');
          window.location.href = '/shop/payment-success';
        }
      });
    }
  }, [sessionId, dispatch])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment... Please Wait!</CardTitle>
      </CardHeader>
    </Card>
  )

}

export default StripeReturnPage