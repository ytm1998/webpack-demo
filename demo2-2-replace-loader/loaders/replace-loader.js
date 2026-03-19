module.exports = function(source) {
  const result = source.replace(/__VERSION__/, '1.0.0').replace(/__DATE__/, new Date().toISOString());
  return result;
};
