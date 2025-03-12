import React, { useState } from "react"
import { Brand } from "@/lib/supabase"

type BrandFormProps = {
  onSubmit: (brandData: Partial<Brand>) => void
}

export const BrandForm: React.FC<BrandFormProps> = ({ onSubmit }) => {
  const [brandData, setBrandData] = useState<Partial<Brand>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBrandData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(brandData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="brand">Brand Name</label>
        <input
          type="text"
          id="brand"
          name="Brand"
          value={brandData.Brand || ""}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Brand</button>
    </form>
  )
}