import { Link, router } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Show({ user, posts, isFollowing, auth }) {
    const handleFollow = () => {
        router.post(`/follow/${user.id}`);
    };
    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto py-8 px-4">
                <div className="bg-white rounded-lg shadow p-8 mb-8">
                    <div className="flex items-center space-x-6">
                        {user.media && user.media.length > 0 && (
                            <img 
                                src={user.media[0].original_url} 
                                alt={user.name}
                                className="w-24 h-24 rounded-full object-cover"
                            />
                        )}
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold">{user.name}</h1>
                            <p className="text-gray-600">@{user.username}</p>
                            {user.bio && <p className="mt-2 text-gray-700">{user.bio}</p>}
                        </div>
                        {auth.user && auth.user.id !== user.id && (
                            <button
                                onClick={handleFollow}
                                className={`px-4 py-2 rounded-md font-medium ${
                                    isFollowing 
                                        ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            >
                                {isFollowing ? 'Unfollow' : 'Follow'}
                            </button>
                        )}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-6">Posts by {user.name}</h2>
                    <div className="space-y-6">
                        {posts.data.map((post) => (
                            <div key={post.id} className="bg-white p-6 rounded-lg shadow">
                                <Link href={`/@${user.username}/${post.slug}`}>
                                    <h3 className="text-xl font-bold mb-2 hover:text-blue-600">{post.title}</h3>
                                </Link>
                                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <span>{new Date(post.published_at).toLocaleDateString()}</span>
                                    <span>{post.category?.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}