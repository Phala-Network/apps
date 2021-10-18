// TODO: replace manually in each package.json
function readPackage(pkg) {
  if (
    pkg.name !== 'react-query' &&
    pkg.dependencies &&
    pkg.dependencies['react-query']
  ) {
    pkg.dependencies['react-query'] = 'workspace:*'
  }
  return pkg
}

module.exports = {
  hooks: {
    readPackage,
  },
}
