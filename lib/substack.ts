export interface SubstackPost {
  id: string | number;
  title: string;
  canonical_url: string;
  post_date: string;
  cover_image: string | null;
  description: string;
}

export async function fetchSubstackPosts(domain: string, limit: number = 10): Promise<SubstackPost[]> {
  const url = `https://${domain}/api/v1/posts?limit=${limit}`;
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('API fetch failed');
    const data = await res.json();
    return data
      .filter((post: any) => post.audience === 'everyone')
      .map((post: any) => ({
        id: post.id,
        title: post.title,
        canonical_url: post.canonical_url,
        post_date: post.post_date,
        cover_image: post.cover_image,
        description: post.subtitle || post.description || post.truncated_body_text || '',
      }));
  } catch (error) {
    console.warn('Failed to fetch from Substack API, falling back to RSS:', error);
    try {
      const rssRes = await fetch(`https://${domain}/feed`, { next: { revalidate: 3600 } });
      if (!rssRes.ok) throw new Error('RSS fetch failed');
      const xml = await rssRes.text();
      
      const posts: SubstackPost[] = [];
      const itemRegex = /<item>([\s\S]*?)<\/item>/g;
      let match;
      let count = 0;
      
      while ((match = itemRegex.exec(xml)) !== null && count < limit) {
        const itemContent = match[1];
        const titleMatch = itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || itemContent.match(/<title>(.*?)<\/title>/);
        const linkMatch = itemContent.match(/<link>(.*?)<\/link>/);
        const pubDateMatch = itemContent.match(/<pubDate>(.*?)<\/pubDate>/);
        const descMatch = itemContent.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) || itemContent.match(/<description>(.*?)<\/description>/);
        
        let cover_image = null;
        const enclosureMatch = itemContent.match(/<enclosure url="(.*?)"/);
        if (enclosureMatch) cover_image = enclosureMatch[1];
        
        let description = '';
        if (descMatch) {
          description = descMatch[1].replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').substring(0, 160) + '...';
        }

        posts.push({
          id: `rss-${count}`,
          title: titleMatch ? titleMatch[1] : 'Untitled',
          canonical_url: linkMatch ? linkMatch[1] : `https://${domain}`,
          post_date: pubDateMatch ? new Date(pubDateMatch[1]).toISOString() : new Date().toISOString(),
          cover_image,
          description,
        });
        count++;
      }
      return posts;
    } catch (fallbackError) {
      console.error('RSS fallback also failed:', fallbackError);
      return [];
    }
  }
}
