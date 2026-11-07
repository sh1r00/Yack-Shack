export default [
  { UserAgent: '*' },
  { Disallow: ''},
  { BlankLine: true },
  { Comment: 'Getting crawlers Fed' },

  // Be aware that this will NOT work on target: 'static' mode
  { Sitemap: `${process.env.APP_BASE_URL}/sitemap.xml`}
]