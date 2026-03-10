import { Button } from '#/components/ui/button'
import { useNavigation } from '../../hooks/use-navigation'

export default function Pricing() {
  const { isOpen, setIsOpenAndName } = useNavigation()
  return (
    <Button
      onClick={() =>
        isOpen ? setIsOpenAndName({ isOpen: false, name: null }) : null
      }
      variant={'ghost'}
      className="text-sm h-full hover:bg-transparent font-normal hover:text-primary"
    >
      Pricing
    </Button>
  )
}
