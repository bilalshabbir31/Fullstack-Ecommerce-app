import ProductImageUpload from "@/components/admin/imageUpload";
import CommonForm from "@/components/common/Form";
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addNewProduct, fetchAllProducts } from "@/store/admin/product-slice";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import AdminProductTile from "./productTile";

const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: 0,
  salePrice: '',
  totalStock: ''
}

const AdminProducts = () => {

  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);

  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector(state => state.adminProducts.products)
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(addNewProduct({
      ...formData,
      image: uploadedImageUrl
    })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts())
        setOpenCreateProductsDialog(false);
        setImageFile(null)
        setFormData(initialFormData)
        toast({
          title: 'Product Added Successfully!'
        })
      }
    })
  }

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>Add New Product</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
          products && products.length > 0 ? products.map((product) => <AdminProductTile key={product._id} setFormData={setFormData} setOpenCreateProductsDialog={setOpenCreateProductsDialog} setCurrentEditedId={setCurrentEditedId} product={product} />) : null
        }
      </div>
      <Sheet open={openCreateProductsDialog} onOpenChange={() => {
        setOpenCreateProductsDialog(false);
        setCurrentEditedId(null);
        setFormData(initialFormData);
      }}>
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>{
              currentEditedId !== null ? 'Edit' : 'Add New Product'
            }</SheetTitle>
          </SheetHeader>
          <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} setImageLoadingState={setImageLoadingState} imageLoadingState={imageLoadingState} isEditMode={currentEditedId !== null} />
          <div className="py-6">
            <CommonForm onSubmit={onSubmit} formData={formData} setFormData={setFormData} buttonText={
              currentEditedId !== null ? 'Edit' : 'Add'
            } formControls={addProductFormElements} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default AdminProducts