# Claude AI Assistant Rules and Commands

This file contains rules and custom commands to guide Claude AI in handling various development tasks effectively.

## Global Rules

### GitHub Issue Creation
Instructions for creating well-structured GitHub issues following best practices and project conventions.

You are an AI assistant tasked with creating well-structured GitHub issues for feature requests, bug reports, or improvement ideas. Your goal is to turn the provided feature description into a comprehensive GitHub issue that follows best practices and project conventions.

Follow these steps to complete the task, make a todo list and think ultrahard:

#### Process:
1. **Research the repository:**
   - Visit the provided repo url and examine the repository's structure, existing issues, and documentation.
   - Look for any CONTRIBUTING.md, ISSUE_TEMPLATE.md, or similar files that contain guidelines for creating issues.
   - Note the project's coding style, naming conventions, and any specific requirements for submitting issues.

2. **Research best practices:**
   - Search for current best practices in writing GitHub issues, focusing on clarity, completeness, and actionability.
   - Look for examples of well-written issues in popular open-source projects for inspiration.

3. **Present a plan:**
   - Based on your research, outline a plan for creating the GitHub issue.
   - Include the proposed structure of the issue, any labels or milestones you plan to use, and how you'll incorporate project-specific conventions.
   - Present this plan in <plan> tags.
   - Include the reference link to featurebase or any other link that has the source of the user request

4. **Create the GitHub issue:**
   - Once the plan is approved, draft the GitHub issue content.
   - Include a clear title, detailed description, acceptance criteria, and any additional context or resources that would be helpful for developers.
   - Use appropriate formatting (e.g., Markdown) to enhance readability.
   - Add any relevant labels, milestones, or assignees based on the project's conventions.

5. **Final output:**
   - Present the complete GitHub issue content in <github_issue> tags.
   - Do not include any explanations or notes outside of these tags in your final output.

Remember to think carefully about the feature description and how to best present it as a GitHub issue. Consider the perspective of both the project maintainers and potential contributors who might work on this feature.

Your final output should consist of only the content within the <github_issue> tags, ready to be copied and pasted directly into GitHub. Make sure to use the GitHub CLI `gh issue create` to create the actual issue after you generate. Assign either the label `bug` or `enhancement` based on the nature of the issue.

## Project Rules and Commands

### Add to Changelog

Update the project's CHANGELOG.md file with a new entry.

**Usage:**
`/add-to-changelog <version> <change_type> <message>`

**Parameters:**
- `<version>`: Version number (e.g., "1.1.0")
- `<change_type>`: One of: "added", "changed", "deprecated", "removed", "fixed", "security"
- `<message>`: Description of the change

**Examples:**
- `/add-to-changelog 1.1.0 added "New markdown to BlockDoc conversion feature"`
- `/add-to-changelog 1.0.2 fixed "Bug in HTML renderer causing incorrect output"`

**Steps:**
1. Check for existing CHANGELOG.md or create if missing
2. Find or create section for the specified version
3. Add the new entry under the appropriate change type
4. Format according to Keep a Changelog conventions
5. Write the updated changelog back to file
6. Optionally commit the changes with appropriate message

**Format:**
Follow [Keep a Changelog](https://keepachangelog.com) format:
- Group changes by type
- List changes as bullet points
- Include date for version sections
- Keep entries concise but descriptive

---

### Analyze Issue

Fetch GitHub issue details and create a comprehensive implementation specification.

**Template Sections:**

1. **Issue Summary** - Brief overview of the issue
2. **Problem Statement** - Clear definition of what needs to be solved
3. **Technical Approach** - High-level solution approach and architecture decisions
4. **Implementation Plan** - Step-by-step breakdown of implementation tasks
5. **Test Plan** - Testing strategy and test cases to write
6. **Files to Modify** - List of existing files that need changes
7. **Files to Create** - New files that need to be created
8. **Existing Utilities to Leverage** - Project utilities/helpers that can be reused
9. **Success Criteria** - Measurable criteria for completion
10. **Out of Scope** - What won't be addressed in this implementation

**Process:**
1. Fetch issue details using `gh issue view <issue_number>`
2. Review related code and project structure
3. Analyze requirements thoroughly
4. Create detailed technical specification
5. Follow strict TDD principles, KISS approach
6. Enforce 300-line file limit where applicable
7. Output the full technical specification for review

---

### Bug Fix

Streamline bug fixing workflow from issue creation to pull request.

**Before Starting:**
1. **GitHub**: Create an issue with a short descriptive title
2. **Git**: Create and checkout a feature branch (`git checkout -b fix/<issue-description>`)

**Fix the Bug:**
1. Reproduce the issue
2. Write failing test that demonstrates the bug
3. Implement the fix
4. Verify test passes
5. Run full test suite
6. Review code changes

**On Completion:**
1. **Git**: Commit with descriptive message referencing the issue
   - Format: `fix: <description> (#<issue-number>)`
2. **Git**: Push the branch to remote repository
3. **GitHub**: Create PR and link the issue
   - Use "Fixes #<issue-number>" in PR description
   - Add relevant labels and reviewers

**Best Practices:**
- Keep changes focused on the specific bug
- Include regression tests
- Update documentation if behavior changes
- Consider edge cases and related issues

---

### Check

Perform comprehensive code quality and security checks.

**Primary Task:**
Run `npm run check` (or project-specific check command) and resolve any resulting errors.

**Important:**
- DO NOT commit any code during this process
- DO NOT change version numbers
- Focus only on fixing issues identified by checks

**Common Checks Include:**
1. **Linting**: Code style and syntax errors
2. **Type Checking**: TypeScript/Flow type errors
3. **Unit Tests**: Failing test cases
4. **Security Scan**: Vulnerability detection
5. **Code Formatting**: Style consistency
6. **Build Verification**: Compilation errors

**Process:**
1. Run the check command
2. Analyze output for errors and warnings
3. Fix issues in priority order:
   - Build-breaking errors first
   - Test failures
   - Linting errors
   - Warnings
4. Re-run checks after each fix
5. Continue until all checks pass

**For Different Project Types:**
- **JavaScript/TypeScript**: `npm run check` or `yarn check`
- **Python**: `black`, `isort`, `flake8`, `mypy`
- **Rust**: `cargo check`, `cargo clippy`
- **Go**: `go vet`, `golint`
- **Swift**: `swift-format`, `swiftlint`

---

### Clean

Fix all code formatting and quality issues in the entire codebase.

**Python Projects:**
Fix all `black`, `isort`, `flake8`, and `mypy` issues

**Steps:**
1. **Format with Black**: `black .`
2. **Sort imports with isort**: `isort .`
3. **Fix flake8 issues**: `flake8 . --extend-ignore=E203`
4. **Resolve mypy type errors**: `mypy .`

**JavaScript/TypeScript Projects:**
Fix all ESLint, Prettier, and TypeScript issues

**Steps:**
1. **Format with Prettier**: `npx prettier --write .`
2. **Fix ESLint issues**: `npx eslint . --fix`
3. **Check TypeScript**: `npx tsc --noEmit`

**General Process:**
1. Run automated formatters first
2. Fix remaining linting issues manually
3. Resolve type checking errors
4. Verify all tools pass with no errors
5. Review changes before committing

**Common Issues:**
- Import order conflicts between tools
- Line length violations
- Unused imports/variables
- Type annotation requirements
- Missing return types
- Inconsistent quotes/semicolons

---

### Code Analysis

Perform advanced code analysis with multiple inspection options.

**Analysis Menu:**

1. **Knowledge Graph Generation**
   - Map relationships between components
   - Visualize dependencies
   - Identify architectural patterns

2. **Code Quality Evaluation**
   - Complexity metrics
   - Maintainability index
   - Technical debt assessment
   - Code duplication detection

3. **Performance Analysis**
   - Identify bottlenecks
   - Memory usage patterns
   - Algorithm complexity
   - Database query optimization

4. **Security Review**
   - Vulnerability scanning
   - Input validation checks
   - Authentication/authorization review
   - Sensitive data handling

5. **Architecture Review**
   - Design pattern adherence
   - SOLID principles compliance
   - Coupling and cohesion analysis
   - Module boundaries

6. **Test Coverage Analysis**
   - Coverage percentages
   - Untested code paths
   - Test quality assessment
   - Missing edge cases

**Process:**
1. Select analysis type based on need
2. Run appropriate tools and inspections
3. Generate comprehensive report
4. Provide actionable recommendations
5. Prioritize improvements by impact

**Output Format:**
- Executive summary
- Detailed findings
- Risk assessment
- Improvement roadmap
- Code examples where relevant

---

### Commit (Fast)

Generate 3 commit message suggestions based on the staged changes, then automatically use the first suggestion without user confirmation.

Follow conventional commit format with appropriate emojis and create descriptive messages that explain the purpose of changes. Skip the manual message selection step to streamline the commit process.

**Steps:**
1. Run `git status` to see staged changes
2. Generate 3 commit message suggestions following conventional commit format
3. Automatically select the first suggestion
4. Execute `git commit -m` with the selected message
5. Exclude Claude co-authorship footer from commits

**Commit Types:**
- ✨ feat: New features
- 🐛 fix: Bug fixes  
- 📝 docs: Documentation changes
- ♻️ refactor: Code restructuring
- 🧑‍💻 chore: Tooling and maintenance
- 🎨 style: Code formatting, missing semicolons, etc.
- ⚡️ perf: Performance improvements
- ✅ test: Adding or correcting tests

---

### Commit

Create well-formatted commits with conventional commit messages and emojis.

**Features:**
- Runs pre-commit checks by default (lint, build, generate docs)
- Automatically stages files if none are staged
- Uses conventional commit format with descriptive emojis
- Suggests splitting commits for different concerns

**Usage:**
- `/commit` - Standard commit with pre-commit checks
- `/commit --no-verify` - Skip pre-commit checks

**Commit Types:**
- ✨ feat: New features
- 🐛 fix: Bug fixes
- 📝 docs: Documentation changes
- ♻️ refactor: Code restructuring without changing functionality
- 🎨 style: Code formatting, missing semicolons, etc.
- ⚡️ perf: Performance improvements
- ✅ test: Adding or correcting tests
- 🧑‍💻 chore: Tooling, configuration, maintenance
- 🚧 wip: Work in progress
- 🔥 remove: Removing code or files
- 🚑 hotfix: Critical fixes
- 🔒 security: Security improvements

**Process:**
1. Check for staged changes (`git status`)
2. If no staged changes, review and stage appropriate files
3. Run pre-commit checks (unless --no-verify)
4. Analyze changes to determine commit type
5. Generate descriptive commit message
6. Include scope if applicable: `type(scope): description`
7. Add body for complex changes explaining why
8. Execute commit

**Best Practices:**
- Keep commits atomic and focused
- Write in imperative mood ("Add feature" not "Added feature")
- Explain why, not just what
- Reference issues/PRs when relevant
- Split unrelated changes into separate commits

---

### Context Prime

Prime Claude with comprehensive project understanding.

**Standard Context Loading:**
1. Read README.md for project overview
2. Read CLAUDE.md for AI-specific instructions
3. List project files excluding ignored paths
4. Review key configuration files
5. Understand project structure and conventions

**Steps:**
1. **Project Overview**:
   - Read README.md
   - Identify project type and purpose
   - Note key technologies and dependencies

2. **AI Guidelines**:
   - Read CLAUDE.md if present
   - Load project-specific AI instructions
   - Note coding standards and preferences

3. **Repository Structure**:
   - Run: `git ls-files | head -50` for initial structure
   - Identify main directories and their purposes
   - Note naming conventions

4. **Configuration Review**:
   - Package manager files (package.json, Cargo.toml, etc.)
   - Build configuration
   - Environment setup

5. **Development Context**:
   - Identify test framework
   - Note CI/CD configuration
   - Review contribution guidelines

**Advanced Options:**
- Load specific subsystem context
- Focus on particular technology stack
- Include recent commit history
- Load custom command definitions

**Output:**
Establish clear understanding of:
- Project goals and constraints
- Technical architecture
- Development workflow
- Collaboration parameters

---

### Continuous Improvement

Systematic approach for continuously improving AI assistant rules based on emerging patterns and best practices.

**Rule Improvement Triggers:**

**Create New Rules When:**
- A new technology/pattern is used in 3+ files
- Common bugs could be prevented by a rule
- Code reviews repeatedly mention the same feedback  
- New security or performance patterns emerge
- A complex task requires consistent approach

**Update Existing Rules When:**
- Better examples exist in the codebase
- Additional edge cases are discovered
- Related rules have been updated
- Implementation details have changed
- User feedback indicates confusion

**Analysis Process:**

1. **Pattern Recognition** - Monitor your codebase for repeated patterns
2. **Error Pattern Analysis** - Track common mistakes and their solutions
3. **Best Practice Evolution** - Document emerging best practices

**Rule Quality Framework:**

Each rule should follow this structure:
- **Purpose**: Brief description of what this rule achieves
- **When to Apply**: Specific scenarios, trigger conditions, prerequisites
- **Implementation**: Basic and advanced patterns with code examples
- **Common Pitfalls**: Known issues and how to avoid them
- **References**: Related rules and external docs

**Quality Checklist:**
- [ ] **Actionable**: Provides clear, implementable guidance
- [ ] **Specific**: Avoids vague recommendations
- [ ] **Tested**: Examples come from working code
- [ ] **Complete**: Covers common edge cases
- [ ] **Current**: References are up to date
- [ ] **Linked**: Cross-references related rules

**Continuous Improvement Workflow:**
1. **Collection Phase**: Daily development notes, weekly review
2. **Analysis Phase**: Pattern extraction, impact assessment
3. **Documentation Phase**: Rule creation process
4. **Maintenance Phase**: Regular updates and deprecation review

---

### Create Command

Guide for creating new custom Claude commands with proper structure.

**Process:**

1. **Understanding Purpose**
   - What problem does this command solve?
   - Who will use this command?
   - What is the expected output?
   - How will users interact with it?

2. **Category Classification**
   Determine command type:
   - **Planning**: Project setup, architecture decisions
   - **Implementation**: Code generation, feature development
   - **Analysis**: Code review, performance analysis
   - **Testing**: Test creation, validation
   - **Documentation**: Docs generation, updates
   - **Workflow**: Multi-step processes
   - **Utility**: Helper commands, tools

3. **Pattern Selection**
   Study similar existing commands:
   - Analyze structure and flow
   - Note common patterns
   - Identify reusable components
   - Follow established conventions

4. **Command Location**
   Choose appropriate location:
   - **Project-specific**: `.claude/commands/`
   - **User-level**: `~/.claude/commands/`
   - Consider reusability and context

5. **Command Structure**
   Create with these sections:
   - **Title**: Clear, action-oriented name
   - **Description**: One-line summary
   - **Usage**: How to invoke with parameters
   - **Process**: Step-by-step instructions
   - **Examples**: Concrete usage examples
   - **Output**: Expected results
   - **Notes**: Special considerations

**Template:**
```markdown
# Command Name

Brief description of what this command does.

## Usage:
`/command-name [arguments]`

## Process:
1. First step
2. Second step
3. Third step

## Examples:
- Example 1
- Example 2

## Notes:
- Important considerations
- Limitations
```

**Best Practices:**
- Keep commands focused and single-purpose
- Include parameter validation
- Provide helpful error messages
- Document expected inputs/outputs
- Consider edge cases
- Test thoroughly before finalizing

---

### Create Docs

Create comprehensive documentation for specified components or features.

**Analysis Areas:**
1. Code structure and purpose
2. Inputs, outputs, and behavior
3. User interaction flows
4. Edge cases and error handling
5. Integration points with other components/systems

**Documentation Template:**

- **Overview**: Brief 1-2 paragraph overview explaining purpose and value
- **Usage**: How to use this component/feature with examples
- **API / Props / Parameters**: Detailed specification of interfaces
- **Component Hierarchy**: Structure and relationships (if applicable)
- **State Management**: How state is handled and flows through the system
- **Behavior**: Expected behavior in different scenarios
- **Error Handling**: How errors are caught, handled, and reported
- **Performance Considerations**: Optimization notes and performance characteristics
- **Accessibility**: Accessibility features and compliance
- **Testing**: How to test this component/feature
- **Related Components/Features**: Links to related documentation

**Process:**
1. Analyze the target code thoroughly
2. Identify all public interfaces
3. Document expected behaviors
4. Include code examples
5. Add diagrams where helpful
6. Follow project documentation standards
7. Ensure clarity, completeness, and actionability

**Output Formats:**
- Markdown for general documentation
- JSDoc/TSDoc for code comments
- API documentation format
- README files
- Architecture decision records (ADRs)

---

### Cursor Rules Meta Guide

Guidelines for creating and maintaining Cursor rules to ensure consistency and effectiveness.

**Required Rule Structure:**
```markdown
---
description: Clear, one-line description of what the rule enforces
globs: path/to/files/*.ext, other/path/**/*
alwaysApply: boolean
---

- **Main Points in Bold**
  - Sub-points with details
  - Examples and explanations
```

**File References:**
- Use `[filename](mdc:path/to/file)` to reference files
- Example: `[prisma.mdc](mdc:.cursor/rules/prisma.mdc)` for rule references
- Example: `[schema.prisma](mdc:prisma/schema.prisma)` for code references

**Code Examples:**
Use language-specific code blocks:
```typescript
// ✅ DO: Show good examples
const goodExample = true;

// ❌ DON'T: Show anti-patterns
const badExample = false;
```

**Rule Content Guidelines:**
- Start with high-level overview
- Include specific, actionable requirements
- Show examples of correct implementation
- Reference existing code when possible
- Keep rules DRY by referencing other rules

**Rule Maintenance:**
- Update rules when new patterns emerge
- Add examples from actual codebase
- Remove outdated patterns
- Cross-reference related rules

**Best Practices:**
- Use bullet points for clarity
- Keep descriptions concise
- Include both DO and DON'T examples
- Reference actual code over theoretical examples
- Use consistent formatting across rules

---

### Five Whys Analysis

Use the "Five Whys" root cause analysis technique to deeply understand problems.

**Process:**

1. **Define the Problem** - Clearly state the issue or symptom

2. **Ask "Why?" Five Times**
   - Why did this problem occur? → Answer 1
   - Why did Answer 1 happen? → Answer 2  
   - Why did Answer 2 happen? → Answer 3
   - Why did Answer 3 happen? → Answer 4
   - Why did Answer 4 happen? → Answer 5 (Root Cause)

3. **Validate Root Cause**
   - Verify the logical chain
   - Check if addressing root cause prevents recurrence
   - Consider multiple root causes if applicable

4. **Develop Solutions**
   - Address the root cause, not just symptoms
   - Create preventive measures
   - Consider systemic improvements

**Example:**
**Problem**: Application crashes when processing large files

1. **Why?** → The application runs out of memory
2. **Why?** → It loads entire file into memory at once
3. **Why?** → The file parser wasn't designed for streaming
4. **Why?** → Initial requirements only specified small files
5. **Why?** → Requirements gathering didn't consider future growth

**Root Cause**: Incomplete requirements gathering process
**Solution**: Implement streaming parser and improve requirements process

**Best Practices:**
- Focus on process, not people
- Look for systemic issues
- Document the analysis
- Involve relevant stakeholders
- Test solutions address root cause

---

### Implement Task

Approach task implementation methodically with careful planning and execution.

**Process:**

1. **Think Through Strategy**
   - Understand the complete requirement
   - Identify key components needed
   - Consider dependencies and constraints
   - Plan the implementation approach

2. **Evaluate Approaches**
   - List possible implementation strategies
   - Compare pros and cons of each
   - Consider: Performance implications, Maintainability, Scalability, Code reusability, Testing complexity

3. **Consider Tradeoffs**
   - Short-term vs long-term benefits
   - Complexity vs simplicity
   - Performance vs readability
   - Flexibility vs focused solution
   - Time to implement vs perfect solution

4. **Implementation Steps**
   1. Break down into subtasks
   2. Start with core functionality
   3. Implement incrementally
   4. Test each component
   5. Integrate components
   6. Add error handling
   7. Optimize if needed
   8. Document decisions

5. **Best Practices**
   - Write tests first (TDD approach)
   - Keep functions small and focused
   - Use meaningful names
   - Comment complex logic
   - Handle edge cases
   - Consider future maintenance

**Checklist:**
- [ ] Requirements fully understood
- [ ] Approach documented
- [ ] Tests written
- [ ] Code implemented
- [ ] Edge cases handled
- [ ] Documentation updated
- [ ] Code reviewed
- [ ] Performance acceptable

---

### Mermaid Diagram Generation

Generate Mermaid diagrams for visualizing code structure and relationships.

**Common Diagram Types:**

1. **Entity Relationship Diagrams** - For database schemas and data models:
```
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
```

2. **Flow Charts** - For process and logic flow:
```
flowchart TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Process]
    B -->|No| D[End]
```

3. **Sequence Diagrams** - For interaction flows:
```
sequenceDiagram
    Client->>Server: Request
    Server->>Database: Query
    Database-->>Server: Result
    Server-->>Client: Response
```

4. **Class Diagrams** - For object-oriented design:
```
classDiagram
    class Animal {
        +name: string
        +age: int
        +makeSound()
    }
```

**Process:**
1. Analyze source files (SQL, code, docs)
2. Extract entities and relationships
3. Generate appropriate diagram type
4. Include relevant properties/methods
5. Validate syntax with mermaid compiler
6. Save to specified location

**Validation:**
Run `npx -p @mermaid-js/mermaid-cli mmdc -i <input>.md -o test.md`

**Best Practices:**
- Keep diagrams focused and readable
- Use consistent naming conventions
- Group related entities
- Add labels to relationships
- Include cardinality where relevant
- Use subgraphs for organization
- Add styling for clarity

---

### Pull Request Review

Comprehensive pull request review from multiple perspectives.

**Review Roles:**

1. **Product Manager Review**
   - **Business Value**: Does this deliver promised value?
   - **User Experience**: Will users benefit from this change?
   - **Strategic Alignment**: Does it align with product goals?
   - **Feature Completeness**: Are all requirements met?
   - **Action**: Provide directives for maximum impact

2. **Developer Review**
   - **Code Quality**: Is code clean and maintainable?
   - **Standards**: Does it follow coding conventions?
   - **Performance**: Are there efficiency concerns?
   - **Scalability**: Will it handle growth?
   - **Refactoring**: Any code that needs improvement?
   - **Action**: Suggest specific code improvements

3. **Quality Engineer Review**
   - **Test Coverage**: Are all paths tested?
   - **Edge Cases**: Are boundary conditions handled?
   - **Regression Risk**: Could this break existing features?
   - **Test Quality**: Are tests comprehensive and clear?
   - **Action**: Identify missing tests and scenarios

4. **Security Engineer Review**
   - **Vulnerabilities**: Any security risks?
   - **Data Handling**: Is sensitive data protected?
   - **Authentication**: Are auth checks proper?
   - **Input Validation**: Is user input sanitized?
   - **Compliance**: Does it meet security standards?
   - **Action**: Flag security concerns immediately

5. **DevOps Review**
   - **CI/CD Integration**: Will builds succeed?
   - **Configuration**: Are configs properly managed?
   - **Infrastructure**: Any deployment concerns?
   - **Monitoring**: Are metrics and logs adequate?
   - **Rollback**: Can changes be safely reverted?
   - **Action**: Ensure smooth deployment

6. **UI/UX Designer Review**
   - **Visual Consistency**: Does it match design system?
   - **Usability**: Is it intuitive to use?
   - **Accessibility**: Is it accessible to all users?
   - **Responsive**: Does it work on all devices?
   - **Polish**: Any rough edges to smooth?
   - **Action**: Ensure delightful user experience

**Review Process:**
1. Read PR description and linked issues
2. Review code changes systematically
3. Test functionality locally if applicable
4. Consider each perspective above
5. Leave constructive feedback
6. Approve or request changes

**Key Principle:**
**Improvements scheduled for "later" must be addressed NOW!**

---

### Update Documentation

Generate LLM-optimized documentation with concrete file references and flexible formatting.

**Task:**
Create documentation that allows humans and LLMs to:
- **Understand project purpose** - what the project does and why
- **Get architecture overview** - how the system is organized
- **Build on all platforms** - build instructions with file references
- **Add features/subsystems** - following established patterns with examples
- **Debug applications** - troubleshoot issues with specific file locations
- **Test and add tests** - run existing tests and create new ones
- **Deploy and distribute** - package and deploy the software

**Required Documentation Structure:**

Each document MUST include:
1. **Timestamp Header** - Hidden comment with last update timestamp
2. **Brief Overview** (2-3 paragraphs max) 
3. **Key Files & Examples** - Concrete file references for each major topic
4. **Common Workflows** - Practical guidance with file locations
5. **Reference Information** - Quick lookup tables with file paths

**Timestamp Format:**
Each generated file MUST start with:
```
<!-- Generated: YYYY-MM-DD HH:MM:SS UTC -->
```

**Process:**
1. **Analyze the codebase systematically** across 7 key areas
2. **Create or update docs** in `docs/*.md` with concrete file references
3. **Synthesize final documentation** into a minimal, LLM-friendly README.md
4. **Eliminate all duplication** across files

**Analysis Methodology:**

For each area, agents should:
1. **Examine key files**: Look for build configs, test files, deployment scripts, main source files
2. **Extract file references**: Note specific files, line numbers, and examples
3. **Identify patterns**: Find repeated structures, naming conventions, common workflows
4. **Make content LLM-friendly**: Token-efficient, reference-heavy, practical examples

**Critical Requirements:**

**LLM-OPTIMIZED FORMAT:**
- **Token efficient**: Avoid redundant explanations, focus on essential information
- **Concrete file references**: Always include specific file paths, line numbers when helpful
- **Flexible formatting**: Use subsections, code blocks, examples instead of rigid step-by-step
- **Pattern examples**: Show actual code from the codebase, not generic examples

**NO DUPLICATION:**
- Each piece of information appears in EXACTLY ONE file
- Build information only in build-system.md
- Code style and patterns only in development.md
- Deployment information only in deployment.md
- Cross-references using: "See [docs/filename.md](docs/filename.md)"

**FILE REFERENCE FORMAT:**
Always include specific file references:
```
**Core System** - Core implementation in src/core.h (lines 15-45), platform backends in src/platform/

**Build Configuration** - Main build file (lines 67-89), configuration files

**Module Management** - Interface in src/module.h, implementation in src/module.c (key_function at line 134)
```

**PRACTICAL EXAMPLES:**
Use actual code from the codebase:
```c
// From src/example.h:23-27
typedef struct {
    bool active;
    void *data;
    int count;
} ExampleState;
```