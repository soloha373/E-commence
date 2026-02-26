'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit2, Trash2, Archive } from 'lucide-react'
import { useProjectStore, Microservice } from '@/lib/store'
import { HelpTooltip } from '@/components/help-tooltip'

const databaseTypes = [
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'Redis',
  'DynamoDB',
  'Cassandra',
]

export default function MicroservicesPage() {
  const { project, addMicroservice, updateMicroservice, removeMicroservice } = useProjectStore()
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Microservice>>({
    name: '',
    responsibilities: '',
    entities: '',
    endpoints: '',
    dependencies: '',
    databaseType: 'PostgreSQL',
  })

  const handleOpenDialog = (service?: Microservice) => {
    if (service) {
      setEditingId(service.id)
      setFormData(service)
    } else {
      setEditingId(null)
      setFormData({
        name: '',
        responsibilities: '',
        entities: '',
        endpoints: '',
        dependencies: '',
        databaseType: 'PostgreSQL',
      })
    }
    setOpen(true)
  }

  const handleSave = () => {
    if (!formData.name) return

    if (editingId) {
      updateMicroservice(editingId, formData)
    } else {
      const newService: Microservice = {
        id: `service-${Date.now()}`,
        name: formData.name || '',
        responsibilities: formData.responsibilities || '',
        entities: formData.entities || '',
        endpoints: formData.endpoints || '',
        dependencies: formData.dependencies || '',
        databaseType: formData.databaseType || 'PostgreSQL',
      }
      addMicroservice(newService)
    }

    setOpen(false)
    setFormData({
      name: '',
      responsibilities: '',
      entities: '',
      endpoints: '',
      dependencies: '',
      databaseType: 'PostgreSQL',
    })
  }

  return (
    <div className="flex-1 overflow-auto bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold text-foreground">Microservice Designer</h1>
              <HelpTooltip content="Define individual microservices with their responsibilities, entities, endpoints, and database requirements. Each service should have a single business capability." />
            </div>
            <p className="text-muted-foreground mt-1">Define your microservices and their specifications</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-96 overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingId ? 'Edit Service' : 'Add New Service'}</DialogTitle>
                <DialogDescription>
                  Define the microservice responsibilities, entities, and dependencies
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="service-name">Service Name</Label>
                  <Input
                    id="service-name"
                    placeholder="e.g., Authentication Service"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsibilities">Responsibilities</Label>
                  <Textarea
                    id="responsibilities"
                    placeholder="What does this service do?"
                    value={formData.responsibilities || ''}
                    onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="entities">Core Entities</Label>
                  <Input
                    id="entities"
                    placeholder="e.g., User, Session, Permission"
                    value={formData.entities || ''}
                    onChange={(e) => setFormData({ ...formData, entities: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endpoints">REST Endpoints</Label>
                  <Textarea
                    id="endpoints"
                    placeholder="e.g., /auth/login, /auth/register, /auth/logout"
                    value={formData.endpoints || ''}
                    onChange={(e) => setFormData({ ...formData, endpoints: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dependencies">Dependencies</Label>
                  <Input
                    id="dependencies"
                    placeholder="e.g., Product Service, Payment Service"
                    value={formData.dependencies || ''}
                    onChange={(e) => setFormData({ ...formData, dependencies: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="database-type">Database Type</Label>
                  <Select value={formData.databaseType} onValueChange={(value) => setFormData({ ...formData, databaseType: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {databaseTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSave} className="w-full">
                  {editingId ? 'Update Service' : 'Add Service'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 max-w-6xl">
        {project.microservices.length === 0 ? (
          <Card className="border border-dashed border-border">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <Archive className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Services Yet</h3>
                <p className="text-muted-foreground mb-6">Get started by adding your first microservice</p>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => handleOpenDialog()} className="gap-2">
                      <Plus className="w-4 h-4" />
                      Add Your First Service
                    </Button>
                  </DialogTrigger>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {project.microservices.map((service) => (
              <Card key={service.id} className="border border-border/50 hover:border-primary/50 transition-colors">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <CardTitle>{service.name}</CardTitle>
                      <CardDescription className="mt-2">{service.responsibilities}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenDialog(service)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMicroservice(service.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-2">Core Entities</h4>
                      <p className="text-sm text-muted-foreground">{service.entities}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-2">Database</h4>
                      <div className="flex gap-2">
                        <Badge variant="secondary">{service.databaseType}</Badge>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-2">REST Endpoints</h4>
                      <div className="space-y-1">
                        {service.endpoints.split(',').map((endpoint, idx) => (
                          <p key={idx} className="text-sm font-mono text-primary">
                            {endpoint.trim()}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-2">Dependencies</h4>
                      <p className="text-sm text-muted-foreground">
                        {service.dependencies || 'No dependencies'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Reference Section */}
        <Card className="mt-8 border border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">Service Design Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Single Responsibility</h4>
              <p className="text-sm text-muted-foreground">
                Each microservice should have one reason to change and own its data.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Clear Boundaries</h4>
              <p className="text-sm text-muted-foreground">
                Define clear APIs and dependencies between services to avoid tight coupling.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Example Services</h4>
              <p className="text-sm text-muted-foreground">
                Authentication, Product Catalog, Order Management, Payment Processing, Delivery Tracking, Notification Service
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
