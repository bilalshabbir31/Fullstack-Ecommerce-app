import ProductFilter from "@/components/shopping/filter"
import ShoppingProductTile from "@/components/shopping/productTile"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { sortOptions } from "@/config"
import { fetchAllFilteredProducts } from "@/store/shop/product-slice"
import { ArrowUpDownIcon } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const ShoppingListing = () => {

  const dispatch = useDispatch();
  const { products } = useSelector(state => state.shopProducts);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts());
  }, [dispatch])

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex item-center gap-3">
            <span className="text-muted-foreground mt-2">
              10 Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuGroup>
                  {
                    sortOptions.map(option => <DropdownMenuRadioItem key={option.id}>
                      {option.label}
                    </DropdownMenuRadioItem>)
                  }
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {
            products && products.length > 0 ?
              products.map(product => <ShoppingProductTile key={product._id} product={product} />) : null
          }
        </div>
      </div>
    </div>
  )
}

export default ShoppingListing