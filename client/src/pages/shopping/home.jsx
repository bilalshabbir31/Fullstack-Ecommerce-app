import { Button } from '@/components/ui/button';
import bannerOne from '../../assets/banner-1.webp';
import bannerTwo from '../../assets/banner-2.webp';
import bannerThree from '../../assets/banner-3.webp';
import { Airplay, BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightningIcon, Heater, Images, Shirt, ShirtIcon, ShoppingBasket, UmbrellaIcon, WashingMachine, WatchIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts, fetchProduct } from '@/store/shop/product-slice';
import ShoppingProductTile from '@/components/shopping/productTile';
import { useNavigate } from 'react-router-dom';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { useToast } from '@/hooks/use-toast';
import ProductDetailsDailog from '@/components/shopping/productDetailsDailog';
import { fetchFeatureImages } from '@/store/common-slice';

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightningIcon },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
]

const ShoppingHome = () => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { products, product } = useSelector(state => state.shopProducts);
  const { featureImages } = useSelector(state => state.commonFeature);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const slides = [bannerOne, bannerTwo, bannerThree];

  function handleNavigateToListingPage(category, type) {
    sessionStorage.removeItem('filters')
    const currentFilter = {
      [type]: [category.id]
    }
    sessionStorage.setItem('filters', JSON.stringify(currentFilter));
    navigate('/shop/listing');
  }

  function handleGetProductDetails(productId) {
    dispatch(fetchProduct(productId))
  }

  function handleAddToCart(productId) {
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
    const timer = setInterval(() => {
      setCurrentSlide(prevState => (prevState + 1) % featureImages.length)
    }, 3000);
    return () => clearInterval(timer);
  }, [featureImages]);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filtersParams: {}, sortParams: 'price-lowtohigh' }));
  }, []);

  useEffect(() => {
    if (product !== null) {
      setOpenDetailsDialog(true)
    }
  }, [product]);


  useEffect(() => {
    dispatch(fetchFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[600px] overflow-hidden">
        {
          featureImages && featureImages.length > 0 ?
            featureImages.map((slide, index) => <img src={slide.image} key={index} className={`${index === currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`} />) : null
        }
        <Button onClick={() => setCurrentSlide(prevState => (prevState - 1 + featureImages.length) % featureImages.length)} variant="outline" size="icon" className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80">
          <ChevronLeftIcon className='w-4 h-4' />
        </Button>
        <Button onClick={() => setCurrentSlide(prevState => (prevState + 1) % featureImages.length)} variant="outline" size="icon" className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80">
          <ChevronRightIcon className='w-4 h-4' />
        </Button>
      </div>
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Shop by Category</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
            {
              categoriesWithIcon.map(item => <Card onClick={() => handleNavigateToListingPage(item, 'category')} key={item.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className='w-12 h-12 mb-4 text-primary' />
                  <span className='font-bold'>{item.label}</span>
                </CardContent>
              </Card>)
            }
          </div>
        </div>
      </section>
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Shop by Brand</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
            {
              brandWithIcon.map(item => <Card onClick={() => handleNavigateToListingPage(item, 'brand')} key={item.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <item.icon className='w-12 h-12 mb-4 text-primary' />
                  <span className='font-bold'>{item.label}</span>
                </CardContent>
              </Card>)
            }
          </div>
        </div>
      </section>
      <section className='py-12'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>Feature Products</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {
              products && products.length > 0 ?
                products.map(product => <ShoppingProductTile handleAddToCart={handleAddToCart} handleGetProductDetails={handleGetProductDetails} key={product._id} product={product} />)
                : null
            }
          </div>
        </div>
      </section>
      <ProductDetailsDailog open={openDetailsDialog} setOpen={setOpenDetailsDialog} product={product} />
    </div>
  )
}

export default ShoppingHome