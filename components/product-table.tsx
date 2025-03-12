"use client"

import { useState } from "react"
import type { Product } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"

interface ProductTableProps {
  products: Product[]
  loading: boolean
  onDelete: (productId: number) => void
  onUpdateQuantity: (productId: number, quantity: number) => void
}

export function ProductTable({ products, loading, onDelete, onUpdateQuantity }: ProductTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)

  const filteredProducts = products.filter(
    (product) =>
      product.Product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product)
  }

  const confirmDelete = () => {
    if (productToDelete) {
      onDelete(productToDelete.Pid)
      setProductToDelete(null)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="text-sm text-muted-foreground">{filteredProducts.length} products</div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">MRP</TableHead>
              <TableHead className="text-right">Selling Price</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No products found.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.Pid}>
                  <TableCell>
                    <div className="relative h-10 w-10 overflow-hidden rounded-md">
                      <img
                        src={product.ProductImg || "/placeholder.svg?height=40&width=40"}
                        alt={product.Product}
                        className="object-cover"
                        width={40}
                        height={40}
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=40&width=40"
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.Product}</TableCell>
                  <TableCell>{product.Brand}</TableCell>
                  <TableCell>{product.Type}</TableCell>
                  <TableCell className="text-right">₹{product.Mrp.toFixed(2)}</TableCell>
                  <TableCell className="text-right">₹{product.Sp.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <button onClick={() => onUpdateQuantity(product.Pid, product.Quantity - 1)}>-</button>
                    {product.Quantity}
                    <button onClick={() => onUpdateQuantity(product.Pid, product.Quantity + 1)}>+</button>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(product)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!productToDelete} onOpenChange={(open) => !open && setProductToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the product "{productToDelete?.Product}" from your inventory. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

