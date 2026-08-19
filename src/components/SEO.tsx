import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  type?: 'website' | 'article';
  publishedTime?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

const siteName = 'Resume.Club';
const origin = 'https://resume.club';

export default function SEO({ title, description, path = '/', keywords = [], type = 'website', publishedTime, structuredData }: SEOProps) {
  useEffect(() => {
    const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
    document.title = fullTitle;
    setMeta('description', description);
    setMeta('keywords', keywords.join(', '));
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:url', `${origin}${path}`, 'property');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setLink('canonical', `${origin}${path}`);

    if (publishedTime) setMeta('article:published_time', publishedTime, 'property');

    const existing = document.querySelector('script[data-seo-jsonld]');
    existing?.remove();
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoJsonld = 'true';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
      return () => script.remove();
    }
  }, [description, keywords, path, publishedTime, structuredData, title, type]);

  return null;
}

function setMeta(name: string, content: string, attribute = 'name') {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.content = content;
}

function setLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
}
