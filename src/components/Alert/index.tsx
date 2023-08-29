"use client"
import * as Toast from "@radix-ui/react-toast"

interface AlertProps {
  open: boolean
  onOpen: (open: boolean) => void
}
export function Alert({ open, onOpen }: AlertProps) {
  return (
    <>
      <Toast.Root
        open={open}
        onOpenChange={onOpen}
        className="bg-[white] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] grid grid-cols-[auto_max-content] gap-x-[15px] items-center p-[15px] rounded-md;
  grid-template-areas: 'title action' 'description action' data-[data-state='open']:animate-[slideIn_150ms_cubic-bezier(0.16,1,0.3,1)] data-[data-state='closed']:animate-[hide_100ms_ease-in] data-[data-swipe='move']:translate-x-[0] data-[data-swipe='cancel']:translate-x-0 transition-transform duration-200 ease-[ease-out] data-[data-swipe='end']:animate-[swipeOut_100ms_ease-out]"
      >
        <Toast.Title className="ToastTitle">Scheduled: Catch up</Toast.Title>
        <Toast.Description asChild></Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </>
  )
}
