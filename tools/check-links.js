const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const IGNORE_DIRS = ['node_modules', '.git', '.claude', 'dist', 'coverage', '.nx'];

let errorCount = 0;

function getAllMarkdownFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            if (!IGNORE_DIRS.includes(file)) {
                results = results.concat(getAllMarkdownFiles(filePath));
            }
        } else {
            if (file.endsWith('.md')) {
                results.push(filePath);
            }
        }
    });
    return results;
}

function checkFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
        const linkText = match[1];
        let linkUrl = match[2];

        // Ignore anchors-only, http links, mailto, and VitePress internal links (start with /)
        if (linkUrl.startsWith('#') || linkUrl.startsWith('http') || linkUrl.startsWith('mailto:') || linkUrl.startsWith('/')) {
            continue;
        }

        // Strip anchors from file path (e.g., ./file.md#section -> ./file.md)
        const anchorIndex = linkUrl.indexOf('#');
        if (anchorIndex !== -1) {
            linkUrl = linkUrl.substring(0, anchorIndex);
        }

        // Skip if empty after stripping anchor (e.g. just "#")
        if (!linkUrl) continue;

        const absolutePath = path.resolve(path.dirname(filePath), linkUrl);

        // Check if valid
        if (!fs.existsSync(absolutePath)) {
            console.error(`❌ Broken link in ${path.relative(ROOT_DIR, filePath)}:`);
            console.error(`   Link: [${linkText.substring(0, 20)}...](${linkUrl})`);
            console.error(`   Resolved: ${path.relative(ROOT_DIR, absolutePath)}`);
            errorCount++;
        }
    }
}

console.log('🔍 Scanning for broken relative links...');
const files = getAllMarkdownFiles(ROOT_DIR);
console.log(`📝 Found ${files.length} markdown files.`);

files.forEach(file => checkFile(file));

if (errorCount > 0) {
    console.error(`\n💥 Found ${errorCount} broken links.`);
    process.exit(1);
} else {
    console.log('\n✅ All links pass.');
    process.exit(0);
}
