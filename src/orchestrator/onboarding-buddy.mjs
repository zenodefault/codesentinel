import { readModulePassports } from "../memory/memory.mjs";

/**
 * Identifies modules where the author is not yet a primary owner or contributor.
 */
export async function identifyNewOnboardingContext({ repoName, authorEmail, authorLogin, changedFiles }) {
  const passports = await readModulePassports(repoName);
  const contexts = [];

  for (const file of changedFiles) {
    // Find the passport that covers this file (simplistic path matching)
    const passport = passports.find((p) => {
      // Check if module name is part of the file path or vice versa
      const moduleKey = p.module.toLowerCase();
      const pathKey = file.toLowerCase();
      return pathKey.includes(moduleKey) || moduleKey.includes(pathKey);
    });

    if (!passport) continue;

    const owners = passport.ownership?.primaryOwner?.label || "";
    const ghostEmails = (passport.ghostAuthors ?? []).map((g) => g.email || g.authorEmail);
    const knownAuthor = 
      owners.includes(authorEmail) || 
      owners.includes(authorLogin) || 
      ghostEmails.includes(authorEmail);

    if (!knownAuthor) {
      contexts.push({
        file,
        module: passport.module,
        passport,
      });
    }
  }

  // Deduplicate by module
  const uniqueModules = new Map();
  for (const ctx of contexts) {
    if (!uniqueModules.has(ctx.module)) {
      uniqueModules.set(ctx.module, ctx);
    }
  }

  return Array.from(uniqueModules.values());
}

export function buildOnboardingMessage(contexts) {
  if (contexts.length === 0) return null;

  let message = "### 🎓 CodeSentinel Onboarding Buddy\n\nI see you're working on some modules for the first time! Here is some context to help you out:\n\n";

  for (const ctx of contexts) {
    const summary = ctx.passport.riskSummary || "No summary available.";
    const owner = ctx.passport.ownership?.primaryOwner?.label || "Unmapped";
    
    message += `#### 📦 Module: ${ctx.module}\n`;
    message += `> **Risk Summary:** ${summary}\n`;
    message += `> **Primary Owner:** ${owner}\n\n`;
  }

  message += "---\n*I am CodeSentinel. I provide context to help prevent regressions.*";
  return message;
}
