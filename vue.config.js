module.exports = {
  pages: {
    index: {
      entry: 'src/popup/popup.js',
      template: `public/popup.html`
    },
    newtab: {
      entry: 'src/tab/newtab.js',
      template: `public/newtab.html`
    },
  },
}