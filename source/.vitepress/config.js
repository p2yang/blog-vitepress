export default {
  title: 'Joe\'s blog',
  description: '技术与生活纪事，涵盖react、vue、node、docker、elasticsearch、linux等。',
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Archives', link: '/archives/' },
      { text: 'Tags', link: '/tags/' },
      { text: 'Categories', link: '/categories/' }
    ],
    footer: {
      message: 'Released under the <a href="http://creativecommons.org/licenses/by-nc/4.0/">CC BY-NC 4.0</a> License.',
      copyright: 'Copyright © 2016-present <a href="https://github.com/p2yang">Joe Peng</a>'
    }
  }
}
