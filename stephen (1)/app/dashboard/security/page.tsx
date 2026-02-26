'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useProjectStore } from '@/lib/store'
import { Lock, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { HelpTooltip } from '@/components/help-tooltip'

const securityMeasures = [
  {
    id: 'jwt',
    name: 'JWT/OAuth2 Authentication',
    description: 'Implement JSON Web Tokens or OAuth2 for user authentication',
    implementation: 'Use industry-standard libraries, short expiry times, refresh token rotation',
    priority: 'Critical',
  },
  {
    id: 'encryption',
    name: 'Data Encryption',
    description: 'Encrypt sensitive data at rest and in transit',
    implementation: 'TLS/SSL for transport, AES-256 for storage, encrypted database connections',
    priority: 'Critical',
  },
  {
    id: 'rateLimiting',
    name: 'Rate Limiting',
    description: 'Prevent brute force attacks and DoS',
    implementation: 'Implement per-user, per-IP, and per-endpoint rate limits',
    priority: 'High',
  },
  {
    id: 'paymentSecurity',
    name: 'Payment Security',
    description: 'PCI-DSS compliance for payment processing',
    implementation: 'Use payment gateway APIs, never store credit cards, validate SSL certificates',
    priority: 'Critical',
  },
  {
    id: 'ddosProtection',
    name: 'DDoS Protection',
    description: 'Protect against distributed denial of service attacks',
    implementation: 'CloudFront, WAF, traffic filtering, auto-scaling',
    priority: 'High',
  },
  {
    id: 'apiSecurity',
    name: 'API Security',
    description: 'Secure all API endpoints',
    implementation: 'API key validation, CORS configuration, request validation, input sanitization',
    priority: 'High',
  },
  {
    id: 'logging',
    name: 'Security Logging',
    description: 'Log all security-related events',
    implementation: 'Failed logins, permission changes, data access, API errors',
    priority: 'Medium',
  },
  {
    id: 'accessControl',
    name: 'Access Control (RBAC)',
    description: 'Role-based access control for different user types',
    implementation: 'Admin, Manager, User roles with appropriate permissions',
    priority: 'High',
  },
]

const vulnerabilities = [
  { name: 'SQL Injection', risk: 'Critical', mitigation: 'Parameterized queries, ORM frameworks' },
  { name: 'XSS Attacks', risk: 'High', mitigation: 'Input validation, output encoding, CSP headers' },
  { name: 'CSRF Attacks', risk: 'High', mitigation: 'CSRF tokens, SameSite cookies' },
  { name: 'Insecure Deserialization', risk: 'High', mitigation: 'Avoid untrusted data deserialization' },
  { name: 'Broken Authentication', risk: 'Critical', mitigation: 'Strong password policies, MFA' },
  { name: 'Sensitive Data Exposure', risk: 'Critical', mitigation: 'Encryption, access controls' },
]

export default function SecurityPage() {
  const { project, updateProject } = useProjectStore()
  const [notes, setNotes] = useState('')

  const toggleMeasure = (id: string) => {
    const updated = {
      ...project.securityMeasures,
      [id]: !project.securityMeasures[id as keyof typeof project.securityMeasures],
    }
    updateProject({ securityMeasures: updated })
  }

  const completedMeasures = Object.values(project.securityMeasures).filter(Boolean).length

  return (
    <div className="flex-1 overflow-auto bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-40 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold text-foreground">Security Planning</h1>
              <HelpTooltip content="Define security measures for your system. Track authentication, encryption, compliance requirements, and protection against common vulnerabilities." />
            </div>
            <p className="text-muted-foreground mt-1">Design security measures and compliance strategies</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Security Measures</p>
            <p className="text-2xl font-bold text-primary">{completedMeasures}/{securityMeasures.length}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 max-w-6xl space-y-8">
        {/* Security Measures Checklist */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Security Measures Checklist
            </CardTitle>
            <CardDescription>
              Plan and track implementation of security measures
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {securityMeasures.map((measure) => (
                <div key={measure.id} className="p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      id={measure.id}
                      checked={project.securityMeasures[measure.id as keyof typeof project.securityMeasures]}
                      onCheckedChange={() => toggleMeasure(measure.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Label htmlFor={measure.id} className="text-base font-semibold cursor-pointer">
                          {measure.name}
                        </Label>
                        <Badge variant="outline" className="text-xs">{measure.priority}</Badge>
                        {project.securityMeasures[measure.id as keyof typeof project.securityMeasures] && (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{measure.description}</p>
                      <p className="text-xs text-muted-foreground font-mono bg-muted/50 p-2 rounded">
                        Implementation: {measure.implementation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Common Vulnerabilities */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              OWASP Top 10 Vulnerabilities
            </CardTitle>
            <CardDescription>
              Common security vulnerabilities and mitigation strategies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {vulnerabilities.map((vuln, index) => (
                <div key={index} className="flex items-start gap-4 p-3 rounded-lg bg-muted/50 border border-border/50">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-destructive/20">
                    <span className="text-xs font-bold text-destructive">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-foreground">{vuln.name}</span>
                      <Badge variant={vuln.risk === 'Critical' ? 'destructive' : 'secondary'}>
                        {vuln.risk}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold">Mitigation:</span> {vuln.mitigation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Authentication Strategy */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle>Authentication Strategy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">JWT (JSON Web Tokens)</h4>
                <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Stateless authentication</li>
                  <li>• Good for microservices</li>
                  <li>• Short expiry times (15min)</li>
                  <li>• Refresh tokens for renewal</li>
                  <li>• Sign with strong secret</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">OAuth2</h4>
                <ul className="text-xs text-purple-800 dark:text-purple-200 space-y-1">
                  <li>• Industry standard</li>
                  <li>• Third-party integration</li>
                  <li>• Scoped permissions</li>
                  <li>• Authorization code flow</li>
                  <li>• Use PKCE for mobile apps</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Multi-Factor Auth</h4>
                <ul className="text-xs text-green-800 dark:text-green-300 space-y-1">
                  <li>• SMS/Email verification</li>
                  <li>• Authenticator apps</li>
                  <li>• Biometric auth</li>
                  <li>• Security keys</li>
                  <li>• Recommended for admin accounts</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800">
                <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Password Policy</h4>
                <ul className="text-xs text-orange-800 dark:text-orange-300 space-y-1">
                  <li>• Minimum 12 characters</li>
                  <li>• Mixed case, numbers, symbols</li>
                  <li>• No common passwords</li>
                  <li>• Bcrypt hashing (cost 12+)</li>
                  <li>• Regular rotation reminders</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Protection */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle>Data Protection & Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Data Classification</h4>
              <div className="space-y-2">
                {[
                  { level: 'Public', examples: 'Product names, general pricing' },
                  { level: 'Internal', examples: 'System logs, internal documentation' },
                  { level: 'Confidential', examples: 'Customer data, payment info' },
                  { level: 'Restricted', examples: 'Security keys, passwords, PII' },
                ].map((item) => (
                  <div key={item.level} className="p-2 rounded bg-muted/50 border border-border/50">
                    <p className="text-sm font-semibold">{item.level}</p>
                    <p className="text-xs text-muted-foreground">{item.examples}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Compliance Requirements</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• GDPR for EU users (data privacy rights)</li>
                <li>• PCI-DSS for payment processing</li>
                <li>• Local data protection laws (Ghana, Nigeria)</li>
                <li>• Regular security audits</li>
                <li>• Data retention policies</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Security Notes */}
        <Card className="border border-border/50">
          <CardHeader>
            <CardTitle>Security Implementation Notes</CardTitle>
            <CardDescription>
              Document your security decisions and implementation details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Describe your security architecture, threat model, incident response plan, etc."
              rows={8}
              className="font-mono text-sm"
            />
          </CardContent>
        </Card>

        {/* Security Best Practices */}
        <Card className="border border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg">Security Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ Keep dependencies updated and monitor for vulnerabilities</li>
              <li>✓ Use HTTPS everywhere with up-to-date TLS certificates</li>
              <li>✓ Implement comprehensive logging and monitoring</li>
              <li>✓ Conduct regular security audits and penetration testing</li>
              <li>✓ Have an incident response plan in place</li>
              <li>✓ Use infrastructure-as-code for reproducible security</li>
              <li>✓ Train team on OWASP Top 10 vulnerabilities</li>
              <li>✓ Implement database activity monitoring</li>
              <li>✓ Use secrets management (AWS Secrets Manager, HashiCorp Vault)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
