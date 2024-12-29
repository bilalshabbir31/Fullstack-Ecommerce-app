import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Label } from "../ui/label"

const AddressCard = ({ addressInfo, handleDeleteAddress, handleEditAddress, setCurrentSelectedAddress, selectedId }) => {
  return (
    <Card onClick={setCurrentSelectedAddress ? () => setCurrentSelectedAddress(addressInfo) : null} className={`cursor-pointer border-red-700 ${selectedId === addressInfo?._id ? 'border-red-900 border-[2px]' : 'border-black'}`} >
      <CardContent className={`grid py-4 gap-4 ${selectedId === addressInfo?._id ? 'border black' : ""}`}>
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>PinCode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="p-3 flex justify-between">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  )
}

export default AddressCard