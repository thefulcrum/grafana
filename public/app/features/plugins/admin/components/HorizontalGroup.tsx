<<<<<<< HEAD
import React from 'react';
import { css, cx } from '@emotion/css';

import { useTheme2 } from '@grafana/ui';
=======
import { css, cx } from '@emotion/css';
import * as React from 'react';

>>>>>>> v12.1.0
import { GrafanaTheme2 } from '@grafana/data';
import { useTheme2 } from '@grafana/ui';

interface HorizontalGroupProps {
  children: React.ReactNode;
  wrap?: boolean;
  className?: string;
}

export const HorizontalGroup = ({ children, wrap, className }: HorizontalGroupProps) => {
  const theme = useTheme2();
  const styles = getStyles(theme, wrap);

  return <div className={cx(styles.container, className)}>{children}</div>;
};

const getStyles = (theme: GrafanaTheme2, wrap?: boolean) => ({
<<<<<<< HEAD
  container: css`
    display: flex;
    flex-direction: row;
    flex-wrap: ${wrap ? 'wrap' : 'no-wrap'};
    & > * {
      margin-bottom: ${theme.spacing()};
      margin-right: ${theme.spacing()};
    }
    & > *:last-child {
      margin-right: 0;
    }
  `,
=======
  container: css({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: wrap ? 'wrap' : 'nowrap',
    '& > *': {
      marginBottom: theme.spacing(),
      marginRight: theme.spacing(),
    },
    '& > *:last-child': {
      marginRight: 0,
    },
  }),
>>>>>>> v12.1.0
});
