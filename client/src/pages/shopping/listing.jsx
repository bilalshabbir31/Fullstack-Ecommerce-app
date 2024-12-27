import ProductFilter from "@/components/shopping/filter"
import ProductDetailsDailog from "@/components/shopping/productDetailsDailog"
import ShoppingProductTile from "@/components/shopping/productTile"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { sortOptions } from "@/config"
import { useToast } from "@/hooks/use-toast"
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice"
import { fetchAllFilteredProducts, fetchProduct } from "@/store/shop/product-slice"
import { ArrowUpDownIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(',')
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
  }
  return queryParams.join('&');
}

const ShoppingListing = () => {

  const dispatch = useDispatch();
  const { products, product } = useSelector(state => state.shopProducts);
  const { user } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state.shopCart)
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { toast } = useToast();
  const categorySearchParam = searchParams.get('category')

  function handleFilters(sectionId, currentOptions) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(sectionId);
    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [sectionId]: [currentOptions]
      }
    } else {
      const indexOfCurrentOption = cpyFilters[sectionId].indexOf(currentOptions);
      if (indexOfCurrentOption === -1) {
        cpyFilters[sectionId].push(currentOptions)
      } else {
        cpyFilters[sectionId].splice(indexOfCurrentOption, 1);
      }
    }
    setFilters(cpyFilters);
    sessionStorage.setItem('filters', JSON.stringify(cpyFilters));
  }

  function handleSort(value) {
    setSort(value);
  }

  function handleGetProductDetails(productId) {
    dispatch(fetchProduct(productId))
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

  useEffect(() => {
    setSort('price-lowtohigh');
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {});
  }, [categorySearchParam])

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(fetchAllFilteredProducts({ filtersParams: filters, sortParams: sort }));
    }
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const queryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(queryString))
    }
  }, [filters])

  useEffect(() => {
    if (product !== null) {
      setOpenDetailsDialog(true)
    }
  }, [product])

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilters={handleFilters} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex item-center gap-3">
            <span className="text-muted-foreground mt-2">
              {products?.length}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {
                    sortOptions.map(option => <DropdownMenuRadioItem value={option.id} key={option.id}>
                      {option.label}
                    </DropdownMenuRadioItem>)
                  }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {
            products && products.length > 0 ?
              products.map(product => <ShoppingProductTile handleGetProductDetails={handleGetProductDetails} key={product._id} product={product} handleAddToCart={handleAddToCart} />) : null
          }
        </div>
      </div>
      <ProductDetailsDailog open={openDetailsDialog} setOpen={setOpenDetailsDialog} product={product} />
    </div>
  )
}

export default ShoppingListing