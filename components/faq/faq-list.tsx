'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { HelpCircle } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  category: string
  items: FAQItem[]
}

interface FAQListProps {
  faqs: FAQCategory[]
}

export function FAQList({ faqs }: FAQListProps) {
  return (
    <div className="space-y-6">
      {faqs.map((category) => (
        <Card key={category.category} className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <CardTitle className="text-base font-medium">{category.category}</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {category.items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
