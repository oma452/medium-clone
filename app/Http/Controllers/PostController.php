<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostCreateRequest;
use App\Http\Requests\PostUpdateRequest;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $categories = Category::all();

        if (!$user) {
            // Guest users see no posts
            $posts = new \Illuminate\Pagination\LengthAwarePaginator([], 0, 5);
        } else {
            $followingIds = $user->following()->pluck('users.id');
            \Log::info('Dashboard Debug - User: ' . $user->username . ', Following IDs: ' . $followingIds->implode(','));
            if ($followingIds->isEmpty()) {
    // If not following anyone, show only own posts
    $posts = Post::with(['user', 'category'])
        ->withCount('claps')
        ->where('user_id', $user->id)
        ->latest()
        ->simplePaginate(5);

    
            } else {
                // Show ONLY posts from followed users + your own posts
                $userIds = $followingIds->push($user->id);
                \Log::info('Showing posts from user IDs: ' . $userIds->implode(','));
                $posts = Post::with(['user', 'category'])
                    ->withCount('claps')
                    ->whereIn('user_id', $userIds)
                    ->latest()
                    ->simplePaginate(5);
                \Log::info('Posts found: ' . $posts->count());
                foreach($posts as $post) {
                    \Log::info('Post: ' . $post->title . ' by ' . $post->user->username);
                }
            }
        }

        return Inertia::render('Posts/Index', [
            'posts' => $posts,
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::get();
        
        return Inertia::render('Posts/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostCreateRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::id();
        
        if (empty($data['published_at'])) {
            $data['published_at'] = now();
        }

        $post = Post::create($data);
        
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('posts', 'public');
            $post->update(['image' => $imagePath]);
        }

        return redirect()->route('dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $username, Post $post)
    {
        $post->load(['user', 'category', 'claps.user']);
        return Inertia::render('Posts/Show', [
            'post' => $post,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        if ($post->user_id !== Auth::id()) {
            abort(403);
        }
        $categories = Category::get();
        return Inertia::render('Posts/Edit', [
            'post' => $post,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PostUpdateRequest $request, Post $post)
    {
        if ($post->user_id !== Auth::id()) {
            abort(403);
        }
        
        $data = $request->validated();
        
        // Handle image upload like in store method
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('posts', 'public');
            $data['image'] = $imagePath;
        }
        
        $post->update($data);

        return redirect()->route('myPosts');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        if ($post->user_id !== Auth::id()) {
            abort(403);
        }
        $post->delete();

        return redirect()->route('dashboard');
    }

    public function category(Category $category)
    {
        $user = auth()->user();

        $query = $category->posts()
            ->where('published_at', '<=', now())
            ->with(['user', 'category'])
            ->withCount('claps')
            ->latest();
if ($user) {
    $ids = $user->following()->pluck('users.id');
    if ($ids->isNotEmpty()) {
        $userIds = $ids->push($user->id);
        \Log::info('Category Debug - User: ' . $user->username . ', Category: ' . $category->name . ', User IDs: ' . $userIds->implode(','));
        $query->whereIn('user_id', $userIds);
    } else {
        \Log::info('Category Debug - User: ' . $user->username . ', Category: ' . $category->name . ', Showing only own posts');
        $query->where('user_id', $user->id);
    }
}


        \Log::info('Final query SQL: ' . $query->toSql());
        \Log::info('Query bindings: ' . json_encode($query->getBindings()));
        $posts = $query->simplePaginate(5);
        $categories = Category::all();

        return Inertia::render('Posts/Index', [
            'posts' => $posts,
            'categories' => $categories,
            'currentCategory' => $category,
        ]);
    }

    public function myPosts()
    {
        $user = auth()->user();
        $posts = $user->posts()
            ->with(['user', 'category'])
            ->withCount('claps')
            ->latest()
            ->simplePaginate(5);

        $categories = Category::all();
        return Inertia::render('Posts/Index', [
            'posts' => $posts,
            'categories' => $categories,
        ]);
    }
}
