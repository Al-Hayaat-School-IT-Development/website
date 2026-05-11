---
inclusion: always
---

# Engineering DNA — Universal Code Standards

You are operating under a mandatory quality gate. Before writing **any** code, you must:

1. **Declare** which DNA pillars apply to this task (see routing logic below)
2. **Plan** your implementation against those pillars
3. **Verify** your output passes the Final Review Checklist before responding
4. **Hard block**: If any violation is detected, refactor before responding — never output non-compliant code

---

## Task-Type Routing

Select the primary pillars based on the task at hand:

| Task Type | Primary Pillars | Always Apply |
|---|---|---|
| Backend Service / API | DDIA + Pragmatic Programmer | Clean Code + Refactoring + Code Complete |
| Utility / Helper / Hook | Clean Code + SICP | Refactoring + Code Complete |
| High-Performance Loop / Algorithm | CLRS + C Programming | Clean Code + Code Complete |
| UI Component / Frontend | Clean Code + Design Patterns | Refactoring + Peopleware |
| Database / Data Model | DDIA + CLRS | Code Complete + Pragmatic Programmer |
| Refactor / Code Review | Refactoring + Clean Code | All pillars as checklist |
| Bug Fix | Code Complete + Refactoring | Clean Code + DDIA (idempotency) |

---

## Pre-Execution Declaration (Required)

Before writing code, output this block:

```
## DNA Pillars Applied
- Task type: [Backend Service | Utility | Algorithm | UI | Database | Refactor | Bug Fix]
- Primary pillars: [list]
- Always-applied pillars: Clean Code, Refactoring, Code Complete
- DRY scan: [performed / not required — not a utility]
```

---

## The 12 DNA Pillars

### 1. DDIA — The Systems Pillar
- **Idempotency**: All state-changing operations (APIs, Lambdas, mutations) must be safe to retry without side effects
- **Partitioning**: Design for data growth; use keys that prevent hotspots
- **Decoupling**: Use async events (Pub/Sub) for non-critical side effects; never couple layers

### 2. Clean Code — The Craft Pillar
- **Meaningful Names**: Names must reveal intent without needing a comment
  - Booleans: `is[State]`, `has[Property]`, `should[Action]`, `can[Capability]`
  - ❌ `if (user.val && user.stat === 1)` → ✅ `if (user.isVerified && user.hasActiveSubscription)`
- **SRP**: A function does exactly one thing
- **Minimize Arguments**: 0–2 arguments per function; use an options object for more

### 3. Pragmatic Programmer — The Philosophy Pillar
- **Orthogonality**: Changing module A must never unexpectedly break module B; layers are pluggable
- **DRY**: Every piece of knowledge has a single, unambiguous representation
- **No Broken Windows**: Never leave TODOs, commented-out code, or messy logic in the output

### 4. Mythical Man-Month — The Management Pillar
- **Conceptual Integrity**: The system looks like it was written by one mind; consistent style throughout
- **Simplicity**: Avoid over-engineering; simplicity is the only way to move fast
- **Plan for Change**: Build knowing it will be refactored; don't over-couple

### 5. CLRS — The Efficiency Pillar
- **Big O Awareness**: Choose the correct data structure for the scale
  - Use hash maps / dictionaries for O(1) lookups instead of nested linear searches (e.g., `Map`/`Set` in JS, `dict` in Python, `map` in Go)
  - Prefer O(1) or O(n) patterns; flag O(n²) explicitly
- **Edge Case Rigor**: Account for empty sets, nulls/nil/None, and maximum limits
- **Space-Time Tradeoff**: Explicitly decide if optimizing for memory or speed

### 6. Design Patterns — The Structural Pillar
- **Strategy Pattern**: Swap logic at runtime instead of massive `if/else` blocks
- **Observer Pattern**: Keep modules decoupled by emitting events
- **Singleton/Factory**: Manage the lifecycle of heavy resources (DB connections) strictly

### 7. Code Complete — The Quality Pillar
- **Defensive Barricades**: Validate all inputs (types, nulls, bounds) at the entry point; assume external data is dirty
- **Table-Driven Methods**: Use data lookups instead of complex logic branches
- **Variable Scope**: Keep variables localized to where they are actually used

### 8. C Programming — The Precision Pillar
- **Memory Efficiency**: Be mindful of object allocation and GC overhead
- **Transparency**: Code must be explicit; avoid magic or hidden abstractions
- **Resource Management**: Explicitly handle the lifecycle of all resources (connections, streams, timers)

### 9. Refactoring — The Evolution Pillar
- **Extract Method**: If a block of code needs a comment, it should be its own function
- **Guard Clauses**: Replace nested conditionals with early returns; keep the happy path at the lowest indentation level
- **Small Steps**: Refactor in tiny, testable increments — never big-bang rewrites

### 10. TAOCP — The Foundations Pillar
- **Mathematical Correctness**: Ensure loop invariants and termination conditions are sound
- **Low-Level Optimization**: Use bitwise or low-level optimizations only when performance is critical and documented

### 11. SICP — The Abstraction Pillar
- **Higher-Order Functions**: Use `map`, `filter`, `reduce` to express *what* to do, not *how* to loop
- **Data Abstraction**: Isolate the implementation of data from how it is used
- **Declarative Style**: Favor immutability and "what it is" over "how it changes"

### 12. Peopleware — The Human Pillar
- **Self-Documenting Logic**: Write code a teammate can understand at 3 AM
- **Low Friction**: Design APIs and internal tools to be easy to use and hard to misuse

---

## Structural Gates (Non-Negotiable)

| Gate | Threshold | Source |
|---|---|---|
| Cognitive Complexity | < 10 per function | SonarQube |
| Function Length | ≤ 20 lines | SRP / Clean Code |
| Function Arguments | 0–2 (use options object beyond 2) | Clean Code |
| Boolean Naming | Must use `is/has/should/can` prefix | Clean Code |
| Nesting Depth | Max 2 levels (use guard clauses) | Refactoring |

---

## Linter Compliance

Before writing code, discover the project's linter config by checking for (in order):
- `eslint.config.mjs` / `eslint.config.js`
- `.eslintrc.json` / `.eslintrc.js` / `.eslintrc.yaml`
- `"eslint"` key in `package.json`
- `.pylintrc` / `pyproject.toml` (Python)
- `.rubocop.yml` (Ruby)
- `golangci.yml` (Go)
- Any other language-specific linter config at the project root

Apply whatever rules are configured. If no linter config exists, apply these universal defaults:
- **No implicit types / `any`**: Use explicit types or generics. If you cannot type it, explain why.
- **No unused variables**: Every declared variable must be used.
- **No debug output**: Use a logger abstraction, not `console.log` / `print` / `fmt.Println` in production code.

---

## SonarQube Quality Gate

| Metric | Threshold |
|---|---|
| Cognitive Complexity | < 10 |
| Test Coverage | ≥ 90% |
| Duplicated Lines | < 3% |
| Code Smells | 0 blocker/critical |

---

## Definition of Done (DoD)

A task is **not complete** until all of the following are true:

- [ ] **90% test coverage**: Unit tests cover happy path, edge cases, and error states
- [ ] **DRY scan performed**: Searched codebase for existing patterns before writing any new utility (use `grepSearch` or `readCode`)
- [ ] **YAGNI respected**: Only what the current ticket requires is built — no speculative abstractions
- [ ] **Cognitive complexity < 10**: No function exceeds the threshold
- [ ] **Booleans named correctly**: All boolean variables/props use `is/has/should/can` prefix
- [ ] **Guard clauses used**: No nested conditionals — early returns keep the happy path flat
- [ ] **No broken windows**: No TODOs, commented-out code, or `any` types left behind
- [ ] **ESLint passes**: No errors against `.eslintrc.json`

---

## DRY Discovery Protocol

Before writing **any** new utility, helper, hook, or service:

1. Discover the project's shared-code directories by scanning the root structure (common patterns: `src/lib/`, `src/utils/`, `src/helpers/`, `src/hooks/`, `lib/`, `utils/`, `common/`, `shared/`, `pkg/`, `internal/`)
2. Run a codebase search for the pattern using `grepSearch` with relevant keywords
3. If a similar pattern exists: reuse or refactor it — do not duplicate
4. Document the decision: "Reused `X` from `Y`" or "No existing pattern found for `Z`"

---

## Final Review Checklist (Pre-Response)

Before outputting code, verify:

```
[ ] Complexity < 10 on every function?
[ ] All booleans prefixed with is/has/should/can?
[ ] Functions ≤ 20 lines and single-responsibility?
[ ] No any types?
[ ] No unused variables?
[ ] No console.log?
[ ] Guard clauses used instead of nested ifs?
[ ] DRY scan performed (if writing a utility)?
[ ] Inputs validated at entry point?
[ ] Idempotent (if state-changing operation)?
```

If **any** answer is "No" — refactor before responding.
