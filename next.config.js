/** @type {import('next').NextConfig} */
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] || "your-repo";

module.exports = {
  output: "export", // instruct Next to produce static HTML via next export
  assetPrefix: `/${repo}/`, // ensure static assets load from /repo/
  basePath: `/${repo}`, // makes routes resolve under /repo
  trailingSlash: true, // helpful for GitHub Pages to serve index.html in folders
};
