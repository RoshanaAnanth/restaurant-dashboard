/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.NEXT_PUBLIC_GHP === "true";

module.exports = {
  output: "export",
  trailingSlash: true,
  // Only set basePath/assetPrefix when necessary — keep them off for default export
  // ...(isGitHubPages
  //   ? {
  // If you still want to use basePath in some CI flows, set NEXT_PUBLIC_GHP=true in that flow
  // basePath: '/your-repo',
  // assetPrefix: '/your-repo/',
  //   }
  // : {}),
};
