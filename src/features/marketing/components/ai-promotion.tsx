import { Link } from '@tanstack/react-router'

export default function AIPromotion() {
  return (
    <div className="min-h-15 w-full bg-primary/10 px-4 flex items-center justify-center">
      <p className="font-normal text-sm text-center">
        Accelerate your teams' work with AI features 🤖 now available for all
        Premium and Enterprise!{' '}
        <Link to="/" className="text-primary underline">
          Learn more
        </Link>
      </p>
    </div>
  )
}
