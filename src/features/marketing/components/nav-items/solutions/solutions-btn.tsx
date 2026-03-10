import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'
import { ChevronDown } from 'lucide-react'
import { useNavigation } from '../../../hooks/use-navigation'

export default function SolutionsBtn() {
  const { name, setIsOpenAndName } = useNavigation()

  return (
    <Button
      size={'sm'}
      variant={'ghost'}
      onClick={() =>
        name === 'solutions'
          ? setIsOpenAndName({ isOpen: false, name: null })
          : setIsOpenAndName({ isOpen: true, name: 'solutions' })
      }
      className="group h-full text-sm hover:bg-transparent font-normal"
    >
      <div
        className={cn(
          'h-full flex items-center self-center',
          name === 'solutions' && 'border-b-2 border-primary',
        )}
      >
        <span
          className={cn(
            'group-hover:text-primary',
            name === 'solutions' && 'text-primary',
          )}
        >
          Solutions
        </span>

        <ChevronDown
          className={cn(
            'size-3.5 group-hover:stroke-primary mb-0.75',
            name === 'solutions' && 'stroke-primary',
          )}
        />
      </div>
    </Button>
  )
}
