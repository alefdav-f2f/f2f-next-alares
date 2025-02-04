import React from 'react'
import QuestionForm from '../new/page'

export default function QuestionDetail({ params }: any) {
  return (
    <QuestionForm question_id={params.question_id} />
  )
}
