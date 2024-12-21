import { useEffect, useState } from "react";
import CommonForm from "../common/Form"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, deleteAddress, editAddress, fetchAllAddresses } from "@/store/shop/address-slice";
import AddressCard from "./addressCard";
import { useToast } from "@/hooks/use-toast";

const initialFormData = {
  address: '',
  city: '',
  phone: '',
  pincode: '',
  notes: '',
}

const Address = () => {

  const [formData, setFormData] = useState(initialFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { user } = useSelector(state => state.auth);
  const { address } = useSelector(state => state.shopAddress);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleSubmit(event) {
    event.preventDefault();

    if (address.length >= 3 && currentEditedId === null) {
      setFormData(initialFormData);
      toast({
        title: 'You can add max 3 address',
        variant: 'destructive'
      });
      return;
    }

    currentEditedId !== null ? dispatch(editAddress({ userId: user?.id, addressId: currentEditedId, formData })).then(data => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        setCurrentEditedId(null);
        setFormData(initialFormData);
        toast({
          title: 'Address updated Successfully'
        });
      }
    }) : dispatch(addNewAddress({
      ...formData,
      userId: user?.id
    })).then(data => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        setFormData(initialFormData);
        toast({
          title: 'Address added Successfully'
        });
      }
    })
  }

  function isFormValid() {
    return Object.keys(formData).map(key => formData[key].trim() !== "").every(item => item)
  }

  function handleDeleteAddress(address) {
    dispatch(deleteAddress({ userId: user?.id, addressId: address?._id })).then(data => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast({
          title: 'Address deleted Successfully'
        });
      }
    })
  }

  function handleEditAddress(address) {
    setCurrentEditedId(address?._id);
    setFormData({
      ...formData,
      address: address?.address,
      city: address?.city,
      phone: address?.phone,
      pincode: address?.pincode,
      notes: address?.notes,
    })
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch])

  return (
    <Card>
      <div className="mb-5 p-3 grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {
          address && address.length > 0 ?
            address.map(item => <AddressCard key={item?._id} addressInfo={item} handleDeleteAddress={handleDeleteAddress} handleEditAddress={handleEditAddress} />) : null
        }
      </div>
      <CardHeader>
        <CardTitle>{currentEditedId !== null ? 'Edit New Address' : 'Add New Address'}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm formControls={addressFormControls} formData={formData} setFormData={setFormData} buttonText={currentEditedId !== null ? 'Edit' : 'Add'} isButtonDisabled={!isFormValid()} onSubmit={handleSubmit} />
      </CardContent>
    </Card>
  )
}

export default Address