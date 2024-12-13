import { filterOptions } from "@/config"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"
import { Separator } from "../ui/separator"
import { Fragment } from "react"

const ProductFilter = ({ filters, handleFilters }) => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {
          Object.keys(filterOptions).map(key => <Fragment key={key}>
            <div>
              <h3 className="text-base font-bold">{key}</h3>
              <div className="grid gap-2 mt-2">
                {
                  filterOptions[key].map(option => <Label key={option.id} className="flex font-medium item-center gap-2">
                    <Checkbox checked={
                      filters && Object.keys(filters).length > 0 && filters[key] && filters[key].indexOf(option.id) > -1
                    } onCheckedChange={() => handleFilters(key, option.id)} />
                    {option.label}
                  </Label>)
                }
              </div>
            </div>
            <Separator />
          </Fragment>)
        }
      </div>
    </div>
  )
}

export default ProductFilter