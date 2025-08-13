import { useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Edit({ user }) {
    const { data, setData, patch, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        username: user.username,
        bio: user.bio || '',
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        patch('/profile');
    };

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        {errors.username && <div className="text-red-600 text-sm">{errors.username}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        {errors.email && <div className="text-red-600 text-sm">{errors.email}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bio</label>
                        <textarea
                            value={data.bio}
                            onChange={(e) => setData('bio', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            rows="4"
                        />
                        {errors.bio && <div className="text-red-600 text-sm">{errors.bio}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                        <input
                            type="file"
                            onChange={(e) => setData('image', e.target.files[0])}
                            className="mt-1 block w-full"
                        />
                        {errors.image && <div className="text-red-600 text-sm">{errors.image}</div>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                        {processing ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}