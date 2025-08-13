import { Link, router, usePage } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Show({ post }) {
    const { auth } = usePage().props || {};
    const handleClap = () => {
        router.post(`/clap/${post.id}`);
    };

    return (
        <AppLayout>
            <div className="py-4">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
                        <h1 className="text-2xl mb-4">{post.title}</h1>

                        {/* User Avatar */}
                        <div className="flex gap-4">
                            <div className="w-12 h-12">
                                {post.user.image ? (
                                    <img src={post.user.imageUrl} alt={post.user.name} className="w-12 h-12 rounded-full" />
                                ) : (
                                    <img src="https://cdn12.picryl.com/photo/2016/12/31/head-the-dummy-avatar-people-b61cdb-1024.png" alt="Dummy avatar" className="w-12 h-12 rounded-full" />
                                )}
                            </div>

                            <div>
                                <div className="flex gap-2">
                                    <Link href={`/@${post.user.username}`} className="hover:underline">
                                        {post.user.name}
                                    </Link>
                                </div>

                                <div className="flex gap-2 text-sm text-gray-500">
                                    {Math.ceil(post.content?.split(' ').length / 200) || 1} min read
                                    &middot;
                                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </div>
                            </div>
                        </div>

                        {auth?.user && auth.user.id === post.user_id && (
                            <div className="py-4 mt-8 border-t border-b border-gray-200">
                                <Link href={`/post/${post.slug}`} className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 mr-2">
                                    Edit Post
                                </Link>
                                <Link href={`/post/${post.id}`} method="delete" className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150">
                                    Delete Post
                                </Link>
                            </div>
                        )}

                        {/* Content Section */}
                        <div className="mt-8">
                            {post.image && (
                                <img src={`/storage/${post.image}`} alt={post.title} className="w-full" />
                            )}

                            <div className="mt-4">
                                {post.content}
                            </div>
                        </div>

                        <div className="mt-8">
                            <span className="px-4 py-2 bg-gray-200 rounded-2xl">
                                {post.category.name}
                            </span>
                        </div>

                        {/* Clap Section */}
                        {auth?.user && (
                            <div className="mt-8 p-4 border-t border-b">
                                <button onClick={handleClap} className="flex gap-2 text-gray-500 hover:text-gray-900 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                    </svg>
                                    <span>{post.claps_count}</span>
                                </button>
                                {post.claps && post.claps.length > 0 && (
                                    <div className="text-sm text-gray-600">
                                        <span>Liked by: </span>
                                        {post.claps.map((clap, index) => (
                                            <span key={clap.id}>
                                                <Link href={`/@${clap.user.username}`} className="hover:underline">
                                                    {clap.user.name}
                                                </Link>
                                                {index < post.claps.length - 1 && ', '}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}