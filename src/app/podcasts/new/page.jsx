import PodcastEditor from "@/components/podcasteditor";
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function PodcastEditorPage() {
  return (
    <div className="min-h-screen font-sans bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <PodcastEditor />
      </main>
      <Footer />
    </div>
  );
}