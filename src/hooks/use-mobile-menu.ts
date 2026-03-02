import { Store } from '@tanstack/store'
import { useStore } from '@tanstack/react-store'

type MobileMenuStore = {
  isOpen: boolean
}

export const mobileMenuStore = new Store<MobileMenuStore>({
  isOpen: false,
})

export const onOpen = () => mobileMenuStore.setState(() => ({ isOpen: true }))
export const onClose = () => mobileMenuStore.setState(() => ({ isOpen: false }))

export function useMobileMenu() {
  const isOpen = useStore(mobileMenuStore, (s) => s.isOpen)
  return { isOpen, onOpen, onClose }
}
