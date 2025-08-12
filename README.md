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

## Key Features

### Development Workflow Commands
- **Commit Management**: Automated commit message generation with conventional commit format and emojis
- **Code Quality**: Comprehensive linting, type checking, and formatting tools
- **Bug Fixing**: Structured workflow from issue creation to pull request
- **Documentation**: Automated generation of project documentation

### Analysis and Planning Tools
- **Code Analysis**: Multi-perspective code evaluation (quality, performance, security)
- **Five Whys**: Root cause analysis for complex problems
- **Pull Request Review**: Comprehensive reviews from multiple role perspectives
- **Issue Analysis**: GitHub issue breakdown and implementation planning

### Automation Features
- **Context Priming**: Automatic project understanding and setup
- **Changelog Management**: Structured changelog updates following Keep a Changelog format
- **Mermaid Diagrams**: Automatic generation of visual documentation
- **Continuous Improvement**: Self-improving rule system

## Getting Started

1. **Load Project Context**: Use the context prime command to understand your project
2. **Choose Your Workflow**: Select appropriate commands based on your task
3. **Follow Structured Process**: Each command provides step-by-step guidance
4. **Maintain Quality**: Use check and clean commands to ensure code quality

## Command Categories

### Planning & Analysis
- `analyze-issue` - Comprehensive GitHub issue analysis
- `five` - Five Whys root cause analysis
- `code-analysis` - Advanced code inspection
- `context-prime` - Project understanding

### Implementation
- `implement-task` - Methodical task implementation
- `bug-fix` - Structured bug fixing workflow
- `create-docs` - Documentation generation
- `mermaid` - Visual diagram creation

### Quality & Maintenance
- `check` - Comprehensive code quality checks
- `clean` - Code formatting and cleanup
- `commit` - Structured commit workflow
- `pr-review` - Multi-perspective code review

### Documentation & Communication
- `add-to-changelog` - Structured changelog updates
- `update-docs` - LLM-optimized documentation
- `github-issue-creation` - Well-structured issue creation

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

Example:
```
/commit - Create structured commit with pre-commit checks
/analyze-issue - Analyze GitHub issue and create implementation plan
/clean - Fix all code formatting and quality issues
```

## Contributing

When adding new commands:
1. Follow the established command structure
2. Include clear documentation and examples
3. Test thoroughly before finalizing
4. Update this README with new command information

## License

This project provides templates and guidelines for AI-assisted development workflows. Use and modify according to your project needs.