'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Cloud, Globe, HardDrive, Shield, Zap, Database } from 'lucide-react'

const cloudComponents = [
  {
    name: 'Load Balancer',
    description: 'Distribute traffic across multiple servers',
    icon: Zap,
    examples: 'AWS ELB, Nginx, HAProxy',
    region: 'Global',
  },
  {
    name: 'API Gateway',
    description: 'Central entry point for all API requests',
    icon: Globe,
    examples: 'AWS API Gateway, Kong, Traefik',
    region: 'Primary Region',
  },
  {
    name: 'Application Servers',
    description: 'Host microservice instances',
    icon: Cloud,
    examples: 'EC2, Container Instances, App Service',
    region: 'Multiple Zones',
  },
  {
    name: 'Database Servers',
    description: 'Primary and replica databases',
    icon: Database,
    examples: 'RDS, DynamoDB, Firestore',
    region: 'Multi-Region',
  },
  {
    name: 'Caching Layer',
    description: 'In-memory data caching',
    icon: HardDrive,
    examples: 'Redis, Memcached, ElastiCache',
    region: 'Primary Region',
  },
  {
    name: 'CDN',
    description: 'Content Delivery Network for static assets',
    icon: Globe,
    examples: 'CloudFront, Cloudflare, Akamai',
    region: 'Global Edge',
  },
  {
    name: 'Object Storage',
    description: 'Scalable file storage',
    icon: HardDrive,
    examples: 'S3, Google Cloud Storage, Azure Blob',
    region: 'Multi-Region',
  },
  {
    name: 'Backup & DR',
    description: 'Disaster recovery and backups',
    icon: Shield,
    examples: 'AWS Backup, Cross-region replication',
    region: 'Separate Region',
  },
]

const deploymentPatterns = [
  {
    name: 'Blue-Green Deployment',
    description: 'Run two identical production environments',
    benefits: 'Zero downtime, quick rollback',
    risk: 'Double resource cost',
  },
  {
    name: 'Canary Deployment',
    description: 'Gradually roll out to a small percentage of users',
    benefits: 'Risk mitigation, easy rollback',
    risk: 'Complex monitoring required',
  },
  {
    name: 'Rolling Deployment',
    description: 'Incrementally replace instances',
    benefits: 'Gradual updates, cost-efficient',
    risk: 'Version compatibility needed',
  },
]

export default function CloudDeploymentPage() {
  return (
    <div className="flex-1 overflow-auto bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40 px-8 py-6">
        <h1 className="text-3xl font-bold text-foreground">Cloud Deployment</h1>
        <p className="text-muted-foreground mt-1">Design your cloud infrastructure and deployment architecture</p>
      </div>

      {/* Content */}
      <div className="p-8 max-w-6xl space-y-8">
        {/* Cloud Architecture Overview */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle>Cloud Infrastructure Architecture</CardTitle>
            <CardDescription>
              Components needed for a scalable e-commerce platform deployment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {cloudComponents.map((component) => {
                const Icon = component.icon
                return (
                  <div
                    key={component.name}
                    className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{component.name}</h4>
                        <Checkbox className="mt-2" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{component.description}</p>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-semibold">Examples:</span> {component.examples}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-semibold">Placement:</span> {component.region}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Region Strategy */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle>Multi-Region Deployment Strategy</CardTitle>
            <CardDescription>
              Ensure high availability and low latency for global users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Primary Region</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                    Main production environment with all services
                  </p>
                  <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Accra, Ghana (Africa)</li>
                    <li>• EC2 instances</li>
                    <li>• RDS database</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Secondary Region</h4>
                  <p className="text-sm text-green-800 dark:text-green-200 mb-2">
                    Read replicas and backup region
                  </p>
                  <ul className="text-xs text-green-700 dark:text-green-300 space-y-1">
                    <li>• Lagos, Nigeria</li>
                    <li>• Read replicas</li>
                    <li>• Standby instance</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Global CDN</h4>
                  <p className="text-sm text-purple-800 dark:text-purple-200 mb-2">
                    Serve content from edge locations
                  </p>
                  <ul className="text-xs text-purple-700 dark:text-purple-300 space-y-1">
                    <li>• CloudFront distribution</li>
                    <li>• Cached assets</li>
                    <li>• DDoS protection</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deployment Patterns */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle>Deployment Strategies</CardTitle>
            <CardDescription>
              Different approaches to rolling out updates safely
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deploymentPatterns.map((pattern) => (
                <div key={pattern.name} className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{pattern.name}</h4>
                    <Badge variant="secondary">Strategy</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{pattern.description}</p>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-green-600 dark:text-green-400">Benefits:</span>
                      <p className="text-muted-foreground">{pattern.benefits}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-orange-600 dark:text-orange-400">Considerations:</span>
                      <p className="text-muted-foreground">{pattern.risk}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monitoring & Logging */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle>Monitoring & Observability</CardTitle>
            <CardDescription>
              Essential tools for production monitoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  category: 'Metrics',
                  tools: 'Prometheus, CloudWatch, DataDog',
                  what: 'CPU, memory, request rates, latency',
                },
                {
                  category: 'Logging',
                  tools: 'ELK Stack, CloudWatch Logs, Splunk',
                  what: 'Application logs, access logs, errors',
                },
                {
                  category: 'Tracing',
                  tools: 'Jaeger, X-Ray, Zipkin',
                  what: 'Request flows across services',
                },
                {
                  category: 'Alerting',
                  tools: 'PagerDuty, Opsgenie, Slack',
                  what: 'Notifications for critical issues',
                },
              ].map((item) => (
                <div key={item.category} className="p-4 rounded-lg bg-muted/50 border border-border/50">
                  <h4 className="font-semibold text-foreground mb-2">{item.category}</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    <span className="font-semibold">Tools:</span> {item.tools}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold">Monitors:</span> {item.what}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Auto-Scaling */}
        <Card className="border border-border/50 bg-primary/5">
          <CardHeader>
            <CardTitle>Auto-Scaling Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Horizontal Scaling</h4>
              <p className="text-sm text-muted-foreground">
                Add more instances during peak traffic. Set thresholds at 70% CPU or 75% memory usage.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Vertical Scaling</h4>
              <p className="text-sm text-muted-foreground">
                Increase instance size for better performance. Less common but useful for database servers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Scheduled Scaling</h4>
              <p className="text-sm text-muted-foreground">
                Pre-scale before expected traffic peaks (weekends, holidays, sales events).
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
