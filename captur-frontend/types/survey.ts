export type SurveyQuestionType = "text" | "rating" | "single_choice" | "multiple_choice"

export interface SurveyQuestion {
  id: number
  surveyId: number
  text: string
  type: SurveyQuestionType
  options?: string[]
  order: number
}

export interface SurveyAnswer {
  id: number
  questionId: number
  enrollmentId: number
  value: string
}

export interface Survey {
  id: number
  trainingId: number
  title: string
  description?: string
  isActive: boolean
  questions: SurveyQuestion[]
  createdAt: string
  updatedAt: string
}
