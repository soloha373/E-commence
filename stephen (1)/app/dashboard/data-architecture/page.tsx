'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useProjectStore } from '@/lib/store'
import { Database, Lock } from 'lucide-react'

export default function DataArchitecturePage() {
  const { project, updateProject } = useProjectStore()

  const handleNotesChange = (notes: string) => {
    updateProject({ dataArchitectureNotes: notes })
  }

  return (
    <div className="flex-1 overflow-auto bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40 px-8 py-6">
        <h1 className="text-3xl font-bold text-foreground">Data Architecture</h1>
        <p className="text-muted-foreground mt-1">Design your data storage strategy and ER diagrams</p>
      </div>

      {/* Content */}
      <div className="p-8 max-w-6xl space-y-8">
        {/* Strategy Selection */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle>Database Strategy</CardTitle>
            <CardDescription>
              Choose your data storage approach for the microservices architecture
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="db-per-service" onValueChange={(value) => updateProject({ dataArchitectureNotes: value })}>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors">
                  <RadioGroupItem value="shared-db" id="shared-db" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="shared-db" className="text-base font-semibold cursor-pointer">
                      Shared Database (Monolithic)
                    </Label>
                    <p className="text-sm text-muted-foreground mt-2">
                      All microservices share a single database. Simple to implement but creates tight coupling and potential bottlenecks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors">
                  <RadioGroupItem value="db-per-service" id="db-per-service" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="db-per-service" className="text-base font-semibold cursor-pointer">
                      Database per Service (Recommended)
                    </Label>
                    <p className="text-sm text-muted-foreground mt-2">
                      Each microservice has its own database. Provides loose coupling and independent scaling, but requires distributed transactions management.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors">
                  <RadioGroupItem value="hybrid" id="hybrid" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="hybrid" className="text-base font-semibold cursor-pointer">
                      Hybrid Approach
                    </Label>
                    <p className="text-sm text-muted-foreground mt-2">
                      Mix of shared and separate databases based on service relationships and data consistency requirements.
                    </p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* ER Diagram Description */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Entity Relationship Diagram (ERD)
            </CardTitle>
            <CardDescription>
              Document your entity relationships and database schema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg bg-muted/20 p-8 text-center">
                <Database className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  Visual ERD builder would display your entities and relationships here
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Example Entities</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { name: 'User', fields: 'id, email, password_hash, name, created_at' },
                      { name: 'Product', fields: 'id, name, description, price, stock' },
                      { name: 'Order', fields: 'id, user_id, order_date, status, total_price' },
                      { name: 'OrderItem', fields: 'id, order_id, product_id, quantity, price' },
                    ].map((entity) => (
                      <Card key={entity.name} className="bg-card border border-border/50 p-3">
                        <h5 className="font-semibold text-sm text-foreground mb-2">{entity.name}</h5>
                        <p className="text-xs text-muted-foreground font-mono">{entity.fields}</p>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Relationships</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• User 1:N Order (One user has many orders)</li>
                    <li>• Order 1:N OrderItem (One order has many items)</li>
                    <li>• Product 1:N OrderItem (One product in many orders)</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Consistency */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Data Consistency Strategy
            </CardTitle>
            <CardDescription>
              Define your approach to data consistency across services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                <h4 className="font-semibold text-foreground mb-2">Strong Consistency</h4>
                <p className="text-sm text-muted-foreground">
                  All replicas are updated synchronously. Best for critical data like payment information.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                <h4 className="font-semibold text-foreground mb-2">Eventual Consistency</h4>
                <p className="text-sm text-muted-foreground">
                  Updates propagate asynchronously. Better for performance in distributed systems. Use for non-critical data.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                <h4 className="font-semibold text-foreground mb-2">Causal Consistency</h4>
                <p className="text-sm text-muted-foreground">
                  Maintains causal ordering of related operations. Good balance for most microservice architectures.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes Section */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle>Data Architecture Notes</CardTitle>
            <CardDescription>
              Document your data architecture decisions and justifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Describe your data architecture choices, data flow, replication strategy, backup plans, etc."
              value={project.dataArchitectureNotes}
              onChange={(e) => handleNotesChange(e.target.value)}
              rows={10}
              className="font-mono text-sm"
            />
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card className="border border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">Data Architecture Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>✓ Identify all entities and their relationships early</li>
              <li>✓ Choose between shared and per-service databases based on consistency needs</li>
              <li>✓ Plan for data consistency across service boundaries</li>
              <li>✓ Consider backup and disaster recovery strategies</li>
              <li>✓ Document schema versioning and migration strategies</li>
              <li>✓ Plan for data replication and synchronization</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
