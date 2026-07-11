import { useForm } from '@tanstack/react-form'
import { Send } from 'lucide-react'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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

type ContactFieldDefinition = {
  id: string
  inputMode?: 'email'
  label: string
  multiline?: boolean
  name: keyof ContactFormValues
  type?: string
}

const contactFields: ContactFieldDefinition[] = [
  { id: 'contact-name', label: 'Name', name: 'name' },
  {
    id: 'contact-email',
    inputMode: 'email',
    label: 'Email',
    name: 'email',
    type: 'email',
  },
  { id: 'contact-message', label: 'Message', multiline: true, name: 'message' },
]

export function ContactForm() {
  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: contactFormSchema,
    },
    onSubmit: ({ value }) => openContactDraft(value),
  })

  return (
    <Card className="mx-auto mt-8 max-w-2xl py-0 text-left" variant="orbit">
      <CardContent className="p-5 sm:p-6">
        <form
          className="flex flex-col gap-5"
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            void form.handleSubmit()
          }}
        >
          <FieldGroup>
            {contactFields.map((definition) => (
              <form.Field key={definition.name} name={definition.name}>
                {(field) => (
                  <FieldControl
                    {...definition}
                    errors={field.state.meta.errors}
                    isInvalid={field.state.meta.isTouched && !field.state.meta.isValid}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={field.handleChange}
                    value={field.state.value}
                  />
                )}
              </form.Field>
            ))}
          </FieldGroup>
          <p id="contact-draft-hint" className="text-sm leading-6 text-muted-foreground">
            This opens a prefilled draft in your email app. Nothing is sent automatically.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={`mailto:${contactEmail}`}
              className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              {contactEmail}
            </a>
            <Button type="submit" size="lg" aria-describedby="contact-draft-hint">
              <Send aria-hidden="true" data-icon="inline-start" />
              Start an email
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function FieldControl({
  errors,
  id,
  inputMode,
  isInvalid,
  label,
  multiline = false,
  name,
  onBlur,
  onChange,
  type = 'text',
  value,
}: {
  errors: Array<{ message?: string } | undefined>
  id: string
  inputMode?: 'email'
  isInvalid: boolean
  label: string
  multiline?: boolean
  name: string
  onBlur: () => void
  onChange: (value: string) => void
  type?: string
  value: string
}) {
  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {multiline ? (
        <Textarea
          id={id}
          name={name}
          value={value}
          onBlur={onBlur}
          onChange={(event) => onChange(event.target.value)}
          rows={5}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? `${id}-error` : undefined}
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
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? `${id}-error` : undefined}
        />
      )}
      {isInvalid ? <FieldError id={`${id}-error`} errors={errors} /> : null}
    </Field>
  )
}

function openContactDraft(values: ContactFormValues) {
  const subject = encodeURIComponent(`Portfolio conversation from ${values.name}`)
  const body = encodeURIComponent(
    [`Name: ${values.name}`, `Email: ${values.email}`, '', values.message].join('\n'),
  )

  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
}
