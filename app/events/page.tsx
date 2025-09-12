import { EventsHeader } from "@/components/events/events-header"
import { EventFilters } from "@/components/events/event-filters"
import { EventGrid } from "@/components/events/event-grid"
import { CreateEventButton } from "@/components/events/create-event-button"

export default function EventsPage() {
  return (
    <div>
      <EventsHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters sidebar */}
          <div className="lg:w-80">
            <EventFilters />
          </div>

          {/* Main content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Marine Conservation Events</h1>
                <p className="text-muted-foreground">Join cleanup drives and conservation activities near you</p>
              </div>
              <CreateEventButton />
            </div>
            <EventGrid />
          </div>
        </div>
      </div>
    </div>
  )
}
