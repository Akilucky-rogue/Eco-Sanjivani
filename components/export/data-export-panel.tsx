"use client"

import { useState } from "react"
import { Download, FileText, Database, Calendar, Settings, Users, Camera, Building2, BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { dataExporter } from "@/lib/utils/data-export"
import { useDatabase } from "@/lib/hooks/use-database"

interface ExportOptions {
  format: "csv" | "json"
  dateRange: {
    start: string
    end: string
  }
  includePhotos: boolean
  includePersonalData: boolean
  dataTypes: {
    events: boolean
    volunteers: boolean
    impactMetrics: boolean
    photos: boolean
    partnerships: boolean
  }
}

export function DataExportPanel() {
  const { events, users } = useDatabase()
  const [options, setOptions] = useState<ExportOptions>({
    format: "csv",
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 30 days ago
      end: new Date().toISOString().split("T")[0], // today
    },
    includePhotos: false,
    includePersonalData: false,
    dataTypes: {
      events: true,
      volunteers: false,
      impactMetrics: true,
      photos: false,
      partnerships: false,
    },
  })

  const [isExporting, setIsExporting] = useState(false)
  const [grantInfo, setGrantInfo] = useState({
    name: "",
    period: "",
    requirements: "",
  })

  // Sample data - in real app this would come from database
  const sampleImpactMetrics = [
    {
      date: "2024-01-01",
      wasteCollected: 1200,
      volunteersActive: 45,
      eventsCompleted: 8,
      areasRestored: 2500,
      marineLifeProtected: 150,
      carbonOffset: 2400,
    },
    {
      date: "2024-02-01",
      wasteCollected: 1800,
      volunteersActive: 62,
      eventsCompleted: 12,
      areasRestored: 3200,
      marineLifeProtected: 220,
      carbonOffset: 3600,
    },
    {
      date: "2024-03-01",
      wasteCollected: 2200,
      volunteersActive: 78,
      eventsCompleted: 15,
      areasRestored: 4100,
      marineLifeProtected: 280,
      carbonOffset: 4400,
    },
  ]

  const samplePhotos = [
    {
      id: "1",
      caption: "Beach cleanup before",
      type: "before",
      timestamp: "2024-01-15T10:00:00Z",
      uploadedBy: "volunteer1",
      location: { latitude: 19.076, longitude: 72.8777, address: "Marine Drive, Mumbai" },
    },
    {
      id: "2",
      caption: "Beach cleanup after",
      type: "after",
      timestamp: "2024-01-15T14:00:00Z",
      uploadedBy: "volunteer1",
      location: { latitude: 19.076, longitude: 72.8777, address: "Marine Drive, Mumbai" },
    },
  ]

  const samplePartnerships = [
    {
      name: "Marine Conservation Society India",
      type: "ngo",
      impactMetrics: { eventsSupported: 45, volunteersEngaged: 1200, fundingProvided: 2500000 },
    },
    {
      name: "Tata Sustainability Initiative",
      type: "corporate",
      impactMetrics: { eventsSupported: 18, volunteersEngaged: 450, fundingProvided: 5000000 },
    },
  ]

  const handleDataTypeChange = (type: keyof typeof options.dataTypes, checked: boolean) => {
    setOptions((prev) => ({
      ...prev,
      dataTypes: {
        ...prev.dataTypes,
        [type]: checked,
      },
    }))
  }

  const handleExport = async (exportType: "individual" | "comprehensive" | "grant") => {
    setIsExporting(true)

    try {
      const exportData = {
        events: options.dataTypes.events ? events : [],
        volunteers: options.dataTypes.volunteers ? users : [],
        impactMetrics: options.dataTypes.impactMetrics ? sampleImpactMetrics : [],
        photos: options.dataTypes.photos ? samplePhotos : [],
        partnerships: options.dataTypes.partnerships ? samplePartnerships : [],
      }

      if (exportType === "individual") {
        // Export selected data types individually
        if (options.dataTypes.events && events.length > 0) {
          dataExporter.exportEvents(events, options)
        }
        if (options.dataTypes.volunteers && users.length > 0) {
          dataExporter.exportVolunteers(users, options)
        }
        if (options.dataTypes.impactMetrics) {
          dataExporter.exportImpactMetrics(sampleImpactMetrics, options)
        }
        if (options.dataTypes.photos) {
          dataExporter.exportPhotos(samplePhotos, options)
        }
      } else if (exportType === "comprehensive") {
        dataExporter.exportComprehensiveReport(exportData, options)
      } else if (exportType === "grant") {
        dataExporter.generateGrantReport(exportData, {
          name: grantInfo.name,
          period: grantInfo.period,
          requirements: grantInfo.requirements
            .split(",")
            .map((r) => r.trim())
            .filter((r) => r),
        })
      }

      // Simulate export delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
    } catch (error) {
      console.error("Export failed:", error)
      alert("Export failed. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  const getSelectedDataCount = () => {
    let count = 0
    if (options.dataTypes.events) count += events.length
    if (options.dataTypes.volunteers) count += users.length
    if (options.dataTypes.impactMetrics) count += sampleImpactMetrics.length
    if (options.dataTypes.photos) count += samplePhotos.length
    if (options.dataTypes.partnerships) count += samplePartnerships.length
    return count
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Data Export Center</h2>
        <p className="text-muted-foreground">
          Export your conservation data for research, reports, and grant applications
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Export Configuration */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Export Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Format Selection */}
              <div className="space-y-3">
                <Label>Export Format</Label>
                <Select
                  value={options.format}
                  onValueChange={(value: "csv" | "json") => setOptions((prev) => ({ ...prev, format: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV (Spreadsheet)</SelectItem>
                    <SelectItem value="json">JSON (Structured Data)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date Range
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="startDate" className="text-sm">
                      Start Date
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={options.dateRange.start}
                      onChange={(e) =>
                        setOptions((prev) => ({
                          ...prev,
                          dateRange: { ...prev.dateRange, start: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate" className="text-sm">
                      End Date
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={options.dateRange.end}
                      onChange={(e) =>
                        setOptions((prev) => ({
                          ...prev,
                          dateRange: { ...prev.dateRange, end: e.target.value },
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Data Types */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Data Types to Export
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="events"
                      checked={options.dataTypes.events}
                      onCheckedChange={(checked) => handleDataTypeChange("events", checked as boolean)}
                    />
                    <Label htmlFor="events" className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      Events ({events.length})
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="volunteers"
                      checked={options.dataTypes.volunteers}
                      onCheckedChange={(checked) => handleDataTypeChange("volunteers", checked as boolean)}
                    />
                    <Label htmlFor="volunteers" className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4" />
                      Volunteers ({users.length})
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="impactMetrics"
                      checked={options.dataTypes.impactMetrics}
                      onCheckedChange={(checked) => handleDataTypeChange("impactMetrics", checked as boolean)}
                    />
                    <Label htmlFor="impactMetrics" className="flex items-center gap-2 text-sm">
                      <BarChart3 className="h-4 w-4" />
                      Impact Metrics ({sampleImpactMetrics.length})
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="photos"
                      checked={options.dataTypes.photos}
                      onCheckedChange={(checked) => handleDataTypeChange("photos", checked as boolean)}
                    />
                    <Label htmlFor="photos" className="flex items-center gap-2 text-sm">
                      <Camera className="h-4 w-4" />
                      Photos ({samplePhotos.length})
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="partnerships"
                      checked={options.dataTypes.partnerships}
                      onCheckedChange={(checked) => handleDataTypeChange("partnerships", checked as boolean)}
                    />
                    <Label htmlFor="partnerships" className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4" />
                      Partnerships ({samplePartnerships.length})
                    </Label>
                  </div>
                </div>
              </div>

              {/* Privacy Options */}
              <div className="space-y-3">
                <Label>Privacy & Content Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="includePersonalData"
                      checked={options.includePersonalData}
                      onCheckedChange={(checked) =>
                        setOptions((prev) => ({ ...prev, includePersonalData: checked as boolean }))
                      }
                    />
                    <Label htmlFor="includePersonalData" className="text-sm">
                      Include personal data (names, emails, phone numbers)
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="includePhotos"
                      checked={options.includePhotos}
                      onCheckedChange={(checked) =>
                        setOptions((prev) => ({ ...prev, includePhotos: checked as boolean }))
                      }
                    />
                    <Label htmlFor="includePhotos" className="text-sm">
                      Include photo URLs (large file sizes)
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grant Report Generator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Grant Report Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="grantName">Grant Name</Label>
                  <Input
                    id="grantName"
                    placeholder="e.g., Ocean Conservation Grant 2024"
                    value={grantInfo.name}
                    onChange={(e) => setGrantInfo((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="grantPeriod">Reporting Period</Label>
                  <Input
                    id="grantPeriod"
                    placeholder="e.g., Q1 2024"
                    value={grantInfo.period}
                    onChange={(e) => setGrantInfo((prev) => ({ ...prev, period: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="grantRequirements">Grant Requirements (comma-separated)</Label>
                <Input
                  id="grantRequirements"
                  placeholder="e.g., Impact metrics, Volunteer engagement, Photo documentation"
                  value={grantInfo.requirements}
                  onChange={(e) => setGrantInfo((prev) => ({ ...prev, requirements: e.target.value }))}
                />
              </div>
              <Button
                onClick={() => handleExport("grant")}
                disabled={isExporting || !grantInfo.name || !grantInfo.period}
                className="w-full"
              >
                <FileText className="h-4 w-4 mr-2" />
                Generate Grant Report
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Export Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Export Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Selected Records:</span>
                  <span className="font-medium">{getSelectedDataCount()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Format:</span>
                  <span className="font-medium">{options.format.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date Range:</span>
                  <span className="font-medium text-xs">
                    {new Date(options.dateRange.start).toLocaleDateString()} -{" "}
                    {new Date(options.dateRange.end).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Button
                  onClick={() => handleExport("individual")}
                  disabled={isExporting || getSelectedDataCount() === 0}
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isExporting ? "Exporting..." : "Export Selected Data"}
                </Button>

                <Button
                  onClick={() => handleExport("comprehensive")}
                  disabled={isExporting || getSelectedDataCount() === 0}
                  variant="outline"
                  className="w-full"
                >
                  <Database className="h-4 w-4 mr-2" />
                  Comprehensive Report
                </Button>
              </div>

              <div className="text-xs text-muted-foreground">
                <p>• Individual exports download separate files</p>
                <p>• Comprehensive report includes all selected data</p>
                <p>• Grant reports are formatted for funding applications</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
