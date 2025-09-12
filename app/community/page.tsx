import { CommunityHeader } from "@/components/community/community-header"
import { ActivityFeed } from "@/components/community/activity-feed"
import { CommunityStats } from "@/components/community/community-stats"
import { TeamDirectory } from "@/components/community/team-directory"
import { DiscussionForum } from "@/components/community/discussion-forum"
import { PhotoGallery } from "@/components/community/photo-gallery"

export default function CommunityPage() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CommunityHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Main content area */}
          <div className="lg:col-span-2 space-y-6">
            <ActivityFeed />
            <PhotoGallery />
            <DiscussionForum />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <CommunityStats />
            <TeamDirectory />
          </div>
        </div>
      </div>
    </div>
  )
}
