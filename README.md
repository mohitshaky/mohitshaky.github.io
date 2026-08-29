# mohitshaky.github.io

Source for **[mohitshaky.github.io](https://mohitshaky.github.io)** — the site for
Mohit Shakya, independent consultant, Gurgaon, India.

I build AI and retrieval features into existing Java systems, with the tenant
isolation, audit trail and cost controls a compliance review actually asks for.
Seven years on telecom and banking production systems underneath that.

---

## Pages

| Path | What it is |
|---|---|
| `index.html` | Main site. AI integration positioning, casework, pricing in USD. |
| `india.html` | Indian clients — INR pricing, GST and payment terms, NCR in-person. `noindex`, linked from the footer only. |
| `writing/` | Long-form notes on production failure modes. |
| `resume.html` | Print source for the PDF. Edit this, never the PDF directly. |
| `Mohit-Shakya-Resume.pdf` | Rendered from `resume.html`. |

## Structure

Plain static HTML — no build step, no framework, no dependencies. GitHub Pages
serves this directory as-is.

```
style.css     shared by every page
app.js        shared by every page: contact links, forms, region suggestion,
              scroll spy, reveal-on-scroll
```

Both pages' forms post to the same Formspree endpoint and are distinguished by a
hidden `request_type` field.

## Regenerating the resume PDF

`resume.html` is the source of truth. After editing it:

```bash
chrome --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="Mohit-Shakya-Resume.pdf" \
  "file:///absolute/path/to/resume.html"
```

## Regenerating the social banner

`og-banner-source.html` renders to `og-banner.jpg` at 1200×630. Screenshot it at
that viewport with headless Chrome and encode to JPEG. If you change the site's
positioning, regenerate this — a stale banner is what every Slack and LinkedIn
share displays.

## Related repositories

| Repository | What it demonstrates |
|---|---|
| [enterprise-rag-service](https://github.com/mohitshaky/enterprise-rag-service) | RAG as a production Spring service — multi-tenant isolation proved by test, grounding policy that refuses rather than fabricates, versioned prompts, per-tenant token budgets, scored evaluation harness |
| [order-lifecycle-bpmn](https://github.com/mohitshaky/order-lifecycle-bpmn) | Telecom order orchestration; BPMN process as the source of truth, async Kafka provisioning |
| [banking-account-service](https://github.com/mohitshaky/banking-account-service) | Append-only audit projection rebuildable from the event log; idempotent consumers |
| [offer-promo-engine](https://github.com/mohitshaky/offer-promo-engine) | Latency-sensitive rule evaluation with a deliberate Redis caching boundary |
| [subscription-workflow-service](https://github.com/mohitshaky/subscription-workflow-service) | Subscription lifecycle as an explicit versioned process |

## Contact

mohitshakya797@gmail.com · [LinkedIn](https://linkedin.com/in/mohit-shakya-9ab944110)
