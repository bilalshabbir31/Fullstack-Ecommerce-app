import ProductImageUpload from "@/components/admin/imageUpload";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { addFeatureImage, fetchFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminDashboard = () => {

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { featureImages } = useSelector(state => state.commonFeature);
  const { toast } = useToast();
  const dispatch = useDispatch();

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then(data => {
      if (data?.payload?.success) {
        dispatch(fetchFeatureImages());
        setImageFile(null);
        setUploadedImageUrl('');
        toast({
          title: "Feature Image Uploaded Succesfully!"
        })
      } else {
        toast({
          title: data?.payload?.message,
          variant: 'destructive'
        })
      }
    });
  }

  useEffect(() => {
    dispatch(fetchFeatureImages());
  }, [dispatch]);


  return (
    <div>
      <ProductImageUpload imageFile={imageFile} setImageFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} setImageLoadingState={setImageLoadingState} imageLoadingState={imageLoadingState} isCustomStyling={true} />
      <Button className="mt-5 w-full" onClick={handleUploadFeatureImage}>
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {
          featureImages && featureImages.length > 0 ?
            featureImages.map(item => <div key={item?._id}>
              <img src={item?.image} className="w-full h-[300px] object-cover rounded-t-lg" />
            </div>) : null
        }
      </div>
    </div>
  )
}

export default AdminDashboard