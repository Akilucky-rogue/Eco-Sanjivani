"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CreateEventDialog } from "@/components/events/create-event-dialog"

export function CreateEventButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Create Event
      </Button>
      <CreateEventDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}
