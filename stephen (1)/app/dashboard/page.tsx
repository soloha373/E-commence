'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Circle, Download, Save, Sparkles } from 'lucide-react'
import { useProjectStore } from '@/lib/store'
import { HelpTooltip } from '@/components/help-tooltip'
import { demoProject } from '@/lib/demo-data'

const sections = [
  { id: 'A', name: 'Architectural Style', description: 'Define system architecture patterns' },
  { id: 'B', name: 'System Architecture', description: 'Overall system design and components' },
  { id: 'C', name: 'Service Decomposition', description: 'Break down into microservices' },
  { id: 'D', name: 'Data Architecture', description: 'Database design and data flow' },
  { id: 'E', name: 'Request Flow', description: 'Sequence diagrams and flows' },
  { id: 'F', name: 'Cloud Deployment', description: 'Infrastructure and deployment' },
  { id: 'G', name: 'Security', description: 'Security measures and compliance' },
  { id: 'H', name: 'Scalability', description: 'Scaling strategies and performance' },
  { id: 'I', name: 'Cost Analysis', description: 'Cost estimation and optimization' },
]

export default function Dashboard() {
  const { project, saveProject, toggleSectionComplete, updateProject } = useProjectStore()
  const completedCount = sections.filter(s => project.completedSections.includes(s.id)).length
  const progressPercent = (completedCount / sections.length) * 100

  const handleSaveProject = () => {
    saveProject()
    // Show toast or notification
  }

  const handleExportProject = () => {
    const dataStr = JSON.stringify(project, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${project.title}-project.json`
    link.click()
  }

  const handleLoadDemo = () => {
    updateProject(demoProject as any)
  }

  return (
    <div className="flex-1 overflow-auto bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40 px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-foreground">
                {project.title}
              </h1>
              <HelpTooltip content="Track your progress through all 9 architectural design sections. Complete each section by clicking on it. Save your work regularly." />
            </div>
            <p className="text-muted-foreground mt-1">
              Architectural Design Project • {new Date().getFullYear()}
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLoadDemo}
              className="gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Load Demo
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSaveProject}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </Button>
            <Button 
              variant="outline"
              size="sm"
              onClick={handleExportProject}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Progress: {completedCount} of {sections.length} sections
            </span>
            <span className="text-sm font-bold text-primary">{Math.round(progressPercent)}%</span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8 max-w-6xl">
        <h2 className="text-2xl font-bold text-foreground mb-6">Project Sections</h2>
        
        <div className="grid gap-4">
          {sections.map((section) => {
            const isCompleted = project.completedSections.includes(section.id)
            return (
              <Card 
                key={section.id}
                className="border border-border/50 hover:border-primary/50 transition-colors cursor-pointer hover:shadow-md"
                onClick={() => toggleSectionComplete(section.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-lg font-bold text-primary bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center">
                          {section.id}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{section.name}</CardTitle>
                          <CardDescription>{section.description}</CardDescription>
                        </div>
                      </div>
                    </div>
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                </CardHeader>
                {isCompleted && (
                  <CardContent>
                    <Badge variant="secondary">✓ Completed</Badge>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>

        {/* Help Section */}
        <Card className="mt-8 border border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">Getting Started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">📚 What is this project?</h4>
              <p className="text-sm text-muted-foreground">
                This is a design documentation tool to help you create a comprehensive architecture design for a scalable nationwide e-commerce system. Click on any section above to start designing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">💡 Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use the Architecture Builder to create visual diagrams</li>
                <li>• Define microservices with specific responsibilities</li>
                <li>• Document your data architecture choices</li>
                <li>• Plan security and scalability strategies</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
