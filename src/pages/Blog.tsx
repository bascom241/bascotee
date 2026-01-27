import { useEffect, useState } from "react"

type Post = {
  guid: string
  title: string
  link: string
  pubDate: string
  thumbnail: string
  description: string
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@abdulbasitabdulwahab3"
        )
        const data = await res.json()
        setPosts(data.items)
      } catch (error) {
        console.log("Error fetching posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen mt-28 px-6">
      <div className="max-w-6xl mx-auto ">
        <h1 className="text-4xl font-bold text-center mb-3">My Blog Posts</h1>
        <p className="text-center text-gray-500 mb-12">
          Articles from my Medium account
        </p>

        {loading && (
          <p className="text-center text-gray-600 animate-pulse">
            Loading posts...
          </p>
        )}

        {!loading && posts.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No posts found.</p>
        )}

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.guid}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
            >
              {post.thumbnail && (
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-6 flex flex-col grow">
                <p className="text-sm text-gray-400 mb-2">
                  {new Date(post.pubDate).toDateString()}
                </p>

                <h2 className="text-lg font-semibold mb-3 line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-gray-600 text-sm mb-4 grow">
                  {post.description
                    .replace(/(<([^>]+)>)/gi, "")
                    .slice(0, 120) + "..."}
                </p>

                <a
                  href={post.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-block text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog
