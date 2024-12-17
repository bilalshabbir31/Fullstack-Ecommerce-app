import { Minus, Plus, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

const CartContent = ({ cartItem }) => {

  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const { toast } = useToast()

  function handleCartItemDelete(item) {
    dispatch(deleteCartItem({ userId: user?.id, productId: item?.productId })).then(data => {
      if (data?.payload?.success) {
        toast({
          title: 'Cart item is deleted Successfully'
        })
      }
    });
  }

  function handleUpdateQuantity(item, type) {
    dispatch(updateCartQuantity({ userId: user?.id, productId: item?.productId, quantity: type === "plus" ? item?.quantity + 1 : item?.quantity - 1 })).then(data => {
      if (data?.payload?.success) {
        toast({
          title: 'Cart item is updated Successfully'
        })
      }
    })
  }

  return (
    <div className="flex items-center space-x-4">
      <img src={cartItem?.image} alt={cartItem?.title} className="w-20 h-20 rounded object-cover" />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex items-center mt-1 gap-2">
          <Button disabled={cartItem.quantity === 1} onClick={() => handleUpdateQuantity(cartItem, 'minus')} variant="outline" size="icon" className="h-8 w-8 rounded-full">
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button onClick={() => handleUpdateQuantity(cartItem, 'plus')} variant="outline" size="icon" className="h-8 w-8 rounded-full">
            <Plus className="w-4 h-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          ${((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem?.quantity).toFixed(2)}
        </p>
        <Trash onClick={() => handleCartItemDelete(cartItem)} className="cursor-pointer mt-1" size={20} />
      </div>
    </div>
  )
}

export default CartContent