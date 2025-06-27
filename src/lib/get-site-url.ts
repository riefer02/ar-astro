export function getSiteUrl(Astro?: { site?: URL }) {
  const envUrl =
    import.meta.env.PUBLIC_DEPLOY_PRIME_URL ||
    import.meta.env.PUBLIC_DEPLOY_URL ||
    import.meta.env.PUBLIC_URL;

  if (envUrl) return envUrl;
  if (Astro?.site) return Astro.site.toString();
  return "http://localhost:4321";
}
