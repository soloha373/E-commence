'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Zap, Grid3x3, Layers, Database, Cloud, Shield, BarChart3 } from 'lucide-react'

export default function Home() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
              A
            </div>
            <h1 className="text-2xl font-bold text-foreground">ArchDesign</h1>
          </div>
          <Button 
            onClick={() => router.push('/dashboard')}
            className="gap-2"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Academic Architecture Design Tool
            </span>
          </div>
          
          <div>
            <h2 className="text-6xl font-bold text-foreground text-balance mb-6">
              Design Enterprise Architectures with Confidence
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              Create comprehensive, professional system designs for nationwide e-commerce platforms. Design scalable microservices, plan cloud deployments, and document security strategies—all in one integrated tool built for academic excellence.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => router.push('/dashboard')}
              size="lg"
              className="gap-2"
            >
              Start Designing <Zap className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => {
                const element = document.getElementById('features')
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="gap-2"
            >
              Learn More <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-foreground mb-4 text-balance">
            Everything You Need to Design Professional Architectures
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From initial design to final documentation, our integrated tools support the complete architecture design process.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border border-border/50 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Grid3x3 className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Architecture Builder</CardTitle>
              <CardDescription>
                Drag-and-drop interface to design system components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Connect API gateways, microservices, databases, and cloud infrastructure with flexible arrows and labels.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border/50 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>Microservice Designer</CardTitle>
              <CardDescription>
                Define services with detailed specifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Outline authentication, payment, order, and delivery services with entities, endpoints, and dependencies.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border/50 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Data Architecture</CardTitle>
              <CardDescription>
                Design ER diagrams and data strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Choose between shared databases or database-per-service patterns with visual ER diagram builders.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border/50 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Cloud className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>Cloud Deployment</CardTitle>
              <CardDescription>
                Plan cloud infrastructure visually
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Design load balancers, app servers, databases, CDN, and backup systems for your deployment.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border/50 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Security Planning</CardTitle>
              <CardDescription>
                Plan security measures and compliance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Track JWT/OAuth2, encryption, rate limiting, payment security, and DDoS protection requirements.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border/50 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>Export & Report</CardTitle>
              <CardDescription>
                Generate professional documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Export your designs as PDF reports formatted for academic submission and presentation.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Ghana References */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-border/50">
        <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Example Integration Scenarios</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-card border border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Mobile Money Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">Support for:</p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• MTN Mobile Money</li>
                <li>• Vodafone Cash</li>
                <li>• AirtelTigo Money</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Regional E-Commerce</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">Platform references:</p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Jumia Ghana</li>
                <li>• Local Logistics</li>
                <li>• Payment Solutions</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Regional Scale</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">Design for:</p>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Multi-country deployments</li>
                <li>• Local regulations</li>
                <li>• Regional infrastructure</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/50 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>ArchDesign • Academic Architecture Design Platform • Export ready for exam submission</p>
        </div>
      </footer>
    </main>
  )
}
