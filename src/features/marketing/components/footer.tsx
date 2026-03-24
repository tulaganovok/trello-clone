import { Link } from '@tanstack/react-router'
import {
  ChevronDown,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  TwitterIcon,
  Youtube,
} from 'lucide-react'

const footerFeatures = [
  { title: 'About Trello', description: 'What’s behind the boards.' },
  { title: 'Jobs', description: 'Learn about open roles on the Trello team.' },
  {
    title: 'Apps',
    description: 'Download the Trello App for your Desktop or Mobile devices.',
  },
  {
    title: 'Contact us',
    description: 'Need anything? Get in touch and we can help.',
  },
]

export default function Footer() {
  return (
    <div className="bg-blue-950 text-background px-4">
      <div className="grid grid-cols-1 md:grid-cols-5 pt-6 md:pb-4 px-0 md:px-8 lg:px-20 xl:px-36 2xl:px-48">
        <div className="flex flex-row md:flex-col max-md:justify-between md:gap-y-4 max-md:items-center max-md:pb-6 max-md:px-4">
          <img src="/logo-footer.svg" alt="Logo Footer" className="w-32 h-16" />
          <Link
            to="/sign-in"
            className="text-background cursor-pointer hover:underline"
          >
            Log in
          </Link>
        </div>

        {footerFeatures.map((item, index) => (
          <div
            key={index}
            className="group px-4 py-5 md:py-3 md:hover:bg-blue-100/20 cursor-pointer space-y-3 max-md:border-t max-md:border-t-gray-500"
          >
            <h4 className="text-background font-medium text-sm max-md:group-hover:underline">
              {item.title}
            </h4>
            <p className="text-background text-xs leading-5 max-md:group-hover:underline ">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-t-gray-500">
        <div className="mx-auto flex items-center justify-between p-5 max-md:px-4 md:px-8 lg:px-20 xl:px-36 2xl:px-48 max-md:flex-col max-md:items-start max-md:gap-y-16">
          <div className="flex items-center gap-x-6 max-md:flex-col max-md:items-start max-md:gap-y-4">
            <div className="flex items-center gap-x-3 cursor-pointer">
              <Globe className="stroke-background size-5" />
              <span className="text-background">Čeština</span>
              <ChevronDown className="stroke-background size-5 ml-8" />
            </div>

            <span className="text-xs text-background cursor-pointer hover:underline">
              Privacy Policy
            </span>
            <span className="text-xs text-background cursor-pointer hover:underline">
              Terms
            </span>
            <span className="text-xs text-background cursor-pointer hover:underline">
              Copyright © {new Date().getFullYear()} Atlassian
            </span>
          </div>
          <div className="flex items-center gap-x-8 max-md:mb-12">
            <span className="p-1 border-2 border-background rounded-full cursor-pointer">
              <Instagram className="stroke-background size-3.5" />
            </span>
            <span className="p-1 border-2 border-background rounded-full cursor-pointer">
              <Facebook className="stroke-background size-3.5 fill-background" />
            </span>
            <span className="p-1 border-2 border-background rounded-full cursor-pointer">
              <Linkedin className="stroke-background size-3.5 fill-background" />
            </span>
            <span className="p-1 border-2 border-background rounded-full cursor-pointer">
              <TwitterIcon className="stroke-background size-3.5 fill-background" />
            </span>
            <span className="p-1 border-2 border-background rounded-full cursor-pointer">
              <Youtube className="stroke-background size-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
