const fs = require('fs');
const path = require('path');

const FILES_TO_CREATE = [
    { name: '00-product-brief.md', content: '# Product Brief\n\n## Vision\n[Describe the product vision here]\n' },
    { name: '01-user-stories.md', content: '# User Stories\n\n## Epics\n- [ ] Epic 1\n' },
    { name: '02-tech-specs.md', content: '# Technical Specifications\n\n## Architecture\n[Describe architecture]\n' },
    { name: '03-data-schema.md', content: '# Data Schema\n\n## Models\n- User\n' },
];

module.exports = async function (tree, options) {
    const { name } = options;
    const safeName = name.toLowerCase().replace(/[^a-z0-9-_]/g, '-');
    const projectDir = `prd/${safeName}`;

    console.log(`\n🚀 Generating PRD structure for: ${safeName}`);

    FILES_TO_CREATE.forEach(file => {
        const filePath = path.join(projectDir, file.name);
        tree.write(filePath, file.content);
        console.log(`   ✅ Created ${file.name}`);
    });

    console.log(`\n✨ Success! PRD structure created at ./${projectDir}`);
    console.log(`   Next step: Edit ${projectDir}/00-product-brief.md`);

    return () => { };
};
