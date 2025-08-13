<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicProfileController extends Controller
{
    public function show(User $user)
    {
        $posts = $user->posts()
            ->where('published_at', '<=', now())
            ->latest()
            ->paginate();

        $isFollowing = false;
        if (auth()->check()) {
            $isFollowing = auth()->user()->following()->where('users.id', $user->id)->exists();
        }

        return Inertia::render('Profile/Show', [
            'user' => $user,
            'posts' => $posts,
            'isFollowing' => $isFollowing,
        ]);
    }
}
