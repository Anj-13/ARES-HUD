> Precedence: [AGENT_RULES_ADDENDUM.md](docs/AGENT_RULES_ADDENDUM.md) takes precedence for its approved items; [STATUS.md](STATUS.md) alone records migration completion.

# ARES-HUD documentation workflow

Read [the working README](docs/README.md) and [the full project operating instructions](docs/AGENTS.md) before making changes. Read the [owner rules addendum](docs/AGENT_RULES_ADDENDUM.md) immediately after the full instructions, then the [feature plan](docs/FEATURE_PLAN.md) and [task prompts](docs/AGENT_TASKS.md). The addendum overrides the full instructions only for its explicitly listed items; its schedule and verification gates still apply.

- Keep supporting Markdown documentation in `docs/`, including the asset register at `docs/assets/README.md`; retain root `AGENTS.md`, `README.md` and `STATUS.md` as the approved entry points.
- Update `docs/README.md` as implementation, test evidence, sources and owner requirements change. Keep claims aligned with verified behavior.
- Root `README.md` is the owner-requested current overview; `docs/README.md` is navigation. `STATUS.md` alone records migration completion.
- This root `AGENTS.md` is the discovery entry point for agents; retain it here.

- Owner-approved v0.3 vision: separately gated Planetary Mode globe plus Leaflet Surface Mode, pure JavaScript A*, optional verified terrain processing and source-linked NASA data. The explicit React integration request now authorizes React + Vite; preserve static no-backend hosting, original mission engines and the recoverable legacy implementation. See `docs/AGENT_RULES_ADDENDUM.md` section 7.
