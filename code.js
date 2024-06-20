figma.showUI(__html__);

figma.ui.onmessage = msg => {
  if (msg.type === 'apply-factor') {
    const factor = msg.factor;
    const selectedNodes = figma.currentPage.selection;

    for (const node of selectedNodes) {
      if (node.type === 'TEXT') {
        figma.loadFontAsync(node.fontName).then(() => {
          node.fontSize *= factor;
        }).catch(err => {
          console.error('Ошибка загрузки шрифта:', err);
        });
      }
    }

    figma.closePlugin();
  }
};

// Отправляем данные выделенных текстовых слоев в UI
const selectedTextNodes = figma.currentPage.selection.filter(node => node.type === 'TEXT');
figma.ui.postMessage({
  type: 'selected-nodes',
  nodes: selectedTextNodes.map(node => ({
    id: node.id,
    characters: node.characters,
    fontSize: node.fontSize
  }))
});
