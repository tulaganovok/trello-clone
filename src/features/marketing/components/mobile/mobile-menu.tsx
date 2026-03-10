import { Button } from '#/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useMobileNavigation } from '../../hooks/use-mobile-navigation'

export default function MobileMenu() {
  const { isOpenMobile, setIsOpenMobile } = useMobileNavigation()

  return isOpenMobile ? (
    <Button
      size={'icon-lg'}
      variant="ghost"
      onClick={() => setIsOpenMobile(false)}
    >
      <X className="size-8" />
    </Button>
  ) : (
    <Button
      size={'icon-lg'}
      variant="ghost"
      onClick={() => setIsOpenMobile(true)}
    >
      <Menu className="size-8" />
    </Button>
  )
}
