/**
 * Получить перувую ноду в дереве cheerio либо пустую ноду, если их нет вообще
 * @param {*} nodes
 */
const getFirstNode = nodes => {
  if (!nodes || nodes.length === 0) return null;
  return nodes[0];
};

module.exports = {
  getFirstNode
};
