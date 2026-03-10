import { create } from 'zustand'

type MobileNavigationStore = {
  isOpenMobile: boolean
  setIsOpenMobile: (isOpenMobile: boolean) => void
}

export const useMobileNavigation = create<MobileNavigationStore>((set) => ({
  isOpenMobile: false,
  setIsOpenMobile: (isOpenMobile) => set({ isOpenMobile }),
}))
