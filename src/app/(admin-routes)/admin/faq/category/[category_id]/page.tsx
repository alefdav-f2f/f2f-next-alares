import React from 'react'
import CategoryForm from '../new/page'

export default function QuestionDetail({ params }: any) {
  return (
    <CategoryForm category_id={params.category_id} />
  )
}
