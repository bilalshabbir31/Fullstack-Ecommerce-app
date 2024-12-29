import { StarIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { Dialog, DialogContent } from "../ui/dialog"
import { Separator } from "../ui/separator"
import { Input } from "../ui/input"
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"
import { useToast } from "@/hooks/use-toast"
import { useDispatch, useSelector } from "react-redux"
import { setProductDetails } from "@/store/shop/product-slice"
import { Label } from "../ui/label"
import StartRating from "../common/startRating"
import { useEffect, useState } from "react"
import { addReview, fetchReviews } from "@/store/shop/review-slice"

const ProductDetailsDailog = ({ open, setOpen, product }) => {

  const [reviewMsg, setReviewMsg] = useState('');
  const [rating, setRating] = useState(0);
  const { user } = useSelector(state => state.auth);
  const { cartItems } = useSelector(state => state.shopCart);
  const { reviews } = useSelector(state => state.shopReview);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleAddToCart(productId, totalStock) {
    let items = cartItems.items || [];
    if (items.length) {
      const indexOfCurrentItem = items.findIndex(item => item.productId === productId)
      if (indexOfCurrentItem > -1) {
        const quantity = items[indexOfCurrentItem].quantity;

        if (quantity + 1 > totalStock) {
          toast({
            title: `Only ${quantity} quantity can be added for this item`,
            variant: 'destructive'
          })
          return;
        }
      }
    }
    dispatch(addToCart({ userId: user?.id, productId, quantity: 1 })).then(data => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: 'Product is added to cart'
        })
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg('');
  }

  function handleRatingChange(value) {
    setRating(value);
  }

  function handleAddReview() {
    dispatch(addReview({
      productId: product?._id,
      userId: user?.id,
      userName: user?.userName,
      reviewMessage: reviewMsg,
      reviewValue: rating,
    })).then(data => {
      if (data?.payload.success) {
        setRating(0);
        setReviewMsg('');
        dispatch(fetchReviews(product?._id));
        toast({
          title: 'Review Added Successfully!'
        })
      }
    })
  }

  useEffect(() => {
    if (product !== null) {
      dispatch(fetchReviews(product?._id));
    }
  }, [product]);

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:mx-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img src={product?.image} alt={product?.title} width={600} height={600} className="aspect-square w-full object-cover" />
        </div>
        <div>
          <div>
            <h1 className="text-3xl font-extrabold">{product?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">{product?.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className={`text-3xl font-bold text-primary ${product?.salePrice > 0 ? 'line-through' : ''}`}>{product?.price}</p>
            {
              product?.salePrice > 0 ? <p className="text-2xl font-bold text-muted-foreground">${product?.salePrice}</p> : null
            }
          </div>
          <div className="flex items-center gap-2 mt-2">
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <StarIcon className="w-5 h-5 fill-primary" />
            <span className="text-muted-foreground">(4.5)</span>
          </div>
          <div className="mt-5 mb-5">
            {
              product?.totalStock === 0 ? <Button className="w-full opacity-60 cursor-not-allowed">Out of Stock</Button> : <Button className="w-full" onClick={() => handleAddToCart(product?._id, product?.totalStock)}>Add to Cart</Button>
            }
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {
                reviews && reviews.length > 0 ?
                  reviews.map(review => <div key={review?._id} className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>{review?.userName[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{review?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StartRating rating={review?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">{review?.reviewMessage}</p>
                    </div>
                  </div>) : <h1>No Review</h1>
              }
            </div>
            <div className="mt-10 flex-col gap-2 flex">
              <Label>Write a review</Label>
              <div className="flex gap-1 ">
                <StartRating handleRatingChange={handleRatingChange} rating={rating} />
              </div>
              <Input name="reviewMessage" value={reviewMsg} onChange={(event) => setReviewMsg(event.target.value)} placeholder="Write a review" />
              <Button disabled={reviewMsg.trim() === ''} onClick={handleAddReview}>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductDetailsDailog