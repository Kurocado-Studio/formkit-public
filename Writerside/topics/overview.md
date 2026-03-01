# Overview

> **TL;DR:** **FormKit** is a form builder where users create forms in a
> **[visual UI](https://formkit-seven.vercel.app)**, then render them instantly in any app using
> **[simple React components](https://codesandbox.io/p/github/Kurocado-Studio/format-consumer-demo/main)**.
> No redeploys. {style="note"}

| Links & Resources       | Problem Solved + Implementation                                                                                                                                                                                                                                                                    |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Visual Form Builder** | Product teams needed to create/update forms without developers.<br/>**[Try the Form Builder](https://formkit-seven.vercel.app)**<br/>**[See the code on GitHub](https://github.com/Kurocado-Studio/form-management-ui)**                                                                           |
| **Multi-Tenant API**    | Needed organization-level isolation for SaaS/agency clients.<br/> **[See the Swagger](https://html-forms-service-staging.fly.dev/api)**                                                                                                                                                            |
| **Embeddable Renderer** | Connects with your current design system. Developers needed simple embed without rebuilding forms.<br/>**[Codesandbox demo](https://codesandbox.io/p/github/Kurocado-Studio/format-consumer-demo/main)**<br/>**[See the code on GitHub](https://github.com/Kurocado-Studio/format-consumer-demo)** |

## The Challenge

While working on multiple SaaS projects, I noticed a recurring pattern that slowed down product
iteration:

**Every form change required a full development cycle:**

```
Product Manager has idea
    ↓
Creates Jira ticket
    ↓
Developer picks up ticket
    ↓
Implements change
    ↓
QA testing
    ↓
Deploy to production
```

**Timeline: 3-5 days minimum** — even for changing a single field label or adding a validation rule.

### Real-World Impact

- **Product teams** waited days for simple copy changes
- **Developers** spent time on work that didn't require their expertise
- **Experimentation** became expensive (each A/B test = new deployment)
- **Agency clients** paid for developer hours on trivial updates

### Existing Solutions Fell Short

| Solution                    | What's Missing                                             |
| --------------------------- | ---------------------------------------------------------- |
| **Google Forms / Typeform** | Can't embed natively in product UI, breaks user experience |
| **Headless CMS**            | Overkill for forms, complex setup, not purpose-built       |
| **Custom Code**             | Requires redeploy for every change, developer-dependent    |
| **Form Libraries**          | Still requires code changes for structure updates          |

**The Gap:** No tool gave product teams form autonomy while maintaining developer-grade integration.

---

## The Solution

### Core Concept

**Decouple form design from deployment** — let product teams manage the "what" while developers
control the "how."

FormKit splits form management into two interfaces:

1. **Builder UI** → Product teams design forms visually
2. **Renderer API** → Developers embed forms with one component

### How It Works

#### **[See the Codesandbox](https://codesandbox.io/p/github/Kurocado-Studio/format-consumer-demo/main)**

```typescript jsx
export function FormKitFormRenderer(properties: {
  formId?: string;
}): React.ReactNode {
  return (
    <FormKitConsumerForm
      key={properties.formId}
      organizationId={ORGANIZATION_ID}
      formId={properties.formId}
    >
      {({ question, indexInCollection }) => (
        <LocallyComposedFormKitRenderer
          key={indexInCollection}
          questionNode={question}
        />
      )}
    </FormKitConsumerForm>
  );
}

// Developer embeds once:
<FormKitFormRenderer
  formId={'2305e7ed-b583-4ef7-9a4c-2bc094b34894'}
/>

// Product team updates form content in UI
// Changes appear instantly — no redeploy needed
```

### Key Innovation

**Multi-tenant architecture with UUID-based rendering:**

- Each form gets a unique `formId`
- Forms are scoped by `organizationId` for data isolation
- Server-side validation ensures security
- Changes propagate instantly without code updates

---

## Information Architecture

**Decision: Separate concerns completely**

```
Product Team Interface          Developer Interface
        ↓                              ↓
   Visual Builder    ←→ API ←→    React Component
        ↓                              ↓
    Form Schema                   Rendered Form
        ↓                              ↓
   Validation Rules              User Submission
```

### Technical Architecture

**Stack Selection:**

| Layer        | Technology                | Why                                       |
| ------------ | ------------------------- | ----------------------------------------- |
| Frontend     | React 19 + TypeScript     | Type safety, component reusability        |
| Styling      | Tailwind CSS (Systemhaus) | Consistent design tokens, rapid iteration |
| Backend      | Node.js + NestJS          | Scalable, TypeScript end-to-end           |
| Validation   | ZOD + JSON Schema         | Industry standard, portable schemas       |
| Hosting      | Fly.io                    | Docker deployment, global edge network    |
| Hosting (UI) | vercel.com                | Ease of use to deploy UI's                |

**API Design Principles:**

- RESTful structure for predictability
- Organization-scoped endpoints for security
- JSON Schema for validation consistency
- Swagger documentation for developer adoption

---

## Key Features Built

### 1. Visual Form Builder

**[Try the Form Builder](https://formkit-seven.vercel.app)**

**Problem Solved:** Product teams needed to create forms without developer help

**Implementation:**

- interface for question creation
- Real-time preview pane
- JSON Schema export for debugging

**Impact:** Average form creation time: 2.8 minutes

### 2. Multi-Tenant API

**[See the Swagger](https://html-forms-service-staging.fly.dev/api)**

**Problem Solved:** Support agency and SaaS use cases with data isolation

**Implementation:**

```
/api/v1/organizations/{organizationId}/forms
/api/v1/organizations/{organizationId}/forms/{formId}
/api/v1/organizations/{organizationId}/forms/{formId}/validate
```

**Impact:** Enables secure, scalable SaaS model

### 3. Embeddable Renderer

**[Codesandbox demo](https://codesandbox.io/p/github/Kurocado-Studio/format-consumer-demo/main)**

**Problem Solved:** Developers needed simple integration without rebuilding forms

**Implementation:**

- React component with async data fetching
- Built-in loading and error states
- TypeScript definitions included
- Validation callback handling

**Impact:** 15 lines of code to embed any form

## Lessons Learned

### What Went Well

1. **Splitting interfaces was the right call** — clear separation of concerns enabled both teams to
   work independently
2. **Live preview built trust** — users could see exactly what they'd ship
3. **TypeScript everywhere** — caught bugs early, improved DX significantly
4. **Multi-tenant from day one** — easier than retrofitting later

### What I'd Do Differently

1. **Build analytics earlier** — most likely be the most requested feature post-launch
2. **Better onboarding flow** — first-time users needed more guidance

### Technical Debt Addressed

- Set up staging environment mirroring production

---

## Technical Architecture Diagram

```
┌─────────────────┐
│  Form Builder   │ (React SPA)
│   (Admin UI)    │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   REST API      │ (NestJS)
│  + Validation   │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   PostgreSQL    │ (Forms, Organizations, Schemas)
└─────────────────┘
         ↑
         │
┌────────┴────────┐
│ NodeQuestion    │ (React Component)
│   Renderer      │
└─────────────────┘
```

### Security Considerations

- API key authentication for organization access
- Input sanitization on all endpoints; no HTML allowed as values
- CORS configuration for allowed domains
