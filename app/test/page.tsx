"use client"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function Page() {
  return (
    <Button onClick={() => toast.success("Success! Data Saved.")}>Click Me</Button>
  )
}