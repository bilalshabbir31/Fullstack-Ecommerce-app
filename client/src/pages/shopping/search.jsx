import ProductDetailsDailog from "@/components/shopping/productDetailsDailog";
import ShoppingProductTile from "@/components/shopping/productTile";
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProduct } from "@/store/shop/product-slice";
import { resetSearchResults, searchProducts } from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const SearchProducts = () => {

  const [keyword, setKeyword] = useState('');
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { results } = useSelector(state => state.shopSearch);
  const { cartItems } = useSelector(state => state.shopCart);
  const { product } = useSelector(state => state.shopProducts);
  const { user } = useSelector(state => state.auth);
  const { toast } = useToast();
  const dispatch = useDispatch();

  function handleChange(event) {
    setKeyword(event.target.value);
  }

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

  function handleGetProductDetails(productId) {
    dispatch(fetchProduct(productId))
  }

  useEffect(() => {
    if (keyword && keyword.trim() !== '' && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
        dispatch(searchProducts(keyword))
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`))
      dispatch(resetSearchResults())
    }
  }, [keyword])

  useEffect(() => {
    if (product !== null) {
      setOpenDetailsDialog(true)
    }
  }, [product]);

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input className="py-6" placeholder='Search Products' name="keyword" value={keyword} onChange={handleChange} />
        </div>
      </div>
      {
        !results.length ? <h1 className="text-5xl font-extrabold">No Result found</h1> : null
      }
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {
          results.map(item => <ShoppingProductTile key={item._id} handleAddToCart={handleAddToCart} handleGetProductDetails={handleGetProductDetails} product={item} />)
        }
      </div>
      <ProductDetailsDailog open={openDetailsDialog} setOpen={setOpenDetailsDialog} product={product} />
    </div>
  )
}

export default SearchProducts