const mathjaxPlugin = require("eleventy-plugin-mathjax")

module.exports = function (config) {
  config.setBrowserSyncConfig({
    server: {
      baseDir: ['./src', './dist', './node_modules'],
    }
  })

  // ------------- Filters -------------

  config.addFilter('ruDate', (value) => {
    return value.toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).replace(' г.', '');
  });

  config.addFilter('shortDate', (value) => {
    return value.toLocaleString('ru', {
      month: 'short',
      day: 'numeric'
    }).replace('.', '');
  });

  config.addFilter('isoDate', (value) => {
    return value.toISOString();
  });

  // ------------- Plugins -------------

  config.addPlugin(mathjaxPlugin)

  // ------------- Passthrough -------------

  config.ignores.delete('src/*/keynote/*')
  config.addPassthroughCopy('src/*/bundled/index.html')
  config.addPassthroughCopy('src/*/bundled/index.pdf')
  config.addPassthroughCopy('src/*/bundled/pictures/*.*')
  config.addPassthroughCopy('src/*/bundled/shower/**/*.*')
  config.addPassthroughCopy('src/fonts')

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: 'includes',
      layouts: 'layouts',
      data: 'data',
    },
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: false,
    htmlTemplateEngine: 'njk',
    passthroughFileCopy: true,
    templateFormats: ['md', 'njk'],
  }
}
