import { Item } from '@/models';

export default function TrendiCard ({ crypto }:{crypto:Item}) {
  return (
    <div>{crypto.name}</div>
  );
}
