import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import StarterContent, { frontmatter } from "@/examples/starter-content.mdx";
import { starterFormSchema } from "@/examples/starter-schema";

const mdxTitle = typeof frontmatter.title === "string" ? frontmatter.title : "MDX example";

export function StarterShowcase() {
  const [ready, setReady] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const form = useForm({
    defaultValues: { email: "" },
    validators: { onSubmit: starterFormSchema },
    onSubmit: () => setSubmitted(true),
  });

  useEffect(() => setReady(true), []);

  return (
    <main
      data-ready={ready}
      className="mx-auto flex min-h-svh w-full max-w-5xl flex-col justify-center gap-8 px-6 py-16"
    >
      <header className="max-w-2xl space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Removable capability showcase</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Start building your portfolio.
        </h1>
        <p className="text-base leading-7 text-muted-foreground">
          The framework, content pipeline, component primitives, forms, validation, and tests are
          ready. Everything below is disposable example code.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{mdxTitle}</CardTitle>
            <CardDescription>
              An imported MDX document rendered as a React component.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="starter-mdx">
              <StarterContent />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Form validation is ready</CardTitle>
            <CardDescription>
              This form validates locally and deliberately sends data nowhere.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-4"
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();
                void form.handleSubmit();
              }}
            >
              <form.Field name="email">
                {(field) => {
                  const invalid = field.state.meta.errors.length > 0;

                  return (
                    <Field data-invalid={invalid}>
                      <FieldLabel htmlFor={field.name}>Email address</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        placeholder="you@example.com"
                        value={field.state.value}
                        aria-invalid={invalid}
                        onBlur={field.handleBlur}
                        onChange={(event) => {
                          setSubmitted(false);
                          field.handleChange(event.target.value);
                        }}
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  );
                }}
              </form.Field>

              <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                  <Button type="submit" disabled={!canSubmit || isSubmitting}>
                    {isSubmitting ? "Validating…" : "Validate example"}
                  </Button>
                )}
              </form.Subscribe>

              {submitted ? (
                <output className="block text-sm text-muted-foreground">
                  Valid input. Nothing was submitted.
                </output>
              ) : null}
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
