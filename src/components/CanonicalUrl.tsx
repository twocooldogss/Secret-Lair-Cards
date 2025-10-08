interface CanonicalUrlProps {
  url: string;
}

export default function CanonicalUrl({ url }: CanonicalUrlProps) {
  const baseUrl = 'https://secretlaircards.com';
  const canonicalUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  
  return (
    <link rel="canonical" href={canonicalUrl} />
  );
}

