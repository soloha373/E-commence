import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Microservice {
  id: string
  name: string
  responsibilities: string
  entities: string
  endpoints: string
  dependencies: string
  databaseType: string
}

export interface DiagramNode {
  id: string
  type: string
  label: string
  x: number
  y: number
}

export interface DiagramConnection {
  id: string
  from: string
  to: string
  protocol: string
  label: string
}

export interface Project {
  id: string
  title: string
  description: string
  completedSections: string[]
  microservices: Microservice[]
  diagramNodes: DiagramNode[]
  diagramConnections: DiagramConnection[]
  dataArchitectureNotes: string
  sequenceFlowSteps: string[]
  securityMeasures: Record<string, boolean>
  cloudComponents: string[]
  costAnalysis: string
  lastUpdated: number
}

interface ProjectStore {
  project: Project
  saveProject: () => void
  loadProject: () => void
  updateProject: (updates: Partial<Project>) => void
  toggleSectionComplete: (sectionId: string) => void
  addMicroservice: (service: Microservice) => void
  updateMicroservice: (id: string, service: Partial<Microservice>) => void
  removeMicroservice: (id: string) => void
  addDiagramNode: (node: DiagramNode) => void
  updateDiagramNode: (id: string, node: Partial<DiagramNode>) => void
  removeDiagramNode: (id: string) => void
  addConnection: (connection: DiagramConnection) => void
  removeConnection: (id: string) => void
}

const defaultProject: Project = {
  id: 'project-' + Date.now(),
  title: 'Scalable E-Commerce System Architecture',
  description: 'Architectural Design of a Scalable Web Services Platform for a Nationwide E-Commerce System',
  completedSections: [],
  microservices: [
    {
      id: 'auth-service',
      name: 'Authentication Service',
      responsibilities: 'User authentication, authorization, and JWT token management',
      entities: 'User, Session, Permission',
      endpoints: '/auth/login, /auth/register, /auth/logout, /auth/verify',
      dependencies: 'None',
      databaseType: 'PostgreSQL',
    },
    {
      id: 'product-service',
      name: 'Product Service',
      responsibilities: 'Product catalog management and inventory',
      entities: 'Product, Category, Inventory',
      endpoints: '/products, /products/{id}, /products/search',
      dependencies: 'None',
      databaseType: 'PostgreSQL',
    },
    {
      id: 'order-service',
      name: 'Order Service',
      responsibilities: 'Order processing and order history',
      entities: 'Order, OrderItem, OrderStatus',
      endpoints: '/orders, /orders/{id}, /orders/create',
      dependencies: 'Product Service, Payment Service',
      databaseType: 'PostgreSQL',
    },
    {
      id: 'payment-service',
      name: 'Payment Service',
      responsibilities: 'Payment processing and transaction management',
      entities: 'Payment, Transaction, PaymentMethod',
      endpoints: '/payments, /payments/process, /payments/verify',
      dependencies: 'External Payment Gateways (MTN, Vodafone)',
      databaseType: 'PostgreSQL',
    },
  ],
  diagramNodes: [],
  diagramConnections: [],
  dataArchitectureNotes: '',
  sequenceFlowSteps: [],
  securityMeasures: {
    jwt: false,
    oauth2: false,
    encryption: false,
    rateLimiting: false,
    paymentSecurity: false,
    ddosProtection: false,
  },
  cloudComponents: [],
  costAnalysis: '',
  lastUpdated: Date.now(),
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      project: defaultProject,

      saveProject: () => {
        set((state) => ({
          project: {
            ...state.project,
            lastUpdated: Date.now(),
          },
        }))
      },

      loadProject: () => {
        // Data is automatically loaded from localStorage via zustand persist
      },

      updateProject: (updates) => {
        set((state) => ({
          project: {
            ...state.project,
            ...updates,
            lastUpdated: Date.now(),
          },
        }))
      },

      toggleSectionComplete: (sectionId) => {
        set((state) => ({
          project: {
            ...state.project,
            completedSections: state.project.completedSections.includes(sectionId)
              ? state.project.completedSections.filter((id) => id !== sectionId)
              : [...state.project.completedSections, sectionId],
            lastUpdated: Date.now(),
          },
        }))
      },

      addMicroservice: (service) => {
        set((state) => ({
          project: {
            ...state.project,
            microservices: [...state.project.microservices, service],
            lastUpdated: Date.now(),
          },
        }))
      },

      updateMicroservice: (id, service) => {
        set((state) => ({
          project: {
            ...state.project,
            microservices: state.project.microservices.map((s) =>
              s.id === id ? { ...s, ...service } : s
            ),
            lastUpdated: Date.now(),
          },
        }))
      },

      removeMicroservice: (id) => {
        set((state) => ({
          project: {
            ...state.project,
            microservices: state.project.microservices.filter((s) => s.id !== id),
            lastUpdated: Date.now(),
          },
        }))
      },

      addDiagramNode: (node) => {
        set((state) => ({
          project: {
            ...state.project,
            diagramNodes: [...state.project.diagramNodes, node],
            lastUpdated: Date.now(),
          },
        }))
      },

      updateDiagramNode: (id, node) => {
        set((state) => ({
          project: {
            ...state.project,
            diagramNodes: state.project.diagramNodes.map((n) =>
              n.id === id ? { ...n, ...node } : n
            ),
            lastUpdated: Date.now(),
          },
        }))
      },

      removeDiagramNode: (id) => {
        set((state) => ({
          project: {
            ...state.project,
            diagramNodes: state.project.diagramNodes.filter((n) => n.id !== id),
            lastUpdated: Date.now(),
          },
        }))
      },

      addConnection: (connection) => {
        set((state) => ({
          project: {
            ...state.project,
            diagramConnections: [...state.project.diagramConnections, connection],
            lastUpdated: Date.now(),
          },
        }))
      },

      removeConnection: (id) => {
        set((state) => ({
          project: {
            ...state.project,
            diagramConnections: state.project.diagramConnections.filter((c) => c.id !== id),
            lastUpdated: Date.now(),
          },
        }))
      },
    }),
    {
      name: 'archdesign-project',
    }
  )
)
