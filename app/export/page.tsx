import { Navigation } from "@/components/navigation"
import { DataExportPanel } from "@/components/export/data-export-panel"

export default function ExportPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Data Export</h1>
            <p className="text-muted-foreground">Export your conservation data for research and reporting</p>
          </div>
          <DataExportPanel />
        </div>
      </main>
    </div>
  )
}
