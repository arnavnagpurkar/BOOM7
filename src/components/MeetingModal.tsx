import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "../lib/utils"
import Image from "next/image"
import { Button } from "./ui/button"


const MeetingModal = (props: any) => {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          {props.image && (
            <div className="flex justify-center">
              <Image
                src={props.image}
                alt="image"
                width={72}
                height={72}
              />
            </div>
          )}
          <h1 className={cn('text-3xl font-bold leading-[42px]', props.className)}>
            {props.title}
          </h1>
          {props.children}
          <Button
            className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-[8px]"
            onClick={props.clickFunction}
          >
            {props.buttonIcon && (
              <Image
                src={props.buttonIcon}
                alt="button icon"
                width={13}
                height={13}
              />
            )} &nbsp;
            {props.buttonText || 'Schedule Meeting'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MeetingModal
