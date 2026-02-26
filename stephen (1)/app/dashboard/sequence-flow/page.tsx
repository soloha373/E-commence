'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function SequenceFlowPage() {
  const orderFlowSteps = [
    {
      actor: 'Customer',
      action: 'Place Order',
      description: 'Customer initiates an order through the web/mobile app',
      service: 'Order Service',
    },
    {
      actor: 'Order Service',
      action: 'Validate Order',
      description: 'Verify product availability and customer details',
      service: 'Product Service',
    },
    {
      actor: 'Order Service',
      action: 'Create Payment Request',
      description: 'Request payment processing',
      service: 'Payment Service',
    },
    {
      actor: 'Payment Service',
      action: 'Process Payment',
      description: 'Process via MTN, Vodafone, or credit card',
      service: 'External Gateway',
    },
    {
      actor: 'Payment Service',
      action: 'Confirm Payment',
      description: 'Return payment status to Order Service',
      service: 'Order Service',
    },
    {
      actor: 'Order Service',
      action: 'Create Delivery Request',
      description: 'Trigger delivery process',
      service: 'Delivery Service',
    },
    {
      actor: 'Delivery Service',
      action: 'Send Notification',
      description: 'Notify customer via email/SMS',
      service: 'Notification Service',
    },
    {
      actor: 'Notification Service',
      action: 'Order Complete',
      description: 'Customer receives order confirmation',
      service: 'Customer',
    },
  ]

  const paymentFlowSteps = [
    {
      actor: 'Customer',
      action: 'Select Payment Method',
      description: 'Choose MTN Money, Vodafone Cash, or Card',
      service: 'Payment UI',
    },
    {
      actor: 'Payment Service',
      action: 'Validate Amount',
      description: 'Check order total and customer balance',
      service: 'Order Service',
    },
    {
      actor: 'Payment Service',
      action: 'Route to Provider',
      description: 'Send payment request to appropriate gateway',
      service: 'Mobile Money API',
    },
    {
      actor: 'Payment Gateway',
      action: 'Authenticate',
      description: 'Customer confirms payment on their USSD/app',
      service: 'Mobile Provider',
    },
    {
      actor: 'Payment Service',
      action: 'Confirm & Log',
      description: 'Record transaction in database',
      service: 'Payment Database',
    },
  ]

  const FlowVisualization = ({ steps }: { steps: typeof orderFlowSteps }) => (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <div key={index}>
          <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/50 transition-colors">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-semibold text-sm">
                {index + 1}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-foreground">{step.actor}</span>
                <Badge variant="outline" className="text-xs">{step.action}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground">Involves:</span>
                <Badge variant="secondary">{step.service}</Badge>
              </div>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className="flex justify-center py-2">
              <ArrowRight className="w-5 h-5 text-primary/50 rotate-90" />
            </div>
          )}
        </div>
      ))}
    </div>
  )

  return (
    <div className="flex-1 overflow-auto bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40 px-8 py-6">
        <h1 className="text-3xl font-bold text-foreground">Sequence Flow</h1>
        <p className="text-muted-foreground mt-1">Define request flows and service interactions</p>
      </div>

      {/* Content */}
      <div className="p-8 max-w-6xl space-y-8">
        {/* Customer Order Flow */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle>Order Placement Flow</CardTitle>
            <CardDescription>
              Complete sequence from order placement to delivery notification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FlowVisualization steps={orderFlowSteps} />
          </CardContent>
        </Card>

        {/* Payment Processing Flow */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle>Payment Processing Flow</CardTitle>
            <CardDescription>
              Payment gateway integration with mobile money providers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FlowVisualization steps={paymentFlowSteps} />
          </CardContent>
        </Card>

        {/* Service Communication */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle>Service Communication Patterns</CardTitle>
            <CardDescription>
              How different services interact with each other
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Synchronous (REST/gRPC)</h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Used for critical operations like order validation and payment confirmation. Direct request-response pattern.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Asynchronous (Message Queue)</h4>
                <p className="text-sm text-purple-800 dark:text-purple-200">
                  Used for non-critical operations like notifications and delivery tracking. Event-driven via message brokers.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Hybrid Approach</h4>
                <p className="text-sm text-green-800 dark:text-green-200">
                  Combine synchronous for immediate responses and asynchronous for background tasks.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Flow */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle>Cross-Service Data Flow</CardTitle>
            <CardDescription>
              How data moves between services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  from: 'Order Service',
                  to: 'Product Service',
                  data: 'Product IDs, quantities',
                  protocol: 'REST API',
                },
                {
                  from: 'Order Service',
                  to: 'Payment Service',
                  data: 'Order total, customer info',
                  protocol: 'gRPC',
                },
                {
                  from: 'Payment Service',
                  to: 'Notification Service',
                  data: 'Payment status event',
                  protocol: 'Message Queue',
                },
                {
                  from: 'Delivery Service',
                  to: 'Notification Service',
                  data: 'Tracking updates',
                  protocol: 'Message Queue',
                },
              ].map((flow, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50">
                  <div className="flex-1">
                    <p className="text-sm font-semibold">
                      {flow.from} <span className="text-primary">→</span> {flow.to}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{flow.data}</p>
                  </div>
                  <Badge variant="secondary">{flow.protocol}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Error Handling */}
        <Card className="border border-border/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive">Error Handling in Flows</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li>✓ <strong>Retry Logic:</strong> Implement exponential backoff for transient failures</li>
              <li>✓ <strong>Circuit Breaker:</strong> Prevent cascade failures when services are down</li>
              <li>✓ <strong>Timeout Handling:</strong> Define appropriate timeouts for each service call</li>
              <li>✓ <strong>Compensation:</strong> Plan rollback strategies for distributed transactions</li>
              <li>✓ <strong>Logging:</strong> Track flows across services with correlation IDs</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
