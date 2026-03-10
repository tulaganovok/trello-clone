import { Button } from '#/components/ui/button'
import { useNavigation } from '#/features/marketing/hooks/use-navigation'
import { cn } from '#/lib/utils'
import { ChevronDown } from 'lucide-react'

export default function ResourcesBtn() {
  const { name, setIsOpenAndName } = useNavigation()

  return (
    <Button
      size={'sm'}
      variant={'ghost'}
      onClick={() =>
        name === 'resources'
          ? setIsOpenAndName({ isOpen: false, name: null })
          : setIsOpenAndName({ isOpen: true, name: 'resources' })
      }
      className="group h-full text-sm hover:bg-transparent font-normal"
    >
      <div
        className={cn(
          'h-full flex items-center self-center',
          name === 'resources' && 'border-b-2 border-primary',
        )}
      >
        <span
          className={cn(
            'group-hover:text-primary',
            name === 'resources' && 'text-primary',
          )}
        >
          Resources
        </span>

        <ChevronDown
          className={cn(
            'size-3.5 group-hover:stroke-primary mb-0.75',
            name === 'resources' && 'stroke-primary',
          )}
        />
      </div>
    </Button>
  )
}
