'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useProjectStore } from '@/lib/store'
import { Settings, Trash2 } from 'lucide-react'

export default function SettingsPage() {
  const { project, updateProject } = useProjectStore()

  const handleTitleChange = (title: string) => {
    updateProject({ title })
  }

  const handleDescriptionChange = (description: string) => {
    updateProject({ description })
  }

  return (
    <div className="flex-1 overflow-auto bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40 px-8 py-6">
        <div className="flex items-center gap-3">
          <Settings className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        </div>
        <p className="text-muted-foreground mt-1">Manage your project settings</p>
      </div>

      {/* Content */}
      <div className="p-8 max-w-4xl space-y-8">
        {/* Project Settings */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
            <CardDescription>
              Basic project details and metadata
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="project-title">Project Title</Label>
              <Input
                id="project-title"
                value={project.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter project title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project-description">Description</Label>
              <Textarea
                id="project-description"
                value={project.description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder="Enter project description"
                rows={4}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-muted-foreground mb-1">Project ID</p>
                <p className="font-mono text-xs break-all">{project.id}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-muted-foreground mb-1">Created</p>
                <p className="font-mono text-xs">
                  {new Date(project.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            </div>

            <Button className="w-full">Save Changes</Button>
          </CardContent>
        </Card>

        {/* Storage & Data */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle>Storage & Data</CardTitle>
            <CardDescription>
              Manage your project data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
              <h4 className="font-semibold text-foreground mb-2">Data Storage Location</h4>
              <p className="text-sm text-muted-foreground">
                Your project is stored locally in browser storage using Zustand. All data remains on your device.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Backup Your Data</h4>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                Regularly export your project data to ensure you don't lose your work.
              </p>
              <Button variant="outline" size="sm">Go to Export</Button>
            </div>
          </CardContent>
        </Card>

        {/* Display Settings */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle>Display Preferences</CardTitle>
            <CardDescription>
              Customize your interface
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50">
              <div>
                <p className="font-semibold text-foreground">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Automatically follows system preference</p>
              </div>
              <Button variant="outline" size="sm">Auto</Button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50">
              <div>
                <p className="font-semibold text-foreground">Compact View</p>
                <p className="text-sm text-muted-foreground">Show more content on screen</p>
              </div>
              <input type="checkbox" className="w-4 h-4" />
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg border border-destructive/50 bg-destructive/10">
              <h4 className="font-semibold text-destructive mb-2">Delete Project</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Permanently delete this project and all associated data. This action cannot be undone.
              </p>
              <Button variant="destructive" size="sm" className="gap-2">
                <Trash2 className="w-4 h-4" />
                Delete Project
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Help & Support */}
        <Card className="border border-border/50 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">Help & Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Check the Dashboard for project overview</li>
              <li>• Use Architecture Builder to design system components</li>
              <li>• Define microservices in the Services section</li>
              <li>• Document your choices in each section</li>
              <li>• Export your work regularly to prevent data loss</li>
              <li>• All data is saved to your browser's local storage</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
