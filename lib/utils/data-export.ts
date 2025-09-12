"use client"

interface ExportData {
  events?: any[]
  volunteers?: any[]
  impactMetrics?: any[]
  photos?: any[]
  partnerships?: any[]
}

interface ExportOptions {
  format: "csv" | "json" | "pdf"
  dateRange?: {
    start: string
    end: string
  }
  includePhotos?: boolean
  includePersonalData?: boolean
}

class DataExporter {
  private convertToCSV(data: any[], headers?: string[]): string {
    if (data.length === 0) return ""

    // Get headers from first object if not provided
    const csvHeaders = headers || Object.keys(data[0])

    // Create CSV content
    const csvContent = [
      csvHeaders.join(","),
      ...data.map((row) =>
        csvHeaders
          .map((header) => {
            const value = row[header]
            // Handle nested objects and arrays
            if (typeof value === "object" && value !== null) {
              return `"${JSON.stringify(value).replace(/"/g, '""')}"`
            }
            // Escape commas and quotes in strings
            if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`
            }
            return value || ""
          })
          .join(","),
      ),
    ].join("\n")

    return csvContent
  }

  private downloadFile(content: string, filename: string, mimeType: string) {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  private formatDateForFilename(date: Date): string {
    return date.toISOString().split("T")[0]
  }

  exportEvents(events: any[], options: ExportOptions = { format: "csv" }) {
    const processedEvents = events.map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      duration: event.duration,
      location_address: event.location?.address || "",
      location_latitude: event.location?.latitude || "",
      location_longitude: event.location?.longitude || "",
      max_participants: event.maxParticipants,
      current_participants: event.currentParticipants,
      difficulty: event.difficulty,
      category: event.category,
      status: event.status,
      created_by: event.createdBy,
      created_at: event.createdAt,
    }))

    const filename = `eco-sanjivani-events-${this.formatDateForFilename(new Date())}.csv`

    if (options.format === "csv") {
      const csvContent = this.convertToCSV(processedEvents)
      this.downloadFile(csvContent, filename, "text/csv")
    } else if (options.format === "json") {
      const jsonContent = JSON.stringify(processedEvents, null, 2)
      this.downloadFile(jsonContent, filename.replace(".csv", ".json"), "application/json")
    }
  }

  exportVolunteers(volunteers: any[], options: ExportOptions = { format: "csv" }) {
    const processedVolunteers = volunteers.map((volunteer) => ({
      id: volunteer.id,
      name: options.includePersonalData ? volunteer.name : "REDACTED",
      email: options.includePersonalData ? volunteer.email : "REDACTED",
      phone: options.includePersonalData ? volunteer.phone : "REDACTED",
      location: volunteer.location,
      join_date: volunteer.joinDate,
      events_participated: volunteer.eventsParticipated,
      total_hours: volunteer.totalHours,
      points_earned: volunteer.pointsEarned,
      level: volunteer.level,
      badges: volunteer.badges?.join(";") || "",
      skills: volunteer.skills?.join(";") || "",
      availability: volunteer.availability?.join(";") || "",
    }))

    const filename = `eco-sanjivani-volunteers-${this.formatDateForFilename(new Date())}.csv`

    if (options.format === "csv") {
      const csvContent = this.convertToCSV(processedVolunteers)
      this.downloadFile(csvContent, filename, "text/csv")
    } else if (options.format === "json") {
      const jsonContent = JSON.stringify(processedVolunteers, null, 2)
      this.downloadFile(jsonContent, filename.replace(".csv", ".json"), "application/json")
    }
  }

  exportImpactMetrics(metrics: any[], options: ExportOptions = { format: "csv" }) {
    const processedMetrics = metrics.map((metric) => ({
      date: metric.date,
      waste_collected_kg: metric.wasteCollected,
      volunteers_active: metric.volunteersActive,
      events_completed: metric.eventsCompleted,
      areas_restored_sqm: metric.areasRestored,
      marine_life_protected: metric.marineLifeProtected,
      carbon_offset_kg: metric.carbonOffset,
      plastic_bottles: metric.wasteBreakdown?.plasticBottles || 0,
      plastic_bags: metric.wasteBreakdown?.plasticBags || 0,
      food_containers: metric.wasteBreakdown?.foodContainers || 0,
      fishing_nets: metric.wasteBreakdown?.fishingNets || 0,
      other_waste: metric.wasteBreakdown?.other || 0,
    }))

    const filename = `eco-sanjivani-impact-metrics-${this.formatDateForFilename(new Date())}.csv`

    if (options.format === "csv") {
      const csvContent = this.convertToCSV(processedMetrics)
      this.downloadFile(csvContent, filename, "text/csv")
    } else if (options.format === "json") {
      const jsonContent = JSON.stringify(processedMetrics, null, 2)
      this.downloadFile(jsonContent, filename.replace(".csv", ".json"), "application/json")
    }
  }

  exportPhotos(photos: any[], options: ExportOptions = { format: "csv" }) {
    const processedPhotos = photos.map((photo) => ({
      id: photo.id,
      caption: photo.caption || "",
      location_address: photo.location?.address || "",
      location_latitude: photo.location?.latitude || "",
      location_longitude: photo.location?.longitude || "",
      timestamp: photo.timestamp,
      type: photo.type,
      uploaded_by: options.includePersonalData ? photo.uploadedBy : "REDACTED",
      event_id: photo.eventId || "",
      file_size_bytes: photo.fileSize || "",
      file_type: photo.fileType || "",
      url: options.includePhotos ? photo.url : "EXCLUDED",
    }))

    const filename = `eco-sanjivani-photos-${this.formatDateForFilename(new Date())}.csv`

    if (options.format === "csv") {
      const csvContent = this.convertToCSV(processedPhotos)
      this.downloadFile(csvContent, filename, "text/csv")
    } else if (options.format === "json") {
      const jsonContent = JSON.stringify(processedPhotos, null, 2)
      this.downloadFile(jsonContent, filename.replace(".csv", ".json"), "application/json")
    }
  }

  exportComprehensiveReport(data: ExportData, options: ExportOptions = { format: "csv" }) {
    const timestamp = this.formatDateForFilename(new Date())

    if (options.format === "json") {
      // Single JSON file with all data
      const comprehensiveData = {
        exportDate: new Date().toISOString(),
        dateRange: options.dateRange,
        summary: {
          totalEvents: data.events?.length || 0,
          totalVolunteers: data.volunteers?.length || 0,
          totalPhotos: data.photos?.length || 0,
          totalPartnerships: data.partnerships?.length || 0,
        },
        events: data.events || [],
        volunteers: data.volunteers || [],
        impactMetrics: data.impactMetrics || [],
        photos: data.photos || [],
        partnerships: data.partnerships || [],
      }

      const jsonContent = JSON.stringify(comprehensiveData, null, 2)
      this.downloadFile(jsonContent, `eco-sanjivani-comprehensive-report-${timestamp}.json`, "application/json")
    } else {
      // Multiple CSV files in a zip-like structure (sequential downloads)
      if (data.events && data.events.length > 0) {
        this.exportEvents(data.events, options)
      }

      setTimeout(() => {
        if (data.volunteers && data.volunteers.length > 0) {
          this.exportVolunteers(data.volunteers, options)
        }
      }, 500)

      setTimeout(() => {
        if (data.impactMetrics && data.impactMetrics.length > 0) {
          this.exportImpactMetrics(data.impactMetrics, options)
        }
      }, 1000)

      setTimeout(() => {
        if (data.photos && data.photos.length > 0) {
          this.exportPhotos(data.photos, options)
        }
      }, 1500)
    }
  }

  generateGrantReport(data: ExportData, grantInfo: { name: string; period: string; requirements: string[] }) {
    const report = {
      grantName: grantInfo.name,
      reportingPeriod: grantInfo.period,
      generatedDate: new Date().toISOString(),
      organizationName: "Eco-Sanjivani Marine Conservation Platform",

      executiveSummary: {
        totalEvents: data.events?.length || 0,
        totalVolunteers: data.volunteers?.length || 0,
        totalWasteCollected: data.impactMetrics?.reduce((sum, m) => sum + (m.wasteCollected || 0), 0) || 0,
        totalAreasRestored: data.impactMetrics?.reduce((sum, m) => sum + (m.areasRestored || 0), 0) || 0,
        totalCarbonOffset: data.impactMetrics?.reduce((sum, m) => sum + (m.carbonOffset || 0), 0) || 0,
      },

      detailedMetrics: data.impactMetrics || [],
      eventSummary:
        data.events?.map((event) => ({
          title: event.title,
          date: event.date,
          participants: event.currentParticipants,
          location: event.location?.address,
          category: event.category,
          status: event.status,
        })) || [],

      volunteerEngagement: {
        totalRegistered: data.volunteers?.length || 0,
        activeVolunteers: data.volunteers?.filter((v) => v.eventsParticipated > 0).length || 0,
        averageHoursPerVolunteer:
          data.volunteers?.reduce((sum, v) => sum + (v.totalHours || 0), 0) / (data.volunteers?.length || 1) || 0,
      },

      partnerships:
        data.partnerships?.map((p) => ({
          name: p.name,
          type: p.type,
          contribution: p.impactMetrics,
        })) || [],

      requirements: grantInfo.requirements.map((req) => ({
        requirement: req,
        status: "Completed", // This would be dynamically determined
        evidence: "See attached data exports and impact metrics",
      })),
    }

    const jsonContent = JSON.stringify(report, null, 2)
    this.downloadFile(
      jsonContent,
      `eco-sanjivani-grant-report-${grantInfo.name.toLowerCase().replace(/\s+/g, "-")}-${this.formatDateForFilename(new Date())}.json`,
      "application/json",
    )
  }
}

export const dataExporter = new DataExporter()
