import { create } from 'zustand'

type CreateWorkspaceStore = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const useCreateWorkspace = create<CreateWorkspaceStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
}))
