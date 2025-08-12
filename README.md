# Claude AI Assistant Rules and Commands

A comprehensive collection of structured rules and custom commands designed to guide Claude AI in handling various development tasks effectively. This project provides a framework for creating consistent, reliable, and efficient AI-assisted development workflows.

## Overview

This repository contains:
- **Global Rules**: Universal guidelines for AI-assisted development tasks
- **Project Rules**: Specific commands and workflows for common development scenarios
- **Command Templates**: Structured patterns for creating new AI commands

## Structure

```
Vibe-Coding/
├── CLAUDE.md                    # Main configuration and rules
├── global-rules/               # Universal AI guidelines
│   └── github-issue-creation.mdc
└── project-rules/             # Specific development commands
    ├── add-to-changelog.mdc   # Changelog management
    ├── analyze-issue.mdc      # GitHub issue analysis
    ├── bug-fix.mdc           # Bug fixing workflow
    ├── check.mdc             # Code quality checks
    ├── clean.mdc             # Code formatting
    ├── code-analysis.mdc     # Advanced code analysis
    ├── commit.mdc            # Git commit workflows
    ├── commit-fast.mdc       # Quick commit process
    ├── context-prime.mdc     # Project context loading
    ├── continuous-improvement.mdc # Rule improvement system
    ├── create-command.mdc    # New command creation
    ├── create-docs.mdc       # Documentation generation
    ├── cursor-rules-meta-guide.mdc # Cursor rules management
    ├── five.mdc              # Five Whys analysis
    ├── implement-task.mdc    # Task implementation
    ├── mermaid.mdc           # Diagram generation
    ├── pr-review.mdc         # Pull request reviews
    └── update-docs.mdc       # Documentation updates
```

## Available Commands

### 📊 Planning & Analysis Commands

#### `/analyze-issue` - GitHub Issue Analysis
Fetch GitHub issue details and create comprehensive implementation specification.

**Process:**
1. Fetch issue details using `gh issue view <issue_number>`
2. Review related code and project structure
3. Analyze requirements thoroughly
4. Create detailed technical specification with 10 template sections:
   - Issue Summary
   - Problem Statement
   - Technical Approach
   - Implementation Plan
   - Test Plan
   - Files to Modify/Create
   - Success Criteria
   - Out of Scope items

#### `/five` - Five Whys Analysis
Use root cause analysis technique to deeply understand problems.

**Process:**
1. Define the problem clearly
2. Ask "Why?" five times sequentially
3. Validate the root cause
4. Develop solutions targeting root cause, not symptoms

**Example:** Application crashes → Out of memory → Loads entire file → Parser not streaming → Requirements incomplete → Poor requirements gathering

#### `/code-analysis` - Advanced Code Analysis
Perform comprehensive code evaluation with 6 analysis options:
- **Knowledge Graph Generation** - Component relationships and dependencies
- **Code Quality Evaluation** - Complexity metrics, maintainability, technical debt
- **Performance Analysis** - Bottlenecks, memory usage, algorithm complexity
- **Security Review** - Vulnerabilities, input validation, sensitive data handling
- **Architecture Review** - Design patterns, SOLID principles, coupling analysis
- **Test Coverage Analysis** - Coverage percentages, untested paths, test quality

#### `/context-prime` - Project Context Loading
Prime Claude with comprehensive project understanding through 5 steps:
1. **Project Overview** - README.md, project type, technologies
2. **AI Guidelines** - CLAUDE.md instructions and coding standards
3. **Repository Structure** - File organization and naming conventions
4. **Configuration Review** - Package managers, build configs, environment
5. **Development Context** - Test frameworks, CI/CD, contribution guidelines

### 🔧 Implementation Commands

#### `/implement-task` - Methodical Task Implementation
Approach tasks with careful planning and execution:

**Process:**
1. **Think Through Strategy** - Understand requirements, components, constraints
2. **Evaluate Approaches** - Compare strategies, consider performance/maintainability
3. **Consider Tradeoffs** - Short vs long-term, complexity vs simplicity
4. **Implementation Steps** - Break down, implement incrementally, test components
5. **Best Practices** - TDD approach, small functions, meaningful names

**Checklist includes:** Requirements understood, tests written, edge cases handled, documentation updated

#### `/bug-fix` - Structured Bug Fixing Workflow
Streamlined process from issue creation to pull request:

**Before Starting:**
- Create GitHub issue with descriptive title
- Create feature branch: `git checkout -b fix/<issue-description>`

**Fix Process:**
1. Reproduce the issue
2. Write failing test demonstrating the bug
3. Implement the fix
4. Verify test passes and run full test suite

**On Completion:**
- Commit with format: `fix: <description> (#<issue-number>)`
- Create PR linking issue with "Fixes #<issue-number>"

#### `/create-docs` - Documentation Generation
Create comprehensive documentation with structured template:
- **Overview** - Purpose and value (1-2 paragraphs)
- **Usage** - How to use with examples
- **API/Props/Parameters** - Interface specifications
- **Component Hierarchy** - Structure and relationships
- **State Management** - State handling and flow
- **Behavior** - Expected behavior in different scenarios
- **Error Handling** - Error catching and reporting
- **Performance Considerations** - Optimization notes
- **Accessibility** - Features and compliance
- **Testing** - How to test the component/feature

#### `/mermaid` - Diagram Generation
Generate Mermaid diagrams for visualizing code structure:

**Diagram Types:**
- **Entity Relationship** - Database schemas and data models
- **Flow Charts** - Process and logic flow
- **Sequence Diagrams** - Interaction flows
- **Class Diagrams** - Object-oriented design

**Process:** Analyze source files → Extract entities/relationships → Generate appropriate diagram → Validate syntax → Save to location

### 🎯 Quality & Maintenance Commands

#### `/check` - Code Quality Checks
Perform comprehensive code quality and security checks.

**Primary Task:** Run project-specific check command and resolve errors.

**Common Checks:**
- **Linting** - Code style and syntax errors
- **Type Checking** - TypeScript/Flow type errors  
- **Unit Tests** - Failing test cases
- **Security Scan** - Vulnerability detection
- **Build Verification** - Compilation errors

**Process:** Run checks → Analyze output → Fix in priority order (build-breaking first) → Re-run until passing

**Project Types:**
- **JavaScript/TypeScript**: `npm run check` or `yarn check`
- **Python**: `black`, `isort`, `flake8`, `mypy`
- **Rust**: `cargo check`, `cargo clippy`

#### `/clean` - Code Formatting
Fix all code formatting and quality issues in entire codebase.

**Python Projects:**
1. Format with Black: `black .`
2. Sort imports: `isort .` 
3. Fix flake8 issues: `flake8 . --extend-ignore=E203`
4. Resolve mypy errors: `mypy .`

**JavaScript/TypeScript:**
1. Format with Prettier: `npx prettier --write .`
2. Fix ESLint: `npx eslint . --fix`
3. Check TypeScript: `npx tsc --noEmit`

#### `/commit` - Structured Git Commits
Create well-formatted commits with conventional messages and emojis.

**Features:**
- Runs pre-commit checks by default (lint, build, docs)
- Auto-stages files if none staged
- Uses conventional commit format with emojis
- Suggests splitting commits for different concerns

**Commit Types:**
- ✨ feat: New features
- 🐛 fix: Bug fixes
- 📝 docs: Documentation changes
- ♻️ refactor: Code restructuring
- 🎨 style: Code formatting
- ⚡️ perf: Performance improvements
- ✅ test: Adding/correcting tests
- 🧑‍💻 chore: Tooling, maintenance

**Usage:**
- `/commit` - Standard commit with pre-commit checks
- `/commit --no-verify` - Skip pre-commit checks

#### `/commit-fast` - Quick Commit Process
Generate 3 commit message suggestions and automatically use the first one without confirmation.

**Steps:**
1. Run `git status` to see staged changes
2. Generate 3 conventional commit suggestions
3. Automatically select first suggestion
4. Execute `git commit -m` with selected message
5. Exclude Claude co-authorship footer

#### `/pr-review` - Multi-Perspective Pull Request Review
Comprehensive PR review from 6 different role perspectives:

1. **Product Manager** - Business value, user experience, strategic alignment
2. **Developer** - Code quality, standards, performance, scalability
3. **Quality Engineer** - Test coverage, edge cases, regression risk
4. **Security Engineer** - Vulnerabilities, data handling, authentication
5. **DevOps** - CI/CD integration, configuration, deployment concerns
6. **UI/UX Designer** - Visual consistency, usability, accessibility

**Key Principle:** Improvements scheduled for "later" must be addressed NOW!

### 📝 Documentation & Communication Commands

#### `/add-to-changelog` - Changelog Management
Update CHANGELOG.md with new entries following Keep a Changelog format.

**Usage:** `/add-to-changelog <version> <change_type> <message>`

**Parameters:**
- `<version>`: Version number (e.g., "1.1.0")
- `<change_type>`: "added", "changed", "deprecated", "removed", "fixed", "security"
- `<message>`: Description of the change

**Examples:**
- `/add-to-changelog 1.1.0 added "New markdown to BlockDoc conversion feature"`
- `/add-to-changelog 1.0.2 fixed "Bug in HTML renderer causing incorrect output"`

#### `/update-docs` - LLM-Optimized Documentation
Generate comprehensive documentation with concrete file references.

**Creates 7 documentation files:**
1. **project-overview.md** - Project purpose, key files, technology stack
2. **architecture.md** - System organization, component map, data flow
3. **build-system.md** - Build workflows, platform setup, troubleshooting
4. **testing.md** - Testing approach, test types, running tests
5. **development.md** - Development environment, code style, patterns
6. **deployment.md** - Packaging, distribution, platform deployment
7. **files.md** - Comprehensive file catalog with descriptions

**Requirements:**
- Token-efficient format with concrete file references
- No duplication across files
- Practical examples from actual codebase
- Timestamp headers on all generated files

#### `/github-issue-creation` - Structured Issue Creation
Create well-structured GitHub issues following best practices.

**Process:**
1. **Research repository** - Structure, existing issues, guidelines
2. **Research best practices** - Current standards for issue writing
3. **Present plan** - Proposed structure, labels, conventions
4. **Create issue** - Clear title, description, acceptance criteria
5. **Final output** - Complete issue content ready for GitHub

Uses `gh issue create` to create actual issues with appropriate labels (`bug` or `enhancement`).

### 🔄 System & Workflow Commands

#### `/create-command` - New Command Creation Guide
Guide for creating new custom Claude commands with proper structure.

**Process:**
1. **Understanding Purpose** - Problem solving, users, expected output
2. **Category Classification** - Planning, Implementation, Analysis, Testing, etc.
3. **Pattern Selection** - Study existing commands, identify reusable components
4. **Command Location** - Project-specific vs user-level
5. **Command Structure** - Title, description, usage, process, examples

**Template provided for consistent command creation**

#### `/continuous-improvement` - Rule Improvement System
Systematic approach for continuously improving AI assistant rules.

**Rule Improvement Triggers:**
- **Create New Rules When:** New technology used in 3+ files, common bugs preventable, repeated code review feedback
- **Update Existing Rules When:** Better examples exist, edge cases discovered, related rules updated

**Quality Framework:**
- **Structure Guidelines** - Purpose, when to apply, implementation, pitfalls, references
- **Quality Checklist** - Actionable, specific, tested, complete, current, linked
- **Continuous Improvement Workflow** - Collection, analysis, documentation, maintenance phases

#### `/cursor-rules-meta-guide` - Cursor Rules Management
Guidelines for creating and maintaining Cursor rules for consistency.

**Required Structure:**
```markdown
---
description: Clear description
globs: path/to/files/*.ext
alwaysApply: boolean
---
- **Main Points in Bold**
  - Sub-points with details
```

**Features:**
- File references using `[filename](mdc:path/to/file)`
- Code examples with ✅ DO and ❌ DON'T patterns
- Rule maintenance and best practices
- Consistent formatting across rules

## Best Practices

- **Always use todo lists** for complex tasks to track progress
- **Follow conventional commit format** with descriptive emojis
- **Run pre-commit checks** before committing code
- **Write tests first** (TDD approach) when implementing features
- **Document decisions** and architectural choices
- **Review code from multiple perspectives** before merging

## Command Usage

Commands are invoked using the `/command-name` format. Each command includes:
- Clear usage instructions
- Step-by-step process
- Best practices and examples
- Expected outputs and results

## Contributing

When adding new commands:
1. Use `/create-command` guide for proper structure
2. Follow established patterns and conventions
3. Include clear documentation and examples
4. Test thoroughly before finalizing
5. Update this README with new command information

## License

This project provides templates and guidelines for AI-assisted development workflows. Use and modify according to your project needs.