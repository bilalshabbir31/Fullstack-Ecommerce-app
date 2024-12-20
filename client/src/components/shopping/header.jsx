import { House, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { shoppingViewHeaderMenuItems } from "@/config"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { logoutUser } from "@/store/auth-slice"
import CartWrapper from "./cartWrapper"
import { useEffect, useState } from "react"
import { fetchCartItems } from "@/store/shop/cart-slice"
import { Label } from "../ui/label"

function MenuItems() {

  const navigate = useNavigate();

  function handleNavigate(menuItem) {
    sessionStorage.removeItem('filters');
    const currentFilter = menuItem.id !== "home" ? {
      category: [menuItem.id]
    } : null
    sessionStorage.setItem('filters', JSON.stringify(currentFilter));
    navigate(menuItem.path)
  }

  return <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
    {
      shoppingViewHeaderMenuItems.map(item => <Label onClick={() => handleNavigate(item)} key={item.id} className="text-sm font-medium cursor-pointer">{item.label}</Label>)
    }
  </nav>
}

function HeaderRightContent() {
  const { user } = useSelector(state => state.auth);
  const { cartItems } = useSelector(state => state.shopCart);
  const navigate = useNavigate();
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser())
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch])

  return <div className="flex lg:items-center lg:flex-row flex-col gap-4">
    <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
      <Button onClick={() => setOpenCartSheet(true)} variant="outline" size="icon">
        <ShoppingCart className="h-6 w-6" />
        <span className="sr-only">User Cart</span>
      </Button>
      <CartWrapper cartItems={cartItems && cartItems.items && cartItems?.items.length > 0 ? cartItems.items : []} />
    </Sheet>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="bg-black">
          <AvatarFallback className="bg-black text-white font-extrabold">{user?.userName[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="w-56">
        <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/shop/account")}>
          <UserCog className="mr-2 h-4 w-4" />
          Account
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
}

const ShoppingHeader = () => {

  const { isAuthenticated } = useSelector(state => state.auth)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to='/shop/home' className="flex items-center gap-2">
          <House className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Header</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  )
}

export default ShoppingHeader