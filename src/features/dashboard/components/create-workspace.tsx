import { Dialog, DialogContent, DialogDescription, DialogTitle } from "#/components/ui/dialog";
import { useCreateWorkspace } from "../hooks/use-create-workspace";
import WorkspaceForm from "./forms/workspace.form";

export default function CreateWorkspace() {
  const { isOpen, setIsOpen } = useCreateWorkspace()

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="md:min-w-300 flex flex-col md:flex-row-reverse p-0 overflow-y-auto max-h-[95vh]">
        <div className="md:w-1/2 bg-primary-foreground flex items-center justify-center">
          <img src="https://trello.com/assets/d1f066971350650d3346.svg" alt="Workspace wallpaper" className="object-center size-100 md:mb-20" />
        </div>

        <div className="md:w-1/2 p-4 md:px-24 md:pt-14">
          <DialogTitle className="max-md:text-center text-2xl text-cyan-950">Let's build a Workspace</DialogTitle>

          <DialogDescription className="text-[17px] leading-5.5 mt-3 max-md:text-center max-md:px-4">Boost your productivity by making it easier for everyone to access boards in one location.</DialogDescription>

          <div className="mt-6">
            <WorkspaceForm />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
