import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addColorPicker({
      path: 'chipColor',
      name: 'Chip colour',
      description: 'Background colour of the chips',
      defaultValue: 'blue',
    })
    .addTextInput({
      path: 'variableNames',
      name: 'Variables to show',
      description: 'Variable names separated by commas, e.g. ward,sensor. Leave empty to show all.',
      defaultValue: '',
    });
});