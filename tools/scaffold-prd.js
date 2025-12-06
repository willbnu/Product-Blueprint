const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configuration
const TEMPLATE_DIR = path.join(__dirname, '../prd/templates');
const TARGET_BASE_DIR = path.join(__dirname, '../prd');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const FILES_TO_CREATE = [
    { name: '00-product-brief.md', template: 'product-brief-template.md', defaultContent: '# Product Brief\n\n## Vision\n[Describe the product vision here]\n' },
    { name: '01-user-stories.md', template: 'user-stories-template.md', defaultContent: '# User Stories\n\n## Epics\n- [ ] Epic 1\n' },
    { name: '02-tech-specs.md', template: 'tech-specs-template.md', defaultContent: '# Technical Specifications\n\n## Architecture\n[Describe architecture]\n' },
    { name: '03-data-schema.md', template: 'data-schema-template.md', defaultContent: '# Data Schema\n\n## Models\n- User\n' },
];

console.log("\x1b[36m%s\x1b[0m", "🚀 Product-Blueprint PRD Scaffolder");

rl.question('Enter the name of your new project (e.g., "my-awesome-app"): ', (projectName) => {
    if (!projectName) {
        console.error('❌ Project name is required.');
        rl.close();
        process.exit(1);
    }

    // Sanitize project name
    const safeName = projectName.toLowerCase().replace(/[^a-z0-9-_]/g, '-');
    const projectDir = path.join(TARGET_BASE_DIR, safeName);

    console.log(`\n📂 Creating PRD directory: ./prd/${safeName}...`);

    if (fs.existsSync(projectDir)) {
        console.error(`❌ Directory "${safeName}" already exists in prd/. Aborting.`);
        rl.close();
        process.exit(1);
    }

    fs.mkdirSync(projectDir, { recursive: true });

    FILES_TO_CREATE.forEach(file => {
        const targetPath = path.join(projectDir, file.name);
        // Try to read from template, fallback to default content
        // Note: In v0.1.0 we might not have all templates, so fallback is important.
        // For now, we'll just write simple headers to get them started.

        fs.writeFileSync(targetPath, file.defaultContent);
        console.log(`   ✅ Created ${file.name}`);
    });

    console.log(`\n✨ Success! Your PRD structure is ready at ./prd/${safeName}`);
    console.log(`   Next step: cd prd/${safeName} and start editing 00-product-brief.md`);

    rl.close();
});
