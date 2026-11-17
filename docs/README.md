# Documentation

Start with the [project overview](../README.md) and [STATUS.md](../STATUS.md).
The owner reported the hackathon submission complete on 17 November 2026.
STATUS.md remains the sole acceptance and release-status register; this cleanup
adds no application verification or independently verified portal confirmation.

## Current documentation

| Document | Purpose |
| --- | --- |
| [Architecture](ARCHITECTURE.md) | Current React, mission engines, Leaflet surface map and illustrative Globe; future capabilities remain separately gated |
| [Data sources](DATA_SOURCES.md) | NASA/USGS source URLs, credits, acquisition records, hashes and scientific limits |
| [Third-party software](THIRD_PARTY.md) | Pinned dependencies, licenses and AI assistance |
| [Asset inventory](assets/README.md) | Repository and deployed asset paths |
| [Operating instructions](AGENTS.md) | Continuing development and scientific-integrity constraints |
| [Owner addendum](AGENT_RULES_ADDENDUM.md) | Scoped approvals; takes precedence for explicitly approved exceptions |

## History and evidence

[Project history](HISTORY.md) consolidates ten former standalone documents:
the feature plan, task prompts, baseline closure, React migration, gated spikes,
scientific globe prerequisite, illustrative Globe report, Pages diagnosis,
judging checklist and dated Git log. Each has its own linked section. Their
original findings are preserved with historical labels; past schedules and task
prompts are not instructions to repeat completed work.

Current evidence remains in the [final release audit](qa/final-release/audit.json),
[deployment check](qa/public-deployment-check.json) and [QA directory](qa/).
Raw evidence files were not edited. Older documentation remains recoverable from
the [original snapshot bundle](qa/history/markdown-before-cleanup.zip) and
[manifest](qa/history/cleanup-manifest.json). The [UI handoff notes](qa/history/react-ui-handoff-readme.txt)
and legacy/ implementation remain available for recovery.

## Consolidation review — 17 November 2026

The 14 previously staged top-level Markdown files became five: this index,
architecture, operating instructions, owner addendum and the consolidated history.
The existing source and third-party registers remain separate because the build
copies them into the deployed disclosures. Root entry points and affected source
navigation links now point to the consolidated history sections.

This is a Markdown-only reorganization. No app code, assets, dependency, raw QA
record or hosting configuration changed. Tests and public-browser acceptance
are not re-certified by this cleanup. No commit, push or deployment was performed.
