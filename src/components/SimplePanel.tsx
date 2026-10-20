import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css } from '@emotion/css';
import { useStyles2, useTheme2 } from '@grafana/ui';
import { getTemplateSrv } from '@grafana/runtime';

interface Props extends PanelProps<SimpleOptions> {}

const getStyles = () => {
  return {
    wrapper: css`
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 4px;
    `,
    chip: css`
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 14px;
    `,
  };
};

export const SimplePanel: React.FC<Props> = ({ options, width, height }) => {
  const styles = useStyles2(getStyles);
  const theme = useTheme2();

  // Turn the colour from the colour picker (e.g. "blue") into a real colour code
  const background = theme.visualization.getColorByName(options.chipColor);
  // Pick black or white text, whichever is easier to read on that background
  const textColor = theme.colors.getContrastText(background);

  // Ask Grafana for all the variables on this dashboard
  const allVariables = getTemplateSrv().getVariables();

  // Turn "ward, sensor" into ["ward", "sensor"]
  const wanted = (options.variableNames ?? '')
    .split(',')
    .map((name) => name.trim())
    .filter((name) => name !== '');

  // If the user listed names, keep only those; otherwise show all
  const variables = wanted.length > 0 ? allVariables.filter((v) => wanted.includes(v.name)) : allVariables;

  return (
    <div className={styles.wrapper} style={{ width, height }}>
      {variables.map((v) => {
        // Some variable types have no "current" value, so check before using it
        const current = 'current' in v ? v.current : undefined;
        const value = current && 'text' in current ? String(current.text) : '';
        return (
          <span key={v.name} className={styles.chip} style={{ background, color: textColor }}>
            {v.label || v.name}: {value}
          </span>
        );
      })}
    </div>
  );
};