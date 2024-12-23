import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/layout"
import AuthLogin from "./pages/auth/login"
import AuthRegister from "./pages/auth/register"
import AdminLayout from "./components/admin/layout"
import AdminDashboard from "./pages/admin/dashboard"
import AdminProducts from "./pages/admin/products"
import AdminOrders from "./pages/admin/orders"
import AdminFeatures from "./pages/admin/features"
import ShoppingLayout from "./components/shopping/layout"
import NotFound from "./pages/notFound"
import ShoppingHome from "./pages/shopping/home"
import ShoppingListing from "./pages/shopping/listing"
import ShoppingCheckout from "./pages/shopping/checkout"
import ShoppingAccount from "./pages/shopping/account"
import CheckAuth from "./components/common/checkAuth"
import UnAuth from "./pages/unauth"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./store/auth-slice"
import { Skeleton } from "./components/ui/skeleton"
import StripeReturnPage from "./pages/shopping/stripeReturn"
import PaymentSuccessPage from "./pages/shopping/paymentSuccess"
import PaymentCancelPage from "./pages/shopping/paymentCancel"

function App() {

  const { isAuthenticated, user, isLoading } = useSelector(state => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch]);

  if (isLoading) return <Skeleton className="bg-black w-[800] h-[600px]" />

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
          <Route />
        </Route>
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="stripe-return" element={<StripeReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="payment-cancel" element={<PaymentCancelPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnAuth />} />
      </Routes>
    </div>
  )
}

export default App
