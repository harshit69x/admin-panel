import React, { useState } from "react"
import { ProductType } from "@/lib/supabase"

type TypeFormProps = {
  onSubmit: (typeData: Partial<ProductType>) => void
}

export const TypeForm: React.FC<TypeFormProps> = ({ onSubmit }) => {
  const [typeData, setTypeData] = useState<Partial<ProductType>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTypeData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(typeData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="type">Type Name</label>
        <input
          type="text"
          id="type"
          name="Type"
          value={typeData.Type || ""}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Type</button>
    </form>
  )
}