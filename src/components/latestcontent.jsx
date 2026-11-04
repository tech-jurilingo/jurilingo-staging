"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, BookOpen, PlayCircle } from "lucide-react";

const formatDate = (value) => value
  ? new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
  : "Recently published";

export default function LatestContent() {
  const [blogs, setBlogs] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const [blogRes, podcastRes, eventRes] = await Promise.all([
          fetch("/api/blog"),
          fetch("/api/podcast"),
          fetch("/api/competition/active"),
        ]);
        const [blogData, podcastData, eventData] = await Promise.all([
          blogRes.json(), podcastRes.json(), eventRes.json(),
        ]);
        if (!active) return;
        setBlogs((blogData.blogs || []).slice(0, 3));
        setPodcasts((podcastData.podcasts || []).slice(0, 3));
        setEvents((eventData.competitions || []).slice(0, 3));
      } catch (error) {
        console.error("Unable to load latest JuriLingo content:", error);
      }
    };
    load();
    return () => { active = false; };
  }, []);

  const sections = [
    { title: "Latest Blogs", icon: BookOpen, items: blogs, href: "/blogs", date: item => item.publishDate || item.createdAt, label: item => item.title, target: item => `/blogs/view/${item._id}` },
    { title: "Latest Podcasts", icon: PlayCircle, items: podcasts, href: "/podcasts", date: item => item.createdAt, label: item => item.title, target: () => "/podcasts" },
    { title: "Upcoming Events", icon: CalendarDays, items: events, href: "/competitions", date: item => item.startDate, label: item => item.title, target: item => `/competitions/by-id/${item._id}` },
  ];

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto space-y-12">
        {sections.map(({ title, icon: Icon, items, href, date, label, target }) => (
          <div key={title}>
            <div className="flex items-center justify-between gap-4 mb-5">
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#002B36] flex items-center gap-2">
                <Icon className="text-[#005F63]" size={25} /> {title}
              </h2>
              <Link href={href} className="text-sm font-semibold text-[#005F63] hover:underline inline-flex items-center gap-1">
                View all <ArrowRight size={16} />
              </Link>
            </div>
            {items.length === 0 ? (
              <p className="text-sm text-gray-500">New updates will appear here when published.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {items.map((item) => (
                  <Link key={item._id} href={target(item)} className="rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                    <p className="text-xs text-[#005F63] mb-2">{formatDate(date(item))}</p>
                    <h3 className="font-semibold text-gray-900 leading-snug">{label(item)}</h3>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm text-[#005F63]">Explore <ArrowRight size={14} /></span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
