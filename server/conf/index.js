function getDbSettings() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/cardero';
  const parts = uri.split('/');
  const name = parts[parts.length - 1];

  return { uri, name };
}

module.exports = {
  db: getDbSettings()
};
