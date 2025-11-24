# FormKit — Developer-Integrated Form Management

![](formkit.png)

**A multi-tenant form builder that eliminates the cycle of tickets and redeploys.**

FormKit empowers product teams to create and update forms independently while giving developers a
clean, embeddable API — bridging the gap between no-code simplicity and production-grade
integration.

---

## The Problem

In modern SaaS workflows, even simple form changes require a full development cycle:

> **Product → Ticket → Developer → QA → Redeploy**

This dependency bottleneck slows iteration, burdens engineering teams, and delays product
experimentation.

Traditional form builders like Google Forms or Typeform are great for standalone use but can't
integrate seamlessly into product experiences. Custom-coded forms are flexible but require developer
involvement for every change.

**FormKit solves this by decoupling form design from deployment.**

---

## The Solution

FormKit provides a hosted visual builder for product teams and a developer-grade API for engineering
teams.

### How It Works

**For Product Teams:**

- Build forms visually in the hosted dashboard
- Make instant updates without code or redeploys
- Preview forms with the same renderer used in production

**For Developers:**

- Embed forms using a single React component
- Forms are fetched by UUID and scoped by organization
- Server-side validation ensures security and consistency

```typescript jsx
<NodeQuestionRenderer
  organizationId='21f3a89d-2a11-44b8-92c8-8aee7e2bdfa1'
  formId='47c1b67f-3304-43a4-9e7f-3f5f58c8db15'
/>
```

Each form is assigned a unique `formId`, scoped under an `organizationId` for secure multi-tenant
operation.

---

## Use Cases

**Early-Stage SaaS**  
Founders iterate on onboarding flows without developer bottlenecks

**Agency Portals**  
Build client-specific forms with isolated data and branding

**Product Experimentation**  
Run A/B tests on form flows without code changes

---

## Live Demos

| Resource                        | Link                                                                                             |
| ------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Visual Builder (Admin UI)**   | [formkit-seven.vercel.app](https://formkit-seven.vercel.app)                                     |
| **API Documentation (Swagger)** | [html-forms-service-staging.fly.dev/api](https://html-forms-service-staging.fly.dev/api)         |
| **Consumer Demo (Codesandbox)** | [See the Codesandbox](https://codesandbox.io/p/github/Kurocado-Studio/format-consumer-demo/main) |

---

## Roadmap

**Current (v1.0)**

- ✅ Text-based form builder
- ✅ UUID generation and multi-tenant scoping
- ✅ React renderer component
- 🟡 Server-side validation endpoint (in testing)

**Planned (v1.2+)**

- Vue renderer support
- Conditional logic and branching
- Multi-user collaboration
