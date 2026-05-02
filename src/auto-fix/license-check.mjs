function restrictiveRank(license) {
  const normalized = (license ?? "UNKNOWN").toUpperCase();
  if (normalized.includes("GPL") || normalized.includes("AGPL") || normalized.includes("SSPL")) {
    return 3;
  }
  if (normalized.includes("MPL") || normalized.includes("EPL")) {
    return 2;
  }
  return 1;
}

async function npmLicense(pkg, version) {
  const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(pkg)}/${encodeURIComponent(version)}`);
  if (!response.ok) {
    throw new Error(`npm license lookup failed for ${pkg}@${version}`);
  }
  const json = await response.json();
  return json.license ?? "UNKNOWN";
}

async function pypiLicense(pkg, version) {
  const response = await fetch(`https://pypi.org/pypi/${encodeURIComponent(pkg)}/${encodeURIComponent(version)}/json`);
  if (!response.ok) {
    throw new Error(`PyPI license lookup failed for ${pkg}==${version}`);
  }
  const json = await response.json();
  return json.info?.license ?? "UNKNOWN";
}

export async function checkLicenseChange({ ecosystem, dependency, oldVersion, newVersion }) {
  const oldClean = String(oldVersion).replace(/^[^0-9]*/, "");
  const newClean = String(newVersion).replace(/^[^0-9]*/, "");

  const oldLicense = ecosystem === "npm" ? await npmLicense(dependency, oldClean) : await pypiLicense(dependency, oldClean);
  const newLicense = ecosystem === "npm" ? await npmLicense(dependency, newClean) : await pypiLicense(dependency, newClean);

  return {
    oldLicense,
    newLicense,
    changed: oldLicense !== newLicense,
    moreRestrictive: restrictiveRank(newLicense) > restrictiveRank(oldLicense),
  };
}
