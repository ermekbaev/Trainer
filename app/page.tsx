import Landing from "@/components/site/Landing";
import { getSettings, getTransformations, getFeed } from "@/lib/site-data";

export const dynamic = "force-dynamic"; // always reflect latest admin edits

export default async function Home() {
  const [settings, transformations, feed] = await Promise.all([
    getSettings(),
    getTransformations(),
    getFeed(),
  ]);

  return <Landing settings={settings} transformations={transformations} feed={feed} />;
}
