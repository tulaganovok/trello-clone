import { useNavigation } from '../hooks/use-navigation'
import FeaturesContent from './nav-items/features/features-content'
import PlansContent from './nav-items/plans/plans-content'
import ResourcesContent from './nav-items/resources/resources-content'
import SolutionsContent from './nav-items/solutions/solutions-content'

export default function Navigation() {
  const { name, setIsOpenAndName } = useNavigation()

  return (
    <div
      role="button"
      onClick={() => setIsOpenAndName({ isOpen: false, name: null })}
      className="max-md:hidden h-[calc(100vh-60px)] w-screen bg-blue-950/50 mt-15 fixed z-30 cursor-pointer"
    >
      <div className="cursor-auto">
        {name === 'features' && <FeaturesContent />}
        {name === 'solutions' && <SolutionsContent />}
        {name === 'plans' && <PlansContent />}
        {name === 'resources' && <ResourcesContent />}
      </div>
    </div>
  )
}
