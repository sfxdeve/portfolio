import { useForm } from '@tanstack/react-form'
import { Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { contactEmail } from '@/config/contact'

const contactFormSchema = z.object({
  email: z.email('Use a valid email address.'),
  message: z.string().trim().min(20, 'Share a little more context.'),
  name: z.string().trim().min(2, 'Use at least 2 characters.'),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

const defaultValues: ContactFormValues = {
  email: '',
  message: '',
  name: '',
}

export function ContactForm() {
  const [isEnhanced, setIsEnhanced] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({})

  const form = useForm({
    defaultValues,
  })

  useEffect(() => {
    setIsEnhanced(true)
  }, [])

  function submitValues(values: ContactFormValues) {
    const result = contactFormSchema.safeParse(values)

    if (!result.success) {
      const nextErrors: Partial<Record<keyof ContactFormValues, string>> = {}

      for (const issue of result.error.issues) {
        const fieldName = issue.path[0]

        if (fieldName === 'email' || fieldName === 'message' || fieldName === 'name') {
          nextErrors[fieldName] = issue.message
        }
      }

      setErrors(nextErrors)
      return
    }

    setErrors({})

    const subject = encodeURIComponent(`Portfolio conversation from ${result.data.name}`)
    const body = encodeURIComponent(
      [`Name: ${result.data.name}`, `Email: ${result.data.email}`, '', result.data.message].join(
        '\n',
      ),
    )

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
  }

  return (
    <form
      action={`mailto:${contactEmail}`}
      className="mx-auto mt-10 flex max-w-2xl flex-col gap-5 text-left"
      data-enhanced={isEnhanced}
      encType="text/plain"
      method="post"
      onSubmit={(event) => {
        event.preventDefault()
        event.stopPropagation()
        submitValues(form.state.values)
      }}
    >
      <FieldGroup>
        <form.Field name="name">
          {(field) => (
            <FieldControl
              error={errors.name}
              id="contact-name"
              label="Name"
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(value) => {
                setErrors((current) => ({ ...current, name: undefined }))
                field.handleChange(value)
              }}
              value={field.state.value}
            />
          )}
        </form.Field>
        <form.Field name="email">
          {(field) => (
            <FieldControl
              error={errors.email}
              id="contact-email"
              inputMode="email"
              label="Email"
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(value) => {
                setErrors((current) => ({ ...current, email: undefined }))
                field.handleChange(value)
              }}
              type="email"
              value={field.state.value}
            />
          )}
        </form.Field>
        <form.Field name="message">
          {(field) => (
            <FieldControl
              error={errors.message}
              id="contact-message"
              label="Message"
              multiline
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(value) => {
                setErrors((current) => ({ ...current, message: undefined }))
                field.handleChange(value)
              }}
              value={field.state.value}
            />
          )}
        </form.Field>
      </FieldGroup>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={`mailto:${contactEmail}`}
          className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          {contactEmail}
        </a>
        <Button type="submit" size="lg">
          <Send aria-hidden="true" data-icon="inline-start" />
          Start a conversation
        </Button>
      </div>
    </form>
  )
}

function FieldControl({
  error,
  id,
  inputMode,
  label,
  multiline = false,
  name,
  onBlur,
  onChange,
  type = 'text',
  value,
}: {
  error?: string
  id: string
  inputMode?: 'email'
  label: string
  multiline?: boolean
  name: string
  onBlur: () => void
  onChange: (value: string) => void
  type?: string
  value: string
}) {
  return (
    <Field data-invalid={Boolean(error)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {multiline ? (
        <Textarea
          id={id}
          name={name}
          value={value}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.value)}
          rows={5}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <Input
          id={id}
          inputMode={inputMode}
          name={name}
          type={type}
          value={value}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </Field>
  )
}
