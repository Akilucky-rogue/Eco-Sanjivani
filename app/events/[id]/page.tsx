import { EventDetails } from "@/components/events/event-details"
import { Navigation } from "@/components/navigation"

interface EventPageProps {
  params: {
    id: string
  }
}

export default function EventPage({ params }: EventPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <EventDetails eventId={params.id} />
      </main>
    </div>
  )
}
