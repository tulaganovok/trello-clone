import { CalendarDays, Mails } from "lucide-react";

export default function Message() {
  return (
    <section className="pt-12 md:pt-14 bg-primary relative -z-20">
      <div className="px-4 md:px-12 lg:px-24 xl:px-40 2xl:px-54">
        <h1 className="text-center text-background text-xl md:text-3xl font-semibold">From message to action</h1>

        <p className="text-background text-center max-w-2xl mx-auto text-lg max-md:px-4 mt-3">Quickly turn communication from your favorite apps into to-dos, keeping all your discussions and tasks organized in one place.</p>

        <div className="bg-background rounded-[4px] flex flex-col md:flex-row md:items-center p-6 md:p-8 mt-16 gap-y-7 gap-x-14 shadow-lg ">
          <div className="w-full h-50 md:w-139 md:h-75">

            <img src="https://images.ctfassets.net/rz1oowkt5gyp/2QvggeQ9nzUdaDnhJCSUwA/3ef97067e1aa3d0a5e6a04b5780fd751/email-todos.png" alt="Image" className="size-full" />
          </div>

          <div className="space-y-6 flex-1">
            <div className="flex items-center gap-x-3">
              <Mails className="size-6 stroke-purple-700 max-md:hidden" />
              <span className="text-base font-semibold">EMAIL MAGIC</span>
            </div>

            <p className="md:pr-10 leading-8">
              Easily turn your emails into to-dos! Just forward them to your Trello Inbox, and they’ll be transformed by AI into organized to-dos with all the links you need.
            </p>
          </div>

        </div>

        <div className="bg-background rounded-[4px] flex flex-col md:flex-row-reverse md:items-center p-6 md:p-8 mt-8 md:mt-16 gap-y-7 gap-x-14 shadow-xl ">
          <div className="w-full h-50 md:w-139 md:h-75">
            <img src="https://images.ctfassets.net/rz1oowkt5gyp/3r1BvsfEsj4THe6YwpBOVy/2b1befa1e5e3522a2b0daae0dd3f3de0/slackteams-to-inbox.png" alt="Image" className="size-full" />
          </div>

          <div className="space-y-6 flex-1 md:pl-10">
            <div className="flex items-center gap-x-3">
              <CalendarDays className="size-6 stroke-cyan-400 max-md:hidden" />
              <span className="text-base font-semibold">MESSAGE APP SORCERY</span>
            </div>

            <p className=" leading-8">
              Need to follow up on a message from Slack or Microsoft Teams? Send it directly to your Trello board! Your favorite app interface lets you save messages that appear in your Trello Inbox with AI-generated summaries and links.
            </p>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 w-full h-28 bg-background -z-10" />
    </section>
  )
}
