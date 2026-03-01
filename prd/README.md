# PRD (Product Requirements Document) - Starting Point for New Apps

This folder contains templates and guides for creating Product Requirements Documents (PRDs) that serve as the blueprint for building new applications from this template.

## 📋 What is a PRD?

A Product Requirements Document (PRD) is a comprehensive document that defines:
- **What** you're building
- **Why** you're building it
- **Who** it's for
- **How** it should work
- **When** it needs to be delivered

## 🚀 Quick Start

### 1. Choose Your Template

| Template | Best For | Length |
|----------|----------|--------|
| **[PRD Lite](./templates/prd-lite.md)** | Simple apps, MVPs, hackathons | 1 page |
| **[PRD Template](./templates/prd-template.md)** | Full products, enterprise apps | 20+ pages |
| **[Feature Spec](./templates/feature-spec.md)** | Individual features | 5 pages |
| **[Technical Spec](./templates/technical-spec.md)** | Technical architecture | 15 pages |

### 2. Copy and Customize

```bash
# For simple projects
cp prd/templates/prd-lite.md prd/my-app.md

# For full products
cp prd/templates/prd-template.md prd/my-app.md

# For a new feature
cp prd/templates/feature-spec.md prd/features/my-feature.md
```

### 3. Fill Out Your PRD

Edit with your app's details:
- Product vision and goals
- Target audience and personas
- Features and requirements
- Technical specifications
- Success metrics

### 4. Build

Once your PRD is complete:
1. Use it as the blueprint for implementation
2. Share with stakeholders for alignment
3. Reference during development
4. Update as requirements evolve

## 📁 Folder Structure

```
prd/
├── README.md                    # This file
├── templates/
│   ├── prd-lite.md              # Quick 1-page PRD for simple projects
│   ├── prd-template.md          # Full enterprise PRD template
│   ├── feature-spec.md          # Individual feature specification
│   └── technical-spec.md        # Technical architecture spec
├── examples/
│   └── todo-app-prd.md          # Example: Simple todo app
└── schemas/
    ├── auth.sql                 # Auth schema examples
    ├── user_profiles.sql        # User profiles schema
    └── audit_logs.sql           # Audit logging schema
```

## 🎯 PRD-Driven Development Workflow

### Phase 1: Discovery & Planning
1. **Choose template** based on project complexity
2. **Define requirements** (user stories, features)
3. **Get stakeholder buy-in**
4. **Prioritize features** (MVP vs Future)

### Phase 2: Technical Planning
1. **Review PRD** with technical team
2. **Create technical spec** (architecture, data models)
3. **Identify dependencies** (APIs, services)
4. **Estimate effort** (timelines, resources)

### Phase 3: Implementation
1. **Duplicate this template repo**
2. **Configure for your app** (name, identifiers)
3. **Build features** according to PRD
4. **Reference PRD** for requirements clarity

### Phase 4: Iteration
1. **Update PRD** as requirements change
2. **Track completed features**
3. **Document decisions**
4. **Plan next iterations**

## 📝 Templates Overview

### 1. PRD Lite (`prd-lite.md`)
Quick 1-page template for simple projects.

**Use when:**
- Building an MVP in 2-4 weeks
- Hackathon projects
- Simple CRUD apps
- Prototyping an idea

**Time to fill:** ~30 minutes

### 2. Full PRD (`prd-template.md`)
Comprehensive enterprise-grade template.

**Use when:**
- Building a full product
- Need stakeholder alignment
- Planning 3+ month projects
- Enterprise/compliance requirements

**Time to fill:** 2-4 hours

### 3. Feature Spec (`feature-spec.md`)
Detailed specification for individual features.

**Use when:**
- Adding new features to existing app
- Planning complex features
- Need detailed user flows
- Handoff to development team

**Time to fill:** 1-2 hours

### 4. Technical Spec (`technical-spec.md`)
Technical architecture and implementation details.

**Use when:**
- Finalizing technical approach
- Documenting system design
- Planning infrastructure
- Onboarding new developers

**Time to fill:** 2-3 hours

## 💡 Example PRD

### Todo App
- **File:** `examples/todo-app-prd.md`
- **Complexity:** Low
- **Features:** CRUD, auth, sync
- **Time estimate:** 4-6 weeks

This example demonstrates:
- Clear problem statement
- User personas
- Prioritized features (P0/P1/P2)
- Data models with RLS
- Timeline with milestones

## ✅ PRD Checklist

Before starting development, ensure your PRD has:

**Product Definition**
- [ ] Clear product vision and goals
- [ ] Target audience defined
- [ ] Problem statement articulated
- [ ] Success metrics identified

**Features & Requirements**
- [ ] User stories written
- [ ] Features prioritized (MVP vs Nice-to-have)
- [ ] User flows documented
- [ ] Edge cases considered

**Technical Planning**
- [ ] Tech stack chosen
- [ ] Data models designed
- [ ] API contracts defined
- [ ] Third-party services identified

**Business & Operations**
- [ ] Launch plan defined
- [ ] Marketing approach outlined
- [ ] Support strategy planned
- [ ] Analytics tracked

## 🔄 PRD Lifecycle

```
1. Draft → 2. Review → 3. Approved → 4. In Development → 5. Completed
   │          │           │              │                   │
   └──────────┴───────────┴──────────────┴───────────────────┘
                  Update as needed
```

## 🤝 Collaboration Tips

### For Product Managers
- Use PRD to align stakeholders
- Keep PRD updated with decisions
- Reference PRD in planning meetings
- Track progress against PRD

### For Developers
- Refer to PRD for requirements clarity
- Flag ambiguities or conflicts
- Update technical specs as you learn
- Document architectural decisions

### For Designers
- Use PRD to understand user needs
- Design flows based on user stories
- Collaborate on wireframes
- Ensure designs match requirements

## 📊 From PRD to Production

### Week 1-2: Planning
- Write PRD (use Lite for simple, Full for complex)
- Get approvals
- Create technical spec
- Design wireframes

### Week 3-4: Setup
- Duplicate template repo
- Configure for your app
- Setup CI/CD
- Create initial screens

### Week 5-8: MVP Development
- Build core features
- Implement authentication
- Setup data layer
- Basic UI implementation

### Week 9-10: Testing & Polish
- Unit and E2E tests
- Bug fixes
- Performance optimization
- UI polish

### Week 11-12: Launch
- Beta testing
- Marketing preparation
- App store submission
- Production deployment

## 🎓 Learning Resources

### External Resources
- [Product School PRD Guide](https://productschool.com/blog/product-management-2/how-to-write-product-requirements-document/)
- [Atlassian PRD Template](https://www.atlassian.com/software/confluence/templates/product-requirements-document)
- [Lenny's Newsletter on PRDs](https://www.lennysnewsletter.com/p/product-requirement-documents)

## 💬 Getting Help

- **Questions:** Open a [Discussion](https://github.com/willbnu/Product-Blueprint/discussions)
- **PRD Reviews:** Request feedback via PR
- **Examples:** Check `prd/examples/` folder

## 🚀 Ready to Start?

1. **Review:** Check the example PRD in `prd/examples/todo-app-prd.md`
2. **Choose:** Pick the right template for your project
3. **Copy:** `cp prd/templates/prd-lite.md prd/my-app.md`
4. **Write:** Fill out your PRD
5. **Build:** Use this template to implement!

---

**Remember:** A good PRD is the foundation of a successful app. Take time to get it right!
