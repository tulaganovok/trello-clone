import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'
import { ChevronDown } from 'lucide-react'
import { useNavigation } from '../../../hooks/use-navigation'

export default function PlansBtn() {
  const { name, setIsOpenAndName } = useNavigation()

  return (
    <Button
      size={'sm'}
      variant={'ghost'}
      onClick={() =>
        name === 'plans'
          ? setIsOpenAndName({ isOpen: false, name: null })
          : setIsOpenAndName({ isOpen: true, name: 'plans' })
      }
      className="group h-full text-sm hover:bg-transparent font-normal"
    >
      <div
        className={cn(
          'h-full flex items-center self-center',
          name === 'plans' && 'border-b-2 border-primary',
        )}
      >
        <span
          className={cn(
            'group-hover:text-primary',
            name === 'plans' && 'text-primary',
          )}
        >
          Plans
        </span>

        <ChevronDown
          className={cn(
            'size-3.5 group-hover:stroke-primary mb-0.75',
            name === 'plans' && 'stroke-primary',
          )}
        />
      </div>
    </Button>
  )
}
