'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Trash2, Download, Copy, Grid3x3 } from 'lucide-react'
import { useProjectStore } from '@/lib/store'
import { HelpTooltip } from '@/components/help-tooltip'

const componentTypes = [
  { value: 'client', label: 'Client Layer', color: 'bg-blue-500' },
  { value: 'gateway', label: 'API Gateway', color: 'bg-purple-500' },
  { value: 'service', label: 'Microservice', color: 'bg-green-500' },
  { value: 'database', label: 'Database', color: 'bg-orange-500' },
  { value: 'cache', label: 'Cache', color: 'bg-yellow-500' },
  { value: 'external', label: 'External API', color: 'bg-pink-500' },
]

const protocols = [
  'HTTP/REST',
  'gRPC',
  'Message Queue',
  'WebSocket',
  'Database Connection',
]

export default function ArchitectureBuilder() {
  const { project, addDiagramNode, updateDiagramNode, removeDiagramNode, addConnection, removeConnection } = useProjectStore()
  const [selectedNodeType, setSelectedNodeType] = useState('service')
  const [nodeName, setNodeName] = useState('')
  const [connectionFrom, setConnectionFrom] = useState('')
  const [connectionTo, setConnectionTo] = useState('')
  const [connectionProtocol, setConnectionProtocol] = useState('HTTP/REST')
  const [connectionLabel, setConnectionLabel] = useState('')

  const handleAddNode = () => {
    if (!nodeName) return

    const newNode = {
      id: `node-${Date.now()}`,
      type: selectedNodeType,
      label: nodeName,
      x: Math.random() * 400,
      y: Math.random() * 400,
    }

    addDiagramNode(newNode)
    setNodeName('')
  }

  const handleAddConnection = () => {
    if (!connectionFrom || !connectionTo) return

    const newConnection = {
      id: `conn-${Date.now()}`,
      from: connectionFrom,
      to: connectionTo,
      protocol: connectionProtocol,
      label: connectionLabel,
    }

    addConnection(newConnection)
    setConnectionLabel('')
  }

  return (
    <div className="flex-1 overflow-auto bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40 px-8 py-6">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-3xl font-bold text-foreground">Architecture Builder</h1>
          <HelpTooltip content="Create your system architecture by adding components (Client Layer, API Gateway, Microservices, Databases, etc.) and connecting them with protocols. This visual representation shows how all parts of your system interact." />
        </div>
        <p className="text-muted-foreground mt-1">Design your system architecture with drag-and-drop components</p>
      </div>

      {/* Content */}
      <div className="p-8 max-w-6xl">
        <Tabs defaultValue="builder" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="builder">Visual Builder</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
          </TabsList>

          {/* Visual Builder Tab */}
          <TabsContent value="builder" className="mt-6">
            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle>Architecture Diagram Canvas</CardTitle>
                <CardDescription>
                  Drag components below into this area to build your system architecture
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-border rounded-lg bg-muted/30 min-h-96 p-8 relative overflow-auto">
                  {project.diagramNodes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full min-h-80 text-muted-foreground gap-4">
                      <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Grid3x3 className="w-8 h-8 text-primary/50" />
                      </div>
                      <p className="text-center max-w-xs">No components yet. Add components from the panel below to start building your architecture diagram.</p>
                    </div>
                  ) : (
                    <div className="relative" style={{ minWidth: '600px', minHeight: '400px' }}>
                      {/* Draw grid background */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(0,0,0,.03) 19px, rgba(0,0,0,.03) 20px)' }}>
                        {project.diagramConnections.map((conn) => {
                          const fromNode = project.diagramNodes.find(n => n.id === conn.from)
                          const toNode = project.diagramNodes.find(n => n.id === conn.to)
                          if (!fromNode || !toNode) return null
                          
                          return (
                            <g key={conn.id}>
                              <line
                                x1={fromNode.x + 80}
                                y1={fromNode.y + 40}
                                x2={toNode.x + 80}
                                y2={toNode.y + 40}
                                stroke="url(#gradient)"
                                strokeWidth="2"
                                markerEnd="url(#arrowhead)"
                              />
                              <text
                                x={(fromNode.x + toNode.x + 160) / 2}
                                y={(fromNode.y + toNode.y + 80) / 2 - 5}
                                fontSize="11"
                                fill="var(--muted-foreground)"
                                textAnchor="middle"
                              >
                                {conn.protocol}
                              </text>
                            </g>
                          )
                        })}
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="var(--primary)" />
                            <stop offset="100%" stopColor="var(--accent)" />
                          </linearGradient>
                          <marker
                            id="arrowhead"
                            markerWidth="10"
                            markerHeight="10"
                            refX="9"
                            refY="3"
                            orient="auto"
                          >
                            <polygon points="0 0, 10 3, 0 6" fill="var(--primary)" />
                          </marker>
                        </defs>
                      </svg>

                      {/* Render nodes */}
                      {project.diagramNodes.map((node) => {
                        const componentType = componentTypes.find(t => t.value === node.type)
                        return (
                          <div
                            key={node.id}
                            className="absolute p-3 rounded-lg border border-border bg-card shadow-md hover:shadow-lg hover:border-primary/50 transition-all hover:scale-105"
                            style={{
                              left: `${node.x}px`,
                              top: `${node.y}px`,
                              width: '160px',
                              zIndex: 10,
                            }}
                          >
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-2">
                                <div className={`w-3 h-3 rounded-full ${componentType?.color} flex-shrink-0`} />
                                <span className="font-medium text-xs flex-1 truncate">{node.label}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeDiagramNode(node.id)}
                                className="h-6 px-2 w-full justify-center"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Connection Display */}
                {project.diagramConnections.length > 0 && (
                  <div className="mt-6 p-4 rounded-lg bg-muted">
                    <h4 className="font-semibold text-sm mb-3">Connections</h4>
                    <div className="space-y-2">
                      {project.diagramConnections.map((conn) => {
                        const fromNode = project.diagramNodes.find(n => n.id === conn.from)
                        const toNode = project.diagramNodes.find(n => n.id === conn.to)
                        return (
                          <div key={conn.id} className="flex items-center justify-between text-sm p-2 bg-background rounded">
                            <span>
                              <span className="font-medium">{fromNode?.label}</span>
                              {' → '}
                              <span className="font-medium">{toNode?.label}</span>
                              <span className="text-muted-foreground"> ({conn.protocol})</span>
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeConnection(conn.id)}
                              className="h-6 px-2"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Components Tab */}
          <TabsContent value="components" className="mt-6 space-y-6">
            {/* Add Components */}
            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Add Components</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="component-type">Component Type</Label>
                  <Select value={selectedNodeType} onValueChange={setSelectedNodeType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {componentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="component-name">Component Name</Label>
                  <Input
                    id="component-name"
                    placeholder="e.g., User Service, PostgreSQL DB"
                    value={nodeName}
                    onChange={(e) => setNodeName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddNode()}
                  />
                </div>

                <Button onClick={handleAddNode} className="w-full gap-2">
                  <Plus className="w-4 h-4" />
                  Add Component
                </Button>
              </CardContent>
            </Card>

            {/* Add Connections */}
            <Card className="border border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Add Connections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="from-component">From</Label>
                    <Select value={connectionFrom} onValueChange={setConnectionFrom}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {project.diagramNodes.map((node) => (
                          <SelectItem key={node.id} value={node.id}>
                            {node.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="to-component">To</Label>
                    <Select value={connectionTo} onValueChange={setConnectionTo}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {project.diagramNodes.map((node) => (
                          <SelectItem key={node.id} value={node.id}>
                            {node.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="protocol">Protocol</Label>
                  <Select value={connectionProtocol} onValueChange={setConnectionProtocol}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {protocols.map((protocol) => (
                        <SelectItem key={protocol} value={protocol}>
                          {protocol}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="connection-label">Label (Optional)</Label>
                  <Input
                    id="connection-label"
                    placeholder="e.g., User creation flow"
                    value={connectionLabel}
                    onChange={(e) => setConnectionLabel(e.target.value)}
                  />
                </div>

                <Button onClick={handleAddConnection} className="w-full gap-2">
                  <Plus className="w-4 h-4" />
                  Add Connection
                </Button>
              </CardContent>
            </Card>

            {/* Component Reference */}
            <Card className="border border-border/50 bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg">Component Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {componentTypes.map((type) => (
                    <div key={type.value} className="flex items-center gap-2 p-2">
                      <div className={`w-3 h-3 rounded-full ${type.color}`} />
                      <span className="text-sm">{type.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
