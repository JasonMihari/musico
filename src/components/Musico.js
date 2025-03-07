import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaPlay, FaDownload, FaTrash } from "react-icons/fa";

export default function Musico() {
  const [loading, setLoading] = useState(true);
  const [songLinks, setSongLinks] = useState([]);
  const [playlist, setPlaylist] = useState({});
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [playingSong, setPlayingSong] = useState(null);
  const [songPlayCount, setSongPlayCount] = useState({});

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const addSong = (link) => {
    const date = new Date().toLocaleString();
    setSongLinks([...songLinks, { link, date }]);
  };

  const removeSong = (dateKey, linkToRemove) => {
    setPlaylist((prev) => {
      const updatedPlaylist = { ...prev };
      updatedPlaylist[dateKey] = updatedPlaylist[dateKey].filter((link) => link !== linkToRemove);
      if (updatedPlaylist[dateKey].length === 0) delete updatedPlaylist[dateKey];
      return updatedPlaylist;
    });
  };

  const organizePlaylist = () => {
    const grouped = {};
    songLinks.forEach(({ link, date }) => {
      const dateKey = new Date(date).toLocaleDateString();
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(link);
    });
    setPlaylist(grouped);
  };

  const playSong = (link) => {
    setPlayingSong(link);
    setSongPlayCount((prev) => ({ ...prev, [link]: (prev[link] || 0) + 1 }));
  };

  const getStarRating = (count) => {
    return "⭐".repeat(Math.min(5, Math.ceil(count / 5)));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      {loading ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xl font-bold">
          Loading...
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center w-full max-w-2xl">
          <h1 className="text-5xl font-bold">Musico</h1>
          <p className="mt-4 text-gray-400">Your AI-powered music hub</p>
          
          <div className="mt-6 flex gap-2">
            <Input type="text" placeholder="Paste song link here" id="songInput" className="flex-1 px-4 py-2 border rounded bg-gray-900 text-white" />
            <Button onClick={() => addSong(document.getElementById("songInput").value)} className="px-6 py-2 bg-orange-600 text-white rounded-lg shadow-lg hover:bg-orange-700">
              Add Song
            </Button>
          </div>
          
          <div className="mt-4">
            <Button onClick={organizePlaylist} className="px-6 py-2 bg-gray-700 text-white rounded-lg shadow-lg hover:bg-gray-800">
              Organize Playlist
            </Button>
          </div>
          
          <div className="mt-6">
            <h2 className="text-xl font-bold">Playlist: {playlistName}</h2>
            <Input type="text" placeholder="Name your playlist" className="mt-2 px-4 py-2 border rounded bg-gray-900 text-white" onChange={(e) => setPlaylistName(e.target.value)} />
          </div>
          
          <div className="mt-4 text-left w-full">
            {Object.keys(playlist).map((date) => (
              <div key={date} className="mt-4 p-4 border rounded bg-gray-800 shadow">
                <h3 className="text-lg font-bold">{date}</h3>
                <ul className="list-disc pl-4">
                  {playlist[date].map((link, idx) => (
                    <li key={idx} className="text-orange-400 flex justify-between items-center">
                      <a href={link} target="_blank" rel="noopener noreferrer" className="truncate">{link}</a>
                      <div className="flex gap-2">
                        <Button onClick={() => playSong(link)} className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center">
                          <FaPlay className="mr-2" /> Play
                        </Button>
                        <Button onClick={() => removeSong(date, link)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center">
                          <FaTrash className="mr-2" /> Remove
                        </Button>
                        <span className="ml-2">{getStarRating(songPlayCount[link] || 0)}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {playingSong && (
            <div className="mt-6 p-4 border rounded bg-gray-900 shadow-lg text-center">
              <h2 className="text-xl font-bold mb-2">Now Playing</h2>
              <iframe
                width="100%"
                height="200"
                src={playingSong.replace("watch?v=", "embed/")}
                title="Music Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          
          <div className="mt-6">
            <Button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 flex items-center">
              <FaDownload className="mr-2" /> Download Musico
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
