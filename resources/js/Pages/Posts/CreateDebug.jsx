import { useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function CreateDebug({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        category_id: '',
        image: null,
        published_at: '',
    });

    const submit = (e) => {
        e.preventDefault();
        
        // Debug: Check what we're sending
        console.log('=== FORM DEBUG ===');
        console.log('Data object:', data);
        console.log('Image file:', data.image);
        console.log('Image file type:', data.image?.type);
        console.log('Image file size:', data.image?.size);
        console.log('==================');
        
        // Create FormData manually for debugging
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('category_id', data.category_id);
        if (data.published_at) formData.append('published_at', data.published_at);
        if (data.image) formData.append('image', data.image);
        
        // Debug FormData contents
        console.log('=== FORMDATA DEBUG ===');
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        console.log('=====================');
        
        post('/post/create', {
            forceFormData: true,
            onBefore: () => {
                console.log('=== BEFORE SEND ===');
                console.log('About to send request');
                console.log('==================');
            },
            onError: (errors) => {
                console.log('=== ERRORS ===');
                console.log(errors);
                console.log('==============');
            },
            onSuccess: () => {
                console.log('=== SUCCESS ===');
                console.log('Post created successfully');
                console.log('===============');
            }
        });
    };

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto py-8 px-4">
                <h1 className="text-3xl mb-4">Create new post (DEBUG MODE)</h1>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-8">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Image (DEBUG)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    console.log('=== FILE SELECTED ===');
                                    console.log('File:', file);
                                    console.log('File name:', file?.name);
                                    console.log('File size:', file?.size);
                                    console.log('File type:', file?.type);
                                    console.log('====================');
                                    setData('image', file);
                                }}
                                className="block mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            />
                            {data.image && (
                                <div className="mt-2 text-sm text-green-600">
                                    Selected: {data.image.name} ({Math.round(data.image.size/1024)}KB)
                                </div>
                            )}
                            {errors.image && <div className="text-red-600 text-sm">{errors.image}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="block mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            />
                            {errors.title && <div className="text-red-600 text-sm">{errors.title}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm block mt-1 w-full"
                            >
                                <option value="">Select a Category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            {errors.category_id && <div className="text-red-600 text-sm">{errors.category_id}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Content</label>
                            <textarea
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                className="block mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                rows="10"
                            />
                            {errors.content && <div className="text-red-600 text-sm">{errors.content}</div>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Published At</label>
                            <input
                                type="datetime-local"
                                value={data.published_at}
                                onChange={(e) => setData('published_at', e.target.value)}
                                className="block mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            />
                            {errors.published_at && <div className="text-red-600 text-sm">{errors.published_at}</div>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 mt-4"
                        >
                            Submit (DEBUG)
                        </button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}