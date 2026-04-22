import { MessageSquare } from "lucide-react";

export function Comments() {
  const comments = [
    {
      id: 1,
      author: "Sarah Chen",
      avatar: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      time: "2 days ago",
      content: "This is exactly what I needed! The explanation on modern frameworks was spot on. Thanks for making this so easy to understand.",
      likes: 243,
    },
    {
      id: 2,
      author: "Alex Kumar",
      avatar: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      time: "3 days ago",
      content: "Great content as always. Would love to see a follow-up video on testing strategies in 2026!",
      likes: 128,
    },
    {
      id: 3,
      author: "Emily Rodriguez",
      avatar: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      time: "4 days ago",
      content: "The section on performance optimization was incredibly helpful. Implemented these techniques in my project and saw immediate improvements.",
      likes: 95,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Comments Header */}
      <div className="flex items-center gap-8">
        <h3 className="text-lg text-white font-medium flex items-center gap-2">
          <MessageSquare size={20} />
          1,245 Comments
        </h3>
        <button className="text-sm text-zinc-400 hover:text-white transition-colors">
          Sort by
        </button>
      </div>

      {/* Add Comment */}
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex-shrink-0"></div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full bg-transparent border-b border-zinc-800 text-white text-sm py-2 px-0 focus:outline-none focus:border-zinc-600 transition-colors"
          />
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <div
              className="w-10 h-10 rounded-full flex-shrink-0"
              style={{ background: comment.avatar }}
            ></div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-white font-medium">
                  {comment.author}
                </span>
                <span className="text-xs text-zinc-500">{comment.time}</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed mb-2">
                {comment.content}
              </p>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 10v12" />
                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                  </svg>
                  {comment.likes}
                </button>
                <button className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 14V2" />
                    <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L14 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                  </svg>
                </button>
                <button className="text-xs text-zinc-400 hover:text-white transition-colors">
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
