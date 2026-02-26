'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useProjectStore } from '@/lib/store'
import { Download, FileJson, FileText, Copy, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

export default function ExportPage() {
  const { project } = useProjectStore()
  const [selectedSections, setSelectedSections] = useState({
    overview: true,
    architecture: true,
    microservices: true,
    data: true,
    security: true,
    deployment: true,
  })

  const sections = [
    { id: 'overview', name: 'Project Overview', description: 'Basic project information' },
    { id: 'architecture', name: 'Architecture Diagrams', description: 'System components and connections' },
    { id: 'microservices', name: 'Microservices', description: 'Service definitions and specifications' },
    { id: 'data', name: 'Data Architecture', description: 'Database strategy and ER diagrams' },
    { id: 'security', name: 'Security Planning', description: 'Security measures and compliance' },
    { id: 'deployment', name: 'Cloud Deployment', description: 'Infrastructure and deployment' },
  ]

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(project, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${project.title}-project.json`
    link.click()
  }

  const handleExportMarkdown = () => {
    let markdown = `# ${project.title}\n\n`
    markdown += `**Description:** ${project.description}\n\n`
    markdown += `**Last Updated:** ${new Date(project.lastUpdated).toLocaleString()}\n\n`

    markdown += `## Project Sections\n\n`
    const sections = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    sections.forEach((sec) => {
      const completed = project.completedSections.includes(sec) ? '✓' : '○'
      markdown += `- [${completed}] Section ${sec}\n`
    })

    markdown += `\n## Microservices\n\n`
    project.microservices.forEach((service) => {
      markdown += `### ${service.name}\n`
      markdown += `- **Responsibilities:** ${service.responsibilities}\n`
      markdown += `- **Entities:** ${service.entities}\n`
      markdown += `- **Database:** ${service.databaseType}\n`
      markdown += `- **Dependencies:** ${service.dependencies || 'None'}\n\n`
    })

    markdown += `\n## Architecture Components\n\n`
    markdown += `Total Components: ${project.diagramNodes.length}\n`
    markdown += `Total Connections: ${project.diagramConnections.length}\n\n`

    const dataStr = markdown
    const dataBlob = new Blob([dataStr], { type: 'text/markdown' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${project.title}-project.md`
    link.click()
  }

  const handleCopyJSON = async () => {
    const dataStr = JSON.stringify(project, null, 2)
    await navigator.clipboard.writeText(dataStr)
  }

  const completedSections = project.completedSections.length
  const totalSections = 9

  return (
    <div className="flex-1 overflow-auto bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40 px-8 py-6">
        <h1 className="text-3xl font-bold text-foreground">Export & Report</h1>
        <p className="text-muted-foreground mt-1">Generate documentation and export your project</p>
      </div>

      {/* Content */}
      <div className="p-8 max-w-6xl space-y-8">
        {/* Project Status */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Completion</span>
                <span className="text-sm font-bold text-primary">
                  {completedSections} / {totalSections} sections
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${(completedSections / totalSections) * 100}%` }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-muted-foreground mb-1">Microservices Defined</p>
                <p className="text-2xl font-bold">{project.microservices.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-muted-foreground mb-1">Architecture Components</p>
                <p className="text-2xl font-bold">{project.diagramNodes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Export Formats */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle>Export Formats</CardTitle>
            <CardDescription>
              Download your project in different formats
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* JSON Export */}
            <div className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                  <FileJson className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">JSON Export</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Complete project data in JSON format. Perfect for backup or importing into other tools.
                  </p>
                  <div className="flex gap-2">
                    <Button onClick={handleExportJSON} size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Download JSON
                    </Button>
                    <Button onClick={handleCopyJSON} variant="outline" size="sm" className="gap-2">
                      <Copy className="w-4 h-4" />
                      Copy to Clipboard
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Markdown Export */}
            <div className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                  <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">Markdown Report</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Human-readable report in Markdown format. Great for documentation and presentations.
                  </p>
                  <Button onClick={handleExportMarkdown} size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download Markdown
                  </Button>
                </div>
              </div>
            </div>

            {/* PDF Export (Future) */}
            <div className="p-4 rounded-lg border border-dashed border-border opacity-50">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900">
                  <FileText className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">PDF Report (Coming Soon)</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Professional PDF document formatted for academic submission and printing.
                  </p>
                  <Button disabled size="sm">Coming Soon</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Sections */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle>Report Sections</CardTitle>
            <CardDescription>
              Choose which sections to include in your report
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <Checkbox
                    id={section.id}
                    defaultChecked={true}
                    onCheckedChange={(checked) =>
                      setSelectedSections({ ...selectedSections, [section.id]: checked })
                    }
                  />
                  <div className="flex-1">
                    <Label htmlFor={section.id} className="font-medium cursor-pointer">
                      {section.name}
                    </Label>
                    <p className="text-xs text-muted-foreground">{section.description}</p>
                  </div>
                  {project.completedSections.length > 0 && (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Export Tips */}
        <Card className="border border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">Export Tips for Academic Submission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>✓ Export as JSON to preserve all data and later import</li>
              <li>✓ Use Markdown for easy conversion to PDF with formatting</li>
              <li>✓ Include all sections in your report for complete documentation</li>
              <li>✓ Add diagrams and screenshots to enhance your presentation</li>
              <li>✓ Keep backups of your project at key milestones</li>
              <li>✓ Use consistent naming conventions across all exports</li>
            </ul>
          </CardContent>
        </Card>

        {/* Project Info */}
        <Card className="border border-border/50 bg-muted/30">
          <CardHeader>
            <CardTitle className="text-lg">Project Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Title:</span>
              <p className="font-mono">{project.title}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Description:</span>
              <p className="font-mono text-xs">{project.description}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Last Updated:</span>
              <p className="font-mono">{new Date(project.lastUpdated).toLocaleString()}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Project ID:</span>
              <p className="font-mono text-xs">{project.id}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
