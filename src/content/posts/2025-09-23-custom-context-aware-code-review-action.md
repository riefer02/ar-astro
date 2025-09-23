---
title: "Building a Context-Aware AI Code Review System: Beyond GitHub Actions"
pubDate: 2025-09-23
description: "How I built a custom, context-aware AI code review system that leverages organizational knowledge and beats generic tools on cost and insight."
author: "Andrew Riefenstahl"
image:
  url: "../../assets/images/building-a-context-aware-ai-code-review-system-beyond-github-actions-og.jpg"
  alt: "Abstract image representing AI code reviews with contextual understanding"
tags:
  [
    "AI",
    "code review",
    "GitHub Actions",
    "developer tools",
    "context-aware",
    "knowledge base",
  ]
---

When OpenAI announced their new Codex model, I was immediately intrigued. Here was a tool that could potentially rival Claude's code analysis capabilities, but at a significantly lower cost per token. The problem? There was no ready-made GitHub Action like Claude Code Review, no context-aware analysis like CodeRabbit, and definitely no way to leverage our organization's existing knowledge base.

So I decided to build my own.

## The Problem with Existing Solutions

Don't get me wrong—tools like CodeRabbit and Claude Code Review are impressive. But they have limitations:

- **Generic Analysis**: They don't understand your specific architecture patterns
- **No Organizational Memory**: Each review starts from scratch, ignoring your team's established conventions
- **Cost at Scale**: Enterprise pricing can quickly add up for active teams
- **Limited Context**: Most tools only see the diff, missing crucial cross-file relationships

I wanted something that could:

1. **Understand our unique hybrid architecture**
2. **Leverage our existing `.cursor/rules/` knowledge base**
3. **Provide full codebase context, not just diff analysis**
4. **Cost significantly less than existing solutions**
5. **Be easily extensible by the team**

## The Solution: Home-Rolled Context-Aware Reviews

The system I built consists of three main components:

### 1. **GitHub Actions Workflow**

A secure workflow that triggers on PR creation, builds intelligent prompts, and posts structured reviews with inline comments.

### 2. **Dynamic Prompt Builder**

A Python script that automatically injects relevant organizational patterns based on changed files, provides architectural context, and guides the AI to explore cross-file relationships.

### 3. **Codex Integration**

Using OpenAI's Codex with full codebase access in read-only mode, providing comprehensive analysis beyond simple diff reviews.

## What Makes This Different

### **Organizational Intelligence**

Instead of starting from scratch each time, the system automatically includes relevant patterns from our `.cursor/rules/` directory:

```markdown
**When reviewing model changes, it includes:**

- Avoid custom `related_name` unless necessary
- Use paginator pattern instead of `.iterator()` with pg_bouncer
- Always use `transaction.atomic()` for batch operations

**When reviewing API handlers, it includes:**

- Check async/sync boundaries with the ORM
- Validate event bus integration patterns
- Ensure proper dependency injection
```

### **Architectural Context**

The AI understands our specific stack:

- ORM models with base inheritance patterns
- API handlers using DTO/domain conversion
- Event Bus with hierarchical event patterns
- Service layer singleton patterns

### **Cross-File Impact Analysis**

Unlike diff-only tools, this system explores the entire codebase to understand:

- How model changes affect API endpoints
- Whether event handlers follow hierarchical patterns
- If async/sync boundaries are properly maintained
- Cross-service integration impacts

## Real-World Results

The system has already caught issues that would have made it to production:

**Security Finding:**

```
High · `ci/workflows/code-review.yml:~123` · Global `npm i -g @openai/codex`
on every run fetches an unpinned package with repo secrets in env, so a supply‑chain
compromise could leak secrets. Pin to a vetted version.
```

**Logic Bug:**

```
services/chunking_service.py:~69 · When the post-check still shows
final_chunk_size > MAX_CHUNK_SIZE, do not drop the chunk—retry emergency
chunking with a smaller budget so that no segment of the original payload is lost.
```

**Memory Issue:**

```
services/chunking_service.py:~420 · minimal_chunk.copy() is shallow;
take a deepcopy before mutating chunk_number so previously appended emergency
chunks keep their own metadata values.
```

These are the kinds of architectural and logic issues that generic tools often miss.

## The Technical Challenges

### **Authentication Nightmare**

The biggest hurdle was getting Codex CLI authentication working in GitHub Actions. The documentation was outdated, and the `codex login --api-key` command kept failing with cryptic "No such file or directory" errors.

The solution? Bypass the login command entirely and create the authentication file structure manually:

```yaml
- name: Setup Codex authentication
  run: |
    mkdir -p ~/.codex/log ~/.codex/sessions
    echo '{"OPENAI_API_KEY": "'$OPENAI_API_KEY'"}' > ~/.codex/auth.json
```

### **Model Configuration Issues**

Even when authentication worked, the Codex CLI wasn't honoring configuration files in CI. The fix was to pass all configuration explicitly via command-line flags:

```bash
codex exec --full-auto --model "gpt-5-codex" --sandbox "read-only" --output-last-message review.md
```

### **The "Argument List Too Long" Crisis**

Just when everything seemed to work, we hit Linux's argument length limit. Large PRs were generating prompts that exceeded bash's ~1MB argument size limit, causing the entire CI pipeline to fail with cryptic "Argument list too long" errors.

The breakthrough came from understanding that Codex CLI supports stdin input—a feature buried in the help documentation. Instead of passing the prompt as a command argument, we could pipe it directly:

```bash
# Before (broken for large PRs):
codex exec "$(cat prompt.md)"

# After (handles any size):
cat prompt.md | codex exec
```

### **Defensive Programming for CI Stability**

To prevent monster PRs from breaking the pipeline, we added a simple size check that gracefully skips AI review for extremely large changes:

```bash
PROMPT_SIZE=$(wc -c < prompt.md)
if [ "$PROMPT_SIZE" -gt 1048576 ]; then  # 1MB limit
  echo "⚠️ Prompt too large. Skipping AI review."
  exit 0  # Success exit - doesn't break CI
fi
```

This ensures that even 30,000-line PRs won't crash the system—they just skip automated review and continue with manual processes.

### **Inline Comment Precision**

Getting inline comments to appear on the correct lines required parsing the AI output for specific patterns and converting file line numbers to diff line numbers—a requirement of GitHub's API that's not well documented.

## Cost Analysis: The Numbers Game

This is where things get really interesting:

**CodeRabbit Enterprise:** ~$1,800-6,000/year for 10 developers
**Our Solution:** ~$360-1,080/year even with heavy usage

The cost savings come from:

- Pay-per-use instead of subscription
- Codex's lower token costs compared to Claude
- Smart context filtering to reduce unnecessary analysis

## Extensibility by Design

The best part? Adding new patterns is trivial:

**Want to check for new patterns?**

```bash
echo "- New pattern here" >> .cursor/rules/my-new-patterns.mdc
```

**Want to expand file detection?**

```python
# Edit get_relevant_rules() in build_code_review_prompt.py
if "new_pattern/" in file_path:
    relevant_rules.append("new-pattern-rules.mdc")
```

**Want to test changes locally?**

```bash
python scripts/build_code_review_prompt.py > test.md
codex exec --output-last-message review.md "$(cat test.md)"
```

## Why This Matters

This isn't just about saving money or having the latest AI model. It's about building tools that understand your organization's specific context and grow with your team's knowledge.

Every pattern you add to your `.cursor/rules/` automatically becomes part of the review process. Every architectural decision gets encoded as organizational memory. Every code review becomes an opportunity to reinforce best practices.

## The Future

I'm already thinking about the next iteration:

- **Automated rule generation** from code review comments
- **Integration with internal documentation** for even richer context
- **Team-specific customization** based on reviewer expertise
- **Learning from merged PRs** to improve pattern recognition

## Getting Started

If you're interested in building something similar, the key insights are:

1. **Start with your existing knowledge base** - don't reinvent the wheel
2. **Focus on your specific architecture** - generic tools will always be generic
3. **Make it extensible from day one** - your team's knowledge will evolve
4. **Invest in proper authentication setup** - it's always the hardest part
5. **Test locally first** - CI debugging is painful

The future of code review isn't just about catching bugs—it's about encoding organizational wisdom and making it accessible to every developer, every time they write code.

_This system represents about 20% of the engineering effort of existing solutions while delivering 80% of the value, plus organizational context that no external tool can provide. Sometimes the best tool is the one you build yourself._

**Want to learn more about building developer tools that actually understand your codebase? Let's talk.**
