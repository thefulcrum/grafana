import { useEffect } from 'react';

import { PanelProps } from '@grafana/data';
import { Trans, t } from '@grafana/i18n';
import { RefreshEvent } from '@grafana/runtime';
import { Alert, ScrollContainer, TextLink } from '@grafana/ui';

import { News } from './component/News';
import { DEFAULT_FEED_URL } from './constants';
import { Options } from './panelcfg.gen';
import { useNewsFeed } from './useNewsFeed';

interface NewsPanelProps extends PanelProps<Options> {}

export function NewsPanel(props: NewsPanelProps) {
  const {
    width,
    options: { feedUrl = DEFAULT_FEED_URL, showImage },
  } = props;

  const { state, getNews } = useNewsFeed(feedUrl);

  useEffect(() => {
    const sub = props.eventBus.subscribe(RefreshEvent, getNews);

    return () => {
      sub.unsubscribe();
    };
  }, [getNews, props.eventBus]);

  useEffect(() => {
    getNews();
  }, [getNews]);

  if (state.error) {
    return (
<<<<<<< HEAD
      <CustomScrollbar autoHeightMin="100%" autoHeightMax="100%">
        {news.map((item, index) => {
          return (
            <article key={index} className={cx(styles.item, useWideLayout && styles.itemWide)}>
              {showImage && item.ogImage && (
                <a
                  tabIndex={-1}
                  href={textUtil.sanitizeUrl(item.link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx(styles.socialImage, useWideLayout && styles.socialImageWide)}
                  aria-hidden
                >
                  <img src={item.ogImage} alt={item.title} />
                </a>
              )}
              <div className={styles.body}>
                <time className={styles.date} dateTime={dateTimeFormat(item.date, { format: 'MMM DD' })}>
                  {dateTimeFormat(item.date, { format: 'MMM DD' })}{' '}
                </time>
                <a
                  className={styles.link}
                  href={textUtil.sanitizeUrl(item.link)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3 className={styles.title}>{item.title}</h3>
                </a>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: textUtil.sanitize(item.content) }} />
              </div>
            </article>
          );
        })}
      </CustomScrollbar>
=======
      <Alert title={t('news.news-panel.title-error-loading-rss-feed', 'Error loading RSS feed')}>
        <Trans i18nKey="news.news-panel.body-error-loading-rss-feed">
          Make sure that the feed URL is correct and that CORS is configured correctly on the server. See{' '}
          <TextLink href="https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/news/" external>
            News panel documentation.
          </TextLink>
        </Trans>
      </Alert>
>>>>>>> v12.1.0
    );
  }
  if (state.loading) {
    return (
      <div>
        <Trans i18nKey="news.news-panel.loading">Loading...</Trans>
      </div>
    );
  }

  if (!state.value) {
    return null;
  }

  return (
    <ScrollContainer minHeight="100%">
      {state.value.map((_, index) => {
        return <News key={index} index={index} width={width} showImage={showImage} data={state.value} />;
      })}
    </ScrollContainer>
  );
}
<<<<<<< HEAD

const getStyles = stylesFactory((theme: GrafanaTheme2) => ({
  container: css`
    height: 100%;
  `,
  item: css`
    display: flex;
    padding: ${theme.spacing(1)};
    position: relative;
    margin-bottom: 4px;
    margin-right: ${theme.spacing(1)};
    border-bottom: 2px solid ${theme.colors.border.weak};
    background: ${theme.colors.background.primary};
    flex-direction: column;
    flex-shrink: 0;
  `,
  itemWide: css`
    flex-direction: row;
  `,
  body: css``,
  socialImage: css`
    display: flex;
    align-items: center;
    margin-bottom: ${theme.spacing(1)};
    > img {
      width: 100%;
      border-radius: ${theme.shape.borderRadius(2)} ${theme.shape.borderRadius(2)} 0 0;
    }
  `,
  socialImageWide: css`
    margin-right: ${theme.spacing(2)};
    margin-bottom: 0;
    > img {
      width: 250px;
      border-radius: ${theme.shape.borderRadius()};
    }
  `,
  link: css`
    color: ${theme.colors.text.link};
    display: inline-block;

    &:hover {
      color: ${theme.colors.text.link};
      text-decoration: underline;
    }
  `,
  title: css`
    max-width: calc(100% - 70px);
    font-size: 16px;
    margin-bottom: ${theme.spacing(0.5)};
  `,
  content: css`
    p {
      margin-bottom: 4px;
      color: ${theme.colors.text};
    }
  `,
  date: css`
    margin-bottom: ${theme.spacing(0.5)};
    font-weight: 500;
    border-radius: 0 0 0 3px;
    color: ${theme.colors.text.secondary};
  `,
}));
=======
>>>>>>> v12.1.0
