<?php

use App\Http\Controllers\ClapController;
use App\Http\Controllers\FollowerController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/@{user:username}', [PublicProfileController::class, 'show'])
    ->name('profile.show');

Route::get('/', [PostController::class, 'index'])
    ->name('dashboard');

Route::get('/@{username}/{post:slug}', [PostController::class, 'show'])
    ->name('post.show');

Route::get('/category/{category}', [PostController::class, 'category'])
    ->name('post.byCategory');

Route::middleware(['auth', 'verified'])->group(function() {

    Route::get('/post/create', [PostController::class, 'create'])
        ->name('post.create');
        
    Route::get('/post/create-debug', function() {
        $categories = App\Models\Category::get();
        return Inertia::render('Posts/CreateDebug', ['categories' => $categories]);
    })->name('post.create.debug');

    Route::post('/post/create', [PostController::class, 'store'])
        ->name('post.store');

    Route::get('/post/{post:slug}', [PostController::class, 'edit'])
        ->name('post.edit');

    Route::put('/post/{post}', [PostController::class, 'update'])
        ->name('post.update');

    Route::delete('/post/{post}', [PostController::class, 'destroy'])
        ->name('post.destroy');
        
    Route::get('/my-posts', [PostController::class, 'myPosts'])
        ->name('myPosts');

    Route::post('/follow/{user}', [FollowerController::class, 'followUnfollow'])
        ->name('follow');

    Route::post('/clap/{post}', [ClapController::class, 'clap'])
        ->name('clap');
        
    Route::post('/upload-image', [App\Http\Controllers\ImageUploadController::class, 'upload'])
        ->name('upload.image');
        
    Route::get('/test-upload', function() {
        return view('test-upload');
    });
    
    Route::post('/test-upload', function(\Illuminate\Http\Request $request) {
        \Log::info('Test upload - hasFile: ' . ($request->hasFile('test_file') ? 'YES' : 'NO'));
        
        if ($request->hasFile('test_file')) {
            $file = $request->file('test_file');
            \Log::info('File details: ' . $file->getClientOriginalName() . ' - ' . $file->getSize() . ' bytes');
            
            $path = $file->store('test', 'public');
            \Log::info('File stored at: ' . $path);
            
            return back()->with('success', 'File uploaded: ' . $path);
        }
        
        return back()->withErrors(['No file received']);
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
