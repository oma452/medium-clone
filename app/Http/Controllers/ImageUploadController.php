<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageUploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg|max:5120',
        ]);

        $imagePath = $request->file('image')->store('posts', 'public');

        return back()->with([
            'success' => true,
            'path' => $imagePath,
            'url' => '/storage/' . $imagePath
        ]);
    }
}