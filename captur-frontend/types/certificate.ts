export interface CertificateTemplate {
  id: number
  name: string
  htmlContent: string
  createdAt: string
  updatedAt: string
}

export interface Certificate {
  id: number
  enrollmentId: number
  templateId: number
  issuedAt: string
  pdfUrl?: string
  enrollment?: {
    id: number
    userId: number
    trainingId: number
    training?: { id: number; title: string }
    user?: { id: number; firstName: string; lastName: string }
  }
  template?: CertificateTemplate
  createdAt: string
  updatedAt: string
}
