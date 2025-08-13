import { Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Index({ posts, categories, currentCategory }) {
    return (
        <AppLayout>
            <div className="py-4">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 text-gray-900">
                            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400 justify-center">
                                <li className="me-2">
                                    <Link 
                                        href="/" 
                                        className={!currentCategory 
                                            ? "inline-block px-4 py-2 text-white bg-blue-600 rounded-lg active" 
                                            : "inline-block px-4 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                                        }
                                    >
                                        All
                                    </Link>
                                </li>
                                {categories.map((category) => (
                                    <li key={category.id} className="me-2">
                                        <Link 
                                            href={`/category/${category.id}`} 
                                            className={currentCategory && currentCategory.id === category.id
                                                ? "inline-block px-4 py-2 text-white bg-blue-600 rounded-lg active"
                                                : "inline-block px-4 py-2 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
                                            }
                                        >
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 text-gray-900">
                        {posts.data.length > 0 ? (
                            posts.data.map((post) => (
                                <div key={post.id} className="flex bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-8">
                                    <div className="p-5 flex-1">
                                        <Link href={`/@${post.user.username}/${post.slug}`}>
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                {post.title}
                                            </h5>
                                        </Link>
                                        <div className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                            {post.body ? post.body.split(' ').slice(0, 20).join(' ') + '...' : post.excerpt}
                                        </div>
                                        <div className="text-sm text-gray-400 flex gap-4">
                                            <div>
                                                by 
                                                <Link href={`/@${post.user.username}`} className="text-gray-600 hover:underline">
                                                    {post.user.username}
                                                </Link>
                                                {' '}at {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                            <span className="inline-flex gap-1 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                                </svg>
                                                {post.claps_count}
                                            </span>
                                        </div>
                                    </div>
                                    <Link href={`/@${post.user.username}/${post.slug}`}>
                                        {post.image ? (
                                            <img className="w-48 h-full max-h-64 object-cover rounded-r-lg" src={`/storage/${post.image}`} alt="" />
                                        ) : (
                                            <div className="w-48 h-full max-h-64 bg-gray-200 rounded-r-lg flex items-center justify-center">
                                                <span className="text-gray-400">No Image</span>
                                            </div>
                                        )}
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-gray-400 py-16">No Posts Found</div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}