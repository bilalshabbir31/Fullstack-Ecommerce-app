import Address from "@/components/shopping/address"
import img from "../../assets/account.jpg"
import { useDispatch, useSelector } from "react-redux"
import CartContent from "@/components/shopping/cartContent"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { createNewOrder } from "@/store/shop/order-slice"
import { useToast } from "@/hooks/use-toast"
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51QGbRnLepBannWwsQ84CJ04cqi9vloqbKIhLky9BwSuCcwZQObFeTGiVrCQVQ9rhI9b2LAwb0pbuDCm7FHIfeHZG00z9F8tRG2")

const ShoppingCheckout = () => {

  const { cartItems } = useSelector(state => state.shopCart);
  const { user } = useSelector(state => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const totalCartAmount = cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items.reduce((sum, currentItem) => sum + (
    currentItem?.salePrice > 0 ? currentItem.salePrice : currentItem?.price
  ) * currentItem.quantity, 0) : 0

  async function handleInitialStripePayment() {

    if (cartItems?.items?.length === 0) {
      toast({
        title: 'Please add some items to cart',
        variant: 'destructive'
      });
      return;
    }

    if (currentSelectedAddress === null) {
      toast({
        title: 'Please select one address to proceed',
        variant: 'destructive'
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map(item => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: 'pending',
      paymentMethod: 'stripe',
      paymentStatus: 'pending',
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    }

    const stripe = await stripePromise;

    dispatch(createNewOrder(orderData)).then(async (data) => {
      if (data?.payload?.success) {
        const result = await stripe.redirectToCheckout({
          sessionId: data?.payload?.sessionId,
        });
        if (result.error) {
          toast({
            title: 'Something went wrong',
          })
        }
      } else {
        toast({
          title: 'Something went wrong',
        })
      }
    });
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} selectedId={currentSelectedAddress?._id} />
        <div className="flex flex-col gap-4">
          {
            cartItems && cartItems.items && cartItems.items.length > 0 ?
              cartItems.items.map(item => <CartContent key={item.productId} cartItem={item} />) : null
          }
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total Amount</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitialStripePayment} className="w-full">Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCheckout